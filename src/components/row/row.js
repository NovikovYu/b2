import classes from '../app/app.module.scss'

const Row = (props) => {
  let startTime = new Date(props.rowInfo.date)
  let startHours = startTime.getHours()
  let startMinutes = startTime.getMinutes()
  let stertString = `${startHours}:${startMinutes}`
  let finishTime = new Date(startTime.setMinutes(startTime.getMinutes() + props.rowInfo.duration))
  let finishHours = finishTime.getHours()
  let finishMinutes = finishTime.getMinutes()
  let finishString = `${finishHours}:${finishMinutes}`
  let stopsString = 'без пересадок'
  if (props.rowInfo.stops.length) {
    if (props.rowInfo.stops.length === 1) {
      stopsString = `${props.rowInfo.stops.length} пересадка`
    } else if (2 <= props.rowInfo.stops.length <= 4) {
      stopsString = `${props.rowInfo.stops.length} пересадки`
    } else if (5 <= props.rowInfo.stops.length) {
      stopsString = `${props.rowInfo.stops.length} пересадок`
    }
  }
  return (
    <div className={classes['cards__ticket-row']}>
      <div className={classes['cards__ticket-info-box']}>
        <span className={classes['cards__ticket-info-box-title']}>
          {props.rowInfo.origin} – {props.rowInfo.destination}
        </span>
        <span className={classes['cards__ticket-info-box-text']}>
          {stertString} – {finishString}
        </span>
      </div>
      <div className={classes['cards__ticket-info-box']}>
        <span className={classes['cards__ticket-info-box-title']}>В пути</span>
        <span className={classes['cards__ticket-info-box-text']}>
          {Math.floor(props.rowInfo.duration / 60)}ч
          {props.rowInfo.duration - Math.floor(props.rowInfo.duration / 60) * 60}м
        </span>
      </div>
      <div className={classes['cards__ticket-info-box']}>
        <span className={classes['cards__ticket-info-box-title']}>{stopsString}</span>
        <span className={classes['cards__ticket-info-box-text']}>{props.rowInfo.stops.join(', ')}</span>
      </div>
    </div>
  )
}

export default Row
