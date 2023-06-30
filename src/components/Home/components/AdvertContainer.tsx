import { Icon } from '@/components/commons/Icon/Icon';

export type AdvertContainerProps = {
  title: string;
  content: string;
};

export const AdvertContainer = ({ content, title }: AdvertContainerProps) => (
  <div className='mt-10 flex min-w-full flex-col justify-between gap-6 rounded-2xl bg-cloud p-8 md:flex-row md:items-center md:p-12'>
    <div>
      <div className='flex items-center gap-x-4 pb-5 md:pb-2.5'>
        <Icon name='info' className='h-10 w-10' />
        <h2 className='text-md font-bold leading-8'>{title}</h2>
      </div>
      <p className='text-base leading-6 text-gray'>{content}</p>
    </div>
  </div>
);
