import useTranslation from 'next-translate/useTranslation';

import { convertDate } from '@/lib/helpers';
import { cardTypeOptions } from '@/lib/options/options';

import { HistoryCardProps } from './HistoryCard';
import { dateValues, hideValues } from './HistoryCardModel';

type ChangesType = {
  name: string;
  value: string;
  oldValue: string;
};

export const useHistoryCard = ({
  changes,
}: Pick<HistoryCardProps, 'changes'>) => {
  const { t } = useTranslation();

  const getValue = (name: string, value?: string) => {
    if (!value) {
      return '';
    }

    if (dateValues.includes(name)) {
      return convertDate(value);
    } else if (cardTypeOptions.map(({ value }) => value).includes(value)) {
      return t(`form:options.card_type.${value}`);
    } else if (name === 'status') {
      return t(`form:options.status.${value}`);
    } else {
      return value;
    }
  };

  const getOld = changes?.old
    ? Object.entries(changes.old).map((item) => ({
        name: item[0],
        value: item[1],
      }))
    : [];

  const transformedChanges = changes?.attributes
    ? Object.entries(changes.attributes)
        .map((item) => ({
          name: item[0],
          value: item[1],
        }))
        .filter(({ name }) => !hideValues.includes(name))
        .reduce<ChangesType[]>(
          (prev, current) =>
            current.value
              ? [
                  ...prev,
                  {
                    ...current,
                    value: getValue(current.name, current.value),
                    oldValue: getValue(
                      current.name,
                      getOld.find(({ name }) => name === current.name)?.value
                    ),
                  },
                ]
              : [...prev],
          []
        )
    : [];

  return { t, transformedChanges };
};
