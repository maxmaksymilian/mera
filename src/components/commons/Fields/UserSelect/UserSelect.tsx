import { useApiQuery } from '@/hooks/api/useApiQuery';

import { CustomSelectInput } from '@/components/commons/CustomSelectInput';

type UserSelectType = {
  className?: string;
  name: string;
  value: string;
  label?: string;
  error?: string;
  setFieldValue: (e: any) => void;
};

export const UserSelect = ({
  className,
  setFieldValue,
  name,
  label,
  value,
  error,
}: UserSelectType) => {
  const { data, status } = useApiQuery({ route: 'PROFILE_ALL_USERS' });

  return (
    <>
      {status === 'success' ? (
        <CustomSelectInput
          label={label}
          name={name}
          value={value}
          error={error}
          options={[
            ...data.map((user: any) => ({
              name: `${user.first_name} ${user.last_name}`,
              value: user.id,
            })),
          ]}
          placeholder='Użytkownik'
          handleChange={(value) => setFieldValue(value)}
          className={className}
        />
      ) : null}
    </>
  );
};
