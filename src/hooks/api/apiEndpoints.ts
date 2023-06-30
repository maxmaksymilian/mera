export type ApiEndpointsType = {
  endpoint: string;
  method: ('GET' | 'POST' | 'PUT' | 'DELETE')[];
};

export type ApiKeysType =
  | 'CSRF_TOKEN'
  | 'LOGGED'
  | 'CARDS_LIST'
  | 'CHECK_CARD'
  | 'EVENTS'
  | 'EVENTS_CATEGORIES'
  | 'ORDER_TICKETS'
  | 'POK_ORDER_TICKETS'
  | 'ORDER_CREATE'
  | 'POK_ORDER_CREATE'
  | 'AUTH_REGISTER'
  | 'AUTH_VERIFY_EMAIL'
  | 'AUTH_LOGIN'
  | 'AUTH_REFRESH_TOKEN'
  | 'AUTH_LOGOUT'
  | 'AUTH_FORGOT_PASSWORD'
  | 'AUTH_RESET_PASSWORD'
  | 'AUTH_VERIFY_PASSWORD'
  | 'AUTH_NEW_PASSWORD'
  | 'AUTH_TRANSFORM'
  | 'PROFILE_WIZARD'
  | 'PROFILE_DASHBOARD'
  | 'PROFILE_MY_TICKETS'
  | 'PROFILE_MY_TICKETS_PDF'
  | 'PROFILE_MY_TICKETS_ORDER'
  | 'PROFILE_MY_CARDS'
  | 'PROFILE_MY_CARDS_HISTORY'
  | 'PROFILE_MY_DATA'
  | 'PROFILE_MY_DATA_UPDATE'
  | 'PROFILE_MY_DATA_ADDRESS_RESIDENTAL_UPDATE'
  | 'PROFILE_MY_DATA_ADDRESS_REGISTERED_UPDATE'
  | 'PROFILE_MY_DATA_CHANGE_PASSWORD'
  | 'PROFILE_MY_DATA_HISTORY'
  | 'PROFILE_MY_USERS'
  | 'PROFILE_MY_USERS_UPDATE'
  | 'PROFILE_ALL_USERS'
  | 'PROFILE_MY_USERS_TRANSFORM'
  | 'PROFILE_MY_EVENTS'
  | 'PROFILE_MY_EVENTS_ORDER'
  | 'PROFILE_MY_CASES'
  | 'PROFILE_MY_CASES_REFUND'
  | 'PROFILE_MY_CASES_RESUME'
  | 'PROFILE_MY_CASES_CORRESPONDENCE'
  | 'PROFILE_MY_CASES_CORRESPONDENCE_FILE'
  | 'POK_USERS'
  | 'POK_USERS_PROFILE_DATA'
  | 'POK_CREATE_CUSTOMER_DISCOUNTS'
  | 'POK_PROFILE_MY_USERS'
  | 'POK_PROFILE_MY_USERS_TRANSFORM'
  | 'POK_PROFILE_MY_USERS_UPDATE'
  | 'POK_PROFILE_CASES'
  | 'CUSTOMER_TICKETS'
  | 'CUSTOMER_TICKETS_LOCK'
  | 'POK_CUSTOMER_EVENTS'
  | 'PROFILE_WALLET'
  | 'PROFILE_USER_WALLET'
  | 'PROFILE_DISCOUNT'
  | 'DISCOUNTS_LIST'
  | 'POK_CUSTOMER_WALLET'
  | 'PROFILE_RECHARGE_WALLET'
  | 'PROFILE_ORDER_HISTORY'
  | 'POK_RECHARGE_CUSTOMER_WALLET'
  | 'POK_CUSTOMER_DATA'
  | 'POK_MY_TICKETS_PDF'
  | 'POK_TICKETS_ORDER'
  | 'POK_CUSTOMER_HISTORY_CHANGES'
  | 'POK_CUSTOMER_TRANSACTION_HISTORY'
  | 'POK_UPDATE_CUSTOMER_GENERAL_DATA'
  | 'POK_UPDATE_CUSTOMER_RESIDENTIAL_ADDRESS'
  | 'POK_UPDATE_CUSTOMER_REGISTERED_ADDRESS'
  | 'POK_RESET_PASSWORD'
  | 'POK_UPDATE_CUSTOMER_STATUS'
  | 'POK_CUSTOMER_CARDS_LIST'
  | 'POK_CUSTOMER_CARDS'
  | 'POK_CUSTOMER_CARD_LOCK'
  | 'POK_CUSTOMER_ALL_USERS'
  | 'POK_ALL_CUSTOMERS'
  | 'POK_CUSTOMER_ALL_USERS_WALLET'
  | 'PROFILE_USER_RECHARGE_WALLET'
  | 'TRANSACTION_DOWNLOAD_PDF'
  | 'POK_TRANSACTION_DOWNLOAD_PDF'
  | 'TRANSACTION_LIST_DOWNLOAD_PDF'
  | 'EVENT_DOWNLOAD_PDF'
  | 'POK_CASES_LIST'
  | 'EMPLOYEE_LIST'
  | 'USER_TRANSACTION_LIST'
  | 'CHANGE_CASE_STATUS'
  | 'EDIT_CASE_DATA'
  | 'POK_CASES'
  | 'POK_NEW_CASE'
  | 'POK_REPORTS'
  | 'POK_REPORTS_EXPORT'
  | 'POK_CORRESPONDENCE'
  | 'POK_ADMINS'
  | 'POK_ADMINS_RESET_PASSWORD'
  | 'POK_ALL_ROLES'
  | 'POK_ROLES'
  | 'POK_PERMISSIONS';

export const API_ENDPOINTS: { [key in ApiKeysType]: ApiEndpointsType } = {
  CSRF_TOKEN: {
    endpoint: `/sanctum/csrf-cookie`,
    method: ['GET'],
  },
  LOGGED: {
    endpoint: `/auth/logged`,
    method: ['GET'],
  },
  CARDS_LIST: {
    endpoint: `/card/list`,
    method: ['GET'],
  },
  CHECK_CARD: {
    endpoint: `/card/validate`,
    method: ['POST'],
  },
  DISCOUNTS_LIST: {
    endpoint: `/discount/list`,
    method: ['GET'],
  },
  EVENTS: {
    endpoint: `/event`,
    method: ['GET'],
  },
  EVENTS_CATEGORIES: {
    endpoint: `/event/categories`,
    method: ['GET'],
  },
  ORDER_TICKETS: {
    endpoint: `/order/new`,
    method: ['GET'],
  },
  POK_ORDER_TICKETS: {
    endpoint: `/{id}/order/new`,
    method: ['GET'],
  },
  ORDER_CREATE: {
    endpoint: `/order/create`,
    method: ['POST'],
  },
  POK_ORDER_CREATE: {
    endpoint: `/{id}/order/create`,
    method: ['POST'],
  },
  AUTH_REGISTER: {
    endpoint: `/auth/register`,
    method: ['POST'],
  },
  AUTH_VERIFY_EMAIL: {
    endpoint: `/auth/verify/{id}/{token}/{second_token}?signature={signature}`,
    method: ['POST'],
  },
  AUTH_LOGIN: {
    endpoint: `/auth/login`,
    method: ['POST'],
  },
  AUTH_REFRESH_TOKEN: {
    endpoint: `/auth/refresh-token`,
    method: ['GET'],
  },
  AUTH_LOGOUT: {
    endpoint: `/auth/logout`,
    method: ['POST'],
  },
  AUTH_FORGOT_PASSWORD: {
    endpoint: `/auth/forgot-password`,
    method: ['POST'],
  },
  AUTH_RESET_PASSWORD: {
    endpoint: `/auth/reset-password`,
    method: ['POST'],
  },
  AUTH_VERIFY_PASSWORD: {
    endpoint: `/auth/verify-password`,
    method: ['POST'],
  },
  AUTH_NEW_PASSWORD: {
    endpoint: `/auth/new-password`,
    method: ['POST'],
  },
  AUTH_TRANSFORM: {
    endpoint: `/myusers/account-transform`,
    method: ['POST'],
  },
  PROFILE_WIZARD: {
    endpoint: `/profile/wizard`,
    method: ['POST'],
  },
  PROFILE_DASHBOARD: {
    endpoint: `/profile/dashboard`,
    method: ['GET'],
  },
  PROFILE_MY_TICKETS: {
    endpoint: `/my-ticket`,
    method: ['GET'],
  },
  PROFILE_MY_TICKETS_PDF: {
    endpoint: `/order/{orderId}/pdf`,
    method: ['GET'],
  },
  PROFILE_MY_TICKETS_ORDER: {
    endpoint: `/order/{orderId}`,
    method: ['GET'],
  },
  PROFILE_MY_CARDS: {
    endpoint: `/card`,
    method: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  PROFILE_MY_CARDS_HISTORY: {
    endpoint: `/card/{id}/history`,
    method: ['GET'],
  },
  PROFILE_MY_DATA: {
    endpoint: `/profile/data`,
    method: ['GET'],
  },
  PROFILE_DISCOUNT: {
    endpoint: `/profile/discount`,
    method: ['POST'],
  },
  PROFILE_MY_DATA_UPDATE: {
    endpoint: `/profile/data/personal/update`,
    method: ['PUT'],
  },
  PROFILE_MY_DATA_ADDRESS_REGISTERED_UPDATE: {
    endpoint: `/profile/data/address-registered/update`,
    method: ['PUT'],
  },
  PROFILE_MY_DATA_ADDRESS_RESIDENTAL_UPDATE: {
    endpoint: `/profile/data/address-residential/update`,
    method: ['PUT'],
  },
  PROFILE_MY_DATA_CHANGE_PASSWORD: {
    endpoint: `/profile/data/change-password`,
    method: ['PUT'],
  },
  PROFILE_MY_DATA_HISTORY: {
    endpoint: `/profile/data/history`,
    method: ['GET'],
  },
  PROFILE_MY_USERS: {
    endpoint: `/myusers`,
    method: ['GET', 'POST', 'DELETE'],
  },
  PROFILE_ALL_USERS: {
    endpoint: `/myusers/list`,
    method: ['GET', 'POST', 'DELETE'],
  },
  PROFILE_MY_USERS_TRANSFORM: {
    endpoint: `/myusers/{id}/transform`,
    method: ['POST'],
  },
  PROFILE_MY_USERS_UPDATE: {
    endpoint: `/myusers/{id}/update`,
    method: ['PUT'],
  },
  PROFILE_MY_EVENTS: {
    endpoint: `/event/my-events`,
    method: ['GET'],
  },
  PROFILE_MY_EVENTS_ORDER: {
    endpoint: `/order/create/event`,
    method: ['POST'],
  },
  PROFILE_MY_CASES: {
    endpoint: `/cases`,
    method: ['GET', 'POST', 'PUT'],
  },
  PROFILE_MY_CASES_REFUND: {
    endpoint: `/cases/refund`,
    method: ['POST'],
  },
  PROFILE_MY_CASES_RESUME: {
    endpoint: `/cases/{id}/resume`,
    method: ['PUT'],
  },
  PROFILE_MY_CASES_CORRESPONDENCE: {
    endpoint: `/cases/{id}/correspondence`,
    method: ['POST'],
  },
  PROFILE_MY_CASES_CORRESPONDENCE_FILE: {
    endpoint: `/cases/{caseid}/correspondence/{messageid}/attachment`,
    method: ['GET'],
  },
  POK_USERS: {
    endpoint: `/customer`,
    method: ['GET', 'POST'],
  },
  POK_USERS_PROFILE_DATA: {
    endpoint: `/{id}/profile/data`,
    method: ['GET', 'POST'],
  },
  POK_PROFILE_MY_USERS: {
    endpoint: `/{id}/myusers`,
    method: ['GET', 'POST', 'DELETE'],
  },
  POK_PROFILE_MY_USERS_TRANSFORM: {
    endpoint: `/{id}/myusers/{userid}/transform`,
    method: ['POST'],
  },
  POK_CORRESPONDENCE: {
    endpoint: `/{userId}/cases/{id}/correspondence`,
    method: ['POST'],
  },
  POK_PROFILE_MY_USERS_UPDATE: {
    endpoint: `/{id}/myusers/{userid}/update`,
    method: ['PUT'],
  },
  POK_PROFILE_CASES: {
    endpoint: `/{id}/cases`,
    method: ['GET', 'POST'],
  },
  CUSTOMER_TICKETS: {
    endpoint: `/{id}/my-ticket/`,
    method: ['GET'],
  },
  POK_MY_TICKETS_PDF: {
    endpoint: `/{id}/order/{orderId}/pdf`,
    method: ['GET'],
  },
  CUSTOMER_TICKETS_LOCK: {
    endpoint: `/{id}/my-ticket/{ticketId}/lock`,
    method: ['POST'],
  },
  POK_CUSTOMER_EVENTS: {
    endpoint: `/{id}/event/my-events`,
    method: ['GET'],
  },
  PROFILE_WALLET: {
    endpoint: '/wallet',
    method: ['GET'],
  },
  PROFILE_USER_WALLET: {
    endpoint: '/wallet/{id}',
    method: ['GET'],
  },
  PROFILE_RECHARGE_WALLET: {
    endpoint: '/wallet/recharge-wallet',
    method: ['POST'],
  },
  PROFILE_USER_RECHARGE_WALLET: {
    endpoint: '/wallet/recharge-wallet/{id}',
    method: ['POST'],
  },
  PROFILE_ORDER_HISTORY: {
    endpoint: '/order',
    method: ['GET'],
  },
  POK_CUSTOMER_WALLET: {
    endpoint: '/{id}/wallet/',
    method: ['GET'],
  },
  POK_RECHARGE_CUSTOMER_WALLET: {
    endpoint: '/{id}/wallet/recharge-wallet',
    method: ['GET'],
  },
  POK_CUSTOMER_DATA: {
    endpoint: `/{id}/profile/data`,
    method: ['GET'],
  },
  POK_TICKETS_ORDER: {
    endpoint: `/{id}/order/{orderId}`,
    method: ['GET'],
  },
  POK_CUSTOMER_HISTORY_CHANGES: {
    endpoint: `/{id}/profile/data/history`,
    method: ['GET'],
  },
  POK_CUSTOMER_TRANSACTION_HISTORY: {
    endpoint: `/{id}/order`,
    method: ['GET'],
  },
  POK_UPDATE_CUSTOMER_GENERAL_DATA: {
    endpoint: `/{id}/profile/data/personal/update`,
    method: ['PUT'],
  },
  POK_CREATE_CUSTOMER_DISCOUNTS: {
    endpoint: `/{id}/profile/data/document`,
    method: ['POST'],
  },
  POK_UPDATE_CUSTOMER_RESIDENTIAL_ADDRESS: {
    endpoint: `/{id}/profile/data/address-residential/update`,
    method: ['PUT'],
  },
  POK_UPDATE_CUSTOMER_REGISTERED_ADDRESS: {
    endpoint: `/{id}/profile/data/address-registered/update`,
    method: ['PUT'],
  },
  POK_UPDATE_CUSTOMER_STATUS: {
    endpoint: `/{id}/profile/data/status`,
    method: ['PUT'],
  },
  POK_RESET_PASSWORD: {
    endpoint: `/{id}/profile/data/reset-password`,
    method: ['POST'],
  },
  POK_CUSTOMER_CARDS_LIST: {
    endpoint: `/{id}/card/list`,
    method: ['GET'],
  },
  POK_CUSTOMER_CARDS: {
    endpoint: `/{id}/card/`,
    method: ['GET', 'POST'],
  },
  POK_CUSTOMER_CARD_LOCK: {
    endpoint: `/{id}/card/{cardId}/lock`,
    method: ['POST'],
  },
  POK_CUSTOMER_ALL_USERS: {
    endpoint: `/{id}/myusers/list`,
    method: ['GET'],
  },
  POK_CUSTOMER_ALL_USERS_WALLET: {
    endpoint: '/{id}/wallet/recharge-wallet/{userId}',
    method: ['POST'],
  },
  POK_ALL_CUSTOMERS: {
    endpoint: '/customer/list',
    method: ['GET'],
  },
  TRANSACTION_DOWNLOAD_PDF: {
    endpoint: `/order/{id}/pdf`,
    method: ['GET'],
  },
  POK_TRANSACTION_DOWNLOAD_PDF: {
    endpoint: `/{userId}/order/{id}/pdf`,
    method: ['GET'],
  },
  TRANSACTION_LIST_DOWNLOAD_PDF: {
    endpoint: `/order/pdf`,
    method: ['GET'],
  },
  EVENT_DOWNLOAD_PDF: {
    endpoint: `/event/my-events/{eventId}/{orderId}/pdf`,
    method: ['GET'],
  },
  POK_CASES_LIST: {
    endpoint: '/cases/list/all',
    method: ['GET'],
  },
  POK_NEW_CASE: {
    endpoint: '/{userId}/cases',
    method: ['POST'],
  },
  EMPLOYEE_LIST: {
    endpoint: '/common/employee',
    method: ['GET'],
  },
  USER_TRANSACTION_LIST: {
    endpoint: '/order/list',
    method: ['GET'],
  },
  POK_CASES: {
    endpoint: '/{userId}/cases/{caseId}',
    method: ['GET'],
  },
  CHANGE_CASE_STATUS: {
    endpoint: '/{userId}/cases/{caseId}/status',
    method: ['POST'],
  },
  EDIT_CASE_DATA: {
    endpoint: '/{userId}/cases/{caseId}',
    method: ['PUT'],
  },
  POK_REPORTS: {
    endpoint: `/reports/{type}`,
    method: ['GET'],
  },
  POK_REPORTS_EXPORT: {
    endpoint: `/reports/{type}/export`,
    method: ['GET'],
  },
  POK_ADMINS: {
    endpoint: `/admin/employee/user`,
    method: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  POK_ADMINS_RESET_PASSWORD: {
    endpoint: '/admin/employee/user/{id}/reset-password',
    method: ['POST'],
  },
  POK_ALL_ROLES: {
    endpoint: `/admin/employee/role`,
    method: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  POK_ROLES: {
    endpoint: `/admin/employee/role/list`,
    method: ['GET'],
  },
  POK_PERMISSIONS: {
    endpoint: `/admin/employee/permission/list`,
    method: ['GET'],
  },
};
