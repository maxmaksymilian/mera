import { useNProgress } from '@tanem/react-nprogress';
import { Options } from '@tanem/react-nprogress/dist/types';

import { Bar } from './components/Bar';
import { Container } from './components/Container';

export const ProgressBar = ({ isAnimating }: Pick<Options, 'isAnimating'>) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container>
      <Bar {...{ animationDuration, progress, isFinished }} />
    </Container>
  );
};
