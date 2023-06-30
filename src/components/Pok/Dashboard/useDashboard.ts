import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { useAppStore } from '@/lib';

import { Customer } from '@/components/commons/Form/Ui/SearchUserDropdown/SearchUserDropdown';

export const useDashboard = () => {
  const { push } = useRouter();
  const { t } = useTranslation('common');
  const {
    personalData: { profile },
  } = useAppStore();

  const redirectToUser = (data: Customer | null) => {
    if (data === null) {
      return;
    }
    push(
      data.type === 'main'
        ? `/pok/baza-klientow/${data.id}/dane-klienta`
        : `/pok/baza-klientow/${data.parent.id}/uzytkownicy/${data.id}`
    );
  };

  return { profile, redirectToUser, t };
};
