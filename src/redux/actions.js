import { sendRequestWithoutBody, sendRequestWithBody, getTokenFromLocalStorage } from '../requests/requests'

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
      let response = await sendRequestWithoutBody('GET', `articles?limit=5&offset=${skipedArticles}`, clearTocken)

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
      let response = await sendRequestWithoutBody('GET', `articles/${slug}`, clearTocken)

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
      let bodyContent = {
        article: {
          title: data.title,
          description: data.shortDescription,
          body: data.text,
          tagList: cleanTagsArr,
        },
      }
      let response = await sendRequestWithBody('POST', 'articles', clearTocken, bodyContent)

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
      let bodyContent = {
        article: {
          title: data.title,
          description: data.shortDescription,
          body: data.text,
          tagList: cleanTagsArr,
        },
      }
      let response = await sendRequestWithBody('PUT', `articles/${slug}`, clearTocken, bodyContent)

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
      let response = await sendRequestWithoutBody('DELETE', `articles/${slug}`, clearTocken)

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
      let bodyContent = {
        user: {
          username: data.firstName,
          email: data.email,
          password: data.password,
        },
      }
      let response = await sendRequestWithBody('POST', 'users', '', bodyContent)

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
      let response = await sendRequestWithoutBody('POST', `articles/${data}/favorite`, clearTocken)

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
      let response = await sendRequestWithoutBody('DELETE', `articles/${data}/favorite`, clearTocken)

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
      let bodyContent = {
        user: {
          username: data.firstName,
          email: data.email,
          password: data.password,
          image: data.avatar,
        },
      }
      let response = await sendRequestWithBody('PUT', 'user', clearTocken, bodyContent)

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
      let bodyContent = {
        user: {
          email: data.email,
          password: data.password,
        },
      }
      let response = await sendRequestWithBody('POST', 'users/login', '', bodyContent)

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
