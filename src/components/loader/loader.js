import { useSelector } from 'react-redux'
import { Oval } from 'react-loader-spinner'

import classes from '../app/app.module.scss'

const LoadingSpiner = () => {
  const loading = useSelector((state) => state.loading)

  if (loading) {
    return (
      <div className={classes['loader']}>
        <Oval
          height={80}
          width={80}
          color="#2196F3"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#ffffff"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        <span className={classes['loader__text']}>Ищём билеты...</span>
      </div>
    )
  } else {
    return null
  }
}

export default LoadingSpiner
