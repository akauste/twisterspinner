import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
/*        translation: {
          'Spin' : 'Spin the dial',
        }*/
      },
      fi: {
        translation: { 
          'Spin' : 'Pyöritä',
          'Spin automatically': 'Pyöritä automaattisesti',
        },
      }
    }
  });

export default i18n;