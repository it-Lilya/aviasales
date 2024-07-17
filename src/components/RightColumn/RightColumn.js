import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import Card from '../Card/Card';

import classes from './RightColumn.module.scss';

export default function RightColumn({ data = [], sorterHandler, limits, arr }) {
  // const [resultData, setResultData] = useState(data);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    if (arr[0] === 'none') {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [arr]);
  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <ul className="container__filters" onClick={(e) => sorterHandler(e, classes.active)}>
          <li className={`cheap filter ${classes.active}`}>Самый дешевый</li>
          <li className="fast filter">Самый быстрый</li>
          <li className="optimal filter">Оптимальный</li>
        </ul>
      </nav>
      {flag ? (
        <>
          {data.map((elem) => {
            return <Card elem={elem} key={uuidv4()} />;
          })}
          <button className={classes.more} onClick={limits}>
            Показать еще 5 билетов
          </button>
        </>
      ) : (
        <Alert
          className={classes.alert}
          message="Рейсов, подходящих под заданные фильтры, не найдено"
          type="info"
        ></Alert>
      )}
    </div>
  );
}
