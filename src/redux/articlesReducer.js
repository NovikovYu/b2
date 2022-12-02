const initialState = {
  articlesContent: [],
  activeArticle: '',
}

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ARTICLES':
      return {
        ...state,
        articlesContent: action.payload.articles,
      }

    case 'LOAD_CURRENT_ARTICLE':
      return {
        ...state,
        activeArticle: action.payload.article,
      }

    default:
      return state
  }
}

export default articlesReducer
