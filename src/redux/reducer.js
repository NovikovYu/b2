const initialState = {
  sortFilterMode: 1,
  numOfShowingTickets: 5,
  tickets: [],
  loading: false,
  stopAll: false,
  stop0: false,
  stop1: false,
  stop2: false,
  stop3: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC1':
      return {
        ...state,
        sortFilterMode: 1,
      }

    case 'INC2':
      return {
        ...state,
        sortFilterMode: 2,
      }

    case 'INC3':
      return {
        ...state,
        sortFilterMode: 3,
      }

    case 'ADD_TICKETS':
      return {
        ...state,
        numOfShowingTickets: state.numOfShowingTickets + 5,
      }

    case 'LOADING_ON': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'LOADING_OFF': {
      return {
        ...state,
        loading: false,
      }
    }

    case 'LMT': {
      return {
        ...state,
        tickets: [...state.tickets, ...action.tickets.tickets],
      }
    }

    case 'CHECK_STOP_ALL': {
      if (state.stopAll) {
        return {
          ...state,
          stopAll: !state.stopAll,
          stop0: false,
          stop1: false,
          stop2: false,
          stop3: false,
        }
      } else {
        return {
          ...state,
          stopAll: !state.stopAll,
          stop0: true,
          stop1: true,
          stop2: true,
          stop3: true,
        }
      }
    }

    case 'CHECK_STOP_0': {
      if (state.stopAll) {
        return {
          ...state,
          stopAll: !state.stopAll,
          stop0: false,
        }
      } else if (!state.stop0 && state.stop1 && state.stop2 && state.stop3) {
        return {
          ...state,
          stopAll: !state.stopAll,
          stop0: !state.stop0,
        }
      } else {
        return {
          ...state,
          stop0: !state.stop0,
        }
      }
    }

    case 'CHECK_STOP_1': {
      if (state.stopAll) {
        return {
          ...state,
          stopAll: !state.stopAll,
          stop1: false,
        }
      } else if (!state.stop1 && state.stop0 && state.stop2 && state.stop3) {
        return {
          ...state,
          stopAll: !state.stopAll,
          stop1: !state.stop1,
        }
      } else {
        return {
          ...state,
          stop1: !state.stop1,
        }
      }
    }

    case 'CHECK_STOP_2': {
      if (state.stopAll) {
        return {
          ...state,
          stopAll: !state.stopAll,
          stop2: false,
        }
      } else if (!state.stop2 && state.stop0 && state.stop1 && state.stop3) {
        return {
          ...state,
          stopAll: !state.stopAll,
          stop2: !state.stop2,
        }
      } else {
        return {
          ...state,
          stop2: !state.stop2,
        }
      }
    }

    case 'CHECK_STOP_3': {
      if (state.stopAll) {
        return {
          ...state,
          stopAll: !state.stopAll,
          stop3: false,
        }
      } else if (!state.stop3 && state.stop0 && state.stop1 && state.stop2) {
        return {
          ...state,
          stopAll: !state.stopAll,
          stop3: !state.stop3,
        }
      } else {
        return {
          ...state,
          stop3: !state.stop3,
        }
      }
    }

    default:
      return state
  }
}

export default reducer
