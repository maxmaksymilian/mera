export const links = {
  client: [
    {
      name: 'dashboard',
      path: '/panel',
    },
    {
      name: 'myTickets',
      path: '/panel/moje-bilety',
    },
    {
      name: 'myCards',
      path: '/panel/moje-karty',
    },
    {
      name: 'myData',
      path: '/panel/moje-dane',
    },
    {
      name: 'myUsers',
      path: '/panel/moi-uzytkownicy',
    },
    {
      name: 'events',
      path: '/panel/wydarzenia',
    },
    {
      name: 'wallet',
      path: '/panel/portmonetka',
    },
    {
      name: 'transactionHistory',
      path: '/panel/historia-transakcji',
    },
    {
      name: 'cases',
      path: '/panel/sprawy',
    },
  ],
  admin: [
    {
      name: 'customerData',
      path: '/pok/baza-klientow/{id}/dane-klienta',
      permission: 'profile.data',
    },
    {
      name: 'transactionHistory',
      path: '/pok/baza-klientow/{id}/historia-transakcji',
      permission: 'order.order',
    },
    {
      name: 'cards',
      path: '/pok/baza-klientow/{id}/karty',
      permission: 'card.card',
    },
    {
      name: 'tickets',
      path: '/pok/baza-klientow/{id}/bilety',
      permission: 'myticket.my_ticket',
    },
    {
      name: 'users',
      path: '/pok/baza-klientow/{id}/uzytkownicy',
      permission: 'myusers.my_user',
    },
    {
      name: 'events',
      path: '/pok/baza-klientow/{id}/wydarzenia',
      permission: 'event.my_events',
    },
    {
      name: 'wallet',
      path: '/pok/baza-klientow/{id}/portmonetka',
      permission: 'wallet.wallet',
    },
    {
      name: 'cases',
      path: '/pok/baza-klientow/{id}/sprawy',
      permission: 'cases.case',
    },
  ],
  reports: [
    {
      name: 'reportsSelling',
      path: '/pok/raporty/sprzedaz',
    },
    {
      name: 'reportsSellingByType',
      path: '/pok/raporty/po-typie',
    },
    {
      name: 'reportsCards',
      path: '/pok/raporty/zablokowane-karty',
    },
  ],
  administration: [],
} as const;
