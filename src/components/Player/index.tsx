import { useFramePlayer } from "../../core/hooks/useFramePlayer";
import { FramePlayerProps } from "../../core/types/FramePlayersProps";
import { PlayButton } from "./PlayButton";
import { ProgressBar } from "./ProcessBar";

export const Player: React.FC<FramePlayerProps> = ({ frames, fps }) => {
  const {
    currentFrame,
    progress,
    elapsedTime,
    isPlaying,
    play,
    pause,
    setCurrentFrame,
    setProgress,
    setElapsedTime,
  } = useFramePlayer(frames, fps);

  const handleSliderChange = (value: number) => {
    // Calcula o índice do frame com base no progresso
    const frameIndex = Math.min(
      Math.floor((value / 100) * (frames.length - 1)),
      frames.length - 1
    );

    // Atualiza o frame e o progresso
    setCurrentFrame(frameIndex);
    setProgress(value);

    // Atualiza o tempo com base no frame selecionado
    const newElapsedTime = frameIndex * 5; // Cada frame depois de 'the-bird' dura 5 segundos
    setElapsedTime(newElapsedTime);
  };

  return (
    <div className="mt-20 items-center justify-center border rounded-lg border-2 p-4">
      <img
        className="mb-4"
        src={frames[currentFrame]}
        alt={`Frame ${currentFrame}`}
      />
      <div className="flex gap-10 mb-4">
        <PlayButton isPlaying={isPlaying} play={play} pause={pause} />
        <ProgressBar progress={progress} onChange={handleSliderChange} />
      </div>
      <div>
        <p>
          Frame{" "}
          {currentFrame === 0 ? "0 " : `${currentFrame} / ${frames.length - 1}`}
        </p>
        <p>Tempo: {Math.floor(elapsedTime)} segundos</p>
      </div>
    </div>
  );
};
