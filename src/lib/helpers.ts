import {
  addressValidation as stepThreeValidation,
  cardDataValidation as stepTwoValidation,
  discountsValidation as stepFourValidation,
  wizardValidation,
} from '@/lib/validationSchema/wizard';

export const shortenFileName = (fileName: string) => {
  const [name, extension] = fileName.split('.');

  if (name.length > 15) {
    const tempName = `${name.substring(0, 16)}.. .${extension}`;
    return tempName;
  } else return fileName;
};

export const validationSchemaHandler = (stepNumber: number) => {
  if (stepNumber === 2) return stepTwoValidation;
  if (stepNumber === 3) return stepThreeValidation;
  if (stepNumber === 4) return stepFourValidation;
  if (stepNumber === 5) return wizardValidation;
};

export const shortenEventTitle = (title: string) => {
  if (title.length < 55) return title;
  return `${title.substring(0, 55)}...`;
};

export const getDateData = (date: string | Date, add?: { days?: number }) => {
  let newDate, day, month, year, hours, minutes;

  if (typeof date === 'string' && date !== '' && date[2] === '-') {
    day = Number(date.substring(0, 2));
    month = Number(date.substring(3, 5)) - 1;
    year = Number(date.substring(6, 10));
    hours = date.length > 11 ? Number(date.substring(11, 13)) : 0;
    minutes = date.length > 11 ? Number(date.substring(14, 16)) : 0;

    newDate = new Date(year, month, day, hours, minutes, 0);
  } else if (typeof date === 'string' && date !== '') {
    newDate = new Date(date);
  } else if (date instanceof Date) {
    newDate = date;
  } else {
    newDate = new Date();
  }

  if (add?.days) {
    newDate.setDate(newDate.getDate() + add.days);
  }

  day = newDate.getDate();
  month = newDate.getMonth() + 1;
  year = newDate.getFullYear();
  hours = newDate.getHours();
  minutes = newDate.getMinutes();

  return { day, month, year, hours, minutes };
};

export const addMinutes = (date: Date, minutes: number) => {
  date.setMinutes(date.getMinutes() + minutes);

  return date;
};

export const convertDate = (date: string | Date, isTime?: boolean) => {
  const { day, month, year, hours, minutes } = getDateData(date);

  if (isTime) {
    return `${day.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year} ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }

  return `${day.toString().padStart(2, '0')}-${month
    .toString()
    .padStart(2, '0')}-${year}`;
};

export const updateTime = (date: string | Date) => {
  const { day, month, year, minutes, hours } = getDateData(date);

  const activeDate = new Date();
  const checkingDate = new Date(year, month - 1, day, hours, minutes, 0);

  if (addMinutes(activeDate, 1).getTime() < checkingDate.getTime()) {
    return convertDate(date, true);
  }

  const activeDateData = getDateData(activeDate);

  return `${activeDateData.day
    .toString()
    .padStart(2, '0')}-${activeDateData.month.toString().padStart(2, '0')}-${
    activeDateData.year
  } ${activeDateData.hours.toString().padStart(2, '0')}:${activeDateData.minutes
    .toString()
    .padStart(2, '0')}`;
};

export const checkExpiration = (date: string) => {
  const newDate = new Date(date).getTime();
  const today = new Date().getTime();
  return today > newDate;
};

export const priceHandler = (price: number) => {
  if (typeof price !== 'number') return;
  return price.toFixed(2).replace('.', ',');
};

export const cardTypes = [
  {
    value: 'emv_card',
    name: 'Karta płatnicza (kredytowa / debetowa)',
  },
  {
    value: 'city_card',
    name: 'Karta miejska',
  },
];

const discountTypes = [
  {
    value: 'emv_card',
    name: 'Karta płatnicza (kredytowa / debetowa)',
    discount: 'Zniżka X%',
  },
  {
    value: 'student_card',
    name: 'Legitymacja studencka',
    discount: 'Zniżka studencka 50%',
  },
  {
    value: 'city_card',
    name: 'Karta miejska',
    discount: 'Zniżka mieszkańca 10%',
  },
];

export const getCardTypeName = (value: string) => {
  const getCardType = cardTypes.find((card) => card.value === value);
  return getCardType?.name || '';
};

export const getDiscountType = (value: string) => {
  const getCardType = discountTypes.find((card) => card.value === value);
  return getCardType?.discount || '';
};

export const generateErrors = ({
  message,
  errors,
}: {
  message?: string;
  errors: { [key: string]: string[] }[];
}) => {
  const newArr = message ? [message] : [];
  return Object.values(errors).reduce((prev: string[], item: any) => {
    const itemArr = typeof item === 'string' ? [item] : item;
    return [...prev, ...itemArr];
  }, newArr);
};

export const shortenCaseDescription = (desc: string) => {
  if (desc.length > 80) {
    const tempName = `${desc.substring(0, 80)}...`;
    return tempName;
  } else return desc;
};

export const maskCardNumber = (cardNumber: string) => {
  if (typeof cardNumber === 'string') {
    if (cardNumber.length === 6) {
      const maskedNumber = '****' + cardNumber.substring(4);
      return maskedNumber;
    }
    if (cardNumber.length === 10) {
      return (
        cardNumber.substring(0, 6) + '******' + cardNumber.substring(6, 10)
      );
    }
  }
  return cardNumber;
};

export const filterObject = (obj: { [key: string]: any }, key: string) =>
  Object.entries(obj)
    .filter((item) => !item[0].includes(key) || item[0] === key)
    .reduce((prev, current) => ({ ...prev, [current[0]]: current[1] }), {});

export const checkIsStringValueInObject = (obj: { [key: string]: any }) => {
  return Object.entries(obj).some(
    (item) => typeof item[1] === 'string' || typeof item[1] === 'number'
  );
};

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
