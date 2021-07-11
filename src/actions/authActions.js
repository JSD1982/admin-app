import axios from 'axios';
import { apiRouteAuth } from '../config';


function actionCheckFetchAction(loginResponse) {
  return { type: 'DO_LOGIN_FETCH', payload: { loginStatus: 'FETCH', loginResponse } };
}

function actionCheckFetchErrorAction(loginErrorMessage) {
  return { type: 'DO_LOGIN_FETCH_ERROR', payload: { loginStatus: 'FETCH ERROR', loginErrorMessage } };
}

function actionCheckFetchingAction() {
  return { type: 'DO_LOGIN_FETCHING', payload: { loginStatus: 'FETCHING' } };
}

export function actionDoLogin(loginForm) {
  return (dispatch) => {
    delete axios.defaults.headers.common;
    dispatch(actionCheckFetchingAction());
    return axios.post(`${apiRouteAuth.apiPathAuth}/authenticate/admin`, loginForm).then((response) => {
      
      if(response.data.user === null) dispatch(actionCheckFetchErrorAction(response.data.errors[0].message));
      else {
        console.log("respuesta data",response.data.token)
        localStorage.setItem('authResponse',JSON.stringify(response.data));
        axios.defaults.headers.common = { 'Authorization': `Bearer ${response.data.token}` };
        dispatch(actionCheckFetchAction(response.data));
      }

    }).catch(() => {
      dispatch(actionCheckFetchErrorAction('Problemas con el servidor'));
      // if (withRedirect) window.location = 'login';
    });
  }
}

export function actionCheckLocalStorage () {
  return (dispatch) => {
    const authResponse = localStorage.getItem('authResponse');
    if(authResponse) dispatch(actionCheckFetchAction(JSON.parse(authResponse)));
    else window.location = "/";
  }
}


export function actionDoLogout() {
  return () => {
    localStorage.removeItem('authResponse');
    window.location = "/";
  }
}

export const checkAuthorization = (response) => {
  if (response.status === 401) {
    // localStorage.removeItem('authResponse');
    // window.location = "/";
  }
}