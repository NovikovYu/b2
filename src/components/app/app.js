import { Routes, Route } from 'react-router-dom'

import { Layout } from '../layout/layout'
import ArticleList from '../articleList/articleList'
import ArticlePage from '../articlePage/articlePage'
import PaginationRow from '../paginationRow/paginationRow'
import SignUpForm from '../signUpForm/signUpForm'
import SignInForm from '../signInForm/signInForm'
import EditProfileForm from '../editProfileForm/editProfileForm'
import AddArticleForm from '../addArticleForm/addArticleForm'
import EditArticleForm from '../editArticleForm/editArticleForm'
import '../../styles/fix.css'
import pathes from '../pathes/pathes'

const App = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route path={pathes.main} element={<Layout />}>
          <Route
            index
            element={
              <>
                <ArticleList />
                <PaginationRow />
              </>
            }
          />

          <Route
            path={pathes.articles}
            element={
              <>
                <ArticleList />
                <PaginationRow />
              </>
            }
          />

          <Route path={pathes.article} element={<ArticlePage />} />

          <Route path={pathes.join} element={<SignUpForm />} />

          <Route path={pathes.enter} element={<SignInForm />} />

          <Route path={pathes.profile} element={<EditProfileForm />} />

          <Route path={pathes.addArticle} element={<AddArticleForm />} />

          <Route path={pathes.editArticle} element={<EditArticleForm />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
