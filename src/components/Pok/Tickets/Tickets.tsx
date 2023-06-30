import { Container } from '@/components/commons/Container';
import SearchUserDropdown from '@/components/commons/Form/Ui/SearchUserDropdown/SearchUserDropdown';
import { useTickets } from '@/components/Pok/Tickets/useTickets';
export const Tickets = () => {
  const { redirectToUser, t } = useTickets();

  return (
    <Container className='py-5'>
      <div className='my-8 flex flex-col gap-4 rounded-xs bg-cloud p-7 md:gap-0'>
        <div className='flex flex-col items-baseline justify-between gap-2 md:flex-row md:gap-0'>
          <p className='pb-2.5 text-md font-bold leading-8'>
            {t('pok.dashboard.searchCustomerHeadline')}
          </p>
          <p className='text-base font-normal leading-6 text-gray'>
            {t('pok.dashboard.searchEngineLabel')}
          </p>
        </div>
        <SearchUserDropdown
          name='searchUserDropdown'
          isClear
          handleChange={redirectToUser}
        />
      </div>
    </Container>
  );
};
