import { Button } from '@/components/commons/Button';
import { FileItem } from '@/components/commons/Form/Fields/FileInput/components/FileItem';
import { FileInput } from '@/components/commons/Form/Fields/FileInput/FileInput';
import { Input } from '@/components/commons/Form/Fields/Input';
import SearchDropdown from '@/components/commons/Form/Fields/Select/SearchDropdown/SearchDropdown';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { SubmitButton } from '@/components/commons/Form/Fields/SubmitButton';
import { Textarea } from '@/components/commons/Form/Fields/Textarea';
import { Form } from '@/components/commons/Form/Form';
import { FormMessage } from '@/components/commons/Form/FormMessage';
import { options } from '@/components/panel/MyCases/MyCasesModel';

import { useNewCaseForm } from './useNewCaseForm';

export type NewCaseFormProps = {
  handleClose: () => void;
  handleReload: () => void;
  isCustomerService?: boolean;
};

export const NewCaseForm = (props: NewCaseFormProps) => {
  const { t, form, isLoading, error } = useNewCaseForm({ ...props });
  const { handleClose } = props;

  return (
    <div className='w-full max-w-4xl px-8 py-10 md:px-11 lg:w-lg'>
      <div className='pb-4'>
        <h1 className='pb-2 text-lg font-normal leading-lg'>
          {props.isCustomerService
            ? t('pok.casesList.addNewCase')
            : t('panel.cases.newForm.title')}
        </h1>
        <p className='text-base leading-6 text-gray'>
          {t('panel.cases.newForm.content')}
        </p>
        <FormMessage content={error} type='error' />
      </div>
      <Form {...{ form }}>
        {props.isCustomerService && (
          <>
            <div>
              <SearchDropdown
                name='client'
                label='searchUser'
                route='POK_ALL_CUSTOMERS'
                customFilterQuery='search'
                isFullName
                isClear
              />
            </div>
            <div className='flex gap-2.5 py-4'>
              <div className='flex-1'>
                <SearchDropdown
                  name='guardian'
                  label='caseOperator'
                  route='EMPLOYEE_LIST'
                  isFullName
                  isClear
                />
              </div>
              <div className='flex-1'>
                <SearchDropdown
                  name='transaction'
                  label='relatedTransaction'
                  route='USER_TRANSACTION_LIST'
                  userId={form.values.client}
                  isClear
                />
              </div>
            </div>
          </>
        )}
        <Select
          name='type'
          label='choiceCaseType'
          placeholder='choiceCaseType'
          options={options.type}
        />
        <div className='relative py-4'>
          <Input name='title' label='typeCaseTitle' placeholder='caseTitle' />
        </div>
        <Textarea
          name='description'
          label='caseDescription'
          placeholder='typeCaseDescription'
        />
        <div className='flex-col py-2 md:flex md:flex-row md:items-center md:justify-between'>
          <FileInput name='file' label='attachFiles' multiple />
          <p className='text-base italic leading-6 text-gray'>
            {t('allowFormat')}
          </p>
        </div>
        <div className='uploaded-files-container'>
          {form.values.file.map((soloFile: File) => (
            <FileItem
              key={soloFile.name}
              {...{ item: soloFile, isRemovable: true, id: 'file' }}
            />
          ))}
        </div>
        <div className='flex justify-center gap-2.5 pt-10'>
          <Button
            variant='secondary'
            type='button'
            handleClick={() => handleClose()}
          >
            {t('cancel')}
          </Button>
          <SubmitButton label='createCase' loading={isLoading} />
        </div>
      </Form>
    </div>
  );
};
