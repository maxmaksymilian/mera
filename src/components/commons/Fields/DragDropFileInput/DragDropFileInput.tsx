import { DragEvent, useRef, useState } from 'react';

import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';

export type DragFileInputProps = {
  name: string;
  isFile: boolean;
  handleUpload: (name: string, file: File) => void;
};

export const DragDropFileInput = ({
  name,
  isFile,
  handleUpload,
}: DragFileInputProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = function (e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      //
    }
  };

  return (
    <div
      id={`form-file-upload-${name}`}
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      className='relative h-16 w-full max-w-full cursor-pointer text-center md:w-48'
    >
      <input
        id={`input-file-upload-${name}`}
        className='hidden'
        type='file'
        name={name}
        multiple={true}
        ref={inputRef}
        onChange={(e) => {
          if (e.currentTarget.files?.[0]) {
            const file = e.currentTarget.files[0];
            handleUpload(name, file);
          }
        }}
      />
      <label
        htmlFor={`input-file-upload-${name}`}
        className={clsxm(
          'flex h-full items-center rounded-lg border border-dashed border-navy pl-5 md:justify-center md:rounded-xs md:pl-0',
          dragActive && 'drag-active'
        )}
      >
        <div className='flex items-center gap-2.5'>
          <Icon name='upload' />
          <p className='text-base font-normal leading-6 text-navy'>
            {isFile ? 'Zmień' : 'Wgraj'} plik
          </p>
        </div>
      </label>
      {dragActive && (
        <div
          id='drag-file-element'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className='absolute inset-0 h-full w-full rounded-[1rem]'
        />
      )}
    </div>
  );
};
