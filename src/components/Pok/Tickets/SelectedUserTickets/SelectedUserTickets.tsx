import { useRouter } from 'next/router';

import { Container } from '@/components/commons/Container';
import { OrderForm } from '@/components/Forms/Tickets/Order/OrderForm';
import { useSelectedUserTickets } from '@/components/Pok/Tickets/SelectedUserTickets/useSelectedUserTickets';

export type SelectedUserTicketsProps = {
  id: string;
};

export const SelectedUserTickets = ({ id }: SelectedUserTicketsProps) => {
  const { push } = useRouter();
  const { user, isFetched } = useSelectedUserTickets({ id });

  return (
    <Container className='py-5'>
      {isFetched && (
        <OrderForm
          {...{
            route: 'POK_ORDER_CREATE',
            params: { id: id },
            handleSubmit: ({ data }) =>
              push(`/pok/bilety/potwierdzenie-transakcji/${id}/${data.id}`),
            ticketsQuery: {
              route: 'POK_ORDER_TICKETS',
              params: { id: id },
            },
            access: 'admin',
            profileName: `${user.profile.first_name} ${
              user.profile.last_name
            }   ${user.profile.pesel === undefined ? '' : user.profile.pesel}`,
          }}
        />
      )}
    </Container>
  );
};
