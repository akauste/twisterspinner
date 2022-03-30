import { useRef, useState } from "react";

const ConfigureSpeach = (props) => {
  const {setUtterance} = props;
  const [speach, setSpeach] = useState(true);

  const voiceRef = useRef();
  const synth = window.speechSynthesis;
  if(!synth) {
    return <p>Äänisyntetisaattori ei ole käytössä</p>;
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
      <label>Puhe syntetisaattori</label>
      <input type="checkbox" checked={speach} onChange={toggleSpeach} />
    </div>
    { speach && (
    <div className="">
      <label>Voice </label>
      <select ref={voiceRef} onChange={voiceChangeHandler}>
        { voices.map( (v,idx) => <option key={idx} value={ idx }>{ v.name } ({ v.lang })</option> )}
      </select>
      </div>
    )}
  </div>);
}
export default ConfigureSpeach;