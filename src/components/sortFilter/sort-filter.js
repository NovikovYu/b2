import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import classes from '../app/app.module.scss'
import * as actions from '../../redux/actions'

const SortFilter = ({ counter, inc1, inc2, inc3 }) => {
  let classes1 = `${classes['price-filter__btn']}`
  let classes2 = `${classes['price-filter__btn']}`
  let classes3 = `${classes['price-filter__btn']}`
  let classesActive = `${classes['price-filter__btn']} ${classes['active']}`
  // if (counter === 2) {
  //   classes2 = classesActive
  // }

  // console.log('counter.sortFilterMode >>', counter.sortFilterMode)
  switch (counter.sortFilterMode) {
    case 1:
      classes1 = classesActive
      break
    case 2:
      classes2 = classesActive
      break
    case 3:
      classes3 = classesActive
      break
  }

  return (
    <ul className={classes['price-filter']}>
      <li className={classes['price-filter__item']}>
        <button className={classes1} type="button" onClick={inc1}>
          {counter.a} Самый дешевый
        </button>
      </li>

      <li className={classes['price-filter__item']}>
        <button className={classes2} type="button" onClick={inc2}>
          Самый быстрый
        </button>
      </li>

      <li className={classes['price-filter__item']}>
        <button className={classes3} type="button" onClick={inc3}>
          Оптимальный
        </button>
      </li>

      {/* <li className={classes['price-filter__item']}>
        <button className={classes3} type="button" onClick={inc100}>
          АД100
        </button>
      </li> */}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    counter: state,
  }
}

export default connect(mapStateToProps, actions)(SortFilter)
