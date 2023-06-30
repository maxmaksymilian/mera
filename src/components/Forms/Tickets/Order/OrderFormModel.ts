import * as Yup from 'yup';

import { validationSchema, ValidationSchemaType } from '@/lib/validation';

export const orderValidationSchema = [
  Yup.object({
    card: validationSchema.global.required,
    item: validationSchema.order.ticket,
  }),
  Yup.object({}),
  Yup.object({
    payment_method: validationSchema.order.payment.payment_method,
    document_type: validationSchema.order.payment.document_type,
    company_name: validationSchema.order.payment.company_name,
    company_nip: validationSchema.global.nip,
    address_zip: validationSchema.order.payment.address_zip,
    address_city: validationSchema.order.payment.address_city,
    address_street: validationSchema.order.payment.address_street,
    address_number: validationSchema.order.payment.address_number,
  }),
];

export type ItemType = {
  id: string;
  name: string;
  price: number;
  activation_date: string;
  validity: number;
};

export const initialValues: ValidationSchemaType<
  (typeof orderValidationSchema)[0]
> &
  ValidationSchemaType<(typeof orderValidationSchema)[2]> = {
  card: '',
  item: [],
  payment_method: 'card',
  document_type: 'receipt',
  company_name: '',
  company_nip: '',
  company_address_zip: '',
  company_address_city: '',
  company_address_street: '',
  company_address_number: '',
};

export const steps = ['choiceCardAndTickets', 'configTickets', 'summary'];

export const stepsPok = [...steps];
stepsPok.splice(2, 0, 'payment');
