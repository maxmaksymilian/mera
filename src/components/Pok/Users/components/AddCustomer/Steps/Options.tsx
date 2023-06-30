import { Button } from '@/components/commons/Button';
import { Link } from '@/components/commons/Link';

type OptionsProps = {
  userId: string | null;
};

export const Options = ({ userId }: OptionsProps) => (
  <div className='flex min-h-full w-full max-w-[832px] flex-col items-center justify-center gap-20 pt-10 pb-20 lg:w-md lg:items-start lg:justify-start'>
    <div className='flex w-full flex-col gap-5'>
      <h2 className='text-lg'>Sukces - Użytkownik został dodany</h2>
      <p className='text-gray'>Uzupełnij pozostałe elementy profilu</p>
      <div className='flex'>
        <div className='mr-32 max-w-[283px]'>
          <h1 className='text-2xl font-normal'>Dodaj nośnik</h1>
          <p className='mt-3 text-gray'>Dodaj nośnik np. kartę płatniczą</p>
          <Link
            href={`/pok/baza-klientow/${userId}/karty?openModal=true`}
            className='mx-auto'
          >
            <Button className='mt-14'>Dodaj nowy nośnik</Button>
          </Link>
        </div>
        <div className='max-w-[283px]'>
          <h1 className='text-2xl font-normal'>Dodaj użytkowników</h1>
          <p className='mt-3 text-gray'>
            Dodaj użytkowników (np. dzieci) do swojego konta
          </p>
          <Link
            href={`/pok/baza-klientow/${userId}/uzytkownicy?openModal=true`}
            className='mx-auto'
          >
            <Button className='mt-[33px]'>Dodaj użytkownika</Button>
          </Link>
        </div>
      </div>
      <div>
        <h1 className='mt-10 text-2xl font-normal'>Uzupełnij dane adresowe</h1>
        <p className='mt-3 max-w-[286px] text-gray'>
          Adres zamieszkania / zameldowania
        </p>
        <Link
          href={`/pok/baza-klientow/${userId}/dane-klienta?openModal=true`}
          className='mx-auto'
        >
          <Button className='mt-9 mb-32'>Uzupełnij dane adresowe</Button>
        </Link>
      </div>
    </div>
  </div>
);
