import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import uniqid from 'uniqid'

import classes from '../../styles/app.module.scss'
import { addArticle } from '../../redux/actions.js'

const AddArticleForm = () => {
  const {
    // регистрируем поля формы
    register,
    // объект с состояниями формы
    formState: { errors },
    // обертка над событием подтверждения формы
    handleSubmit,
  } = useForm({})

  const dispatch = useDispatch()
  let navigate = useNavigate()
  // наша функция, которая будет вызвана после проверки формы
  const onSubmit = (data) => {
    dispatch(addArticle(data))
    navigate('/sign-in')
  }

  //содержание тегов
  const [dataForTags, setDataForTags] = React.useState([{ value: '' }])

  // функция удаления тегов
  const deleteTag = (e) => {
    e.preventDefault()
    // копируем массив содержания тегов и удаляем от туда нужный
    let deadIndex = dataForTags.findIndex((el) => el.value === e.target.id)
    const startOfArray = dataForTags.slice(0, deadIndex)
    const finishOfArray = dataForTags.slice(deadIndex + 1)
    const newArray = [...startOfArray, ...finishOfArray]
    setDataForTags(newArray)
  }

  // функция добавления тегов
  const addTag = () => {
    const newArray = [...dataForTags, { value: '' }]
    setDataForTags(newArray)
  }

  // разметка тегов
  const tagsList = dataForTags.map((tagInfoItem) => {
    return (
      <label className={classes['add__label']} htmlFor="" key={uniqid()}>
        <span className={classes['add__label-text']}>Tags</span>

        <div className={classes['add__tag-wrapper']}>
          <input
            className={classes['add__tag-input']}
            type="text"
            placeholder="Tag"
            {...register(`tag${uniqid()}`)}
            defaultValue={tagInfoItem.value}
          ></input>

          <button className={classes['add__tag-deleted-btn']} type="button" id={tagInfoItem.value} onClick={deleteTag}>
            Delete
          </button>

          <button className={classes['add__tag-add-btn']} type="button" onClick={addTag}>
            Add tag
          </button>
        </div>
      </label>
    )
  })

  return (
    <form className={classes['add']} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes['add__title']}>Create new article</h2>

      <label className={classes['sign__label']}>
        <span className={classes['sign__label-text']}>Title</span>

        <input
          className={classes['sign__input']}
          type="text"
          placeholder="Title"
          {...register('title', {
            required: 'Поле обязательно к заполнению',
          })}
        ></input>

        <div className={classes['sign__error-text']}>
          {errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}
        </div>
      </label>

      <label className={classes['sign__label']}>
        <span className={classes['sign__label-text']}>Short description</span>

        <input
          className={classes['sign__input']}
          type="text"
          placeholder="Short description"
          {...register('shortDescription', {
            required: 'Поле обязательно к заполнению',
          })}
        ></input>

        <div className={classes['sign__error-text']}>
          {errors?.shortDescription && <p>{errors?.shortDescription?.message || 'Error!'}</p>}
        </div>
      </label>

      <label className={classes['add__label']}>
        <span className={classes['add__label-text']}>Text</span>

        <textarea
          className={classes['add__textarea']}
          type="text"
          placeholder="Text"
          {...register('text', {
            required: 'Поле обязательно к заполнению',
          })}
        ></textarea>

        <div className={classes['add__error-text']}>{errors?.text && <p>{errors?.text?.message || 'Error!'}</p>}</div>
      </label>

      {tagsList}

      <button className={classes['add__btn']} type="submit" onClick={addArticle}>
        Send
      </button>
    </form>
  )
}

export default AddArticleForm
