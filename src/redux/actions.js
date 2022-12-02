// достаём токен из локал сторедж
const getTokenFromLocalStorage = () => {
  const localStorageContent = localStorage.getItem('persist:root')
  const localStorageContentParsed = JSON.parse(localStorageContent)
  const userReducerContentParsed = JSON.parse(localStorageContentParsed.userReducer)
  const localStorageToken = userReducerContentParsed.token
  let clearTocken = ''
  if (localStorageToken) {
    clearTocken = localStorageToken.replaceAll('"', '')
  }

  return clearTocken
}

export const loadingOn = () => ({ type: 'LOADING_ON' })
export const loadingOff = () => ({ type: 'LOADING_OFF' })
export const showOk = () => ({ type: 'SHOW_OK_MESSAGE' })
export const hideOk = () => ({ type: 'HIDE_OK_MESSAGE' })
export const hideError = () => ({ type: 'HIDE_ERROR_MESSAGE' })

export const loadArticles = (page = 0) => {
  return async (dispatch) => {
    dispatch(loadingOn())

    // пропускаем сколько-то статей
    let skipedArticles = 0
    if (page) {
      skipedArticles = (page - 1) * 5
    }

    let clearTocken = getTokenFromLocalStorage()

    try {
      let response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${skipedArticles}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${clearTocken}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        let responseContent = await response.json()

        dispatch({
          type: 'LOAD_ARTICLES',
          payload: responseContent,
        })

        dispatch(loadingOff())
      } else {
        dispatch({
          type: 'ERROR_CATCHED',
        })
      }
    } catch {
      dispatch({
        type: 'ERROR_CATCHED',
      })
    }
  }
}

export const loadCurrentArticle = (slug = 'title-1nv0ts') => {
  return async (dispatch) => {
    dispatch(loadingOn())

    let clearTocken = getTokenFromLocalStorage()

    try {
      let response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${clearTocken}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        let responseContent = await response.json()

        dispatch({
          type: 'LOAD_CURRENT_ARTICLE',
          payload: responseContent,
        })

        dispatch(loadingOff())
      } else {
        dispatch({
          type: 'ERROR_CATCHED',
        })
      }
    } catch {
      dispatch({
        type: 'ERROR_CATCHED',
      })
    }
  }
}

export const addArticle = (data) => {
  return async (dispatch) => {
    dispatch(loadingOn())

    let clearTocken = getTokenFromLocalStorage()

    // собирем теги в массив
    const copyOfDataObject = { ...data }
    delete copyOfDataObject.text
    delete copyOfDataObject.title
    delete copyOfDataObject.shortDescription
    const tagsArr = Object.values(copyOfDataObject)
    const cleanTagsArr = tagsArr.filter((el) => el)

    try {
      // отправляем запрос на добавление статьи
      let response = await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${clearTocken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article: {
            title: data.title,
            description: data.shortDescription,
            body: data.text,
            tagList: cleanTagsArr,
          },
        }),
      })

      dispatch(loadArticles())

      if (response.ok) {
        let responseContent = await response.json()

        dispatch({
          type: 'ADD_ARTICLE',
          payload: responseContent,
        })
      } else if (response.status == 422) {
        let responseContent = await response.json()

        dispatch({
          type: 'NAMED_ERROR_CATCHED',
          payload: responseContent,
        })
      } else {
        dispatch({
          type: 'ERROR_CATCHED',
        })
      }
    } catch {
      dispatch({
        type: 'ERROR_CATCHED',
      })
    }
  }
}

export const editArticle = (data, slug) => {
  return async (dispatch) => {
    dispatch(loadingOn())

    let clearTocken = getTokenFromLocalStorage()

    // собирем теги в массив
    const copyOfDataObject = { ...data }
    delete copyOfDataObject.text
    delete copyOfDataObject.title
    delete copyOfDataObject.shortDescription
    const tagsArr = Object.values(copyOfDataObject)
    const cleanTagsArr = tagsArr.filter((el) => el)

    try {
      // отправляем запрос на добавление статьи
      let response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${clearTocken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article: {
            title: data.title,
            description: data.shortDescription,
            body: data.text,
            tagList: cleanTagsArr,
          },
        }),
      })

      dispatch(loadArticles())

      if (response.ok) {
        let responseContent = await response.json()

        dispatch({
          type: 'ADD_ARTICLE',
          payload: responseContent,
        })
      } else if (response.status == 422) {
        let responseContent = await response.json()

        dispatch({
          type: 'NAMED_ERROR_CATCHED',
          payload: responseContent,
        })
      } else {
        dispatch({
          type: 'ERROR_CATCHED',
        })
      }
    } catch {
      dispatch({
        type: 'ERROR_CATCHED',
      })
    }
  }
}

export const deleteArticle = (slug) => {
  return async (dispatch) => {
    dispatch(loadingOn())

    let clearTocken = getTokenFromLocalStorage()

    try {
      // отправляем запрос на добавление статьи
      let response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${clearTocken}`,
          'Content-Type': 'application/json',
        },
      })

      dispatch(loadArticles())

      if (response.status == 422) {
        let responseContent = await response.json()

        dispatch({
          type: 'NAMED_ERROR_CATCHED',
          payload: responseContent,
        })
      } else {
        dispatch({
          type: 'ERROR_CATCHED',
        })
      }
    } catch {
      dispatch({
        type: 'ERROR_CATCHED',
      })
    }
  }
}

export const signUp = (data) => {
  return async (dispatch) => {
    dispatch(loadingOn())

    try {
      let response = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: data.firstName,
            email: data.email,
            password: data.password,
          },
        }),
      })

      if (response.ok) {
        let responseContent = await response.json()

        dispatch({
          type: 'SIGN_UP',
          payload: responseContent,
        })
        dispatch(loadingOff())
      } else if (response.status == 422) {
        let responseContent = await response.json()

        dispatch({
          type: 'NAMED_ERROR_CATCHED',
          payload: responseContent,
        })
      } else {
        dispatch({
          type: 'ERROR_CATCHED',
        })
      }
    } catch (err) {
      dispatch({
        type: 'ERROR_CATCHED',
      })
    }
  }
}

export const likeAnArticle = (data) => {
  return async (dispatch) => {
    let clearTocken = getTokenFromLocalStorage()

    try {
      let response = await fetch(`https://blog.kata.academy/api/articles/${data}/favorite`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${clearTocken}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        dispatch(loadArticles())
        dispatch(loadCurrentArticle(data))
      } else if (response.status == 422) {
        let responseContent = await response.json()

        dispatch({
          type: 'ERROR_CATCHED',
          payload: responseContent,
        })
      } else {
        dispatch({
          type: 'ERROR_CATCHED',
        })
      }
    } catch (err) {
      dispatch({
        type: 'ERROR_CATCHED',
      })
    }
  }
}

export const unLikeAnArticle = (data) => {
  return async (dispatch) => {
    let clearTocken = getTokenFromLocalStorage()

    try {
      let response = await fetch(`https://blog.kata.academy/api/articles/${data}/favorite`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${clearTocken}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        dispatch(loadArticles())
        dispatch(loadCurrentArticle(data))
      } else if (response.status == 422) {
        let responseContent = await response.json()

        dispatch({
          type: 'ERROR_CATCHED',
          payload: responseContent,
        })
      } else {
        dispatch({
          type: 'ERROR_CATCHED',
        })
      }
    } catch (err) {
      dispatch({
        type: 'ERROR_CATCHED',
      })
    }
  }
}

export const editPropfile = (data) => {
  return async (dispatch) => {
    dispatch(loadingOn())

    let clearTocken = getTokenFromLocalStorage()

    try {
      let response = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${clearTocken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: data.firstName,
            email: data.email,
            password: data.password,
            image: data.avatar,
          },
        }),
      })

      if (response.ok) {
        let responseContent = await response.json()

        dispatch(showOk())

        dispatch({
          type: 'EDIT_PROFILE',
          payload: responseContent,
        })

        dispatch(loadingOff())
      } else if (response.status == 422) {
        let responseContent = await response.json()

        dispatch({
          type: 'NAMED_ERROR_CATCHED',
          payload: responseContent,
        })
      } else {
        dispatch({
          type: 'ERROR_CATCHED',
        })
      }
    } catch (err) {
      dispatch({
        type: 'ERROR_CATCHED',
      })
    }
  }
}

export const signIn = (data) => {
  return async (dispatch) => {
    dispatch(loadingOn())

    try {
      let response = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: data.email,
            password: data.password,
          },
        }),
      })

      if (response.ok) {
        let responseContent = await response.json()

        dispatch({
          type: 'SIGN_IN',
          payload: responseContent,
        })

        dispatch(loadingOff())
      } else {
        dispatch({
          type: 'ERROR_CATCHED',
        })
      }
    } catch (err) {
      dispatch({
        type: 'ERROR_CATCHED',
      })
    }
  }
}

export const logOut = () => ({ type: 'LOG_OUT' })
