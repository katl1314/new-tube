import { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { headers } from 'next/headers';
import {
  VideoAssetCreatedWebhookEvent,
  VideoAssetErroredWebhookEvent,
  VideoAssetReadyWebhookEvent,
  VideoAssetTrackReadyWebhookEvent,
} from '@mux/mux-node/resources/webhooks';
import { mux } from '@/lib/mux';
import { videos } from '@/db/schema';
const SIGNING_SECRET = process.env.MUX_WEBHOOK_SECRET!; // mux webhook secret

type WebhookEvent =
  | VideoAssetCreatedWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetReadyWebhookEvent
  | VideoAssetTrackReadyWebhookEvent;

// /api/videos/webhook POST
export async function POST(req: NextRequest) {
  if (!SIGNING_SECRET) {
    throw new Error('MUX_WEBHOOK_SECRET is missing');
  }

  const headersPayload = await headers();
  const muxSignature = headersPayload.get('mux-signature');

  if (!muxSignature) {
    return new Response('No signature found', { status: 401 });
  }

  const payload = await req.json(); // payload 가져오기
  const body = JSON.stringify(payload);

  // 검증 중 문제가 있으면 에러를 발생시킨다.
  mux.webhooks.verifySignature(
    body,
    {
      'mux-signature': muxSignature,
    },
    SIGNING_SECRET,
  );

  switch (payload.type as WebhookEvent['type']) {
    case 'video.asset.created': {
      const data = payload.data as VideoAssetCreatedWebhookEvent['data'];

      if (!data.upload_id) {
        return new Response('upload id is not found', { status: 400 });
      }

      //  mux.video.uploads.create시 uploadId를 반환한다. 이를 db에 저장...
      await db
        .update(videos)
        .set({
          muxStatus: data.status,
          muxAssetId: data.id,
        })
        .where(eq(videos.muxUploadId, data.upload_id));
      break;
    }
    case 'video.asset.ready': {
      // 비디오 썸네일
      // 비디오 미리보기
      const data = payload.data as VideoAssetReadyWebhookEvent['data'];
      const playbackId = data.playback_ids?.[0].id; // 재생 ID를 가져온다.

      if (!data.upload_id) {
        return new Response('Missing upload ID', { status: 400 });
      }

      if (!playbackId) {
        return new Response('Missing playback ID', { status: 400 });
      }

      // mux 썸네일 가져오기
      const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;

      await db
        .update(videos)
        .set({
          thumbnailUrl,
          muxPlaybackId: playbackId,
          muxStatus: data.status,
          muxAssetId: data.id,
        })
        .where(eq(videos.muxUploadId, data.upload_id));

      break;
    }
    case 'video.asset.errored': {
      break;
    }
    case 'video.asset.track.ready': {
      break;
    }
    default:
      return new Response('No type', { status: 401 });
  }

  return new Response('Webhook received', { status: 200 });
}
