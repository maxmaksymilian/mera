import useTranslation from 'next-translate/useTranslation';

import { clsxm } from '@/lib';
import { Without } from '@/lib/api';

import { Button, ButtonProps } from '@/components/commons/Button';
import { Spinner } from '@/components/commons/Spinner';

type InputProps = {
  label: string;
  loading?: boolean;
} & Without<ButtonProps, 'children'>;

export const SubmitButton = ({
  label,
  loading,
  className,
  ...props
}: InputProps) => {
  const { t } = useTranslation('form');

  return (
    <Button
      type='submit'
      className={clsxm('mt-3 text-sm md:mt-0 md:text-base', className)}
      {...props}
    >
      {loading ? <Spinner /> : t(`button.${label}`)}
    </Button>
  );
};
