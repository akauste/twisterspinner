import { useRef } from "react";

const ConfigureSpeach = (props) => {
  const {setUtterance} = props;

  const voiceRef = useRef();
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const voiceChangeHandler = (event) => {
    event.preventDefault();
    setUtterance({ voice: voices[voiceRef.current.value] });
  };

  return (<div>
    <label>Voice </label>
    <select ref={voiceRef} onChange={voiceChangeHandler}>
      { voices.map( (v,idx) => <option key={idx} value={ idx }>{ v.name } ({ v.lang })</option> )}
    </select>
  </div>);
}
export default ConfigureSpeach;