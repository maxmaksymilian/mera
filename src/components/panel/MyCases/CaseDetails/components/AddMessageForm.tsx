import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, useRef, useState } from 'react';

import { addMessageFormValidation } from '@/lib/validationSchema/cases';
import { useApiMutation } from '@/hooks/api/useApiMutation';

import { Button } from '@/components/commons/Button';
import { FileInfoComponent } from '@/components/commons/FileInfoComponent';
import { Icon } from '@/components/commons/Icon/Icon';
import { Spinner } from '@/components/commons/Spinner';

type AddMessageFormType = {
  id: string;
  token: string;
  handleRefresh: () => void;
  isCustomerService?: boolean;
};

export const AddMessageForm = ({
  id,
  token,
  isCustomerService,
  handleRefresh,
}: AddMessageFormType) => {
  const { t } = useTranslation('common');

  const { query } = useRouter();

  const userId: string | undefined =
    typeof query?.userid === 'string' ? query.userid : '';

  const { mutate } = useApiMutation({
    route: isCustomerService
      ? 'POK_CORRESPONDENCE'
      : 'PROFILE_MY_CASES_CORRESPONDENCE',
    method: 'POST',
    params: { id, userId },
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      message: '',
      file: [],
    },
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: addMessageFormValidation,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      mutate(
        { ...values, token },
        {
          onSuccess: ({ error, errors }) => {
            if (error || errors) {
              return setLoading(false);
            }
            setLoading(false);
            handleRefresh();
            resetForm();
          },
        }
      );
    },
  });

  const handleClick = () => {
    inputRef?.current?.click();
  };

  const handleFileRemove = (name: string) => {
    const tempArr = values.file.filter((file: File) => file.name !== name);
    setFieldValue('file', tempArr);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const allowedExtensions = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'application/pdf',
    ];

    const fileList = e.target.files ? [...e.target.files] : null;

    if (fileList) {
      const areFilesInvalidType = fileList.some(
        (file) => !allowedExtensions.includes(file.type)
      );

      if (areFilesInvalidType) {
        setUploadError('Dozwolony format plików: .png, .pdf, .jpg');
        return;
      }

      if (fileList.length > 3) {
        setUploadError('Maksymalna liczba plików: 3');
        return;
      }

      if (fileList.some((file) => file.size > 1000000)) {
        setUploadError('Maksymalna waga jednego pliku to 1MB');
        return;
      }

      setUploadError(null);
      setFieldValue('file', fileList);
    }
  };

  return (
    <div className='py-5'>
      <form id='add-message-form' onSubmit={handleSubmit}>
        <div className='flex flex-col justify-between border border-cloud md:flex-row'>
          <textarea
            name='message'
            placeholder={t('enterMsg')}
            className='w-full max-w-4xl resize-none border-none'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
          />
          <div className='flex items-center gap-2.5 p-4 md:justify-end'>
            <input
              ref={inputRef}
              type='file'
              name='file-upload'
              id='file-upload'
              className='hidden'
              accept='application/pdf, image/png, image/jpg, image/jpeg'
              multiple
              onChange={handleFileChange}
            />
            <Button handleClick={handleClick}>
              <Icon name='clip' />
            </Button>
            <Button type='submit'>
              {' '}
              {isLoading ? <Spinner /> : 'Wyślij wiadomość'}
            </Button>
          </div>
        </div>
        {errors.message && (
          <p className='py-2 text-left text-base leading-4 text-error'>
            {errors.message}
          </p>
        )}
      </form>
      <p className='mt-2.5 text-center text-base italic leading-6 text-gray md:mt-0 md:text-right'>
        {t('allowFormat')}
      </p>
      {uploadError && (
        <p className='py-2 text-center text-base leading-4 text-error'>
          {uploadError}
        </p>
      )}
      <div className='uploaded-files'>
        {values.file.map((fileItem: File, index) => (
          <FileInfoComponent
            key={index}
            fileName={fileItem.name}
            fileSize={Number(fileItem.size)}
            fileType={fileItem.type.split('/')[1]}
            handleFileRemove={() => handleFileRemove(fileItem.name)}
          />
        ))}
      </div>
    </div>
  );
};
