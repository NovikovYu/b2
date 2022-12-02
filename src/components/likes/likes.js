import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames/bind'

import { likeAnArticle, unLikeAnArticle } from '../../redux/actions'
import classes from '../../styles//app.module.scss'

const Likes = (props) => {
  const dispatch = useDispatch()
  const isLogIn = useSelector((state) => state.userReducer.isLogIn)

  // переключаем лайк
  const taggleLike = () => {
    // если пользователь залогинен
    if (isLogIn) {
      if (props.articleData.favorited) {
        // разлайкиваем статью
        dispatch(unLikeAnArticle(props.articleData.slug))
      } else {
        // лайкаем статью
        dispatch(likeAnArticle(props.articleData.slug))
      }
    }
  }

  // отображаем лайк
  let cx = classNames.bind(classes)
  let classNamesForLike = cx({
    'article__like-icon': true,
    active: props.articleData.favorited,
  })

  return (
    <div className={classes['article__like-wrapper']}>
      <div className={classNamesForLike} onClick={taggleLike}></div>

      <span className={classes['article__like-num']}>{props.articleData.favoritesCount}</span>
    </div>
  )
}

export default Likes
