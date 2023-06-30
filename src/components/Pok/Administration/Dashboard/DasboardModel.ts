import { AdministrationCardProps } from '@/components/commons/Cards/AdministrationCard';

export type SectionType = {
  title: string;
  tabs: AdministrationCardProps[];
};

export const sections: SectionType[] = [
  {
    title: 'content',
    tabs: [
      {
        icon: 'info-admin',
        name: 'messages',
        href: '/',
      },
      {
        icon: 'layout',
        name: 'pages',
        href: '/',
      },
      {
        icon: 'header',
        name: 'navigation',
        href: '/',
      },
      {
        icon: 'footer',
        name: 'footer',
        href: '/',
      },
      {
        icon: 'checkbox',
        name: 'rules',
        href: '/',
      },
      {
        icon: 'file',
        name: 'files',
        href: '/',
      },
      {
        icon: 'palette',
        name: 'colors',
        href: '/',
      },
      {
        icon: 'bell',
        name: 'notifications',
        href: '/',
      },
    ],
  },
  {
    title: 'tickets',
    tabs: [
      {
        icon: 'ticket-list',
        name: 'list',
        href: '/',
      },
      {
        icon: 'list',
        name: 'tariffs',
        href: '/',
      },
      {
        icon: 'percentage',
        name: 'discounts',
        href: '/',
        permission: 'discount.discount',
      },
      {
        icon: 'car-bus',
        name: 'connects',
        href: '/',
        permission: 'ticket.line',
      },
      {
        icon: 'map-marker',
        name: 'zones',
        href: '/',
        permission: 'ticket.zone',
      },
    ],
  },
  {
    title: 'users',
    tabs: [
      {
        icon: 'users',
        name: 'list',
        href: '/pok/administracja/uzytkownicy',
        permission: 'employee.user',
      },
      {
        icon: 'user-gear',
        name: 'permissions',
        href: '/pok/administracja/role',
        permission: 'employee.role',
      },
    ],
  },
  {
    title: 'events',
    tabs: [
      {
        icon: 'calendar-days',
        name: 'list',
        href: '/',
      },
      {
        icon: 'folder',
        name: 'categories',
        href: '/',
      },
    ],
  },
  {
    title: 'settings',
    tabs: [],
  },
];
