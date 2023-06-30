import { cardTypeOptions } from '@/lib/options/options';

import { Filters } from '@/components/commons/Filters/Filters';
import { SearchInput } from '@/components/commons/Form/Fields/SearchInput';
import { UserSelect } from '@/components/commons/Form/Fields/Select/DynamicVariants/UserSelect';
import { Select } from '@/components/commons/Form/Fields/Select/Select';
import { Modal } from '@/components/commons/Modal/Modal';

import { AddCardModal } from './components/AddCardModal';
import { MyCardsContent } from './MyCardsContent/MyCardsContent';
import { useMyCards } from './useMyCards';

export const MyCards = () => {
  const { data, status, filters, refetch, isOpen, setIsOpen } = useMyCards();

  return (
    <>
      <Filters {...filters}>
        <SearchInput
          name='search'
          className='h-12'
          placeholder='searchTicket'
        />
        <Select
          name='type'
          className='md:w-[200px]'
          placeholder='cardType'
          options={cardTypeOptions}
          isClear
          clearLabel='clear'
        />
        <UserSelect
          name='user'
          value=''
          className='md:w-[200px]'
          placeholder='user'
          isClear
        />
      </Filters>
      {status === 'success' ? (
        <MyCardsContent data={data} handleReload={refetch} />
      ) : null}
      {isOpen && (
        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <AddCardModal
            {...{
              route: 'PROFILE_MY_CARDS',
              method: 'POST',
              handleClose: () => setIsOpen(false),
              handleSubmit: () => {
                setIsOpen(false);
                refetch();
              },
            }}
          />
        </Modal>
      )}
    </>
  );
};
