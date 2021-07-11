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
const ServerNFError = () => {
  //window.location = "/"  
  return("problemas con el servidor" )
};
//errors


//Altas mensuales
function monthlyRegistrationsActionFetch(monthlyRegistrationsResponse) {
  return { type: 'DO_MONTHLYREGISTRATIONS_FETCH', payload: { monthlyRegistrationsStatus: 'FETCH', monthlyRegistrationsResponse } };
}

function monthlyRegistrationsActionFetchError(monthlyRegistrationsErrorMessage) {
  return { type: 'DO_MONTHLYREGISTRATIONS_FETCH_ERROR', payload: { monthlyRegistrationsStatus: 'FETCH ERROR', monthlyRegistrationsErrorMessage } };
}

function monthlyRegistrationsActionFetching() {
  return { type: 'DO_MONTHLYREGISTRATIONS_FETCHING', payload: { monthlyRegistrationsStatus: 'FETCHING' } };
}

export function actionDomonthlyRegistrations(monthlyRegistrationsForm) {
  return (dispatch) => {
    dispatch(monthlyRegistrationsActionFetching());

    return axios.get(`${apiRoute.apiPath}/reporte/GetAltasMensuales/${monthlyRegistrationsForm.selectItem }`, monthlyRegistrationsForm).then((response) => {
      dispatch(monthlyRegistrationsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(monthlyRegistrationsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Altas mensuales

//DetalleAltas mensuales
function monthlyRegistrationsDetailActionFetch(monthlyRegistrationsDetailResponse) {
  return { type: 'DO_MONTHLYREGISTRATIONSDETAIL_FETCH', payload: { monthlyRegistrationsDetailStatus: 'FETCH', monthlyRegistrationsDetailResponse } };
}

function monthlyRegistrationsDetailActionFetchError(monthlyRegistrationsDetailErrorMessage) {
  return { type: 'DO_MONTHLYREGISTRATIONSDETAIL_FETCH_ERROR', payload: { monthlyRegistrationsDetailStatus: 'FETCH ERROR', monthlyRegistrationsDetailErrorMessage } };
}

function monthlyRegistrationsDetailActionFetching() {
  return { type: 'DO_MONTHLYREGISTRATIONSDETAIL_FETCHING', payload: { monthlyRegistrationsDetailStatus: 'FETCHING' } };
}

export function actionDomonthlyRegistrationsDetail(monthlyRegistrationsDetailForm) {
  return (dispatch) => {
    dispatch(monthlyRegistrationsDetailActionFetching());

    return axios.get(`${apiRoute.apiPath}/reporte/GetAltasMensualesDetalle/${monthlyRegistrationsDetailForm.selectItem}/${monthlyRegistrationsDetailForm.month}/${monthlyRegistrationsDetailForm.type}`, monthlyRegistrationsDetailForm).then((response) => {
      dispatch(monthlyRegistrationsDetailActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(monthlyRegistrationsDetailActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//DetalleAltas mensuales

//Referidos
function referralsActionFetch(referralsResponse) {
  return { type: 'DO_REFERRALS_FETCH', payload: { referralsStatus: 'FETCH', referralsResponse } };
}

function referralsActionFetchError(referralsErrorMessage) {
  return { type: 'DO_REFERRALS_FETCH_ERROR', payload: { referralsStatus: 'FETCH ERROR', referralsErrorMessage } };
}

function referralsActionFetching() {
  return { type: 'DO_REFERRALS_FETCHING', payload: { referralsStatus: 'FETCHING' } };
}

export function actionDoreferrals(referralsForm) {
  return (dispatch) => {
    dispatch(referralsActionFetching());

    return axios.get(`${apiRoute.apiPath}/reporte/GetReferidos/2014-01-01/2020-5-18?PageNumber=${referralsForm.paginationRef}`, referralsForm).then((response) => {
      dispatch(referralsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(referralsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Referidos

//ExportarReferidos
function exportReferralsActionFetch(exportReferralsResponse) {
  return { type: 'DO_EXPORTREFERRALS_FETCH', payload: { exportReferralsStatus: 'FETCH', exportReferralsResponse } };
}

function exportReferralsActionFetchError(exportReferralsErrorMessage) {
  return { type: 'DO_EXPORTREFERRALS_FETCH_ERROR', payload: { exportReferralsStatus: 'FETCH ERROR', exportReferralsErrorMessage } };
}

function exportReferralsActionFetching() {
  return { type: 'DO_EXPORTREFERRALS_FETCHING', payload: { exportReferralsStatus: 'FETCHING' } };
}

export function actionDoexportReferrals(exportReferralsForm) {
  return (dispatch) => {
    dispatch(exportReferralsActionFetching());

    return axios.post(`${apiRoute.apiPath}/reporte/ExportReferidos`, exportReferralsForm).then((response) => {
      dispatch(exportReferralsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(exportReferralsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//ExportarReferidos

//Promociones
function promotionsActionFetch(promotionsResponse) {
  return { type: 'DO_PROMOTIONS_FETCH', payload: { promotionsStatus: 'FETCH', promotionsResponse } };
}

function promotionsActionFetchError(promotionsErrorMessage) {
  return { type: 'DO_PROMOTIONS_FETCH_ERROR', payload: { promotionsStatus: 'FETCH ERROR', promotionsErrorMessage } };
}

function promotionsActionFetching() {
  return { type: 'DO_PROMOTIONS_FETCHING', payload: { promotionsStatus: 'FETCHING' } };
}


export function actionDopromotions(promotionsForm) {
 
  console.log("QUE LLEGO EN ACTIONDOPROMOTIONS", promotionsForm);
  return (dispatch) => {
    dispatch(promotionsActionFetching());
    
    return axios.get(`${apiRoute.apiPath}/reporte/GetPromos/${(promotionsForm.from) ? `?desde=${promotionsForm.from.toISOString().split("T")[0]}` : ''}${(promotionsForm.to) ? `?hasta=${promotionsForm.to.toISOString().split("T")[0]}` : ''}${(promotionsForm.inputCode !== '') ? `&codigo=${promotionsForm.inputCode}` : ''}`).then((response) => {
      dispatch(promotionsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(promotionsActionFetchError(error ? error: ServerNFError()));
    });

  }
}
//Promociones

//DetallePromociones
function promotionsDetailActionFetch(promotionsDetailResponse) {
  return { type: 'DO_PROMOTIONSDETAIL_FETCH', payload: { promotionsDetailStatus: 'FETCH', promotionsDetailResponse } };
}

function promotionsDetailActionFetchError(promotionsDetailErrorMessage) {
  return { type: 'DO_PROMOTIONSDETAIL_FETCH_ERROR', payload: { promotionsDetailStatus: 'FETCH ERROR', promotionsDetailErrorMessage } };
}

function promotionsDetailActionFetching() {
  return { type: 'DO_PROMOTIONSDETAIL_FETCHING', payload: { promotionsDetailStatus: 'FETCHING' } };
}


export function actionDopromotionsDetail(promotionsDetailForm) {
 
  console.log("QUE LLEGO EN ACTIONDOPROMOTIONS", promotionsDetailForm);
  return (dispatch) => {
    dispatch(promotionsDetailActionFetching());
    
    return axios.get(`${apiRoute.apiPath}/reporte/GetPromosDetalle/${promotionsDetailForm.idcodigoPromocion}`, promotionsDetailForm).then((response) => {
      dispatch(promotionsDetailActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(promotionsDetailActionFetchError(error ? error: ServerNFError()));
    });

  }
}
//DetallePromociones

//Vencimientos
function maturitiesActionFetch(maturitiesResponse) {
  return { type: 'DO_MATURITIES_FETCH', payload: { maturitiesStatus: 'FETCH', maturitiesResponse } };
}

function maturitiesActionFetchError(maturitiesErrorMessage) {
  return { type: 'DO_MATURITIES_FETCH_ERROR', payload: { maturitiesStatus: 'FETCH ERROR', maturitiesErrorMessage } };
}

function maturitiesActionFetching() {
  return { type: 'DO_MATURITIES_FETCHING', payload: { maturitiesStatus: 'FETCHING' } };
}

export function actionDomaturities(maturitiesForm) {
  return (dispatch) => {
    dispatch(maturitiesActionFetching());

    return axios.post(`${apiRoute.apiPath}/reporte/Vencimientos`, maturitiesForm).then((response) => {
      dispatch(maturitiesActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(maturitiesActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Vencimientos

//Usuarios
function usersActionFetch(usersResponse) {
  return { type: 'DO_USERS_FETCH', payload: { usersStatus: 'FETCH', usersResponse } };
}

function usersActionFetchError(usersErrorMessage) {
  return { type: 'DO_USERS_FETCH_ERROR', payload: { usersStatus: 'FETCH ERROR', usersErrorMessage } };
}

function usersActionFetching() {
  return { type: 'DO_USERS_FETCHING', payload: { usersStatus: 'FETCHING' } };
}

export function actionDousers(usersForm) {
  return (dispatch) => {
    dispatch(usersActionFetching());

    return axios.post(`${apiRoute.apiPath}/reporte/Usuarios`, usersForm).then((response) => {
      dispatch(usersActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(usersActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Usuarios
