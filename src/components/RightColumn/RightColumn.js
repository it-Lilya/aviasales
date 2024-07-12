import classes from './RightColumn.module.scss';
import Card from '../Card/Card';
import { v4 as uuidv4 } from 'uuid';

export default function RightColumn({ data = [], sorterHandler, limits }) {
  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <ul className="container__filters" onClick={(e) => sorterHandler(e, classes.active)}>
          <li className={`cheap filter ${classes.active}`}>Самый дешевый</li>
          <li className="fast filter">Самый быстрый</li>
          <li className="optimal filter">Оптимальный</li>
        </ul>
      </nav>
      {data.map((elem) => {
        return (
           <Card elem={elem} key={uuidv4()} />
        )
      })}
      <button className={classes.more} onClick={limits}>Показать еще 5 билетов</button>
    </div>
  )
}
