import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import uniqid from 'uniqid'
import { format } from 'date-fns'

import Likes from '../likes/likes'
import { loadCurrentArticle } from '../../redux/actions'
import classes from '../../styles//app.module.scss'

const ArticleCard = (props) => {
  const time = format(new Date(props.articleData.createdAt), 'MMMM dd, yyyy')

  const dispatch = useDispatch()
  const loadNewArticle = () => {
    dispatch(loadCurrentArticle(props.articleData.slug))
  }

  const tags = props.articleData.tagList.map((tag) => {
    if (tag) {
      return (
        <li className={classes['article__tag-item']} key={uniqid()}>
          <span className={classes['article__tag']}>{tag}</span>
        </li>
      )
    }
  })

  return (
    <li className={classes['articles__item']}>
      <div className={classes['article__card']}>
        <div className={classes['article__content-column']}>
          <div className={classes['article__title-row']}>
            <Link
              className={classes['article__title']}
              to={`/articles/slug${props.articleData.slug}`}
              onClick={loadNewArticle}
            >
              {props.articleData.title}
            </Link>

            <Likes articleData={props.articleData} />
          </div>

          <ul className={classes['article__tag-list']}>{tags}</ul>

          <p className={classes['article__intro-text']}>{props.articleData.description}</p>
        </div>

        <div className={classes['article__author-column']}>
          <div className={classes['article__author-text-wrapper']}>
            <span className={classes['article__author-name']}>{props.articleData.author.username}</span>

            <span className={classes['article__author-date']}>{time}</span>
          </div>

          <img
            className={classes['article__author-img']}
            src={props.articleData.author.image}
            alt={`photo of ${props.articleData.author.username}`}
          ></img>
        </div>
      </div>
    </li>
  )
}

export default ArticleCard
