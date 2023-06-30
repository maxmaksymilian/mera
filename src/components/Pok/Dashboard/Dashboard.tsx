import { useAuth } from '@/hooks/useAuth';

import { Container } from '@/components/commons/Container';
import SearchUserDropdown from '@/components/commons/Form/Ui/SearchUserDropdown/SearchUserDropdown';

import { CasesList } from './components/CasesList/CasesList';
import { useDashboard } from './useDashboard';

export const Dashboard = () => {
  const { hasAccess } = useAuth();
  const { profile, redirectToUser, t } = useDashboard();

  return (
    <Container className='py-36'>
      <h1 className='text-primary text-2xl font-normal md:text-lg'>
        {t('header.common.welcomeLabel')} {profile ? profile?.first_name : ''}!
      </h1>
      <p className='mt-2 text-gray md:mt-4'>{t('subTitleWhatToday')}</p>
      <div className='pt-5 pb-20'>
        {hasAccess('customer.customer') ? (
          <div className='flex flex-col gap-4 rounded-xs bg-cloud p-7 md:gap-0'>
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
              handleChange={redirectToUser}
              isClear
            />
          </div>
        ) : null}
        {hasAccess('cases.case_list') ? <CasesList /> : null}
      </div>
    </Container>
  );
};
