//Grestion de uruarios
export const managementInitialState = {
  //Usuarios
  usersStatus: '', usersResponse: null, usersErrorMessage: '',
  //Usuarios

  //Perfil
  userProfileStatus: '', userProfileResponse: null, userProfileErrorMessage: '',
  updateLowStatus: '', updateLowResponse: null, updateLowErrorMessage: '',
  electronicBillStatus: '', electronicBillResponse: null, electronicBillErrorMessage: '',
  daughterCompanyStatus: '', daughterCompanyResponse: null, daughterCompanyErrorMessage: '',
  additionalUserStatus: '', additionalUserResponse: null, additionalUserErrorMessage: '',
  principalDataStatus: '', principalDataResponse: null, principalDataErrorMessage: '',
  //Perfil

  //Pagos  
  paymentsStatus: '', paymentsResponse: null, paymentsErrorMessage: '',
  newEditPaymentsStatus: '', newEditPaymentsResponse: null, newEditPaymentsErrorMessage: '',
  deletePaymentsStatus: '', deletePaymentsResponse: null, deletePaymentsErrorMessage: '',
  //Pagos

  //Integraciones
  integrationsStatus: '', integrationsResponse: null, integrationsErrorMessage: '',
  detailIntegrationsStatus: '', detailIntegrationsResponse: null, detailIntegrationsErrorMessage: '',
  //Integraciones

  //Procesos masivos
  massiveProcessesStatus: '', massiveProcessesResponse: null, massiveProcessesErrorMessage: '',
  //Procesos masivos

  //Addins
  addinsStatus: '', addinsResponse: null, addinsErrorMessage: '',
  newEditAddinsStatus: '', newEditAddinsResponse: null, newEditAddinsErrorMessage: '',
  deleteAddinsStatus: '', deleteAddinsResponse: null, deleteAddinsErrorMessage: '',
  parametersAddinsStatus: '', parametersAddinsResponse: null, parametersAddinsErrorMessage: '',
  editParametersAddinsStatus: '', editParametersAddinsResponse: null, editParametersAddinsErrorMessage: '',
  //Addins
};

export default (state = managementInitialState, action) => {
  console.log("reducerrrr", action.type)
  switch (action.type) {
    //Usuarios: Lista
    case 'DO_USERS_FETCH':
    case 'DO_USERS_FETCH_ERROR':
    case 'DO_USERS_FETCHING':
    //Usuarios: Lista

    //Perfil: Dtos principales
    case 'DO_USERPROFILE_FETCH':
    case 'DO_USERPROFILE_FETCH_ERROR':
    case 'DO_USERPROFILE_FETCHING':
    //Perfil: Dtos principales

    //Perfil: Dtos baja btn actualizar
    case 'DO_UPDATELOW_FETCH':
    case 'DO_UPDATELOW_FETCH_ERROR':
    case 'DO_UPDATELOW_FETCHING':
    //Perfil: Dtos baja btn actualizar

    //Perfil: Configuracion fact electronica
    case 'DO_ELECTRONICBILL_FETCH':
    case 'DO_ELECTRONICBILL_FETCH_ERROR':
    case 'DO_ELECTRONICBILL_FETCHING':
    //Perfil: Configuracion fact electronica

    //Perfil: Empresa hijas
    case 'DO_DAUGHTERCOMPANY_FETCH':
    case 'DO_DAUGHTERCOMPANY_FETCH_ERROR':
    case 'DO_DAUGHTERCOMPANY_FETCHING':
    //Perfil: Empresa hijas

    //Perfil: Usuario adicionales
    case 'DO_ADDITIONALUSER_FETCH':
    case 'DO_ADDITIONALUSER_FETCH_ERROR':
    case 'DO_ADDITIONALUSER_FETCHING':
    //Perfil: Usuario adicionales

    //Perfil: Actualizar desc, promo y debito automatico
    case 'DO_PRINCIPALDATAPROFILE_FETCH':
    case 'DO_PRINCIPALDATAPROFILE_FETCH_ERROR':
    case 'DO_PRINCIPALDATAPROFILE_FETCHING':
    //Perfil: Actualizar desc, promo y debito automatico
   
    //Pagos
    case 'DO_PAYMENTS_FETCH':
    case 'DO_PAYMENTS_FETCH_ERROR':
    case 'DO_PAYMENTS_FETCHING':
    //Pagos

    //Pagos: Nuevo / Edicion 
    case 'DO_NEWEDITPAYMENTS_FETCH':
    case 'DO_NEWEDITPAYMENTS_FETCH_FETCH_ERROR':
    case 'DO_NEWEDITPAYMENTS_FETCH_FETCHING':
    //Pagos: Nuevo / Edicion 

    //Pagos: Borrar
    case 'DO_DELETEPAYMENTS_FETCH':
    case 'DO_DELETEPAYMENTS_FETCH_ERROR':
    case 'DO_DELETEPAYMENTS_FETCHING':
    //Pagos: Borrar

    //Integraciones: lista
    case 'DO_INTEGRATIONS_FETCH':
    case 'DO_INTEGRATIONS_FETCH_ERROR':
    case 'DO_INTEGRATIONS_FETCHING':
    //Integraciones: lista

    //integraciones: detalle
    case 'DO_DETAILINTEGRATIONS_FETCH':
    case 'DO_DETAILINTEGRATIONS_FETCH_ERROR':
    case 'DO_DETAILINTEGRATIONS_FETCHING':
    //integraciones: detalle

    //Procesos masivos: lista
    case 'DO_MASSIVEPROCESSES_FETCH':
    case 'DO_MASSIVEPROCESSES_FETCH_ERROR':
    case 'DO_MASSIVEPROCESSES_FETCHING':
    //Procesos masivos: lista

    //Addins: lista
    case 'DO_ADDINS_FETCH':
    case 'DO_ADDINS_FETCH_ERROR':
    case 'DO_ADDINS_FETCHING':
    //Addins: lista

    //Addins: nuevo / Edicion
    case 'DO_NEWEDITADDINS_FETCH':
    case 'DO_NEWEDITADDINS_FETCH_ERROR':
    case 'DO_NEWEDITADDINS_FETCHING':
    //Addins: nuevo / Edicion

    //Addin: Borrar
    case 'DO_DELETEADDINS_FETCH':
    case 'DO_DELETEADDINS_FETCH_ERROR':
    case 'DO_DELETEADDINS_FETCHING':
    //Addin: Borrar

    //Addins: Parametros listar
    case 'DO_PARAMETERSADDINS_FETCH':
    case 'DO_PARAMETERSADDINS_FETCH_ERROR':
    case 'DO_PARAMETERSADDINS_FETCHING':
    //Addins: Parametros listar

    //Addins: Parametro editar
    case 'DO_EDITPARAMETERSADDINS_FETCH':
    case 'DO_EDITPARAMETERSADDINS_FETCH_ERROR':
    case 'DO_EDITPARAMETERSADDINS_FETCHING':
    //Addins: Parametro editar

    
  
    return Object.assign({}, state, action.payload);
    default:
    return state
  }
}


