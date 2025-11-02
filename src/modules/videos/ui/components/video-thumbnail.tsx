import Image from 'next/image';

interface VideoThumbnailProps {
  thumbnailUrl?: string | null;
}

export const VideoThumbnail = ({ thumbnailUrl }: VideoThumbnailProps) => {
  return (
    <div className="relative">
      {/* Thumbnail Wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video ">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt="thumbnail"
            className="size-full object-cover"
            fill
          />
        ) : (
          <Image
            src="./placeholder.svg"
            alt="thumbnail"
            className="size-full object-cover"
            fill
          />
        )}
      </div>
      {/* Video duration box */}
      {/* TODO Add video duration box */}
    </div>
  );
};
