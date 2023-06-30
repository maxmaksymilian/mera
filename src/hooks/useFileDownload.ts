import { Without } from '@/lib/api';

import {
  useApiMutation,
  UseApiMutationProps,
  ValueType,
} from './api/useApiMutation';

type DownloadFileRoutes =
  | 'TRANSACTION_DOWNLOAD_PDF'
  | 'POK_TRANSACTION_DOWNLOAD_PDF'
  | 'TRANSACTION_LIST_DOWNLOAD_PDF'
  | 'PROFILE_MY_TICKETS_PDF'
  | 'POK_MY_TICKETS_PDF'
  | 'EVENT_DOWNLOAD_PDF'
  | 'EVENT_DOWNLOAD_PDF'
  | 'POK_REPORTS_EXPORT';

type UseFileDownloadProps = {
  route: DownloadFileRoutes;
} & Omit<Without<UseApiMutationProps, 'method' | 'getFile'>, 'route'>;

type GetFileProps = {
  values?: ValueType;
  filename?: string;
  extension?: string;
};

export const useFileDownload = (props: UseFileDownloadProps) => {
  const { mutate } = useApiMutation({
    ...props,
    method: 'GET',
    getFile: true,
  });

  const getFile = ({ values, filename, extension = 'pdf' }: GetFileProps) =>
    mutate(values || {}, {
      onSuccess: ({ data }) => {
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename || 'plik'}.${extension}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      },
    });

  return { getFile };
};
