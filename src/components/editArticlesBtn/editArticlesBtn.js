import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'

import classes from '../../styles//app.module.scss'
import { deleteArticle } from '../../redux/actions'

let cx = classNames.bind(classes)

const EditArticlesBtn = (props) => {
  //а моя ли это статья?
  let author = props.articleData.author.username
  let me = useSelector((state) => state.userReducer.username)

  // стили для тултипа
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  let classNamesForTooltip = cx({
    tooltip: true,
    active: isTooltipVisible,
  })

  // включение тултипа
  const showTooltip = () => {
    setIsTooltipVisible(true)
  }
  // выключение тултипа
  const hideTooltip = () => {
    setIsTooltipVisible(false)
  }

  // удаляем статью
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const deleteThisArticle = () => {
    dispatch(deleteArticle(props.articleData.slug))
    navigate('/')
  }

  if (author === me) {
    return (
      <ul className={classes['article__edit-btns-list']}>
        <li className={classes['article__edit-btn-item']}>
          <button className={classes['article__edit-btn--delete']} type="button" onClick={showTooltip}>
            Delete
          </button>

          <div className={classNamesForTooltip}>
            <div className={classes['tooltip__top']}>
              <span className={classes['tooltip__icon']}>!</span>
              <p className={classes['tooltip__text']}>Are you sure to delete this article?</p>
            </div>
            <ul className={classes['tooltip__btns-list']}>
              <li className={classes['tooltip__btn-item']}>
                <button className={classes['tooltip__btn--no']} type="button" onClick={hideTooltip}>
                  No
                </button>
              </li>
              <li className={classes['tooltip__btn-item']}>
                <button className={classes['tooltip__btn--yes']} type="button" onClick={deleteThisArticle}>
                  Yes
                </button>
              </li>
            </ul>
          </div>
        </li>
        <li className={classes['article__edit-btn-item']}>
          <Link className={classes['article__edit-btn--edit']} to={`/articles/slug${props.articleData.slug}/edit`}>
            Edit
          </Link>
        </li>
      </ul>
    )
  } else {
    return null
  }
}

export default EditArticlesBtn
