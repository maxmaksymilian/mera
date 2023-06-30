import { useApiQuery } from '@/hooks/api/useApiQuery';
import { useFileDownload } from '@/hooks/useFileDownload';

import { SummaryProps } from './Summary';

export const useSummary = ({ orderId, id, access }: SummaryProps) => {
  const { data, status, isLoading } = useApiQuery({
    route: `${
      access === 'admin' ? 'POK_TICKETS_ORDER' : 'PROFILE_MY_TICKETS_ORDER'
    }`,
    params: {
      orderId,
      id: id || '',
    },
  });

  const { getFile } = useFileDownload({
    route: `${
      access === 'admin' ? 'POK_MY_TICKETS_PDF' : 'PROFILE_MY_TICKETS_PDF'
    }`,
    params: { orderId: orderId, id: id || '' },
  });

  const isSuccess = data?.status === 'completed';

  return { data, status, isSuccess, isLoading, getFile };
};
