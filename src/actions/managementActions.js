import axios from 'axios';
import { apiRoute } from '../config';
import { checkAuthorization } from './authActions';

//validate token
const localData = localStorage.getItem('authResponse');
if (localData && JSON.parse(localData) && JSON.parse(localData) && JSON.parse(localData).token) {
  
  axios.defaults.headers.common = { 
    'Authorization': `Bearer ${JSON.parse(localData).token}` ,
    
  };
}

//errors
const getErrorFromResponse = (response) => (response && response.data && response.data[0]) ? response.data[0].message : null
const ServerNFError = () => {
  //window.location = "/"  
  return("problemas con el servidor" )
};
//errors


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

export function actionDousers() {
  return (dispatch) => {
    dispatch(usersActionFetching());
    const config = { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }};
    return axios.get(`${apiRoute.apiPath}/gestion/ObtenerUsuarios`, config).then((response) => {
      dispatch(usersActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(usersActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Usuarios


//Perfil
function userProfileActionFetch(userProfileResponse) {
  return { type: 'DO_USERPROFILE_FETCH', payload: { userProfileStatus: 'FETCH', userProfileResponse } };
}

function userProfileActionFetchError(userProfileErrorMessage) {
  return { type: 'DO_USERPROFILE_FETCH_ERROR', payload: { userProfileStatus: 'FETCH ERROR', userProfileErrorMessage } };
}

function userProfileActionFetching() {
  return { type: 'DO_USERPROFILE_FETCHING', payload: { userProfileStatus: 'FETCHING' } };
}

export function actionDouserProfile(userProfileForm) {
  return (dispatch) => {
    dispatch(userProfileActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ObtenerUsuario/${userProfileForm.id}`, userProfileForm).then((response) => {
      dispatch(userProfileActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(userProfileActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Perfil
//Perfil: Dtos baja btn actualizar
function updateLowActionFetch(updateLowResponse) {
  return { type: 'DO_UPDATELOW_FETCH', payload: { updateLowStatus: 'FETCH', updateLowResponse } };
}

function updateLowActionFetchError(updateLowErrorMessage) {
  return { type: 'DO_UPDATELOW_FETCH_ERROR', payload: { updateLowStatus: 'FETCH ERROR', updateLowErrorMessage } };
}

function updateLowActionFetching() {
  return { type: 'DO_UPDATELOW_FETCHING', payload: { updateLowStatus: 'FETCHING' } };
}

export function actionDoupdateLow(updateLowForm) {
  return (dispatch) => {
    dispatch(updateLowActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ActualizarBajaDelUsuario`, updateLowForm).then((response) => {
      dispatch(updateLowActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(updateLowActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Perfil: Dtos baja btn actualizar
//Perfil: Configuracion fact electronica
function electronicBillActionFetch(electronicBillResponse) {
  return { type: 'DO_ELECTRONICBILL_FETCH', payload: { electronicBillStatus: 'FETCH', electronicBillResponse } };
}

function electronicBillActionFetchError(electronicBillErrorMessage) {
  return { type: 'DO_ELECTRONICBILL_FETCH_ERROR', payload: { electronicBillStatus: 'FETCH ERROR', electronicBillErrorMessage } };
}

function electronicBillActionFetching() {
  return { type: 'DO_ELECTRONICBILL_FETCHING', payload: { electronicBillStatus: 'FETCHING' } };
}

export function actionDoelectronicBill(electronicBillForm) {
  return (dispatch) => {
    dispatch(electronicBillActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ActualizarFacturaElectronicaYUsaProd`, electronicBillForm).then((response) => {
      dispatch(electronicBillActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(electronicBillActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Perfil: Configuracion fact electronica
//Perfil: Empresa hijas
function daughterCompanyActionFetch(daughterCompanyResponse) {
  return { type: 'DO_DAUGHTERCOMPANY_FETCH', payload: { daughterCompanyStatus: 'FETCH', daughterCompanyResponse } };
}

function daughterCompanyActionFetchError(daughterCompanyErrorMessage) {
  return { type: 'DO_DAUGHTERCOMPANY_FETCH_ERROR', payload: { daughterCompanyStatus: 'FETCH ERROR', daughterCompanyErrorMessage } };
}

function daughterCompanyActionFetching() {
  return { type: 'DO_DAUGHTERCOMPANY_FETCHING', payload: { daughterCompanyStatus: 'FETCHING' } };
}

export function actionDodaughterCompany(daughterCompanyForm) {
  return (dispatch) => {
    dispatch(daughterCompanyActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ObtenerEmpresas/${daughterCompanyForm.id}`, daughterCompanyForm).then((response) => {
      dispatch(daughterCompanyActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(daughterCompanyActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Perfil: Empresa hijas
//Perfil: Usuario adicionales
function additionalUserActionFetch(additionalUserResponse) {
  return { type: 'DO_ADDITIONALUSER_FETCH', payload: { additionalUserStatus: 'FETCH', additionalUserResponse } };
}

function additionalUserActionFetchError(additionalUserErrorMessage) {
  return { type: 'DO_ADDITIONALUSER_FETCH_ERROR', payload: { additionalUserStatus: 'FETCH ERROR', additionalUserErrorMessage } };
}

function additionalUserActionFetching() {
  return { type: 'DO_ADDITIONALUSER_FETCHING', payload: { additionalUserStatus: 'FETCHING' } };
}

export function actionDoadditionalUser(additionalUserForm) {
  return (dispatch) => {
    dispatch(additionalUserActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ObtenerUsuariosAdicionales/${additionalUserForm.id}`, additionalUserForm).then((response) => {
      dispatch(additionalUserActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(additionalUserActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Perfil: Usuario adicionales
//Perfil: Actualizar desc, promo y debito automatico
function principalDataActionFetch(principalDataResponse) {
  return { type: 'DO_PRINCIPALDATAPROFILE_FETCH', payload: { principalDataStatus: 'FETCH', principalDataResponse } };
}

function principalDataActionFetchError(principalDataErrorMessage) {
  return { type: 'DO_PRINCIPALDATAPROFILE_FETCH_ERROR', payload: { principalDataStatus: 'FETCH ERROR', principalDataErrorMessage } };
}

function principalDataActionFetching() {
  return { type: 'DO_PRINCIPALDATAPROFILE_FETCHING', payload: { principalDataStatus: 'FETCHING' } };
}

export function actionDoprincipalData(principalDataForm) {
  return (dispatch) => {
    dispatch(principalDataActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ActualizarDescuentoYPromo`, principalDataForm).then((response) => {
      dispatch(principalDataActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(principalDataActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Perfil: Actualizar desc, promo y debito automatico


//Pagos  
function paymentsActionFetch(paymentsResponse) {
  return { type: 'DO_PAYMENTS_FETCH', payload: { paymentsStatus: 'FETCH', paymentsResponse } };
}

function paymentsActionFetchError(paymentsErrorMessage) {
  return { type: 'DO_PAYMENTS_FETCH_ERROR', payload: { paymentsStatus: 'FETCH ERROR', paymentsErrorMessage } };
}

function paymentsActionFetching() {
  return { type: 'DO_PAYMENTS_FETCHING', payload: { paymentsStatus: 'FETCHING' } };
}

export function actionDopayments(paymentsForm) {
  return (dispatch) => {
    dispatch(paymentsActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ObtenerPlanesPagos/`, paymentsForm).then((response) => {
      dispatch(paymentsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(paymentsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Pagos
//Pagos: Nuevo / Edicion  
function newEditPaymentsActionFetch(newEditPaymentsResponse) {
  return { type: 'DO_NEWEDITPAYMENTS_FETCH', payload: { newEditPaymentsStatus: 'FETCH', newEditPaymentsResponse } };
}

function newEditPaymentsActionFetchError(newEditPaymentsErrorMessage) {
  return { type: 'DO_NEWEDITPAYMENTS_FETCH_ERROR', payload: { newEditPaymentsStatus: 'FETCH ERROR', newEditPaymentsErrorMessage } };
}

function newEditPaymentsActionFetching() {
  return { type: 'DO_NEWEDITPAYMENTS_FETCHING', payload: { newEditPaymentsStatus: 'FETCHING' } };
}

export function actionDonewEditPayments(newEditPaymentsForm) {
  return (dispatch) => {
    dispatch(newEditPaymentsActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/GuardarPlanesPagos`, newEditPaymentsForm).then((response) => {
      dispatch(newEditPaymentsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(newEditPaymentsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Pagos: Nuevo / Edicion
//Pagos: Borrar  
function deletePaymentsActionFetch(deletePaymentsResponse) {
  return { type: 'DO_DELETEPAYMENTS_FETCH', payload: { deletePaymentsStatus: 'FETCH', deletePaymentsResponse } };
}

function deletePaymentsActionFetchError(deletePaymentsErrorMessage) {
  return { type: 'DO_DELETEPAYMENTS_FETCH_ERROR', payload: { deletePaymentsStatus: 'FETCH ERROR', deletePaymentsErrorMessage } };
}

function deletePaymentsActionFetching() {
  return { type: 'DO_DELETEPAYMENTS_FETCHING', payload: { deletePaymentsStatus: 'FETCHING' } };
}

export function actionDodeletePayments(deletePaymentsForm) {
  return (dispatch) => {
    dispatch(deletePaymentsActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/EliminarPlanesPago`, deletePaymentsForm).then((response) => {
      dispatch(deletePaymentsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(deletePaymentsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Pagos: Borrar

//Integraciones
function integrationsActionFetch(integrationsResponse) {
  return { type: 'DO_INTEGRATIONS_FETCH', payload: { integrationsStatus: 'FETCH', integrationsResponse } };
}

function integrationsActionFetchError(integrationsErrorMessage) {
  return { type: 'DO_INTEGRATIONS_FETCH_ERROR', payload: { integrationsStatus: 'FETCH ERROR', integrationsErrorMessage } };
}

function integrationsActionFetching() {
  return { type: 'DO_INTEGRATIONS_FETCHING', payload: { integrationsStatus: 'FETCHING' } };
}

export function actionDointegrations(integrationsForm) {
  return (dispatch) => {
    dispatch(integrationsActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ObtenerIntegraciones/${integrationsForm.id}`, integrationsForm).then((response) => {
      dispatch(integrationsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(integrationsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Integraciones
//integraciones: detalle
function detailIntegrationsActionFetch(detailIntegrationsResponse) {
  return { type: 'DO_DETAILINTEGRATIONS_FETCH', payload: { detailIntegrationsStatus: 'FETCH', detailIntegrationsResponse } };
}

function detailIntegrationsActionFetchError(detailIntegrationsErrorMessage) {
  return { type: 'DO_DETAILINTEGRATIONS_FETCH_ERROR', payload: { detailIntegrationsStatus: 'FETCH ERROR', detailIntegrationsErrorMessage } };
}

function detailIntegrationsActionFetching() {
  return { type: 'DO_DETAILINTEGRATIONS_FETCHING', payload: { detailIntegrationsStatus: 'FETCHING' } };
}

export function actionDodetailIntegrations(detailIntegrationsForm) {
  return (dispatch) => {
    dispatch(detailIntegrationsActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ObtenerParametrosIntegracion/${detailIntegrationsForm.id}`, detailIntegrationsForm).then((response) => {
      dispatch(detailIntegrationsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(detailIntegrationsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//integraciones: detalle

//Procesos masivos 
function massiveProcessesActionFetch(massiveProcessesResponse) {
  return { type: 'DO_MASSIVEPROCESSES_FETCH', payload: { massiveProcessesStatus: 'FETCH', massiveProcessesResponse } };
}

function massiveProcessesActionFetchError(massiveProcessesErrorMessage) {
  return { type: 'DO_MASSIVEPROCESSES_FETCH_ERROR', payload: { massiveProcessesStatus: 'FETCH ERROR', massiveProcessesErrorMessage } };
}

function massiveProcessesActionFetching() {
  return { type: 'DO_MASSIVEPROCESSES_FETCHING', payload: { massiveProcessesStatus: 'FETCHING' } };
}

export function actionDomassiveProcesses(massiveProcessesForm) {
  return (dispatch) => {
    dispatch(massiveProcessesActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ObtenerLogProcesosMasivos/${massiveProcessesForm.id}`, massiveProcessesForm).then((response) => {
      dispatch(massiveProcessesActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(massiveProcessesActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Procesos masivos MassiveProcesses

//Addins
function addinsActionFetch(addinsResponse) {
  return { type: 'DO_ADDINS_FETCH', payload: { addinsStatus: 'FETCH', addinsResponse } };
}

function addinsActionFetchError(addinsErrorMessage) {
  return { type: 'DO_ADDINS_FETCH_ERROR', payload: { addinsStatus: 'FETCH ERROR', addinsErrorMessage } };
}

function addinsActionFetching() {
  return { type: 'DO_ADDINS_FETCHING', payload: { addinsStatus: 'FETCHING' } };
}

export function actionDoaddins(addinsForm) {
  return (dispatch) => {
    dispatch(addinsActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ObtenerUsuariosAddins`, addinsForm).then((response) => {
      dispatch(addinsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(addinsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Addins
//Addins: nuevo / Edicion
function newEditAddinsActionFetch(newEditAddinsResponse) {
  return { type: 'DO_NEWEDITADDINS_FETCH', payload: { newEditAddinsStatus: 'FETCH', newEditAddinsResponse } };
}

function newEditAddinsActionFetchError(newEditAddinsErrorMessage) {
  return { type: 'DO_NEWEDITADDINS_FETCH_ERROR', payload: { newEditAddinsStatus: 'FETCH ERROR', newEditAddinsErrorMessage } };
}

function newEditAddinsActionFetching() {
  return { type: 'DO_NEWEDITADDINS_FETCHING', payload: { newEditAddinsStatus: 'FETCHING' } };
}

export function actionDonewEditAddins(newEditAddinsForm) {
  return (dispatch) => {
    dispatch(newEditAddinsActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/GuardarUsuarioAddin`, newEditAddinsForm).then((response) => {
      dispatch(newEditAddinsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(newEditAddinsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Addins: nuevo / Edicion
//Addin: Borrar
function deleteAddinsActionFetch(deleteAddinsResponse) {
  return { type: 'DO_DELETEADDINS_FETCH', payload: { deleteAddinsStatus: 'FETCH', deleteAddinsResponse } };
}

function deleteAddinsActionFetchError(deleteAddinsErrorMessage) {
  return { type: 'DO_DELETEADDINS_FETCH_ERROR', payload: { deleteAddinsStatus: 'FETCH ERROR', deleteAddinsErrorMessage } };
}

function deleteAddinsActionFetching() {
  return { type: 'DO_DELETEADDINS_FETCHING', payload: { deleteAddinsStatus: 'FETCHING' } };
}

export function actionDodeleteAddins(deleteAddinsForm) {
  return (dispatch) => {
    dispatch(deleteAddinsActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/EliminarUsuarioAddin`, deleteAddinsForm).then((response) => {
      dispatch(deleteAddinsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(deleteAddinsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Addin: Borrar
//Addins: Parametros listar
function parametersAddinsActionFetch(parametersAddinsResponse) {
  return { type: 'DO_PARAMETERSADDINS_FETCH', payload: { parametersAddinsStatus: 'FETCH', parametersAddinsResponse } };
}

function parametersAddinsActionFetchError(parametersAddinsErrorMessage) {
  return { type: 'DO_PARAMETERSADDINS_FETCH_ERROR', payload: { parametersAddinsStatus: 'FETCH ERROR', parametersAddinsErrorMessage } };
}

function parametersAddinsActionFetching() {
  return { type: 'DO_PARAMETERSADDINS_FETCHING', payload: { parametersAddinsStatus: 'FETCHING' } };
}

export function actionDoparametersAddins(parametersAddinsForm) {
  return (dispatch) => {
    dispatch(parametersAddinsActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/ObtenerParametrosAddin`, parametersAddinsForm).then((response) => {
      dispatch(parametersAddinsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(parametersAddinsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Addins: Parametros listar
//Addins: Parametro editar
function editParametersAddinsActionFetch(editParametersAddinsResponse) {
  return { type: 'DO_EDITPARAMETERSADDINS_FETCH', payload: { editParametersAddinsStatus: 'FETCH', editParametersAddinsResponse } };
}

function editParametersAddinsActionFetchError(editParametersAddinsErrorMessage) {
  return { type: 'DO_EDITPARAMETERSADDINS_FETCH_ERROR', payload: { editParametersAddinsStatus: 'FETCH ERROR', editParametersAddinsErrorMessage } };
}

function editParametersAddinsActionFetching() {
  return { type: 'DO_EDITPARAMETERSADDINS_FETCHING', payload: { editParametersAddinsStatus: 'FETCHING' } };
}

export function actionDoeditParametersAddins(editParametersAddinsForm) {
  return (dispatch) => {
    dispatch(editParametersAddinsActionFetching());

    return axios.get(`${apiRoute.apiPath}/gestion/GuardarParametrosAddin`, editParametersAddinsForm).then((response) => {
      dispatch(editParametersAddinsActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(editParametersAddinsActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Addins: Parametro editar









