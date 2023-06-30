export type OptionProps = {
  name: string;
  value: string;
};

export const peselOptions: OptionProps[] = [
  {
    name: 'yes',
    value: 'TAK',
  },
  {
    name: 'no',
    value: 'NIE',
  },
];

export const yesNoOptions: OptionProps[] = [
  {
    name: 'yes',
    value: '1',
  },
  {
    name: 'no',
    value: '0',
  },
];

export const cardTypeOptions: OptionProps[] = [
  {
    value: 'emv_card',
    name: 'emv_card',
  },
  {
    value: 'city_card',
    name: 'city_card',
  },
];

export const globalStatusOptions: OptionProps[] = [
  {
    value: 'active',
    name: 'active',
  },
  {
    value: 'not_active',
    name: 'not_active',
  },
];

export const transactionsStatusOptions: OptionProps[] = [
  {
    value: 'new',
    name: 'new',
  },
  {
    value: 'payed',
    name: 'payed',
  },
  {
    value: 'completed',
    name: 'completed',
  },
  {
    value: 'canceled',
    name: 'canceled',
  },
];

export const casesStatusOptions: OptionProps[] = [
  {
    value: 'new',
    name: 'new',
  },
  {
    value: 'in_progress',
    name: 'in_progress',
  },
  {
    value: 'closed',
    name: 'closed',
  },
];

export const verifiedTypeOptions: OptionProps[] = [
  {
    value: 'verified',
    name: 'verified',
  },
  {
    value: 'notVerified',
    name: 'notVerified',
  },
];

export const documentTypeOptions: OptionProps[] = [
  {
    value: 'receipt',
    name: 'receipt',
  },
  {
    value: 'invoice',
    name: 'invoice',
  },
];

export const optionsRecordsPerPage: OptionProps[] = [
  {
    name: '25',
    value: '25',
  },
  {
    name: '50',
    value: '50',
  },
  {
    name: '100',
    value: '100',
  },
];

export const downloadOptions: OptionProps[] = [
  {
    value: 'pdf',
    name: 'pdf',
  },
  {
    value: 'txt',
    name: 'txt',
  },
  {
    value: 'html',
    name: 'html',
  },
  {
    value: 'csv',
    name: 'csv',
  },
  {
    value: 'xlsx',
    name: 'xlsx',
  },
];

export const recordFilterOptions: OptionProps[] = [
  {
    value: 'eq',
    name: 'eq',
  },
  {
    value: 'diff',
    name: 'diff',
  },
  {
    value: 'lt',
    name: 'lt',
  },
  {
    value: 'lte',
    name: 'lte',
  },
  {
    value: 'gt',
    name: 'gt',
  },
  {
    value: 'gte',
    name: 'gte',
  },
  {
    value: 'bet',
    name: 'bet',
  },
  {
    value: 'betw',
    name: 'betw',
  },
  {
    value: 'empty',
    name: 'empty',
  },
  {
    value: 'nempty',
    name: 'nempty',
  },
];
