export interface IInitialValues {
  document_front: File | null;
  document_back: File | null;
  document_discount: string;
  card_type: string;
  card_name: string;
  card_number: string;
  card_expiration_date: string;
  address_zip: string;
  address_city: string;
  address_street: string;
  address_number: string;
  address_apt_number: string;
  company: boolean;
  company_name: string;
  company_nip: string;
  company_address_company_name: string;
  company_address_zip: string;
  company_address_city: string;
  company_address_street: string;
  company_address_number: string;
  company_address_nip: string;
  registered_address_street: string;
  registered_address_zip: string;
  registered_address_city: string;
  registered_address_number: string;
  registered_address_apt_number: string;
  registered_address: boolean;
}
