export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.SHOW_LOGGER === 'true' ?? false;

export const isBrowser = typeof window !== 'undefined';
