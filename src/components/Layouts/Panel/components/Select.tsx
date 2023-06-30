import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { CustomSelectInput } from '@/components/commons/CustomSelectInput';

import { SlidersProps } from './Sliders/Sliders';
import { links } from './Sliders/SlidersModel';

export const Select = ({ variant }: SlidersProps) => {
  const { t } = useTranslation('common');
  const { push, asPath, pathname, query } = useRouter();

  if (!variant) {
    return null;
  }

  return (
    <CustomSelectInput
      className='md:hidden'
      name='link'
      options={links[variant].map((item) => ({
        name: t(`panel.links.${item.name}`),
        value:
          item.path.includes('{id}') && typeof query.id === 'string'
            ? item.path.replaceAll('{id}', query.id)
            : item.path,
      }))}
      handleChange={(value) => push(value)}
      value={asPath}
      fakeValue
      placeholder={
        pathname === '/panel' ? pathname : `/panel/${pathname.split('/')[2]}`
      }
    />
  );
};
