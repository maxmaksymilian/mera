import { Button } from '@/components/commons/Button';

export type filterType = {
  id: string;
  name: string;
};

export type EventsFiltersProps = {
  filtersArr: filterType[];
  activeFilter: string;
  setActiveFilter: (filterValue: string) => void;
};

export const EventsFilters = ({
  filtersArr,
  activeFilter,
  setActiveFilter,
}: EventsFiltersProps) => {
  const newFilterArrCat = [
    ...new Map(filtersArr.map((filter) => [filter.name, filter])).values(),
  ];
  return (
    <div className='filters-container mx-auto hidden justify-center pt-14 md:flex'>
      <div className='flex gap-2.5'>
        {newFilterArrCat.map(({ id, name }) => {
          return (
            <Button
              key={id}
              variant={
                activeFilter === id || (name === 'cat_0' && activeFilter === '')
                  ? 'primary'
                  : 'disabled'
              }
              className='h-10'
              handleClick={() => setActiveFilter(activeFilter === id ? '' : id)}
            >
              {name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
