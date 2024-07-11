import classes from './Card.module.scss';
import {format} from 'date-fns';
import { useEffect, useState } from 'react';

export default function Card({ elem }) {
  const [timeOffset, setTimeOffset] = useState(0);
  function convertMinutesToHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let hourStr;
    if (hours > 4 && hours <= 20) {
      hourStr = 'часов';
    } else if (hours <= 4 || hours > 21) {
      hourStr = 'часа';
    } else if (hours === 21) {
      hourStr = 'час';
    }
    return `${hours} ${hourStr} ${minutes} минут`;
  }
  function time() {
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset();
    setTimeOffset(timezoneOffset * 60000);
  }
  useEffect(() => time(), []);
  function difference(d, e) {
    return format(new Date(new Date(e).getTime() + d * 60000 + timeOffset), 'HH:mm');
  }
  function timeFormat(e) {
    return format(new Date(new Date(e).getTime() - Math.abs(timeOffset)), 'HH:mm');
  }
  function priceFormat(str) {
    const arrPrice = String(str).split('');
    return `${(arrPrice.slice(0, arrPrice.length - 3)).join('')} ${(arrPrice.slice(arrPrice.length - 3).join(''))}`
  }
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <p className={classes.price}>{priceFormat(elem.price)} P</p>
        <img src={`https://pics.avs.io/99/36/${elem.carrier}.png`} width="99" height="36"></img>
      </div>
      <div className={classes.main}>
        <div className={classes.information}>
          <div className={classes.first}>
            <p className={classes.direction}>{elem.segments[0].origin} - {elem.segments[1].origin} </p>
            <p className={classes.time}>{timeFormat(elem.segments[0].date)} - {difference(elem.segments[0].duration, elem.segments[0].date)}</p>
          </div>
          <div className={classes.path}>
            <p className={classes.path_header}>В пути</p>
            <p className={classes.path_time}>{convertMinutesToHoursAndMinutes(elem.segments[0].duration)}</p>
          </div>
          <div className={classes.transplants}>
            <p className={classes.transplants_header}>{elem.segments[0].stops.length} пересадки</p>
            <div className={classes.transplants_container}>
              {elem.segments[0].stops.map((r) => {
                return <p className={classes.transplants_info} key={Math.random()}>{r}</p>
              })}
          </div>
          </div>
        </div>
      </div>
      <div className={classes.main}>
        <div className={classes.information}>
          <div className={classes.first}>
            <p className={classes.direction}>{elem.segments[1].origin} - {elem.segments[0].origin}</p>
            <p className={classes.time}>{timeFormat(elem.segments[1].date)} - {difference(elem.segments[1].duration, elem.segments[1].date)}</p>
          </div>
          <div className={classes.path}>
            <p className={classes.path_header}>В пути</p>
            <p className={classes.path_time}>{convertMinutesToHoursAndMinutes(elem.segments[1].duration)}</p>
          </div>
          <div className={classes.transplants}>
            <p className={classes.transplants_header}>{elem.segments[1].stops.length} пересадки</p>
            <div className={classes.transplants_container}>
              {elem.segments[1].stops.map((r) => {
                return <p className={classes.transplants_info}  key={Math.random()}>{r}</p>
              })}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}