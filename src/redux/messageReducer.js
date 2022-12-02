const initialState = {
  isOk: false,
  isLoading: false,
  isError: false,
  isNamedError: false,
  namedErrorInfo: '',
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_OK_MESSAGE':
      return {
        ...state,
        isOk: true,
      }

    case 'HIDE_OK_MESSAGE':
      return {
        ...state,
        isOk: false,
      }

    case 'HIDE_ERROR_MESSAGE':
      return {
        ...state,
        isError: false,
        isNamedError: false,
        namedErrorInfo: '',
      }

    case 'LOADING_ON':
      return {
        ...state,
        isLoading: true,
      }

    case 'LOADING_OFF':
      return {
        ...state,
        isLoading: false,
      }

    case 'ERROR_CATCHED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }

    case 'NAMED_ERROR_CATCHED':
      return {
        ...state,
        isLoading: false,
        isNamedError: true,
        namedErrorInfo: action.payload.errors,
      }

    default:
      return state
  }
}

export default messageReducer
