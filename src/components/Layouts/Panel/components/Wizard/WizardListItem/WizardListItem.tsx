import { Icon } from '@/components/commons/Icon/Icon';

export type WizardListItemProps = {
  label: string;
};

export const WizardListItem = ({ label }: WizardListItemProps) => (
  <div className='flex items-start gap-4 pb-3 md:items-center'>
    <Icon name='check' className='h-7 w-7' />
    <p className='text-base leading-6 text-gray'>{label}</p>
  </div>
);
