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

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
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
            path="/articles"
            element={
              <>
                <ArticleList />
                <PaginationRow />
              </>
            }
          />

          <Route path="/articles/:slug" element={<ArticlePage />} />

          <Route path="/sign-up" element={<SignUpForm />} />

          <Route path="/sign-in" element={<SignInForm />} />

          <Route path="/profile" element={<EditProfileForm />} />

          <Route path="/add-article" element={<AddArticleForm />} />

          <Route path="/articles/:slug/edit" element={<EditArticleForm />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
