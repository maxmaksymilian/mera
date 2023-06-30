import { ValidationSchemaType } from '@/lib/validation';

import { Button } from '@/components/commons/Button';
import { Icon } from '@/components/commons/Icon/Icon';
import { Link } from '@/components/commons/Link';
import { Modal } from '@/components/commons/Modal/Modal';
import { Layout } from '@/components/Layouts/Panel/Layout';
import { List } from '@/components/panel/Home/Ticket/List';
import { myUsersEditValidationSchema } from '@/components/Pok/Users/Single/MyUsers/UserDetails/Modals/EditModal/EditModalModel';

import { MyUserCard } from './MyUserCard';
import { modals } from './MyUsersDetailsModel';
import { useMyUsersDetails } from './useMyUsersDetails';

export type MyUsersDetailsProps = {
  id: string;
};

type ComponentProps = {
  id: string;
  first_name: string;
  last_name: string;
  values?: ValidationSchemaType<typeof myUsersEditValidationSchema>;
  handleClose: () => void;
  handleRefresh?: () => void;
};

export const MyUsersDetails = ({ id }: MyUsersDetailsProps) => {
  const {
    activeModal,
    data,
    isLoading,
    isOpen,
    status,
    handleClose,
    handleModalOpen,
    handleRefresh,
    t,
  } = useMyUsersDetails({ id });

  const Component = modals[activeModal];

  return (
    <Layout
      {...{
        variant: 'client',
        title:
          status === 'success'
            ? `${data.user.first_name} ${data.user.last_name} - Szczegóły konta`
            : '',
        link: {
          href: '/panel/moi-uzytkownicy',
          children: 'Wróć do listy użytkowników',
        },
        dynamic: { status, isLoading },
      }}
    >
      <>
        {status === 'success' ? (
          <>
            <div className='my-9 flex max-w-screen-lg flex-col items-center gap-4 rounded-xs bg-lightgray bg-opacity-20 p-8 md:my-0 md:flex-row md:gap-8'>
              <Icon name='info' />
              <div className='flex w-full flex-col items-center justify-between gap-4 md:w-[calc(100%_-_89px)] md:flex-row md:gap-0'>
                <div className='flex-col gap-2'>
                  <p className='text-base font-bold md:text-2xl'>
                    {t('independentAccHeadline')}
                  </p>
                  <p className='pt-4 text-sm text-gray md:pt-0 md:text-base'>
                    {t('independentAccInfo')}
                  </p>
                </div>
                <Button
                  className='text-sm md:text-base'
                  handleClick={() => handleModalOpen('convert')}
                >
                  {t('buttonConvertAccount')}
                </Button>
              </div>
            </div>
            {status === 'success' && (
              <>
                <div className='flex flex-col gap-4 rounded-xs pb-5 md:flex-row md:gap-8'>
                  <div className='md:w-1/2'>
                    <div className='rounded-xs border-b border-cloud p-0 px-9 md:border md:p-8 md:px-0'>
                      <div className='flex justify-between'>
                        <p className='text-base font-bold md:ml-9 md:text-2xl'>
                          {t('userData')}
                        </p>
                        <Button
                          handleClick={() => handleModalOpen('edit')}
                          className='-mt-3 hidden md:block'
                          variant='quaternary'
                        >
                          {t('editData')}
                        </Button>
                      </div>
                      <div className='-ml-0 mb-5 md:mb-0 md:-ml-[107px]'>
                        <MyUserCard {...{ ...data.user, isStepThree: true }} />
                        <Button
                          handleClick={() => handleModalOpen('edit')}
                          className='block md:hidden'
                          fullWidth
                          variant='secondary'
                        >
                          {t('editData')}
                        </Button>
                      </div>
                    </div>
                    <div className='mt-5 hidden rounded-xs border-y border-cloud p-8 md:block md:border'>
                      <p className='mb-5 text-2xl font-bold '>
                        {t('deleteAcc')}
                      </p>
                      <Button handleClick={() => handleModalOpen('delete')}>
                        {t('deleteAcc')}
                      </Button>
                    </div>
                  </div>
                  <div className='min-w-[50%] gap-8 md:grid'>
                    <div className='rounded-xs border-b border-cloud py-5 px-9 sm:p-8 md:border'>
                      <div className='flex justify-between'>
                        <p className='inline-block text-base font-bold md:text-2xl'>
                          {t('wallet')}
                        </p>
                      </div>
                      <p className='mt-7 text-gray lg:mt-0'>
                        {t('accBalance')}
                        <em className='pl-5 font-bold text-black'>
                          {data.wallet.points} pkt ( {data.wallet.price} zł)
                        </em>
                      </p>
                      <div className='mt-6 grid lg:-mt-12 lg:flex lg:justify-end'>
                        <Button handleClick={() => handleModalOpen('wallet')}>
                          {t('reachargeAcc')}
                        </Button>
                      </div>
                    </div>
                    <div className='rounded-xs border-y border-cloud py-5 px-9 sm:p-8 md:w-full md:border'>
                      <div className='flex justify-between'>
                        <p className='text-base font-bold md:text-2xl'>
                          {t('activeTicket')}
                        </p>
                        <Link
                          className='hidden md:block'
                          href='/panel/moje-bilety'
                        >
                          <p className='font-bold text-navy'>{t('seeAll')}</p>
                        </Link>
                      </div>
                      <List tickets={data.tickets} />
                      <Link href='/panel/moje-bilety'>
                        <p className='hidden py-8 text-center font-bold text-navy'>
                          {t('seeAll')}
                        </p>
                      </Link>
                      {data.card?.id ? (
                        <div className='hidden pt-14 md:flex'>
                          <Link
                            href={`/panel/moje-bilety/zamowienie?cardid=${data.card.id}`}
                          >
                            <Button>{t('buttonBuyTicket')}</Button>
                          </Link>
                        </div>
                      ) : null}
                    </div>
                    <div className='mt-5 block rounded-xs border-none border-cloud p-0 px-9 md:hidden md:border md:p-8'>
                      <p className='mb-5 font-bold'>{t('deleteAcc')}</p>
                      <Button
                        fullWidth
                        variant='secondary'
                        handleClick={() => handleModalOpen('delete')}
                      >
                        {t('deleteAcc')}
                      </Button>
                    </div>
                  </div>
                </div>
                <Modal
                  {...{
                    isOpen,
                    handleClose,
                  }}
                  className='mt-0 w-full pt-8 md:-mt-14 md:w-3/6 md:px-5 md:py-2.5'
                >
                  <Component
                    {...{
                      id,
                      first_name: data.user.first_name,
                      last_name: data.user.last_name,
                      handleClose,
                      handleRefresh,
                      values: {
                        ...data.user,
                        telephone: data.user.telephone.telephone,
                        telephone_prefix: data.user.telephone.prefix,
                      },
                    }}
                  />
                </Modal>
              </>
            )}
          </>
        ) : null}
      </>
    </Layout>
  );
};
