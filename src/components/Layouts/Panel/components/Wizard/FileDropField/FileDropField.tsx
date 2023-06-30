import { shortenFileName } from '@/lib/helpers';

import { DragDropFileInput } from '@/components/commons/Fields/DragDropFileInput';
import { Icon } from '@/components/commons/Icon/Icon';

export type FileDropFieldProps = {
  name: string;
  headline: string;
  value: File | null;
  error?: string;
  setFieldValue: (
    field: string,
    value: File | null,
    shouldValidate?: boolean | undefined
  ) => void;
};

export const FileDropField = ({
  value,
  error,
  name,
  headline,
  setFieldValue,
}: FileDropFieldProps) => {
  const handleUpload = (name: string, file: File) => {
    const mimeTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    const { size, type } = file;

    if (size > 1000000) return;
    if (!mimeTypes.includes(type)) return;

    setFieldValue(name, file);
  };

  const removeFile = () => {
    if (value) {
      setFieldValue(name, null);
    }
  };

  return (
    <div className='upload-item w-full py-4 md:flex-1'>
      <p className='pb-1.5'>{headline}</p>
      <DragDropFileInput
        name={name}
        handleUpload={handleUpload}
        isFile={value ? true : false}
      />
      {error && <span className='text-xs leading-4 text-error'>{error}</span>}
      {value ? (
        <div className='flex max-w-xxs items-center justify-between pt-1.5 text-base leading-6 text-gray'>
          <span className='whitespace-pre-wrap lowercase'>
            {shortenFileName(value.name)}
          </span>
          <button className='pl-2.5' onClick={removeFile}>
            <Icon name='close-modal' className='w-3 fill-current text-error' />
          </button>
        </div>
      ) : null}
    </div>
  );
};
