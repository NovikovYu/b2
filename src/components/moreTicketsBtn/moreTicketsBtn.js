import { useSelector, useDispatch } from 'react-redux'

import { showMoreTickets } from '../../redux/actions'

import classes from './../app/app.module.scss'

// import { useDispatch, useSelector } from 'react-redux'

const MoreTicketsBtn = () => {
  // console.log('MoreTicketsBtn props >> ', props)
  const tickets = useSelector((state) => state.tickets)
  const dispatch = useDispatch()

  const add5Tickets = () => {
    dispatch(showMoreTickets())
  }

  return (
    <button className={classes['more-tickets-btn']} onClick={add5Tickets} type="button">
      Показать еще 5 билетов из {tickets.length}
    </button>
  )
}

export default MoreTicketsBtn
