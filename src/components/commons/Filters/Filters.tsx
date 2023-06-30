import { useReducer } from 'react';

import { Without } from '@/lib/api';
import { useScreen } from '@/hooks/useScreen';

import { ButtonProps } from '@/components/commons/Button';
import { FormType } from '@/components/commons/Form/Form';

import { FiltersModal } from './components/FiltersModal';
import { Header } from './components/Header';
import { reducer } from './useFilters';

export type FiltersProps = {
  button?: Pick<ButtonProps, 'children' | 'handleClick'>;
  className?: string;
} & Without<FormType, 'className'>;

export const Filters = ({ className, ...props }: FiltersProps) => {
  const { isMdUp } = useScreen();
  const { children, form } = props;
  const [{ isOpen, values }, dispatch] = useReducer(reducer, {
    isOpen: false,
    values: form.values,
  });

  return (
    <div {...{ className }}>
      <Header {...{ ...props, dispatch, values }} />
      {!isMdUp ? (
        <FiltersModal {...{ ...props, isOpen, dispatch, values }}>
          {children}
        </FiltersModal>
      ) : null}
    </div>
  );
};
