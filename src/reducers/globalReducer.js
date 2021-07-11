export const globalInitialState = { 
  userSearchStatus: '', userSearchResponse: null, userSearchErrorMessage: '' 
};

export default (state = globalInitialState, action) => {
  switch (action.type) {
    case 'DO_USERSEARCH_FETCH':
    case 'DO_USERSEARCH_FETCH_ERROR':
    case 'DO_USERSEARCH_FETCHING':
      return Object.assign({}, state, action.payload);
    default:
      return state
  }
}
  
