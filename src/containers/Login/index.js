import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useForm } from "react-hook-form";
import baseModule from "contabilium-base-module";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDoLogin } from "./../../actions/authActions";

const { Button, Card, InputField, Image, Alert, Grid } = baseModule.components;

const Login = (props) => {
  const [loadingstate, setLoadingstate] = React.useState({ active: false });
  //const [modalstate, setModalstate] = React.useState({ active: false });

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  const [errorMessage, setErrorMessage] = React.useState(null);

  const onSubmit = (data) => {
    // actionDoLogin == doLogin + dispatcher
    props.doLogin({
      email: data.user,
      password: data.password,
    });
  };

  React.useEffect(() => {
    // ComponentWillReceiveProps
    console.log("props", props);
    switch (props.auth.loginStatus) {
      case "FETCHING":
        setErrorMessage(null);
        setLoadingstate({ active: true });
        break;
      case "FETCH":
        props.history.push("/dashboard");
      case "FETCH ERROR":
        setErrorMessage(props.auth.loginErrorMessage);
        setLoadingstate({ active: false });

        break;
      default:
      //nothing
    }
  }, [props]);

  return (
    <>
      
      <div className="login-container">
        <TransitionGroup component="main" className="page-login-main">
          <CSSTransition classNames="fade" appear={true} timeout={500}>
            <Card className="login-card-container">
              <Image
                src="https://www.contabilium.com/wp-content/uploads/2018/10/logo_contabilium_header-2-1.png"
                className="brand-logo"
              />
              {errorMessage && (
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Alert severity="error">
                      {errorMessage}
                    </Alert>
                  </Grid>
                </Grid>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  label="Usuario"
                  type="text"
                  variant="outlined"
                  helperText={
                    errors.user ? errors.user.message : ""
                  }
                  inputRef={register({
                    required: "Ingrese un usuario",
                  })}
                  name="user"
                  error={errors.user}
                />
                <InputField
                  label="Clave"
                  type="password"
                  variant="outlined"
                  helperText={
                    errors.password
                      ? errors.password.message
                      : ""
                  }
                  inputRef={register({
                    required: "Ingrese su clave",
                  })}
                  name="password"
                  error={errors.password}
                />
                {/* {errorMessage && (
                  <p>{errorMessage}</p>
                )} */}
                <Button
                  variant="contained"
                  color="primary"
                  loading={loadingstate.active}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </Card>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doLogin: actionDoLogin,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
