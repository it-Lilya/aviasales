import classes from './LeftColumn.module.scss';

export default function LeftColumn({ putChecked }) {
  // function putChecked(e) {
  return (
    <div className={classes.container}>
      <div className={classes.header}>количество пересадок</div>
      <ul onClick={(e) => putChecked(e)}>
        <li className={classes.element}><input className="input input__all" type="checkbox" value="all"/>Все</li>
        <li className={classes.element}><input className="input" type="checkbox" value="no"/>Без пересадок</li>
        <li className={classes.element}><input className="input" type="checkbox" value="first"/>1 пересадка</li>
        <li className={classes.element}><input className="input" type="checkbox" value="two"/>2 пересадки</li>
        <li className={classes.element}><input className="input" type="checkbox" value="three"/>3 пересадки</li>
      </ul>
    </div>
  )
}
