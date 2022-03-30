import { useRef, useState } from "react";
import { useTranslation } from 'react-i18next';

import classes from './Spinner.module.css';

import Clock from "./Clock";
import SVGDial from "./SVGDial";

const limbs  = ['Oikea käsi', 'Oikea jalka', 'Vasen jalka', 'Vasen käsi'];
const colors = ['punainen', 'vihreä', 'sininen', 'keltainen', 'ilmaan'];

const results = [];
for(const l of limbs) {
  for(const c of colors) {
    results.push(l +' '+ c);
  }
}
console.log(results);

const Spinner = (props) => {
  const { t } = useTranslation();
  const secondsRef = useRef();
  const [result, setResult] = useState();
  const [timer, setTimer] = useState();
  const [speak, setSpeak] = useState(true);
  const [loopStart, setLoopStart] = useState();

  const sayResult = (text) => {
    if(window.SpeechSynthesis) {
      let utterance = new SpeechSynthesisUtterance(text);
      if(props.utterance.voice) {
        utterance.voice = props.utterance.voice;
        console.log(props.utterance.voice.name);
      }
      else {
        console.log('Voice not set', props);
      }
      speechSynthesis.speak(utterance);
    }
  };

  const spinHandler = (event) => {
    if(event) {
      event.preventDefault();
    }
    const res = Math.floor(Math.random() * results.length);
    setResult(res);
    if(speak) {
      sayResult(results[res]);
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
    <SVGDial position={result} />
    <p id="result">{ results[result] || t('Press spin or start button') }</p>
    <button type="button" className={classes.button} aria-label="spin" onClick={spinHandler}>{t('Spin')}</button>
    <h3>{t('Spin automatically')}</h3>
    { timer && loopStart && <p>{t('Until next spin')}: <Clock startTime={ loopStart } maxTime={ secondsRef.current.value } isRunning={true} /></p> }
    <p>{t('Time between spins')}
      <input type="number" class={classes.inputNumber} defaultValue="30" ref={secondsRef} disabled={ !!timer } /> {t('seconds')}
    </p>
    <button type="button" className={classes.button} onClick={setTimerHandler}>{ timer ? t('Stop') : t('Start')}</button>
    <button type="button" className={classes.button} onClick={toggleSpeak}>{speak ? t("Don't speak") : t('Speak')}</button>
  </>;
}

export default Spinner;