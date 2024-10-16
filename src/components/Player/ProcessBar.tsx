import React from "react";

interface ProgressBarProps {
  progress: number;
  onChange: (value: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  onChange,
}) => (
  <input
    type="range"
    min={0}
    max={100}
    value={progress}
    onChange={(e) => onChange(Number(e.target.value))}
  />
);
