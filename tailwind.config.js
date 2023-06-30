/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'rgb(var(--color-white) / <alpha-value>)',
      black: 'rgb(var(--color-black) / <alpha-value>)',
      navy: 'rgb(var(--color-navy) / <alpha-value>)',
      gray: 'rgb(var(--color-gray) / <alpha-value>)',
      cloud: 'rgb(var(--color-cloud) / <alpha-value>)',
      lightgray: 'rgb(var(--color-lightgray) / <alpha-value>)',
      warning: 'rgb(var(--color-warning) / <alpha-value>)',
      error: 'rgb(var(--color-error) / <alpha-value>)',
      success: 'rgb(var(--color-success) / <alpha-value>)',
    },
    screens: {
      xs: '360px',
      sm: '576px',
      md: '768px',
      lg: '1240px',
      xl: '1420px',
      '2xl': '1920px',
    },

    extend: {
      animation: {
        'pulse-progress-bar-success': 'pulse-success 2s linear infinite',
      },
      fontFamily: {
        primary: ['DM Sans', ...fontFamily.sans],
      },
      fontSize: {
        sm: '1rem', //16px
        base: '1.125rem', // 18px
        md: '1.5rem', // 24px
        lg: '2.22rem', // 36px
        xl: '2.625rem', // 42px
      },
      lineHeight: {
        base: '1.5rem', // 24px
        md: '1.938rem', // 31px
        lg: '2.938rem', // 47px
        xl: '3.438rem', // 55px
      },
      width: {
        md: '840px',
        lg: '1120px',
        88: '22rem',
        100: '400px',
      },
      height: {
        18: '72px',
      },
      maxWidth: {
        '4xs': '100px',
        '3xs': '150px',
        xxs: '200px',
        xs: '380px',
        articleCard: '400px',
        subMd: '810px',
      },
      minHeight: {
        sm: '300px',
      },
      minWidth: {
        xxs: '260px',
        xs: '292px',
        sm: '380px',
        inputModal: '353px',
        inputSize: '292px',
      },
      borderRadius: {
        xs: '4px',
        '1xl': '16px',
        '2xl': '20px',
        '3xl': '25px',
        full: '9999px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
