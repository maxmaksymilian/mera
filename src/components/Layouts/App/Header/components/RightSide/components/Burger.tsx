import { Icon } from '@/components/commons/Icon/Icon';
import { ToggleBurgerType } from '@/components/Layouts/App/Header/@types/HeaderType';

export const Burger = ({ isOpen, setOpen }: ToggleBurgerType) => (
  <button className='text-gray-700 rounded-md p-2 md:hidden' onClick={setOpen}>
    {isOpen ? <Icon name='close' /> : <Icon name='burger' />}
  </button>
);
