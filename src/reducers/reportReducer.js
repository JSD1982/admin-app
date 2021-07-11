//Recuperar CAE 
export const reportInitialState = {
  monthlyRegistrationsStatus: '', monthlyRegistrationsResponse: null, monthlyRegistrationsErrorMessage: '',
  monthlyRegistrationsDetailStatus: '', monthlyRegistrationsDetailResponse: null, monthlyRegistrationsDetailErrorMessage: '',
  referralsStatus: '', referralsResponse: null, referralsErrorMessage: '',
  exportReferralsStatus: '', exportReferralsResponse: null, exportReferralsErrorMessage: '',
  promotionsStatus: '', promotionsResponse: null, promotionsErrorMessage: '',
  promotionsDetailStatus: '', promotionsDetailResponse: null, promotionsDetailErrorMessage: '',
  maturitiesStatus: '', maturitiesResponse: null, maturitiesErrorMessage: '',
  usersStatus: '', usersResponse: null, usersErrorMessage: '',
};

export default (state = reportInitialState, action) => {
  switch (action.type) {
    //Altas mensuales
    case 'DO_MONTHLYREGISTRATIONS_FETCH':
    case 'DO_MONTHLYREGISTRATIONS_FETCH_ERROR':
    case 'DO_MONTHLYREGISTRATIONS_FETCHING':
    //Altas mensuales
    
    //Detalle altas mensuales
    case 'DO_MONTHLYREGISTRATIONSDETAIL_FETCH':
    case 'DO_MONTHLYREGISTRATIONSDETAIL_FETCH_ERROR':
    case 'DO_MONTHLYREGISTRATIONSDETAIL_FETCHING':
    //Detalle altas mensuales

    //Referidos 
    case 'DO_REFERRALS_FETCH':
    case 'DO_REFERRALS_FETCH_ERROR':
    case 'DO_REFERRALS_FETCHING':
    //Referidos 

     //ExportarReferidos 
     case 'DO_EXPORTREFERRALS_FETCH':
      case 'DO_EXPORTREFERRALS_FETCH_ERROR':
      case 'DO_EXPORTREFERRALS_FETCHING':
      //ExportarReferidos   

    //Promociones
    case 'DO_PROMOTIONS_FETCH':
    case 'DO_PROMOTIONS_FETCH_ERROR':
    case 'DO_PROMOTIONS_FETCHING':
    //Promociones

    //DetallePromociones
    case 'DO_PROMOTIONSDETAIL_FETCH':
    case 'DO_PROMOTIONSDETAIL_FETCH_ERROR':
    case 'DO_PROMOTIONSDETAIL_FETCHING':
    //DetallePromociones
    
    //Vencimientos
    case 'DO_MATURITIES_FETCH':
    case 'DO_MATURITIES_FETCH_ERROR':
    case 'DO_MATURITIES_FETCHING':
    //Vencimientos

    //Usuarios
    case 'DO_USERS_FETCH':
    case 'DO_USERS_FETCH_ERROR':
    case 'DO_USERS_FETCHING':
    //Usuarios

    return Object.assign({}, state, action.payload);
    default:
    return state
  }
}


