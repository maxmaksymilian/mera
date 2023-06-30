import { BreakpointsList } from '@/components/Layouts/Panel/components/BreakpointsList';

type CaseDetailsHeaderProps = {
  number: string;
  title: string;
};

const CaseDetailsHeader = ({ number, title }: CaseDetailsHeaderProps) => (
  <header className='border-cloud pt-8 pb-10 md:border-b'>
    <BreakpointsList
      breakpoints={[
        { children: 'dashboard', href: '/pok' },
        { children: 'casesList', href: '/pok/lista-spraw' },
        { children: number, dynamic: true },
      ]}
    />
    <h1 className='pb-2.5 text-md leading-8 text-black md:pb-0 md:text-lg md:font-normal md:leading-lg'>
      {number} - {title}
    </h1>
  </header>
);
export default CaseDetailsHeader;
