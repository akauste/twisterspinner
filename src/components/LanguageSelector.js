import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const currentLanguage = localStorage.getItem('twister-spinner-language');
  console.log('CUR LANG: '+ currentLanguage);
  function setLanguage(lang) {
    console.log('SET LANG: '+ lang);
    localStorage.setItem('twister-spinner-language', lang);
    i18n.changeLanguage(lang);
  }
  return (
    <select defaultValue={currentLanguage || ''} onClick={(e) => { setLanguage(e.target.value) }}>
      <option value="en">English</option>
      <option value="fi">Suomi</option>
    </select>);
}
export default LanguageSelector;