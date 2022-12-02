import { useSelector } from 'react-redux'
import uniqid from 'uniqid'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'

import Likes from '../likes/likes'
import Spin from '../spin/spin'
import classes from '../../styles//app.module.scss'
import EditArticlesBtn from '../editArticlesBtn/editArticlesBtn'

const ArticlePage = () => {
  // распознаём разметку ReactMarkdown
  const articleData = useSelector((state) => state.articlesReducer.activeArticle)
  const markdown = articleData.body

  if (articleData) {
    const time = format(new Date(articleData.createdAt), 'MMMM dd, yyyy')

    const tags = articleData.tagList.map((tag) => {
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
        <div className={classes['article__page']}>
          <div className={classes['article__header-wrapper']}>
            <div className={classes['article__content-column']}>
              <div className={classes['article__title-row']}>
                <h2 className={classes['article__title']}>{articleData.title}</h2>

                <Likes articleData={articleData} />
              </div>

              <ul className={classes['article__tag-list']}>{tags}</ul>

              <p className={classes['article__intro-text']}>{articleData.description}</p>
            </div>

            <div className={classes['article__right-column']}>
              <div className={classes['article__author-column']}>
                <div className={classes['article__author-text-wrapper']}>
                  <span className={classes['article__author-name']}>{articleData.author.username}</span>

                  <span className={classes['article__author-date']}>{time}</span>
                </div>

                <img
                  className={classes['article__author-img']}
                  src={articleData.author.image}
                  alt={`photo of ${articleData.author.username}`}
                ></img>
              </div>

              <EditArticlesBtn articleData={articleData} />
            </div>
          </div>

          <div className={classes['article__text-wrapper']}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </li>
    )
  } else {
    return <Spin />
  }
}

export default ArticlePage
