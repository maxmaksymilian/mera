import { FormikErrors, useFormik } from 'formik';
import { useEffect, useReducer, useState } from 'react';

import { useAppStore } from '@/lib';
import { generateErrors } from '@/lib/helpers';
import { wizardStepsValidation } from '@/lib/validationSchema/wizard';

import {
  stepsData,
  wizardInitialValues,
} from '@/components/Layouts/Panel/components/Wizard/const';
import { Address } from '@/components/Layouts/Panel/components/Wizard/steps/Address';
import { CardData } from '@/components/Layouts/Panel/components/Wizard/steps/CardData';
import { Discounts } from '@/components/Layouts/Panel/components/Wizard/steps/Discounts';
import { FinalMessage } from '@/components/Layouts/Panel/components/Wizard/steps/FinalMessage';
import { Summary } from '@/components/Layouts/Panel/components/Wizard/steps/Summary';
import { Welcome } from '@/components/Layouts/Panel/components/Wizard/steps/Welcome';

import { useApiMutation } from './api/useApiMutation';

type initialFormStateType = {
  currentStepIndex: number;
  isLoading: boolean;
  errorContent: string[] | null;
  formData: typeof wizardInitialValues;
};

const initialFormState: initialFormStateType = {
  currentStepIndex: 0,
  isLoading: false,
  errorContent: null,
  formData: wizardInitialValues,
};

export type ActionType =
  | { type: 'SUBMIT_FORM'; payload: typeof wizardInitialValues }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'GO_TO'; payload: number }
  | { type: 'LOADING'; payload: boolean }
  | { type: 'UPDATE_FORM_DATA'; payload: typeof wizardInitialValues }
  | { type: 'ERROR_CONTENT'; payload: string[] };

const formReducer = (state: typeof initialFormState, action: ActionType) => {
  switch (action.type) {
    case 'NEXT':
      return {
        ...state,
        currentStepIndex: state.currentStepIndex + 1,
      };
    case 'PREV':
      return {
        ...state,
        currentStepIndex: state.currentStepIndex - 1,
      };
    case 'GO_TO':
      return {
        ...state,
        currentStepIndex: action.payload,
      };
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: action.payload,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'ERROR_CONTENT':
      return {
        ...state,
        errorContent: action.payload,
      };
    case 'SUBMIT_FORM':
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

export function useMultiStepForm() {
  const { token, personalData, setPersonalData, setIntroWizard } =
    useAppStore();
  const { mutate } = useApiMutation({
    route: 'PROFILE_WIZARD',
    method: 'POST',
  });
  const { mutate: checkCard } = useApiMutation({
    route: 'CHECK_CARD',
    method: 'POST',
  });
  const [errors, setErrors] = useState<
    FormikErrors<{ [field: string]: string }>
  >({});
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { currentStepIndex, formData, errorContent } = formState;
  const currentStepDescData = stepsData[currentStepIndex];

  const {
    errors: formErrors,
    isValid,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: wizardStepsValidation[currentStepIndex],
    initialValues: formData,
    onSubmit: (values) => {
      if (currentStepIndex === 1) {
        setErrors({});
        dispatch({ type: 'LOADING', payload: true });
        checkCard(
          { type: values.card_type, number: values.card_number },
          {
            onSuccess: ({ data }) => {
              if (data) {
                setErrors({
                  card_number: 'Podany numer karty jest już zajęty.',
                });
              } else {
                dispatch({ type: 'UPDATE_FORM_DATA', payload: values });
                dispatch({ type: 'NEXT' });
              }
              dispatch({ type: 'LOADING', payload: false });
            },
          }
        );
      } else if (currentStepIndex === 4) {
        dispatch({ type: 'SUBMIT_FORM', payload: values });
        mutate(
          {
            ...values,
            registered_address: values.registered_address ? '0' : '1',
            company: values.company ? '1' : '0',
            is_discount: values.is_discount ? '1' : '0',
            token,
          },
          {
            onSuccess: ({ error, errors }) => {
              dispatch({ type: 'LOADING', payload: true });
              if (error || errors) {
                const newErrors = generateErrors({
                  message: error,
                  errors: errors || [],
                });
                dispatch({ type: 'LOADING', payload: false });
                return dispatch({
                  type: 'ERROR_CONTENT',
                  payload: newErrors,
                });
              }
              setPersonalData({ ...personalData, profile_completed: true });
              setIntroWizard(false);
              dispatch({ type: 'NEXT' });
              dispatch({ type: 'LOADING', payload: false });
            },
          }
        );
      } else {
        if (isValid) {
          dispatch({ type: 'UPDATE_FORM_DATA', payload: values });
          dispatch({ type: 'NEXT' });
        }
      }
    },
  });

  useEffect(() => {
    setErrors(formErrors);
  }, [formErrors]);

  const props = { errors, values, handleChange, handleSubmit, setFieldValue };

  const stepsArr = [
    <Welcome key='welcome' {...props} />,
    <CardData key='cardData' {...props} />,
    <Address key='address' {...props} />,
    <Discounts key='discounts' {...props} />,
    <Summary key='summary' {...props} errorContent={errorContent} />,
    <FinalMessage key='finalMessage' {...props} />,
  ];

  return {
    errors,
    formState,
    isValid,
    values,
    currentStep: stepsArr[currentStepIndex],
    currentStepDescData: currentStepDescData,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === stepsArr.length - 1,
    stepsCount: stepsArr.length,
    handleChange,
    handleSubmit,
    setFieldValue,
    dispatch,
  };
}
