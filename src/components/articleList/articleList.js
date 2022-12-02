import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArticleCard from '../articleCard/articleCard'
import { loadArticles } from '../../redux/actions'
import classes from '../../styles//app.module.scss'

const ArticleList = () => {
  // получаем контент для статей
  let articlesContent = useSelector((state) => state.articlesReducer.articlesContent)

  // создаем диспатчер
  const dispatch = useDispatch()

  // после монтирования
  useEffect(() => {
    // загружаем статьи
    dispatch(loadArticles())
  }, [])

  // создаем статьи
  const articles = articlesContent.map((articleData) => {
    return <ArticleCard articleData={articleData} key={articleData.slug} />
  })

  return <ul className={classes['articles__list']}>{articles}</ul>
}

export default ArticleList
