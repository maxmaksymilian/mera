export type FilterType = {
  type: string;
  value: string;
  second_value: string;
  field: string;
};

export type TableFilterProps = {
  field: string;
  updateData: (data: FilterType) => void;
};

export const singleInput = [
  'eq',
  'diff',
  'lt',
  'lte',
  'gt',
  'gte',
  'bet',
  'betw',
];
export const secondInput = ['bet', 'betw'];
