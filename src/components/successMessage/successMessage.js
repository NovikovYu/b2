import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classes from '../../styles/app.module.scss'
import { hideOk } from '../../redux/actions.js'

const SuccessMessage = () => {
  let isOk = useSelector((state) => state.messageReducer.isOk)

  // показываем 3 секнуды
  const dispatch = useDispatch()
  useEffect(() => {
    if (isOk) {
      setTimeout(() => dispatch(hideOk()), 3000)
    }
  }, [isOk])

  if (isOk) {
    return (
      <div className={classes['error']}>
        <h2 className={classes['error__text']}>Всё ок!</h2>

        <img className={classes['error__img']} src="https://mirbelya72.ru/media/uploads/2020/05/12/s1200.jpg"></img>
      </div>
    )
  }
}

export default SuccessMessage
