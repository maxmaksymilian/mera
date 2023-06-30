import { Without } from '@/lib/api';

import { Icon } from '@/components/commons/Icon/Icon';
import {
  ListActionType,
  ListHeaderType,
  ListRecordType,
} from '@/components/commons/List/@types/List';

import { useTableRecord } from './useTableRecord';

export type TableRecordProps = {
  headers: ListHeaderType[];
  actions?: ListActionType[];
} & ListRecordType;

export const TableRecord = ({
  actions,
  id,
  ...props
}: Without<TableRecordProps, 'link'>) => {
  const { transformedRecord, renderColumn, t } = useTableRecord({
    id,
    ...props,
  });

  return (
    <tr>
      {transformedRecord.map(({ value, type, key, columnRecordClassName }) => (
        <td className='max-w-xxs whitespace-pre-wrap align-middle' key={key}>
          {renderColumn({ value, type, className: columnRecordClassName })}
        </td>
      ))}
      {actions
        ? actions.map(({ key, icons, handleClick, expired }, index) => (
            <td className='record-actions align-middle' key={`${key}-${index}`}>
              {expired ? null : (
                <>
                  {handleClick ? (
                    <button
                      className='whitespace-nowrap text-navy'
                      onClick={() => handleClick()}
                    >
                      {t(`action.${key}`)}
                    </button>
                  ) : (
                    <>
                      {icons
                        ? icons.map(({ name, handleClick }) => (
                            <button
                              key={name}
                              className='float-left ml-2 flex h-8 w-8 items-center justify-center rounded border border-cloud bg-white'
                              onClick={() => handleClick()}
                            >
                              <Icon {...{ name }} />
                            </button>
                          ))
                        : null}
                    </>
                  )}
                </>
              )}
            </td>
          ))
        : null}
    </tr>
  );
};
