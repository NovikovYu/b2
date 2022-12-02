import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { hideError } from '../../redux/actions'
import classes from '../../styles/app.module.scss'

const ErrorMessage = () => {
  let isError = useSelector((state) => state.messageReducer.isError)

  // показываем 3 секнуды
  const dispatch = useDispatch()
  useEffect(() => {
    if (isError) {
      setTimeout(() => dispatch(hideError()), 3000)
    }
  }, [isError])

  if (isError) {
    return (
      <div className={classes['error']}>
        <h2 className={classes['error__text']}>Что-то не так...</h2>

        <img
          className={classes['error__img']}
          src="https://avatarko.ru/img/kartinka/8/zhivotnye_kotenok_provoda_7089.jpg"
        ></img>
      </div>
    )
  }
}

export default ErrorMessage
