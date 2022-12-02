import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames/bind'

import classes from '../../styles/app.module.scss'
import { logOut } from '../../redux/actions'

let cx = classNames.bind(classes)

const Header = () => {
  let isLogIn = useSelector((state) => state.userReducer.isLogIn)
  let username = useSelector((state) => state.userReducer.username)
  let avatarUrl = useSelector((state) => {
    return state.userReducer.avatarUrl
  })
  let defauiltAvatarUrl = 'https://static.productionready.io/images/smiley-cyrus.jpg'

  let classNamesForFriendsBlock = cx({
    'header__friend-btn-list': true,
    active: isLogIn,
  })
  let classNamesForGuestsBlock = cx({
    'header__friend-btn-list': true,
    active: !isLogIn,
  })

  // логаутимся
  const dispatch = useDispatch()
  const logOutByClick = () => {
    dispatch(logOut())
  }

  return (
    <header className={classes.header}>
      <div className={classes['header__inner']}>
        <Link className={classes['header__logo']} to="/articles/">
          Realworld Blog
        </Link>

        <ul className={classNamesForFriendsBlock}>
          <Link className={classes['header__friend-btn-item']} to="/add-article">
            <div className={classes['header__friend-btn--new-article']}>Create article</div>
          </Link>

          <Link className={classes['header__friend-btn-item']} to="/profile">
            <div className={classes['header__friend-btn--user-info']}>
              <span className={classes['header__username']}>{username}</span>

              <img className={classes['header__avatar']} src={avatarUrl ? avatarUrl : defauiltAvatarUrl} alt=""></img>
            </div>
          </Link>

          <li className={classes['header__friend-btn-item']}>
            <div className={classes['header__friend-btn--log-out']} onClick={logOutByClick}>
              Log Out
            </div>
          </li>
        </ul>

        <ul className={classNamesForGuestsBlock}>
          <li className={classes['header__btn-item']}>
            <Link className={`${classes['header__btn']} ${classes['header__btn--sign-in']}`} to="/sign-in">
              Sign In
            </Link>
          </li>
          <li className={classes['header__btn-item']}>
            <Link className={`${classes['header__btn']} ${classes['header__btn--sign-up']}`} to="/sign-up">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
