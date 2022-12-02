import React, { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import classes from '../../styles/app.module.scss'
import { signIn } from '../../redux/actions.js'

const SignInForm = () => {
  // если уже залогинены направляем на страницу входа
  let isLogIn = useSelector((state) => state.userReducer.isLogIn)
  let navigate = useNavigate()
  useEffect(() => {
    if (isLogIn) {
      return navigate('/')
    }
  }, [isLogIn])

  const {
    // регистрируем поля формы
    register,
    // объект с состояниями формы
    formState: { errors },
    // обертка над событием подтверждения формы
    handleSubmit,
    // reset,
    watch,
  } = useForm({})

  const password = useRef({})
  password.current = watch('password', '')

  const dispatch = useDispatch()
  // наша функция, которая будет вызвана после проверки формы
  const onSubmit = (data) => {
    // alert(JSON.stringify(data))
    dispatch(signIn(data))
    // reset()
  }

  return (
    <form className={classes['sign']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['sign__title']}>Sign In</h2>

      <label className={classes['sign__label']}>
        <span className={classes['sign__label-text']}>Email address</span>

        <input
          className={classes['sign__input']}
          type="text"
          placeholder="Email address"
          {...register('email', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'email должен быть корректным почтовым адресом',
            },
          })}
        ></input>

        <div className={classes['sign__error-text']}>
          {errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}
        </div>
      </label>

      <label className={classes['sign__label']}>
        <span className={classes['sign__label-text']}>Password</span>

        <input
          className={classes['sign__input']}
          type="text"
          placeholder="Password"
          {...register('password', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 6,
              message: 'Пароль должен быть от 6 символов',
            },
            maxLength: {
              value: 40,
              message: 'Пароль должен быть до 40 символов',
            },
          })}
        ></input>

        <div className={classes['sign__error-text']}>
          {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
        </div>
      </label>

      <button className={classes['sign__btn']} type="submit">
        LogIn
      </button>

      <Link className={classes['sign__link']} to="/sign-up">
        Don`&apos;`t have an account?
        <span className={classes['sign__link-accent-text']}> Sign Up.</span>
      </Link>
    </form>
  )
}

export default SignInForm
