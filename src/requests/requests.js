export const sendRequestWithoutBody = async (method, endPoint, clearTocken) => {
  return await fetch(`https://blog.kata.academy/api/${endPoint}`, {
    method: method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${clearTocken}`,
      'Content-Type': 'application/json',
    },
  })
}

export const sendRequestWithBody = async (method, endPoint, clearTocken, bodyContent) => {
  return await fetch(`https://blog.kata.academy/api/${endPoint}`, {
    method: method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${clearTocken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyContent),
  })
}

export const getTokenFromLocalStorage = () => {
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
