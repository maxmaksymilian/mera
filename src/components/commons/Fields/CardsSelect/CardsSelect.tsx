import { useApiQuery } from '@/hooks/api/useApiQuery';

import { CustomSelectInput } from '@/components/commons/CustomSelectInput';

type CardsSelectType = {
  className?: string;
  name: string;
  error?: string;
  label?: string;
  value?: string;
  setFieldValue: (e: any) => void;
};

export const CardsSelect = ({
  className,
  setFieldValue,
  name,
  error,
  label,
  value,
}: CardsSelectType) => {
  const { data, status } = useApiQuery({ route: 'PROFILE_MY_CARDS' });

  return (
    <>
      {status === 'success' ? (
        <CustomSelectInput
          label={label}
          name={name}
          value={value}
          options={[
            ...data.map((card: any) => ({
              name: card.name,
              value: card.id,
            })),
          ]}
          error={error}
          placeholder='Karta'
          handleChange={(value) => setFieldValue(value)}
          className={className}
        />
      ) : null}
    </>
  );
};
