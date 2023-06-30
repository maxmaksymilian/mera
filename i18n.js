module.exports = {
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  pages: {
    '*': ['common', 'wizard', 'form', 'list', 'history'],
    'rgx:^/wydarzenia': ['events'],
  },
};
