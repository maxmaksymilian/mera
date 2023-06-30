export const initialValues = {
  status: '',
};

export const modalCustomerDesc = {
  password: {
    type: 'password',
    headline: 'pok.customerData.forms.password.headline',
    subHeadline: 'pok.customerData.forms.password.headline',
  },
  reset_password: {
    type: 'reset_password',
    headline: 'pok.customerData.forms.reset_password.headline',
    subHeadline: 'pok.customerData.forms.reset_password.subHeadline',
  },
  generalData: {
    type: 'generalData',
    headline: 'pok.customerData.forms.generalData.headline',
    subHeadline: 'pok.customerData.forms.generalData.subHeadline',
  },
  addressResidential: {
    type: 'addressResidential',
    headline: 'pok.customerData.forms.addressResidential.headline',
    subHeadline: 'pok.customerData.forms.addressResidential.subHeadline',
  },
  addressRegistered: {
    type: 'addressRegistered',
    headline: 'pok.customerData.forms.addressRegistered.headline',
    subHeadline: 'pok.customerData.forms.addressRegistered.subHeadline',
  },
  document: {
    type: 'document',
    headline: 'pok.customerData.forms.document.headline',
    subHeadline: 'pok.customerData.forms.document.subHeadline',
  },
  status: {
    type: 'status',
    headline: 'pok.customerData.forms.status.headline',
    subHeadline: 'pok.customerData.forms.status.subHeadline',
  },
};

export const sectionsHeaders = {
  generalData: [
    {
      key: 'profile.first_name',
      label: 'name',
      value: 'first_name',
    },
    {
      key: 'profile.last_name',
      label: 'surname',
      value: 'last_name',
    },
    {
      key: 'profile.pesel',
      label: 'pesel',
      value: 'pesel',
    },
    {
      key: 'profile.email',
      label: 'email',
      value: 'email',
    },
    {
      key: 'profile.phone',
      label: 'phone',
      value: 'telephone',
    },
  ],
  address: [
    {
      label: 'street',
      key: 'address_residential.street',
      value: 'street',
    },
    {
      label: 'houseNumber',
      key: 'address_residential.number',
      value: 'number',
    },
    {
      label: 'apartmentNumberShort',
      key: 'address_residential.apt_number',
      value: 'apt_number',
    },
    {
      label: 'zip',
      key: 'address_residential.zip',
      value: 'zip',
    },
    {
      label: 'city',
      key: 'address_residential.city',
      value: 'city',
    },
  ],
  registeredAddress: [
    {
      label: 'street',
      key: 'address_residential.street',
      value: 'street',
    },
    {
      label: 'houseNumber',
      key: 'address_residential.number',
      value: 'number',
    },
    {
      label: 'apartmentNumberShort',
      key: 'address_residential.apt_number',
      value: 'apt_number',
    },
    {
      label: 'zip',
      key: 'address_residential.zip',
      value: 'zip',
    },
    {
      label: 'city',
      key: 'address_residential.city',
      value: 'city',
    },
  ],
};
