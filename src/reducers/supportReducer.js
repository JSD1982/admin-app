//Recuperar CAE 
export const supportInitialState = {
  recoverCAEStatus: '', recoverCAEResponse: null, recoverCAEErrorMessage: '',
  regeneratePDFStatus: '', regeneratePDFResponse: null, regeneratePDFErrorMessage: '',
  massDeleteStatus: '', massDeleteResponse: null, massDeleteErrorMessage: '',
  changeParentCompanyStatus: '', changeParentCompanyResponse: null, changeParentCompanyErrorMessage: '',
  unifyPeopleStatus: '', unifyPeopleResponse: null, unifyPeopleErrorMessage: '',
  addDaughterCompanyStatus: '', addDaughterCompanyResponse: null, addDaughterCompanyErrorMessage: '',
  reprocessSalesOrderStatus: '', reprocessSalesOrderResponse: null, reprocessSalesOrderErrorMessage: '',
  //reprocessBalanceStatus: '', reprocessBalanceResponse: null, reprocessBalanceErrorMessage: '',
  //importPostsStatus: '', importPostsResponse: null, importPostsErrorMessage: '',
  //updateAccountingAccountsStatus: '', updateAccountingAccountsResponse: null, updateAccountingAccountsErrorMessage: '',
  //updatePricesStatus: '', updatePricesResponse: null, updatePricesErrorMessage: ''

};

export default (state = supportInitialState, action) => {
  switch (action.type) {
    //Recuperar CAE
    case 'DO_RECOVERCAE_FETCH':
    case 'DO_RECOVERCAE_FETCH_ERROR':
    case 'DO_RECOVERCAE_FETCHING':
    //Recuperar CAE 

    //Regenerar PDF 
    case 'DO_REGENERATEPDF_FETCH':
    case 'DO_REGENERATEPDF_FETCH_ERROR':
    case 'DO_REGENERATEPDF_FETCHING':
    //Regenerar PDF 

    //Eliminacion masiva
    case 'DO_MASSDELETE_FETCH':
    case 'DO_MASSDELETE_FETCH_ERROR':
    case 'DO_MASSDELETE_FETCHING':
    //Eliminacion masiva

    //Cambiar empresa padre 
    case 'DO_CHANGEPARENTCOMPANY_FETCH':
    case 'DO_CHANGEPARENTCOMPANY_FETCH_ERROR':
    case 'DO_CHANGEPARENTCOMPANY_FETCHING':
    //Cambiar empresa padre 

    //Unificar personas
    case 'DO_UNIFYPEOPLE_FETCH':
    case 'DO_UNIFYPEOPLE_FETCH_ERROR':
    case 'DO_UNIFYPEOPLE_FETCHING':
    //Unificar personas

    //Agregar empresa hija 
    case 'DO_ADDDAUGHTERCOMPANY_FETCH':
    case 'DO_ADDDAUGHTERCOMPANY_FETCH_ERROR':
    case 'DO_ADDDAUGHTERCOMPANY_FETCHING':
    //Agregar empresa hija 

    //Reprocesar orden venta
    case 'DO_REPROCESSSALESORDER_FETCH':
    case 'DO_REPROCESSSALESORDER_FETCH_ERROR':
    case 'DO_REPROCESSSALESORDER_FETCHING':
    //Reprocesar orden venta

    // //Reprocesar saldo 
    // case 'DO_REPROCESSBALANCE_FETCH':
    // case 'DO_REPROCESSBALANCE_FETCH_ERROR':
    // case 'DO_REPROCESSBALANCE_FETCHING':
    // //Reprocesar saldo 

    // //Importar publicaciones  
    // case 'DO_IMPORTPOSTS_FETCH':
    // case 'DO_IMPORTPOSTS_FETCH_ERROR':
    // case 'DO_IMPORTPOSTS_FETCHING':
    // //Importar publicaciones 

    // //Actualizar cuentas contables
    // case 'DO_UPDATEACCOUNTINGACCOUNTS_FETCH':
    // case 'DO_UPDATEACCOUNTINGACCOUNTS_FETCH_ERROR':
    // case 'DO_UPDATEACCOUNTINGACCOUNTS_FETCHING':
    // //Actualizar cuentas contables

    // //Actualizar precios
    // case 'DO_UPDATEPRICES_FETCH':
    // case 'DO_UPDATEPRICES_FETCH_ERROR':
    // case 'DO_UPDATEPRICES_FETCHING':
    //   //Actualizar precios

      return Object.assign({}, state, action.payload);
    default:
      return state
  }
}


