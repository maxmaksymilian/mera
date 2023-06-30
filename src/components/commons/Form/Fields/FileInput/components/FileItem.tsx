import { FormikHelpers, FormikValues, useFormikContext } from 'formik';

import { clsxm } from '@/lib';
import { shortenFileName } from '@/lib/helpers';

import { Icon } from '@/components/commons/Icon/Icon';

export type FileItemProps = {
  item: File;
  id?: string;
  isRemovable?: boolean;
};

export const FileItem = ({ item, id, isRemovable }: FileItemProps) => {
  const { name, type, size } = item;
  const form: {
    values: { [key: string]: File[] };
  } & FormikHelpers<FormikValues> = useFormikContext();
  const values: File[] = id ? form.values[id] : [];

  const convertedType = type.split('/')[1];

  const handleFileRemove = () => {
    form.setFieldValue(
      id || '',
      values.filter((soloFile: File) => soloFile.name !== name)
    );
  };

  return (
    <div className='my-1 flex items-start gap-2.5'>
      <div
        className={clsxm(
          'flex h-8 w-8 items-center justify-center ',
          convertedType === 'pdf' && 'bg-[#F15642]',
          (convertedType === 'jpg' || convertedType === 'jpeg') &&
            'bg-[#50BEE8]',
          convertedType === 'png' && 'bg-[#A066A9]'
        )}
      >
        <span className='text-xs font-bold uppercase text-white'>
          {convertedType}
        </span>
      </div>
      <div>
        <p className='text-sm font-normal leading-4 text-gray'>
          {shortenFileName(name)}
        </p>
        <p className='text-xs text-gray'>{(size / 1000).toFixed()} kB</p>
      </div>
      {isRemovable && (
        <button onClick={handleFileRemove}>
          <Icon name='trash' className='h-6 w-5 object-cover' />
        </button>
      )}
    </div>
  );
};
