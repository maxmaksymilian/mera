import { useState } from 'react';

import { Fields } from './Steps/Fields';
import { Options } from './Steps/Options';

type AddCustomerProps = {
  handleReload: () => void;
};

export const AddCustomer = ({ handleReload }: AddCustomerProps) => {
  const [step, setStep] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);

  const stepsComponent = [
    <Fields
      key='fields'
      {...{
        handleReload,
        setStep: () => setStep(1),
        setUserId: (id) => setUserId(id),
      }}
    />,
    <Options key='options' {...{ userId }} />,
  ];

  return <div className='mt-9 px-16'>{stepsComponent[step]}</div>;
};
