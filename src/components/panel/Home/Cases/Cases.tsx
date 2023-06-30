import { Link } from '@/components/commons/Link';
import { Status } from '@/components/commons/Status';

export type CasesProps = {
  id: string;
  title: string;
  number: string;
  status: string;
  isCustomerService?: boolean;
  user?: {
    id: string;
  };
};

export const Cases = ({
  id,
  title,
  number,
  status,
  user,
  isCustomerService,
}: CasesProps) => (
  <div className='flex w-full pt-4'>
    <p className='min-w-[50px] pb-2 text-navy'>
      <Link
        href={
          isCustomerService
            ? `/pok/lista-spraw/${user ? user.id : ''}/${id}`
            : `/panel/sprawy/${id}`
        }
      >
        {number}
      </Link>
    </p>
    <div className='flex w-full justify-between'>
      <p className='block max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap pl-7'>
        {title}
      </p>
      <Status value={status} className='min-w-fit pl-2 text-sm' />
    </div>
  </div>
);
