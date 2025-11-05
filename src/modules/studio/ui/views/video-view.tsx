import { FormSection } from '../sections/form-section';

interface VideoViewProp {
  videoId: string;
}

export const VideoView = ({ videoId }: VideoViewProp) => {
  return (
    <div className="px-4 pt-2.5 max-w-screen-lg">
      <FormSection videoId={videoId} />
    </div>
  );
};
