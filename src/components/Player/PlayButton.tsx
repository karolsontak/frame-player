import { PauseIcon, PlayIcon } from "../../core/shared/icons";

interface PlayButtonProps {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying,
  play,
  pause,
}) => {
  const handleClick = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <button onClick={handleClick}>
      {isPlaying ? (
        <PauseIcon className="h-4 w-4" />
      ) : (
        <PlayIcon className="h-4 w-4" />
      )}
    </button>
  );
};
