export const authInitialState = { loginStatus: '', loginResponse: null, loginErrorMessage: '' };

export default (state = authInitialState, action) => {
  switch (action.type) {
    case 'DO_LOGIN_FETCH':
    case 'DO_LOGIN_FETCH_ERROR':
    case 'DO_LOGIN_FETCHING':
      return Object.assign({}, state, action.payload);
    default:
      return state
  }
}
  
