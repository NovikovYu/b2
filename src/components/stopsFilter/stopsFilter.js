import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import classes from '../app/app.module.scss'
import { checkStopAll, checkStop0, checkStop1, checkStop2, checkStop3 } from '../../redux/actions'

const StopsFilter = () => {
  // получаем и рендерим состояние чекбокса
  const [cheAll, setCheAll] = useState(false)
  const [che0, setChe0] = useState(false)
  const [che1, setChe1] = useState(false)
  const [che2, setChe2] = useState(false)
  const [che3, setChe3] = useState(false)
  const scAll = useSelector((state) => state.stopAll)
  const sc0 = useSelector((state) => state.stop0)
  const sc1 = useSelector((state) => state.stop1)
  const sc2 = useSelector((state) => state.stop2)
  const sc3 = useSelector((state) => state.stop3)
  useEffect(() => {
    setCheAll(scAll)
    setChe0(sc0)
    setChe1(sc1)
    setChe2(sc2)
    setChe3(sc3)
  }, [scAll, sc0, sc1, sc2, sc3])
  //   отправляем изменение в глобальный стейт при клике
  const dispatch = useDispatch()
  const checkStopOn = (e) => {
    // console.log('Нажата кнопка', e.target.id)
    switch (e.target.id) {
      case 'sAll':
        dispatch(checkStopAll())
        break
      case 's0':
        dispatch(checkStop0())
        break
      case 's1':
        dispatch(checkStop1())
        break
      case 's2':
        dispatch(checkStop2())
        break
      case 's3':
        dispatch(checkStop3())
        break
      // default:
      //   console.log('что то с switch case в stopsFilter - e.target.id >>', e.target.id)
    }
    // setChe1('checked')
    dispatch(checkStop1())
  }
  const l = () => {
    console.log('')
  }
  return (
    <>
      <div className={classes.filter}>
        <span className={classes['filter__title']}> Количество пересадок </span>

        <label className={`${classes['check']} ${classes['filter__check']}`} id="sAll" onClick={checkStopOn}>
          <input checked={cheAll} className={classes['check__input']} type="checkbox" onChange={l}></input>
          <span className={classes['check__box']}></span>
          Все
        </label>
        <label className={`${classes['check']} ${classes['filter__check']}`} id="s0" onClick={checkStopOn}>
          <input checked={che0} className={classes['check__input']} type="checkbox" onChange={l}></input>
          <span className={classes['check__box']}></span>
          Без пересадок
        </label>

        <label className={`${classes['check']} ${classes['filter__check']}`} id="s1" onClick={checkStopOn}>
          <input checked={che1} className={classes['check__input']} type="checkbox" onChange={l}></input>
          <span className={classes['check__box']}></span> 1 пересадка
        </label>

        <label className={`${classes['check']} ${classes['filter__check']}`} id="s2" onClick={checkStopOn}>
          <input checked={che2} className={classes['check__input']} type="checkbox" onChange={l}></input>
          <span className={classes['check__box']}></span>2 пересадки
        </label>

        <label className={`${classes['check']} ${classes['filter__check']}`} id="s3" onClick={checkStopOn}>
          <input checked={che3} className={classes['check__input']} type="checkbox" onChange={l}></input>
          <span className={classes['check__box']}></span>3 пересадки
        </label>
      </div>
    </>
  )
}

export default StopsFilter
