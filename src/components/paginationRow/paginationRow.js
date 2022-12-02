import React from 'react'
import { Pagination } from 'antd'
import { useDispatch } from 'react-redux'

import { loadArticles } from '../../redux/actions'

const PaginationRow = () => {
  // при выборе странице вызываю событие загрузки статей
  const dispatch = useDispatch()
  const onChage = (e) => {
    dispatch(loadArticles(e))
  }

  return <Pagination className="pagination" defaultCurrent={1} total={50} onChange={onChage} />
}

export default PaginationRow
