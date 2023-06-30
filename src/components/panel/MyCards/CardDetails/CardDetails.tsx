import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useApiQuery } from '@/hooks/api/useApiQuery';

import { Modal } from '@/components/commons/Modal/Modal';
import { Layout } from '@/components/Layouts/Panel/Layout';
import { Card } from '@/components/panel/MyCards/MyCardsContent/Card/Card';

import { ActiveTicketsSection } from './ActiveTicketsSection/ActiveTicketsSection';
import { EditCardModalContent } from './EditCardModalContent/EditCardModalContent';
import { TransactionHistorySection } from './TransactionHistorySection/TransactionHistorySection';

//TODO Refactor

export const CardDetails = ({ id }: { id: string }) => {
  const { t } = useTranslation('common');
  const { data, status, isLoading, refetch } = useApiQuery({
    route: 'PROFILE_MY_CARDS',
    id,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Layout
        {...{
          variant: 'client',
          title:
            status === 'success'
              ? `${data.card.name} ${
                  data.card.user
                    ? `- ${data.card.user.profile.first_name} ${data.card.user.profile.last_name}`
                    : ''
                }`
              : '',
          link: {
            href: '/panel/moje-karty',
            children: t('backCardList'),
          },
          button: {
            href: '/panel/moje-bilety/zamowienie',
            children: t('buttonBuyTicket'),
          },
          hideOnMobile: { title: true, subTitle: true, button: true },
          dynamic: { status, isLoading },
        }}
      >
        <>
          {status === 'success' ? (
            <>
              <div className='flex flex-col gap-8 pt-12 md:flex-row md:pt-0'>
                <Card
                  {...data.card}
                  handleClick={() => setIsOpen(true)}
                  isDetails
                />
                {isOpen ? (
                  <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                    <EditCardModalContent
                      {...{
                        route: 'PROFILE_MY_CARDS',
                        method: 'PUT',
                        oldValues: {
                          ...data.card,
                          user: data.card.user ? data.card.user.id : '',
                        },
                        buttonLabel: 'saveChanges',
                        handleSubmit: () => {
                          refetch();
                          setIsOpen(false);
                        },
                        handleClose: () => setIsOpen(false),
                      }}
                    />
                  </Modal>
                ) : null}
                <ActiveTicketsSection {...{ id }} />
              </div>
              <TransactionHistorySection {...{ id }} />
            </>
          ) : null}
        </>
      </Layout>
    </>
  );
};
