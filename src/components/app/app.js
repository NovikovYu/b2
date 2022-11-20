import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import SortFilter from '../sortFilter/sort-filter'
import TicketList from '../ticket-list/ticket-list'
import MoreTicketsBtn from '../moreTicketsBtn/moreTicketsBtn'
import StopsFilter from '../stopsFilter/stopsFilter'
import LoadingSpiner from '../loader/loader'
import NoResultsBanner from '../noResultsBanner/noResultsBanner'
import { loadMoreTickets } from '../../redux/actions'

import classes from './app.module.scss'
import Logo from './logo.png'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMoreTickets())
  }, [])
  return (
    <>
      <div className={classes.header}>
        <div className={classes.container}>
          <div className={classes['header__inner']}>
            <a className={classes['header__link']} href="#">
              <img className={classes['header__logo']} src={Logo} alt="логотип авиасейлс"></img>
            </a>
          </div>
        </div>
      </div>

      <main className={classes.content}>
        <div className={classes.container}>
          <div className={classes['content__inner']}>
            <StopsFilter />

            <div className={classes['content__main-column']}>
              <SortFilter />

              <LoadingSpiner />

              <NoResultsBanner />

              <TicketList />

              <MoreTicketsBtn />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export default App
