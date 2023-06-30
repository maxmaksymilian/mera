import { useFormikContext } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, ComponentProps, useRef, useState } from 'react';

import { clsxm } from '@/lib';

import { useFormField } from '@/components/commons/Form/FormField';

type FileInputProps = {
  name: string;
  label?: string;
  className?: string;
} & ComponentProps<'input'>;

export const FileInput = ({ className, ...props }: FileInputProps) => {
  const { t } = useTranslation('form');
  const { name, label } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { childProps } = useFormField(props);
  const form = useFormikContext();

  const handleClick = () => {
    inputRef?.current?.click();
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
        setUploadError('format');
        return;
      }

      if (fileList.length > 3) {
        setUploadError('max');
        return;
      }

      if (fileList.some((file) => file.size > 1000000)) {
        setUploadError('maxSize');
        return;
      }

      setUploadError(null);
      form.setFieldValue(name, fileList);
    }
  };

  return (
    <div
      {...{
        className: clsxm('inline-flex flex-col', className),
      }}
    >
      <input
        {...{
          ...childProps,
          ref: inputRef,
          type: 'file',
          accept: 'application/pdf, image/png, image/jpg, image/jpeg',
          className: 'hidden',
          onChange: handleFileChange,
        }}
      />
      <div>
        <button
          className='my-2.5 cursor-pointer text-base font-bold leading-6 text-navy md:my-0'
          onClick={handleClick}
          type='button'
        >
          + {t(`label.${label}`)}
        </button>
      </div>
      {uploadError ? (
        <p className='py-2 text-center text-base leading-4 text-error'>
          {t(`validation.file.${uploadError}`)}
        </p>
      ) : null}
    </div>
  );
};
