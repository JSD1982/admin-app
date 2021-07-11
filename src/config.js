
const isDesa = process.env.NODE_ENV === 'development';
//console.log('isDesa', isDesa, process.env);
export const apiRoute = {
  apiPath: (isDesa) ? 'http://apiqa1.contabilium.com:8081/v2/backoffice' : '',
};
export const apiRouteAuth = {
  apiPathAuth: (isDesa) ? 'http://apiqa1.contabilium.com:8081/v2' : '',
};
//http://apiqa1.contabilium.com:8081/
export default {
  apiRoute,
  apiRouteAuth
};
