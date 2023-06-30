import { useEffect, useState } from 'react';

type BarProps = {
  animationDuration: number;
  progress: number;
  isFinished: boolean;
};

export const Bar = ({ animationDuration, progress, isFinished }: BarProps) => {
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    isFinished
      ? setTimeout(() => setPercent(0), 500)
      : setPercent(progress * 100);
  }, [isFinished, progress]);

  return (
    <div
      className='left-0 top-0 h-1 w-full bg-success'
      style={{
        width: `${percent}%`,
        transition: `width ${animationDuration}ms linear`,
        animation: isFinished ? `hideProgressBar 500ms forwards` : '',
      }}
    ></div>
  );
};
