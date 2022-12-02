import React, { useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import classes from '../../styles/app.module.scss'
import { editPropfile } from '../../redux/actions'

const EditProfileForm = () => {
  //если пользователь не залогинен перекидываем его на логин
  let isLogIn = useSelector((state) => state.userReducer.isLogIn)
  let navigate = useNavigate()
  useEffect(() => {
    if (!isLogIn) {
      return navigate('/sign-in')
    }
  }, [])

  // получаем дефолтные значения полей из стейта
  let defaultUsername = useSelector((state) => {
    return state.userReducer.username
  })
  let defaultEmail = useSelector((state) => {
    return state.userReducer.email
  })
  let defaultAvatar = useSelector((state) => {
    return state.userReducer.avatarUrl
  })

  const {
    // регистрируем поля формы
    register,
    // объект с состояниями формы
    formState: { errors },
    // обертка над событием подтверждения формы
    handleSubmit,
    reset,
    watch,
  } = useForm({})

  const password = useRef({})
  password.current = watch('password', '')

  // наша функция, которая будет вызвана после проверки формы
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(editPropfile(data))
    reset()
  }

  return (
    <form className={classes['sign']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['sign__title']}>Edit Profile</h2>

      <label className={classes['sign__label']}>
        <span className={classes['sign__label-text']}>Username</span>

        <input
          className={classes['sign__input']}
          type="text"
          defaultValue={defaultUsername}
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
        </div>
      </label>

      <label className={classes['sign__label']}>
        <span className={classes['sign__label-text']}>Email address</span>

        <input
          className={classes['sign__input']}
          type="text"
          defaultValue={defaultEmail}
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
        <span className={classes['sign__label-text']}>New password</span>

        <input
          className={classes['sign__input']}
          type="text"
          placeholder="New password"
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
        <span className={classes['sign__label-text']}>Avatar image (url)</span>

        <input
          className={classes['sign__input']}
          type="text"
          defaultValue={defaultAvatar}
          placeholder="Avatar image"
          {...register('avatar', {
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, // eslint-disable-line
              message: 'ссылка должна быть корректной',
            },
          })}
        ></input>

        <div className={classes['sign__error-text']}>
          {errors?.avatar && <p>{errors?.email?.avatar || 'Error!'}</p>}
        </div>
      </label>

      <button className={classes['sign__btn']} type="submit">
        Save
      </button>
    </form>
  )
}

export default EditProfileForm
