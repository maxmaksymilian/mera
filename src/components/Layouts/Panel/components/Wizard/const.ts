export const progressBarSteps = [
  'Rodzaj nośnika',
  'Dane adresowe',
  'Uprawnienia zniżki',
  'Podsumowanie',
];

// {
//   value: 'student_card',
//   name: 'Legitymacja studencka',
// },

export const customSelectCardTypeOptions = [
  {
    value: 'city_card',
    name: 'Karta miejska',
  },
  {
    value: 'emv_card',
    name: 'Karta płatnicza (debetowa lub kredytowa)',
  },
];

// {
//   value: 'senior_card',
//   name: 'Karta seniora',
// },

export const discountsCards = [
  {
    value: 'city_card',
    name: 'Karta miejska',
  },
  {
    value: 'student_card',
    name: 'Legitymacja studencka',
  },
];

export const discountOptions = [
  {
    value: 'student_card',
    name: 'Zniżka studencka 50%',
  },
  {
    value: 'senior_card',
    name: 'Zniżka seniora 37%',
  },
];

export const wizardInitialValues = {
  is_discount: false,
  document_front: null,
  document_back: null,
  document_discount: '',
  card_type: '',
  card_name: '',
  card_number: '',
  card_expiration_date: '',
  address_zip: '',
  address_city: '',
  address_street: '',
  address_number: '',
  address_apt_number: '',
  company: false,
  company_name: '',
  company_nip: '',
  company_address_zip: '',
  company_address_city: '',
  company_address_street: '',
  company_address_number: '',
  registered_address_street: '',
  registered_address_zip: '',
  registered_address_city: '',
  registered_address_number: '',
  registered_address_apt_number: '',
  registered_address: false,
};

export const stepsData = [
  {
    headline:
      'Twoje konto zostało pomyślnie utworzone. Poświęć chwilę, aby uzupełnić brakujące dane niezbędne do pełnej aktywacji konta.',
    subHeadline: 'Aktywne konto daje Ci wiele możliwości:',
  },
  {
    headline: 'Wybierz rodzaj nośnika',
    subHeadline: `Wybierz rodzaj dokumentu, którym będziesz się posługiwał.`,
  },
  {
    headline: 'Dane adresowe',
    subHeadline: `Podaj swoje dane adresowe`,
  },
  {
    headline: 'Uprawnienia zniżki (opcjonalne)',
    subHeadline:
      'Określ czy przysługują Ci jakieś zniżki i przedstaw skan dokumentu poświadczającego.',
  },
  {
    headline: 'Podsumowanie',
    subHeadline: 'Sprawdź poprawność wprowadzonych danych',
  },
  {
    headline: 'Sukces!',
    subHeadline: `Twoje dane zostały przekazane do weryfikacji. Poinformujemy Cię kiedy
    Twoje konto zostanie w pełni aktywowane.`,
  },
];

export const welcomeListItems = [
  'Zakup biletów do komunikacji miejskiej',
  'Zakup biletów na wydarzenia',
  'Monitorowanie ważności biletów',
  'Załatwianie spraw online',
];
