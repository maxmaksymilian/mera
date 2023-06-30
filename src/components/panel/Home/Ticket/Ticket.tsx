import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';
import { checkExpiration, convertDate } from '@/lib/helpers';

import { Icon } from '@/components/commons/Icon/Icon';

export type ProfileType = {
  profile: ProfileTypes;
};

export type ProfileTypes = {
  first_name: string;
  last_name: string;
};

export type TicketProps = {
  user: ProfileType;
  end_date: string;
  name: string;
};

export const Ticket = ({ user, end_date, name }: TicketProps) => {
  const { t } = useTranslation('common');
  return (
    <div className='w-full pt-6'>
      <p className='pb-2 text-gray'>
        {user.profile.first_name} {user.profile.last_name}
      </p>
      <div className='flex'>
        <Icon name='ticket' />
        <div className='pl-5'>
          <p className='font-bold'>{name}</p>
          <p className='text-gray'>
            {t('expDate')}:
            <em
              className={clsxm(
                'pl-4 text-success',
                checkExpiration(end_date) && 'text-error'
              )}
            >
              {convertDate(end_date)}
            </em>
          </p>
        </div>
      </div>
    </div>
  );
};
