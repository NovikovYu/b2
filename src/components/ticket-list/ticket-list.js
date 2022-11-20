import { useSelector } from 'react-redux'
import uniqid from 'uniqid'

import Ticket from '../ticket/ticket'
import classes from '../app/app.module.scss'

const TicketList = () => {
  let tickets = useSelector((state) => state.tickets)
  let ourTickets = JSON.parse(JSON.stringify(tickets))
  const numOfShowingTickets = useSelector((state) => state.numOfShowingTickets)
  const sortFilterMode = useSelector((state) => state.sortFilterMode)
  const stopAll = useSelector((state) => state.stopAll)
  const stop0 = useSelector((state) => state.stop0)
  const stop1 = useSelector((state) => state.stop1)
  const stop2 = useSelector((state) => state.stop2)
  const stop3 = useSelector((state) => state.stop3)
  // сортируем билеты в зависимости от количества пересадок
  let sortedTickets = []
  if (stopAll) {
    sortedTickets = ourTickets.filter((ticket) => 0 <= ticket.segments[0].stops.length <= 3)
  } else if (stop0 && stop1) {
    sortedTickets = ourTickets.filter(
      (ticket) => ticket.segments[0].stops.length === 0 || ticket.segments[0].stops.length === 1
    )
  } else if (stop0 && stop2) {
    sortedTickets = ourTickets.filter(
      (ticket) => ticket.segments[0].stops.length === 0 || ticket.segments[0].stops.length === 2
    )
  } else if (stop0 && stop3) {
    sortedTickets = ourTickets.filter(
      (ticket) => ticket.segments[0].stops.length === 0 || ticket.segments[0].stops.length === 3
    )
  } else if (stop1 && stop2) {
    sortedTickets = ourTickets.filter(
      (ticket) => ticket.segments[0].stops.length === 1 || ticket.segments[0].stops.length === 2
    )
  } else if (stop1 && stop3) {
    sortedTickets = ourTickets.filter(
      (ticket) => ticket.segments[0].stops.length === 1 || ticket.segments[0].stops.length === 3
    )
  } else if (stop2 && stop3) {
    sortedTickets = ourTickets.filter(
      (ticket) => ticket.segments[0].stops.length === 2 || ticket.segments[0].stops.length === 3
    )
  } else if (stop0) {
    sortedTickets = ourTickets.filter((ticket) => ticket.segments[0].stops.length === 0)
  } else if (stop1) {
    sortedTickets = ourTickets.filter((ticket) => ticket.segments[0].stops.length === 1)
  } else if (stop2) {
    sortedTickets = ourTickets.filter((ticket) => ticket.segments[0].stops.length === 2)
  } else if (stop3) {
    sortedTickets = ourTickets.filter((ticket) => ticket.segments[0].stops.length === 3)
  }
  // отрезаем часть билетов, которую покажем
  let shortTickets = sortedTickets.slice(0, numOfShowingTickets)
  // сортируем билеты в зависимости от верхнего фильтра
  function comparePrice(a, b) {
    if (a.price < b.price) {
      return -1
    }
    if (a.price > b.price) {
      return 1
    }
    return 0
  }
  function compareTime(a, b) {
    if (a.segments[0].duration < b.segments[0].duration) {
      return -1
    }
    if (a.segments[0].duration > b.segments[0].duration) {
      return 1
    }
    return 0
  }
  function compareOurCommission(a, b) {
    if (a.price > b.price) {
      return -1
    }
    if (a.price < b.price) {
      return 1
    }
    return 0
  }
  if (sortFilterMode === 1) {
    shortTickets = shortTickets.sort(comparePrice)
  } else if (sortFilterMode === 2) {
    shortTickets = shortTickets.sort(compareTime)
  } else if (sortFilterMode === 3) {
    shortTickets = shortTickets.sort(compareOurCommission)
  }
  const ticketListContent = shortTickets.map((ticketInfo) => {
    return <Ticket ticketInfo={ticketInfo} key={uniqid()} />
  })
  return <ul className={classes.cards}>{ticketListContent}</ul>
}

export default TicketList
