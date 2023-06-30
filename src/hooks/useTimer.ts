import { useEffect, useState } from 'react';

type useTimerType = {
  hours: number;
  minutes: number;
  seconds: number;
  isStoped: boolean;
};

export const useTimer = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  isStoped = true,
}: useTimerType) => {
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

  useEffect(() => {
    const tick = () => {
      if (mins === 0 && secs === 0) {
        setTime([hrs - 1, 59, 59]);
      } else if (secs === 0) {
        setTime([hrs, mins - 1, 59]);
      } else {
        setTime([hrs, mins, secs - 1]);
      }
    };
    if (hrs + mins + secs === 0 || isStoped) {
      return;
    }
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [hrs, mins, secs, isStoped]);

  return { hours: hrs, minutes: mins, seconds: secs };
};
