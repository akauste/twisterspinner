import { useRef, useState } from "react";

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

  const spinHandler = (event) => {
    if(event) {
      event.preventDefault();
    }
    let res = results[Math.floor(Math.random() * results.length)];
    setResult(res);
  }
  const setTimerHandler = (event) => {
    if(timer) {
      clearInterval(timer);
      setTimer(null);
      console.log('Stop the timer');
    }
    else {
      console.log('Start the timer');
      setTimer(setInterval(() => { spinHandler() }, +secondsRef.current.value * 1000));
    }
  };

  return <>
    <p>{ result }</p>
    <button type="button" onClick={spinHandler}>Pyöritä</button>
    <h3>Pyöritä automaattisesti</h3>
    Pyörityksen väli <input type="number" defaultValue="30" ref={secondsRef} /> sekuntia
    <button type="button" onClick={setTimerHandler}>{ timer ? 'Lopeta' : 'Aloita'}</button>
  </>;
}

export default Spinner;