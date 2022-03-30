import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: (localStorage.getItem('twister-spinner-language') || ''),
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
          'Press spin or start button': 'Paina pyöritä nappia, tai Aloita nappia',
          'Stop': 'Lopeta',
          'Start': 'Aloita',
          "Don't speak": 'Älä puhu',
          'Speak': 'Puhu',
          'Time between spins': 'Pyörityksen väli',
          'seconds': 'sekuntia',

          'Speach synthetisizer is unavaillable': 'Puhesyntetisaattori ei ole käytössä',
          'Speach synthetisizer on': 'Puhe syntetisaattori päällä',
          'Voice': 'Ääni',
        },
      }
    }
  });

export default i18n;