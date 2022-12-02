import { Outlet } from 'react-router-dom'

import Header from '../header/header'
import ErrorMessage from '../errorMessage/errorMessage'
import SuccessMessage from '../successMessage/successMessage'
import Spin from '../spin/spin'
import classes from '../../styles/app.module.scss'

const Layout = () => {
  return (
    <>
      <Header />

      <main className={classes['main']}>
        <ErrorMessage />
        <SuccessMessage />
        <Spin />
        <Outlet />
      </main>
    </>
  )
}

export { Layout }
