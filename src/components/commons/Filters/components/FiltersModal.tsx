import useTranslation from 'next-translate/useTranslation';
import { Dispatch } from 'react';

import { Without } from '@/lib/api';

import { FiltersProps } from '@/components/commons/Filters/Filters';
import {
  ActionPayloadType,
  ActionType,
} from '@/components/commons/Filters/useFilters';
import { Modal, ModalType } from '@/components/commons/Modal/Modal';

import { FiltersForm } from './FiltersForm';

type FiltersModalProps = {
  dispatch: Dispatch<Readonly<ActionType>>;
} & Without<ModalType, 'handleClose'> &
  FiltersProps &
  Pick<ActionPayloadType, 'values'>;

export const FiltersModal = ({
  form,
  children,
  dispatch,
  values,
  ...props
}: FiltersModalProps) => {
  const { t } = useTranslation('common');

  return (
    <Modal
      {...{
        ...props,
        handleClose: () => dispatch({ type: 'cancel', payload: { values } }),
      }}
    >
      <div className='py-10 px-5'>
        <div className='pb-8'>
          <h1 className='pb-7 text-md font-normal leading-8 text-black'>
            {t('filters.title')}
          </h1>
          <p className='text-sm leading-6 text-gray'>{t('filters.content')}</p>
        </div>
        <FiltersForm {...{ form, dispatch, values }}>{children}</FiltersForm>
      </div>
    </Modal>
  );
};
