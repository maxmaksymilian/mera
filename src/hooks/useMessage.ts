import useTranslation from 'next-translate/useTranslation';

export type GetErrorMessageProps = {
  prefix?: string;
  params?: { [key: string]: string };
};

export const useMessage = (space: string) => {
  const { t } = useTranslation(space || 'form');

  const getErrorMessage = ({ params, prefix }: GetErrorMessageProps) => {
    if (!params) {
      return '';
    }

    const data = Object.entries(params)[0];

    if (!data) {
      return '';
    }

    const content = t(`validation.${data[1][0]}`);

    const error = data[0]
      .replaceAll(/.0|.1|.2|.3|.4|.5|.6|.7|.8|.9/g, '')
      .replaceAll(/[0-9]/g, '');

    return content.replaceAll(
      `:attribute`,
      t(prefix ? `validation.label.${prefix}.${error}` : error)
    );
  };

  return { getErrorMessage };
};
