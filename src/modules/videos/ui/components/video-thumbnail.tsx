import { formatDuration } from '@/lib/utils';
import Image from 'next/image';

interface VideoThumbnailProps {
  thumbnailUrl?: string | null;
  previewUrl?: string | null;
  duration: number;
  title: string;
}

export const VideoThumbnail = ({
  thumbnailUrl,
  previewUrl,
  duration,
  title,
}: VideoThumbnailProps) => {
  return (
    <div className="relative group">
      {/* Thumbnail Wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <VideoThumbnailImage
          thumbnailUrl={thumbnailUrl}
          previewUrl={previewUrl}
        />
      </div>
      {/* Video duration box */}
      <div className="absolute bottom-2 px-1 right-2 p-0.5 rounded bg-black/80 text-white text-sm font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
};

const VideoThumbnailImage = ({
  thumbnailUrl,
  previewUrl,
}: Pick<VideoThumbnailProps, 'thumbnailUrl' | 'previewUrl'>) => {
  return (
    <>
      {thumbnailUrl ? (
        <>
          <Image
            src={thumbnailUrl}
            alt="Thumbnail"
            fill
            className="size-full object-cover group-hover:opacity-0"
          />
          <Image
            unoptimized={!!previewUrl}
            src={previewUrl || '/placeholder.svg'}
            alt="Preview"
            fill
            className="size-full object-cover opacity-0 group-hover:opacity-100"
          />
        </>
      ) : (
        <Image
          src="./placeholder.svg"
          alt="thumbnail"
          className="size-full object-cover"
          fill
        />
      )}
    </>
  );
};
