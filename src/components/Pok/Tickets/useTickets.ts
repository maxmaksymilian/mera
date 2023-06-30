import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { Customer } from '@/components/commons/Form/Ui/SearchUserDropdown/SearchUserDropdown';

export const useTickets = () => {
  const { push } = useRouter();
  const { t } = useTranslation('common');

  const redirectToUser = (data: Customer | null) => {
    if (data === null) {
      return;
    }
    push(`/pok/bilety/${data.id}`);
  };

  return { redirectToUser, t };
};
