import useTranslation from 'next-translate/useTranslation';
import { Dispatch } from 'react';

import { Button } from '@/components/commons/Button';
import { FiltersProps } from '@/components/commons/Filters/Filters';
import {
  ActionPayloadType,
  ActionType,
} from '@/components/commons/Filters/useFilters';
import { Icon } from '@/components/commons/Icon/Icon';

import { FiltersForm } from './FiltersForm';

type HeaderProps = {
  dispatch: Dispatch<Readonly<ActionType>>;
} & FiltersProps &
  Pick<ActionPayloadType, 'values'>;

export const Header = ({ button, dispatch, ...props }: HeaderProps) => {
  const { t } = useTranslation('form');
  const { form } = props;

  return (
    <div className='flex flex-col items-center justify-between gap-5 md:flex-row'>
      <div className='hidden flex-row md:flex'>
        <FiltersForm {...{ ...props, dispatch }} />
      </div>
      {button ? (
        <Button {...{ ...button, className: 'w-full md:w-auto' }}>
          {t(`button.${button.children}`)}
        </Button>
      ) : null}
      <Button
        {...{
          variant: 'secondary',
          className: 'flex min-w-full items-center gap-5 md:hidden',
          handleClick: () =>
            dispatch({ type: 'open', payload: { values: form.values } }),
        }}
      >
        <Icon name='sort' />
        {t('button.filters')}
      </Button>
    </div>
  );
};
