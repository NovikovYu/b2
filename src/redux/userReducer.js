const initialState = {
  isLogIn: false,
  username: '',
  token: '',
  email: '',
  avatarUrl: '',
  isLogUpSuccessful: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return {
        ...state,
        isLogUpSuccessful: true,
      }

    case 'EDIT_PROFILE':
      return {
        ...state,
        username: action.payload.user.username,
        token: action.payload.user.token,
        email: action.payload.user.email,
        avatarUrl: action.payload.user.image,
      }

    case 'SIGN_IN':
      return {
        ...state,
        isLogIn: true,
        username: action.payload.user.username,
        token: action.payload.user.token,
        email: action.payload.user.email,
      }

    case 'LOG_OUT':
      return {
        ...state,
        isLogIn: false,
        username: '',
        token: '',
        email: '',
        isLogUpSuccessful: '',
      }

    default:
      return state
  }
}

export default userReducer
