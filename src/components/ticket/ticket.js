import uniqid from 'uniqid'

import classes from '../app/app.module.scss'
import Row from '../row/row'

const Ticket = (props) => {
  const rows = props.ticketInfo.segments.map((rowInfo) => {
    return <Row rowInfo={rowInfo} key={uniqid()} />
  })
  const logoLink = `//pics.avs.io/99/36/{${props.ticketInfo.carrier}}.png`
  return (
    <ul className={classes.cards}>
      <li className={classes['cards__item']}>
        <div className={classes['cards__top']}>
          <span className={classes['cards__prise']}>{props.ticketInfo.price} Р</span>

          <a className={classes['cards__logo-link']} href="#">
            <img className={classes['cards__logo']} src={logoLink} alt="логотип авиакомпании"></img>
          </a>
        </div>
        {rows}
      </li>
    </ul>
  )
}

export default Ticket
