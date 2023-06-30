import { Container } from '@/components/commons/Container';
import { SearchInput } from '@/components/commons/Fields/SearchInput';
import { Pagination } from '@/components/commons/Pagination/Pagination';
import { EventsFilters } from '@/components/events/components/EventsFilters/EventsFilters';
import { EventsListing } from '@/components/events/MainPage/EventsListing/EventsListing';

import { useEventsPage } from './useEventsPage';

export const EventsPage = () => {
  const {
    categories,
    categoryStatus,
    events,
    pagination,
    filters,
    status,
    setFilter,
    t,
  } = useEventsPage();

  return (
    <>
      <Container className='px-0 pt-28 sm:px-5'>
        <div className='bg-cloud px-9 pt-16 pb-5 md:bg-transparent md:px-0'>
          <div className='md:pb-16'>
            <h1 className='px-5 text-md font-normal md:px-0 md:pb-2.5 md:text-lg md:leading-lg'>
              {t('events.headline')}
            </h1>
            <p className='hidden text-base leading-6 text-gray md:block'>
              {t('events.subHeadline')}
            </p>
          </div>
          <div className='search-bar flex h-32 items-center rounded-2xl bg-cloud md:px-24'>
            <div className='h-14 w-full min-w-full bg-white md:max-w-lg'>
              <SearchInput
                value={filters.search}
                name='events-search'
                placeholder={t('events.searchInputPlaceholder')}
                className='h-full w-full min-w-full'
                handleChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
                clearInput={() =>
                  setFilter((prev) => ({
                    ...prev,
                    search: '',
                  }))
                }
              />
            </div>
          </div>
        </div>
        {categoryStatus === 'success' ? (
          <EventsFilters
            filtersArr={categories}
            activeFilter={filters.category}
            setActiveFilter={(value) =>
              setFilter((prev) => ({
                ...prev,
                category: value,
              }))
            }
          />
        ) : null}
      </Container>
      <Container className='pt-2.5 pb-8 lg:pb-20'>
        {status === 'success' ? (
          <EventsListing
            fetchMoreEvents={() => console.log('fetch more')}
            events={events?.items}
          />
        ) : null}
      </Container>
      <Pagination {...pagination} />
    </>
  );
};
