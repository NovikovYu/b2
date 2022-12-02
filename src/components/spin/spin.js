import { useSelector } from 'react-redux'
import { Rings } from 'react-loader-spinner'

import '../../styles/fix.css'

const Spin = () => {
  let isLoading = useSelector((state) => state.messageReducer.isLoading)
  if (isLoading) {
    return (
      <Rings
        height="180"
        width="180"
        color="#1890FF"
        radius="6"
        wrapperStyle={{}}
        wrapperClass="spin"
        visible={true}
        ariaLabel="rings-loading"
      />
    )
  }
}

export default Spin
