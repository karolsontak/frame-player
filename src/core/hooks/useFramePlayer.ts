import { useEffect, useRef, useState } from "react";

export function useFramePlayer(frames: string[], fps: number) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalFrames = frames.length - 1; 
  const frameDuration = 1000 / fps; 
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const play = () => {
    if (isComplete) {
      setCurrentFrame(0); 
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
            setElapsedTime(5); 
            setProgress(0); 
            return 1; 
          }

          const nextFrame = prev + 1;
          const nextElapsedTime = nextFrame * 5;

          setProgress(((nextFrame - 1) / (totalFrames - 1)) * 100); 
          setElapsedTime(nextElapsedTime);

          if (nextFrame >= totalFrames) {
            setIsComplete(true);
            pause();
            return nextFrame; 
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
