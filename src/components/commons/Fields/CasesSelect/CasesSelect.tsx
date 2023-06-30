import { useApiQuery } from '@/hooks/api/useApiQuery';

import { CustomSelectInput } from '@/components/commons/CustomSelectInput';

type CasesSelectType = {
  className?: string;
  name: string;
  label?: string;
  setFieldValue: (e: any) => void;
};

export const CasesSelect = ({
  className,
  setFieldValue,
  name,
  label,
}: CasesSelectType) => {
  const { data, status } = useApiQuery({ route: 'PROFILE_MY_CASES' });

  return (
    <>
      {status === 'success' ? (
        <CustomSelectInput
          label={label}
          name={name}
          options={[
            { name: 'Rodzaj sprawy', value: '' },
            ...data.result.map((card: any) => ({
              name: card.name,
              value: card.id,
            })),
          ]}
          placeholder='Rodzaj sprawy'
          handleChange={(value) => setFieldValue(value)}
          className={className}
        />
      ) : null}
    </>
  );
};
