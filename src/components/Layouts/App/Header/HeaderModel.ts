import { HeaderExcludesType } from './@types/HeaderType';
import { LinkType } from './@types/LinkType';

export const links: LinkType[] = [
  {
    name: 'homepage',
    path: '/',
  },
  {
    name: 'events',
    path: '/wydarzenia',
  },
];

export const adminLinks: LinkType[] = [
  {
    name: 'usersDatabase',
    path: '/pok/baza-klientow',
    icon: 'group',
    permission: 'customer.customer',
  },
  {
    name: 'sellTickets',
    path: '/pok/bilety',
    icon: 'ticket-admin',
  },
  {
    name: 'reports',
    path: '/pok/raporty/sprzedaz',
    icon: 'bar-chart',
    permission: 'reports.report',
  },
  {
    name: 'administration',
    path: '/pok/administracja',
    icon: 'managment',
  },
];

export const headerExcludes: HeaderExcludesType = {
  groupPath: ['/pok/auth'],
};
