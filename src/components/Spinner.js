import { useRef, useState } from "react";
import Clock from "./Clock";

const limbs  = ['Vasen käsi', 'Oikea käsi', 'Vasen jalka', 'Oikea jalka'];
const colors = ['vihreä', 'sininen', 'keltainen', 'punainen', 'ilmaan'];

const results = [];
for(const l of limbs) {
  for(const c of colors) {
    results.push(l +' '+ c);
  }
}
console.log(results);

const Spinner = () => {
  const secondsRef = useRef();
  const [result, setResult] = useState('Paina pyöritä nappia, tai Aloita nappia');
  const [timer, setTimer] = useState();
  const [speak, setSpeak] = useState(true);
  const [loopStart, setLoopStart] = useState();

  const sayResult = (text) => {
    if(window.SpeechSynthesis) {
      let utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const spinHandler = (event) => {
    if(event) {
      event.preventDefault();
    }
    let res = results[Math.floor(Math.random() * results.length)];
    setResult(res);
    if(speak) {
      sayResult(res);
    }
  }
  const setTimerHandler = (event) => {
    if(timer) {
      clearInterval(timer);
      setTimer(null);
      console.log('Stop the timer');
    }
    else {
      // Do the first round immediately, then the next one timed
      spinHandler();
      setLoopStart(new Date());
      console.log('Start the timer');
      setTimer(setInterval(() => { setLoopStart(new Date()); spinHandler() }, +secondsRef.current.value * 1000));
    }
  };

  const toggleSpeak = (event) => {
    event.preventDefault();
    setSpeak(speak => !speak);
  }

  return <>
    <p>{ result }</p>
    <button type="button" onClick={spinHandler}>Pyöritä</button>
    <h3>Pyöritä automaattisesti</h3>
    { timer && loopStart && <p>Timer: <Clock startTime={ loopStart } maxTime={ secondsRef.current.value } isRunning={true} /></p> }
    Pyörityksen väli <input type="number" defaultValue="30" ref={secondsRef} /> sekuntia
    <button type="button" onClick={setTimerHandler}>{ timer ? 'Lopeta' : 'Aloita'}</button>
    <button type="button" onClick={toggleSpeak}>{speak ? 'Älä puhu' : 'Puhu'}</button>
  </>;
}

export default Spinner;