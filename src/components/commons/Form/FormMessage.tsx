import useTranslation from 'next-translate/useTranslation';

import { GetErrorMessageProps, useMessage } from '@/hooks/useMessage';

export type FormMessageProps = {
  content?: string | null;
  type: 'success' | 'error';
} & GetErrorMessageProps;

export const FormMessage = ({ content, type, ...props }: FormMessageProps) => {
  const { t } = useTranslation('form');
  const { getErrorMessage } = useMessage('form');

  if (!content && !props.params) {
    return null;
  }

  return (
    <div
      className={`my-2 w-full rounded-xs bg-opacity-20 py-8 px-6 bg-${type} first-letter:capitalize`}
    >
      {typeof content === 'string'
        ? t(`validation.${content}`)
        : getErrorMessage({ ...props })}
    </div>
  );
};
