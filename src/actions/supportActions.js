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
  window.location = "/"  
  return("problemas con el servidor" )
};
//errors



//Recuperar CAE
function recoverCAEActionFetch(recoverCAEResponse) {
  return { type: 'DO_RECOVERCAE_FETCH', payload: { recoverCAEStatus: 'FETCH', recoverCAEResponse } };
}

function recoverCAEActionFetchError(recoverCAEErrorMessage) {
  return { type: 'DO_RECOVERCAE_FETCH_ERROR', payload: { recoverCAEStatus: 'FETCH ERROR', recoverCAEErrorMessage } };
}

function recoverCAEActionFetching() {
  return { type: 'DO_RECOVERCAE_FETCHING', payload: { recoverCAEStatus: 'FETCHING' } };
}

export function actionDoRecoverCAE(recoverCAEForm) {
  return (dispatch) => {
    dispatch(recoverCAEActionFetching());

    return axios.post(`${apiRoute.apiPath}/soporte/RecuperarCAE`, recoverCAEForm).then((response) => {
      dispatch(recoverCAEActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(recoverCAEActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Recuperar CAE

//Regenerar PDF
function regeneratePDFActionFetch(regeneratePDFResponse) {
  return { type: 'DO_REGENERATEPDF_FETCH', payload: { regeneratePDFStatus: 'FETCH', regeneratePDFResponse } };
}

function regeneratePDFActionFetchError(regeneratePDFErrorMessage) {
  return { type: 'DO_REGENERATEPDF_FETCH_ERROR', payload: { regeneratePDFStatus: 'FETCH ERROR', regeneratePDFErrorMessage } };
}

function regeneratePDFActionFetching() {
  return { type: 'DO_REGENERATEPDF_FETCHING', payload: { regeneratePDFStatus: 'FETCHING' } };
}

export function actionDoregeneratePDF(regeneratePDFForm) {
  return (dispatch) => {
    dispatch(regeneratePDFActionFetching());

    return axios.post(`${apiRoute.apiPath}/soporte/RegenerarPDF`, regeneratePDFForm).then((response) => {
      dispatch(regeneratePDFActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(regeneratePDFActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Regenerar PDF

//Eliminacion masiva
function massDeleteActionFetch(massDeleteResponse) {
  return { type: 'DO_MASSDELETE_FETCH', payload: { massDeleteStatus: 'FETCH', massDeleteResponse } };
}

function massDeleteActionFetchError(massDeleteErrorMessage) {
  return { type: 'DO_MASSDELETE_FETCH_ERROR', payload: { massDeleteStatus: 'FETCH ERROR', massDeleteErrorMessage } };
}

function massDeleteActionFetching() {
  return { type: 'DO_MASSDELETE_FETCHING', payload: { massDeleteStatus: 'FETCHING' } };
}


export function actionDoMassDelete(massDeleteForm) {
  return (dispatch) => {
    dispatch(massDeleteActionFetching());

    return axios.post(`${apiRoute.apiPath}/soporte/EliminarMasivamente`, massDeleteForm).then((response) => {
      dispatch(massDeleteActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(massDeleteActionFetchError(error ? error: ServerNFError()));
    });

  }
}
//Eliminacion masiva

//Cambiar empresa padre
function changeParentCompanyActionFetch(changeParentCompanyResponse) {
  return { type: 'DO_CHANGEPARENTCOMPANY_FETCH', payload: { changeParentCompanyStatus: 'FETCH', changeParentCompanyResponse } };
}

function changeParentCompanyActionFetchError(changeParentCompanyErrorMessage) {
  return { type: 'DO_CHANGEPARENTCOMPANY_FETCH_ERROR', payload: { changeParentCompanyStatus: 'FETCH ERROR', changeParentCompanyErrorMessage } };
}

function changeParentCompanyActionFetching() {
  return { type: 'DO_CHANGEPARENTCOMPANY_FETCHING', payload: { changeParentCompanyStatus: 'FETCHING' } };
}

export function actionDochangeParentCompany(changeParentCompanyForm) {
  return (dispatch) => {
    dispatch(changeParentCompanyActionFetching());

    return axios.post(`${apiRoute.apiPath}/soporte/CambiarEmpresaPadre`, changeParentCompanyForm).then((response) => {
      dispatch(changeParentCompanyActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(changeParentCompanyActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Cambiar empresa padre

//Unificar personas
function unifyPeopleActionFetch(unifyPeopleResponse) {
  return { type: 'DO_UNIFYPEOPLE_FETCH', payload: { unifyPeopleStatus: 'FETCH', unifyPeopleResponse } };
}

function unifyPeopleActionFetchError(unifyPeopleErrorMessage) {
  return { type: 'DO_UNIFYPEOPLE_FETCH_ERROR', payload: { unifyPeopleStatus: 'FETCH ERROR', unifyPeopleErrorMessage } };
}

function unifyPeopleActionFetching() {
  return { type: 'DO_UNIFYPEOPLE_FETCHING', payload: { unifyPeopleStatus: 'FETCHING' } };
}

export function actionDounifyPeople(unifyPeopleForm) {
  return (dispatch) => {
    dispatch(unifyPeopleActionFetching());

    return axios.post(`${apiRoute.apiPath}/soporte/UnificarPersonas`, unifyPeopleForm).then((response) => {
      dispatch(unifyPeopleActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(unifyPeopleActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Unificar personas

//Agregar empresa hija
function addDaughterCompanyActionFetch(addDaughterCompanyResponse) {
  return { type: 'DO_ADDDAUGHTERCOMPANY_FETCH', payload: { addDaughterCompanyStatus: 'FETCH', addDaughterCompanyResponse } };
}

function addDaughterCompanyActionFetchError(addDaughterCompanyErrorMessage) {
  return { type: 'DO_ADDDAUGHTERCOMPANY_FETCH_ERROR', payload: { addDaughterCompanyStatus: 'FETCH ERROR', addDaughterCompanyErrorMessage } };
}

function addDaughterCompanyActionFetching() {
  return { type: 'DO_ADDDAUGHTERCOMPANY_FETCHING', payload: { addDaughterCompanyStatus: 'FETCHING' } };
}

export function actionDoaddDaughterCompany(addDaughterCompanyForm) {
  return (dispatch) => {
    dispatch(addDaughterCompanyActionFetching());

    return axios.post(`${apiRoute.apiPath}/soporte/AgregarEmpresaHija`, addDaughterCompanyForm).then((response) => {
      dispatch(addDaughterCompanyActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(addDaughterCompanyActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Agregar empresa hija

//Reprocesar orden venta
function reprocessSalesOrderActionFetch(reprocessSalesOrderResponse) {
  return { type: 'DO_REPROCESSSALESORDER_FETCH', payload: { reprocessSalesOrderStatus: 'FETCH', reprocessSalesOrderResponse } };
}

function reprocessSalesOrderActionFetchError(reprocessSalesOrderErrorMessage) {
  return { type: 'DO_REPROCESSSALESORDER_FETCH_ERROR', payload: { reprocessSalesOrderStatus: 'FETCH ERROR', reprocessSalesOrderErrorMessage } };
}

function reprocessSalesOrderActionFetching() {
  return { type: 'DO_REPROCESSSALESORDER_FETCHING', payload: { reprocessSalesOrderStatus: 'FETCHING' } };
}

export function actionDoreprocessSalesOrder(reprocessSalesOrderForm) {
  return (dispatch) => {
    dispatch(reprocessSalesOrderActionFetching());

    return axios.post(`${apiRoute.apiPath}/soporte/ReprocesarOrdenVenta`, reprocessSalesOrderForm).then((response) => {
      dispatch(reprocessSalesOrderActionFetch(response.data));
    }).catch((e) => {
      checkAuthorization(e.response);
      const error = getErrorFromResponse(e.response);
      dispatch(reprocessSalesOrderActionFetchError(error ? error : ServerNFError()));
    });

  }
}
//Reprocesar orden venta


// //Reprocesar saldo
// function reprocessBalanceActionFetch(reprocessBalanceResponse) {
//   return { type: 'DO_REPROCESSBALANCE_FETCH', payload: { reprocessBalanceStatus: 'FETCH', reprocessBalanceResponse } };
// }

// function reprocessBalanceActionFetchError(reprocessBalanceErrorMessage) {
//   return { type: 'DO_REPROCESSBALANCE_FETCH_ERROR', payload: { reprocessBalanceStatus: 'FETCH ERROR', reprocessBalanceErrorMessage } };
// }

// function reprocessBalanceActionFetching() {
//   return { type: 'DO_REPROCESSBALANCE_FETCHING', payload: { reprocessBalanceStatus: 'FETCHING' } };
// }

// export function actionDoreprocessBalance(reprocessBalanceForm) {
//   return (dispatch) => {
//     dispatch(reprocessBalanceActionFetching());

//     return axios.post(`${apiRoute.apiPath}/soporte/ReprocesarSaldo`, reprocessBalanceForm).then((response) => {
//       dispatch(reprocessBalanceActionFetch(response.data));
//     }).catch((e) => {
//       checkAuthorization(e.response);
//       const error = getErrorFromResponse(e.response);
//       dispatch(reprocessBalanceActionFetchError(error ? error : ServerNFError()));
//     });

//   }
// }
// //Reprocesar saldo



// //Importar publicaciones
// function importPostsActionFetch(importPostsResponse) {
//   return { type: 'DO_IMPORTPOSTS_FETCH', payload: { importPostsStatus: 'FETCH', importPostsResponse } };
// }

// function importPostsActionFetchError(importPostsErrorMessage) {
//   return { type: 'DO_IMPORTPOSTS_FETCH_ERROR', payload: { importPostsStatus: 'FETCH ERROR', importPostsErrorMessage } };
// }

// function importPostsActionFetching() {
//   return { type: 'DO_IMPORTPOSTS_FETCHING', payload: { importPostsStatus: 'FETCHING' } };
// }

// export function actionDoimportPosts(importPostsForm) {
//   return (dispatch) => {
//     dispatch(importPostsActionFetching());

//     return axios.post(`${apiRoute.apiPath}/soporte/ImportarPublicaciones`, importPostsForm).then((response) => {
//       dispatch(importPostsActionFetch(response.data));
//     }).catch((e) => {
//       checkAuthorization(e.response);
//       const error = getErrorFromResponse(e.response);
//       dispatch(importPostsActionFetchError(error ? error : ServerNFError()));
//     });

//   }
// }
// //Importar publicaciones

// //Actualizar cuentas contables
// function updateAccountingAccountsActionFetch(updateAccountingAccountsResponse) {
//   return { type: 'DO_UPDATEACCOUNTINGACCOUNTS_FETCH', payload: { updateAccountingAccountsStatus: 'FETCH', updateAccountingAccountsResponse } };
// }

// function updateAccountingAccountsActionFetchError(updateAccountingAccountsErrorMessage) {
//   return { type: 'DO_UPDATEACCOUNTINGACCOUNTS_FETCH_ERROR', payload: { updateAccountingAccountsStatus: 'FETCH ERROR', updateAccountingAccountsErrorMessage } };
// }

// function updateAccountingAccountsActionFetching() {
//   return { type: 'DO_UPDATEACCOUNTINGACCOUNTS_FETCHING', payload: { updateAccountingAccountsStatus: 'FETCHING' } };
// }

// export function actionDoupdateAccountingAccounts(updateAccountingAccountsForm) {
//   return (dispatch) => {
//     dispatch(updateAccountingAccountsActionFetching());

//     return axios.post(`${apiRoute.apiPath}/soporte/ActualizarCuentasContables`, updateAccountingAccountsForm).then((response) => {
//       dispatch(updateAccountingAccountsActionFetch(response.data));
//     }).catch((e) => {
//       checkAuthorization(e.response);
//       const error = getErrorFromResponse(e.response);
//       dispatch(updateAccountingAccountsActionFetchError(error ? error : ServerNFError()));
//     });

//   }
// }
// //Actualizar cuentas contables

// //Actualizar precios
// function updatePricesActionFetch(updatePricesResponse) {
//   return { type: 'DO_UPDATEPRICES_FETCH', payload: { updatePricesStatus: 'FETCH', updatePricesResponse } };
// }

// function updatePricesActionFetchError(updatePricesErrorMessage) {
//   return { type: 'DO_UPDATEPRICES_FETCH_ERROR', payload: { updatePricesStatus: 'FETCH ERROR', updatePricesErrorMessage } };
// }

// function updatePricesActionFetching() {
//   return { type: 'DO_UPDATEPRICES_FETCHING', payload: { updatePricesStatus: 'FETCHING' } };
// }

// export function actionDoupdatePrices(updatePricesForm) {
//   return (dispatch) => {
//     dispatch(updatePricesActionFetching());

//     return axios.post(`${apiRoute.apiPath}/soporte/ActualizarPrecios`, updatePricesForm).then((response) => {
//       dispatch(updatePricesActionFetch(response.data));
//     }).catch((e) => {
//       checkAuthorization(e.response);
//       const error = getErrorFromResponse(e.response);
//       dispatch(updatePricesActionFetchError(error ? error : ServerNFError()));
//     });

//   }
// }
// //Actualizar precios




