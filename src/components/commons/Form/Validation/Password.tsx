import { useFormikContext } from 'formik';

type PasswordValidationProps = {
  name: string;
};

export const isLengthEnough = (value: string) => value.length >= 8;
export const isValueContainsUppercase = (value: string) => /[A-Z]/.test(value);
export const isValueContainsLowercase = (value: string) => /[a-z]/.test(value);
export const isValueContainsSpecialCharacter = (value: string) =>
  /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value);
export const isValidPassword = (value: string) =>
  isLengthEnough(value) &&
  isValueContainsUppercase(value) &&
  isValueContainsLowercase(value) &&
  isValueContainsSpecialCharacter(value);

export const PasswordValidation = ({ name }: PasswordValidationProps) => {
  const form = useFormikContext();
  const { value } = form.getFieldMeta<
    string | number | readonly string[] | undefined
  >(name);
  const password = value ? value?.toString() : '';

  return (
    <div className='w-full flex flex-col gap-6'>
      <p>Wymagania bezpieczeństwa hasła:</p>
      <div className='flex flex-col gap-2.5'>
        <div className='flex items-center gap-2'>
          <div
            className={`w-6 h-6 rounded-3xl ${
              isLengthEnough(password) ? 'bg-success' : 'bg-error'
            }`}
          />
          <p className='text-gray'>Minimalnie 8 znaków</p>
        </div>
        <div className='flex items-center gap-2'>
          <div
            className={`w-6 h-6 rounded-3xl ${
              isValueContainsUppercase(password) ? 'bg-success' : 'bg-error'
            }`}
          />
          <p className='text-gray'>Wielka litera</p>
        </div>
        <div className='flex items-center gap-2'>
          <div
            className={`w-6 h-6 rounded-3xl ${
              isValueContainsLowercase(password) ? 'bg-success' : 'bg-error'
            }`}
          />
          <p className='text-gray'>Mała litera</p>
        </div>
        <div className='flex items-center gap-2'>
          <div
            className={`w-6 h-6 rounded-3xl ${
              isValueContainsSpecialCharacter(password)
                ? 'bg-success'
                : 'bg-error'
            }`}
          />
          <p className='text-gray'>Znak specjalny</p>
        </div>
      </div>
    </div>
  );
};
