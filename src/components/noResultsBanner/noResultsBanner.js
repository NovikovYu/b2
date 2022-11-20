import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import classes from './../app/app.module.scss'

const NoResultsBanner = () => {
  const [isVisible, setIsVisible] = useState(true)
  const isCheckedFilterAll = useSelector((state) => state.stopAll)
  const isCheckedFilter0 = useSelector((state) => state.stop0)
  const isCheckedFilter1 = useSelector((state) => state.stop1)
  const isCheckedFilter2 = useSelector((state) => state.stop2)
  const isCheckedFilter3 = useSelector((state) => state.stop3)
  useEffect(() => {
    if (isCheckedFilterAll || isCheckedFilter0 || isCheckedFilter1 || isCheckedFilter2 || isCheckedFilter3) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [isCheckedFilterAll, isCheckedFilter0, isCheckedFilter1, isCheckedFilter2, isCheckedFilter3])
  //   показываем если ни один фильтр не выбран
  if (isVisible) {
    return <p className={classes['no-results-bunner']}>Рейсов, подходящих под заданные фильтры, не найдено</p>
  } else {
    return null
  }
}

export default NoResultsBanner
