import { Icon } from '@/components/commons/Icon/Icon';
import { Link } from '@/components/commons/Link';

type UserInfoProps = {
  isClient: boolean;
};

export const UserInfo = ({ isClient }: UserInfoProps) => (
  <div className='flex items-center gap-6'>
    {isClient ? (
      <Link href='/panel/portmonetka'>
        <Icon name='wallet' />
      </Link>
    ) : null}
    <Link href={isClient ? '/panel/sprawy' : '/pok'}>
      <Icon name='chat' />
    </Link>
  </div>
);
