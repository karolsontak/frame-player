import { useEffect, useRef, useState } from "react";

export function useFramePlayer(frames: string[], fps: number) {
  const [currentFrame, setCurrentFrame] = useState(0); // 'the-bird' será o estado inicial
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalFrames = frames.length - 1; // Considera frames de 'first-bird' a 'fifth-bird'
  const frameDuration = 1000 / fps; // Cada frame terá duração de 5 segundos
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const play = () => {
    if (isComplete) {
      setCurrentFrame(0); // Volta para 'the-bird'
      setProgress(0);
      setElapsedTime(0);
      setIsComplete(false);
    }
    setIsPlaying(true);
  };

  const pause = () => setIsPlaying(false);

  useEffect(() => {
    if (isPlaying && !isComplete) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev === 0) {
            setElapsedTime(5); // Exibe 'the-bird' por 5 segundos (inicial)
            setProgress(0); // Progresso não será alterado enquanto 'the-bird' é exibido
            return 1; // Após 5 segundos, vai para o 'first-bird'
          }

          const nextFrame = prev + 1;
          const nextElapsedTime = nextFrame * 5; // Cada frame dura 5 segundos

          setProgress(((nextFrame - 1) / (totalFrames - 1)) * 100); // Progresso a partir do 'first-bird'
          setElapsedTime(nextElapsedTime);

          if (nextFrame >= totalFrames) {
            setIsComplete(true);
            pause();
            return nextFrame; // Mantém no último frame 'fifth-bird'
          }

          return nextFrame;
        });
      }, frameDuration);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isComplete, frameDuration, totalFrames]);

  return {
    currentFrame,
    progress,
    elapsedTime,
    isPlaying,
    isComplete,
    play,
    pause,
    setCurrentFrame,
    setProgress,
    setElapsedTime,
  };
}
