export default {
  debug: process.env.NODE_ENV !== 'production',
  fallbackLng: 'es',
  supportedLngs: ['en', 'es'],
  defaultNS: 'common',
  react: { useSuspense: false },
};
