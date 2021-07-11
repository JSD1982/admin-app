import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDounifyPeople } from "./../../../../actions/supportActions";
import useForm from "./../../../../helpers/useForm";
import {UserSearch} from './../../../../components/UserSearch';
import { 
  helperValidateUser,
  helperValidateDeleteUser,
  helperValidateKeepUser
} from "./../../../../helpers/globalFormValidations";
import baseModule from "contabilium-base-module";

//validate
function formValidateFn (values) {
  let errors = {};
  helperValidateUser(errors, values.idUsuario);
  helperValidateDeleteUser(errors, values.idPersonaEliminar);
  helperValidateKeepUser(errors, values.idPersonaMantener);
  return errors;
}
//validate

const {
  Card,
  Button,
  CardContent,
  InputField,
  Alert,
  Modal,
  Grid
} = baseModule.components;
const UnifyPeople = (props) => {
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [loadingstate, setLoadingstate] = React.useState({ active: false });
  const [notification, setNotification] = React.useState({ active: false });
  const [disabledButton, setDisabledButton] = React.useState(false);
 
   //useForm
   const { handleChange, handleSubmit, values, errors } = useForm({
    callback: formValidated,
    errorsCallback: (values) => (values),
    validate: formValidateFn, // TODO PONER VALIDADOR
    formBody: { idUsuario: "", idPersonaEliminar:"",idPersonaMantener:"" },
  });
   //useForm

  function formValidated() {
    setModalstate({ active: true });
    setDisabledButton(false)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const { doUnifyPeople } = props;
    const buildResponseObj = {
      idUsuario:values.idUsuario,
      idPersonaEliminar:values.idPersonaEliminar,
      idPersonaMantener:values.idPersonaMantener
    }
    doUnifyPeople(buildResponseObj);
    console.log(buildResponseObj)
    setDisabledButton(true)
    setModalstate({ active: false });
  }


  React.useEffect(() => {
    switch (props.unifyPeople.unifyPeopleStatus) {
      case "FETCHING":
        setLoadingstate({ active: true });
        break;
      case "FETCH":
        setNotification({ active: true });
        setLoadingstate({ active: false });
        break;
      case "FETCH ERROR":
        setLoadingstate({ active: false });
        break;
      default:
      //nothing
    }
  }, [props]);
  
  return (
    <>
    {notification.active && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="success">
              Datos Eliminados
            </Alert>
          </Grid>
        </Grid>
      )}
      {props.unifyPeople.unifyPeopleErrorMessage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error">
              {props.unifyPeople.unifyPeopleErrorMessage}
            </Alert>
          </Grid>
        </Grid>
      )}
      <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="card-content">
            <CardContent>
              <Grid container spacing={3} sm={12} md={12}>
                <Grid item xs={12} sm={6} md={3}>
                <UserSearch // react-select-2
                      onChange={(optionObj) => {
                        handleChange('idUsuario',optionObj.value);
                      }}
                      
                      placeholder="ID Usuario"
                      error={errors.idUsuario}
                      errorMessage={errors.idUsuario}
                    />
                  </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <UserSearch // react-select-2
                      onChange={(optionObj) => {
                        handleChange('idPersonaEliminar',optionObj.value);
                      }}
                      
                      placeholder="IDPersona a eliminar"
                      error={errors.idPersonaEliminar}
                      errorMessage={errors.idPersonaEliminar}
                    />
                  </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <UserSearch // react-select-2
                      onChange={(optionObj) => {
                        handleChange('idPersonaMantener',optionObj.value);
                      }}
                      
                      placeholder="IDPersona a mantener"
                      error={errors.idPersonaMantener}
                      errorMessage={errors.idPersonaMantener}
                    />
                  </Grid>
               
              </Grid>
            </CardContent>
          </Card>
          <Card className="card-action">
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    loading={loadingstate.active}
                    type="submit"
                  >
                    Unificar
                    </Button>
                 

                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* modal */}
      <Modal active={modalstate.active}>
          <Modal.Body>
            ¿Está seguro que desea eliminar los del CUIT seleccionado?
            
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setModalstate({ active: false })}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={disabledButton}
              
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
        {/* modal */}
        </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  unifyPeople: state.supportReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doUnifyPeople: actionDounifyPeople,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UnifyPeople);


