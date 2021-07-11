import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "contabilium-base-module/assets/styles/theming";
import { withRouter, Switch, Route } from "react-router-dom";
import {
  TestField,
  Login,
  NotFound,
  Dashboard,
  Management,
  Support,
  Report,
  User,
  UserProfile,
  Addins,
  MassiveProcesses,
  Integrations,
  Payments,
  Marketing
} from "./containers";
import { Layout } from "./components";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export const store = createStoreWithMiddleware(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme} >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/test" component={TestField} />
          <Layout>
            <Switch>
              <Route  path="/dashboard" component={Dashboard} />
              <Route  exact path="/gestion" component={Management} />
              <Route  path="/marketing" component={Marketing} />
              <Route  path="/gestion/usuario/:user_id" component={User} />
              <Route  exact path="/gestion/usuario-pagos/" component={Payments} />
              <Route  path="/gestion/usuario/usuario-integraciones/" component={Integrations} />
              <Route  path="/gestion/usuario-procesosMasivos/" component={MassiveProcesses} />
              <Route  path="/gestion/usuario/addins" component={Addins} />
              {/* <Route  path="/gestion/usuario/15782" component={User} /> */}
              <Route  path="/soporte/:support_id" component={Support} />
              <Route  path="/reportes/:reports_id" component={Report} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Switch>
      </ThemeProvider>
    </Provider>
  );
};

export default withRouter(App);
