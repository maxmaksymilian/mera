import useTranslation from 'next-translate/useTranslation';

type UseExpirationDateInput = {
  name: string;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
};

export const useExpirationDateInput = ({
  name,
  setFieldValue,
}: UseExpirationDateInput) => {
  const { t } = useTranslation('common');

  const handleExpirationDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^\d]/g, '');
    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2);
    }
    setFieldValue(name, inputValue);
  };

  return { t, handleExpirationDateChange };
};
