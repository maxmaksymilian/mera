import dynamic from 'next/dynamic';

export type LayoutProps = { children?: React.ReactNode };

const DynamicHeader = dynamic(
  () => import('@/components/Layouts/App/Header/Header').then((m) => m.Header),
  {
    ssr: false,
  }
);

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <DynamicHeader />
      {children}
    </>
  );
};
