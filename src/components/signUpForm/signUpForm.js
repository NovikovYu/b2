import React, { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import classes from '../../styles/app.module.scss'
import { signUp } from '../../redux/actions.js'

const SignUpForm = () => {
  // если уже зарегистировались направляем на страницу входа
  let isLogUpSuccessful = useSelector((state) => state.userReducer.isLogUpSuccessful)
  let navigate = useNavigate()
  useEffect(() => {
    if (isLogUpSuccessful) {
      return navigate('/sign-in')
    }
  }, [isLogUpSuccessful])

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
    dispatch(signUp(data))
  }

  // вытаскиваем ошибки и отображаем в нужных полях
  let userNameError = useSelector((state) => state.messageReducer.namedErrorInfo.username)
  let emailError = useSelector((state) => state.messageReducer.namedErrorInfo.email)

  return (
    <form className={classes['sign']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['sign__title']}>Create new account</h2>

      <label className={classes['sign__label']}>
        <span className={classes['sign__label-text']}>Username</span>

        <input
          className={classes['sign__input']}
          type="text"
          placeholder="Username"
          {...register('firstName', {
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 3,
              message: 'Имя должно быть не меньше 3х символов',
            },
            maxLength: {
              value: 20,
              message: 'Имя должно быть до 20 символов',
            },
          })}
        ></input>

        <div className={classes['sign__error-text']}>
          {errors?.firstName && <p>{errors?.firstName?.message || 'Error!'}</p>}
          {userNameError && <p>{userNameError}</p>}
        </div>
      </label>

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
          {emailError && <p>{emailError}</p>}
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

      <label className={classes['sign__label']}>
        <span className={classes['sign__label-text']}>Repeat Password</span>

        <input
          className={classes['sign__input']}
          type="text"
          placeholder="Password"
          {...register('repeatPassword', {
            required: 'Поле обязательно к заполнению',
            validate: (value) => value === password.current || 'The passwords do not match',
          })}
        ></input>

        <div className={classes['sign__error-text']}>
          {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'Error!'}</p>}
        </div>
      </label>

      <label className={classes['sign__label']}>
        <div className={classes['sign__checkbox-wrapper']}>
          <input
            className={classes['sign__checkbox']}
            type="checkbox"
            placeholder="Terms"
            {...register('terms', {
              required: 'Поле обязательно к заполнению',
            })}
          ></input>

          <span className={classes['sign__text']}>I agree to the processing of my personal information</span>
        </div>

        <div className={classes['sign__error-text']}>
          {errors?.terms && <p>{errors?.terms?.message || 'Error!'}</p>}
        </div>
      </label>

      <button className={classes['sign__btn']} type="submit">
        Create
      </button>

      <Link className={classes['sign__link']} to="/sign-in">
        Already have an account?
        <span className={classes['sign__link-accent-text']}> Sign In.</span>
      </Link>
    </form>
  )
}

export default SignUpForm
