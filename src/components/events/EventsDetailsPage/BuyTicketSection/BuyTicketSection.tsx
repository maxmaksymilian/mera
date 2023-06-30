import { Button } from '@/components/commons/Button';
import { TicketBar } from '@/components/events/components/TicketBar/TicketBar';

export type BuyTicketSectionProps = {
  id: string;
  name: string;
  amount: number;
  price: number;
  validity: number;
  desc: string;
  ticketType?: string;
  toggleTicketAmount: (id: string, actionType: 'dec' | 'inc') => void;
};

export const BuyTicketSection = ({
  id,
  name,
  amount,
  price,
  toggleTicketAmount,
}: BuyTicketSectionProps) => (
  <div className='py-5 md:flex md:items-start md:justify-between md:gap-10'>
    <TicketBar {...{ name, price }} />
    <div className='amount flex gap-2.5 py-5 md:w-52 md:gap-0'>
      <Button
        variant='disabled'
        className='flex h-10 w-10 items-center justify-center text-2xl font-bold text-navy'
        handleClick={() => toggleTicketAmount(id, 'dec')}
      >
        -
      </Button>
      <div className='flex w-full items-center  justify-center border border-cloud text-base font-bold leading-6 text-navy md:h-10'>
        {amount}
      </div>
      <Button
        variant='disabled'
        className='flex h-10 w-10 items-center justify-center text-2xl font-bold text-navy'
        handleClick={() => toggleTicketAmount(id, 'inc')}
      >
        +
      </Button>
    </div>
  </div>
);
