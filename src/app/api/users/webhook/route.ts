import { Webhook } from 'svix';
import { NextRequest } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/db'; // src/db/index.ts
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

    if (!SIGNING_SECRET) {
      throw new Error(
        'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local',
      );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // GET Header
    // const headerPayload = await headers();
    const svix_id = req.headers.get('svix-id');
    const svix_timestamp = req.headers.get('svix-timestamp');
    const svix_signature = req.headers.get('svix-signature');

    console.log('1 svix ', svix_id, svix_timestamp, svix_signature);

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error: Missing Svix Headers', { status: 400 });
    }
    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    console.log('2 get body ', body);

    let evt: WebhookEvent;

    // Verify Svix
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    }

    console.log('3 verify svix conplete');

    const eventType = evt.type;
    if (eventType === 'user.created') {
      const { data } = evt;
      console.log(
        `Received webhook with ID ${data.id} and Event type of ${eventType}`,
      );
      await db.insert(users).values({
        clerkId: data.id!,
        imageUrl: data.image_url!,
        name: `${data.first_name} ${data.last_name}`,
      });
    }

    if (eventType === 'user.deleted') {
      const { data } = evt;

      if (!data.id) {
        return new Response('Error: Missing user id', { status: 400 });
      }

      // 삭제는 delete 조건은 where
      await db.delete(users).where(eq(users.clerkId, data.id));
    }

    if (eventType === 'user.updated') {
      const { data } = evt;

      if (!data.id) {
        return new Response('Error: Missing user id', { status: 400 });
      }

      // 삭제는 delete 조건은 where 상세 조건은  eq, like, ilike ...
      await db.update(users).set(data).where(eq(users.clerkId, data.id));
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err: unknown) {
    return new Response((err as Error).message, { status: 400 });
  }
}
