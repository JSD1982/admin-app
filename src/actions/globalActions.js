import axios from 'axios';
import { apiRoute } from '../config';
import { checkAuthorization } from './authActions';

//validate token
const localData = localStorage.getItem('authResponse');
if (localData && JSON.parse(localData) && JSON.parse(localData).user && JSON.parse(localData).user.token) {
  axios.defaults.headers.common = { 'Authorization': `Bearer ${JSON.parse(localData).user.token}` };
}

//errors
const getErrorFromResponse = (response) => (response && response.data && response.data[0]) ? response.data[0].message : null
const serverNFError = "problemas con el servidor - dato no encontrado";
//errors


//Altas mensuales
function userSearchActionFetch(userSearchResponse) {
  return { type: 'DO_USERSEARCH_FETCH', payload: { userSearchStatus: 'FETCH', userSearchResponse } };
}

function userSearchActionFetchError(userSearchErrorMessage) {
  return { type: 'DO_USERSEARCH_FETCH_ERROR', payload: { userSearchStatus: 'FETCH ERROR', userSearchErrorMessage } };
}

function userSearchActionFetching() {
  return { type: 'DO_USERSEARCH_FETCHING', payload: { userSearchStatus: 'FETCHING' } };
}

export function actionNoReduxDouserSearch(userSearchForm) {
  return axios.post(`${apiRoute.apiPath}/.../${userSearchForm.idUser}`, userSearchForm);
}

export function actionDouserSearch(userSearchForm) {
  return (dispatch) => {
    dispatch(userSearchActionFetching());

    return actionNoReduxDouserSearch(userSearchForm).then((response) => {
      dispatch(userSearchActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(userSearchActionFetchError(error ? error : serverNFError));
    });

  }
}
//Altas mensuales

