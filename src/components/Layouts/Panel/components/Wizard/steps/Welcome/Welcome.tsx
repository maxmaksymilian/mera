import useTranslation from 'next-translate/useTranslation';

import { WizardListItem } from '@/components/Layouts/Panel/components/Wizard';
import { welcomeListItems } from '@/components/Layouts/Panel/components/Wizard/const';

export const Welcome = () => {
  const { t } = useTranslation('wizard');
  return (
    <div className='w-full'>
      <div className='pt-7'>
        {welcomeListItems.map((item, index) => (
          <WizardListItem key={item} label={t(`welcomeListItems.${index}`)} />
        ))}
      </div>
    </div>
  );
};
