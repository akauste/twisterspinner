import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const ConfigureSpeach = (props) => {
  const { t } = useTranslation();
  const {setUtterance} = props;
  const [speach, setSpeach] = useState(true);

  const voiceRef = useRef();
  const synth = window.speechSynthesis;
  if(!synth) {
    return <p>{t('Speach synthetisizer is unavaillable')}</p>;
  }
  const voices = synth.getVoices();

  const toggleSpeach = () => {
    setSpeach(!speach);
  }

  const voiceChangeHandler = (event) => {
    event.preventDefault();
    setUtterance({ voice: voices[voiceRef.current.value] });
  };

  return (<div>
    <div>
      <label>{t('Speach synthetisizer on')}</label>
      <input type="checkbox" checked={speach} onChange={toggleSpeach} />
    </div>
    { speach && (
    <div className="">
      <label>{t('Voice')}</label>
      <select ref={voiceRef} onChange={voiceChangeHandler}>
        { voices.map( (v,idx) => <option key={idx} value={ idx }>{ v.name } ({ v.lang })</option> )}
      </select>
      </div>
    )}
  </div>);
}
export default ConfigureSpeach;