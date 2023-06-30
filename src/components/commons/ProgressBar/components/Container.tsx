import { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => (
  <div className='pointer-events-none fixed top-0 left-0 z-50 h-1 w-full'>
    {children}
  </div>
);
