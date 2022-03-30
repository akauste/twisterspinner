import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from './Clock.module.css';

const Clock = (props) => {
  const {startTime, maxTime, isRunning} = props;
  const [time, setTime] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    let interval;
    console.log('Clock useEffect:', maxTime * 1000, startTime, (+maxTime - (new Date() - startTime)));
    const updateTime = () => setTime(+maxTime*1000 - (new Date() - startTime));

    if(interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => { updateTime() }, 100);
    return () => { clearInterval(interval) };
  }, [maxTime, startTime]);

  if(!isRunning) {
    return <span>{t('Stopped')}</span>;
  }

  return <span className={classes.clock}>{ (time/1000).toFixed(2).replace('.', ':') }</span>;
};
export default Clock;