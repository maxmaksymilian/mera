import useTranslation from 'next-translate/useTranslation';
import { Dispatch } from 'react';

import { Button } from '@/components/commons/Button';
import {
  ActionPayloadType,
  ActionType,
} from '@/components/commons/Filters/useFilters';
import { Form, FormType } from '@/components/commons/Form/Form';

export type FiltersFormProps = {
  dispatch: Dispatch<Readonly<ActionType>>;
} & FormType &
  Pick<ActionPayloadType, 'values'>;

export const FiltersForm = ({
  form,
  children,
  dispatch,
  values,
}: FiltersFormProps) => {
  const { t } = useTranslation('form');

  return (
    <Form {...{ form, className: 'flex flex-col gap-5 md:flex-row' }}>
      {children}
      <div className='flex flex-col gap-3 md:hidden'>
        <Button
          className='w-full'
          handleClick={() =>
            dispatch({ type: 'submit', payload: { values: form.values } })
          }
        >
          {t('button.saveFilters')}
        </Button>
        <Button
          variant='secondary'
          className='w-full'
          handleClick={() => {
            form.setValues(values);
            dispatch({ type: 'cancel', payload: { values } });
          }}
        >
          {t('button.cancel')}
        </Button>
      </div>
    </Form>
  );
};
