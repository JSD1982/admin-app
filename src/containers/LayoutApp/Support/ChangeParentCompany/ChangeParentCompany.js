import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDochangeParentCompany } from "./../../../../actions/supportActions";
import {UserSearch} from './../../../../components/UserSearch';
import useForm from "./../../../../helpers/useForm";
import { 
  helperValidateCuit
} from "./../../../../helpers/globalFormValidations";
import baseModule from "contabilium-base-module";

//validate
function formValidateFn (values) {
  let errors = {};
  helperValidateCuit(errors, values.cuitUsuario);
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
const ChangeParentCompany = (props) => {
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [loadingstate, setLoadingstate] = React.useState({ active: false });
  const [notification, setNotification] = React.useState({ active: false });
  const [disabledButton, setDisabledButton] = React.useState(false);
 
   //useForm
   const { handleChange, handleSubmit, values, errors } = useForm({
    callback: formValidated,
    errorsCallback: (values) => (values),
    validate: formValidateFn, // TODO PONER VALIDADOR
    formBody: { cuitUsuario: "" },
  });
   //useForm

  function formValidated() {
    setModalstate({ active: true });
    setDisabledButton(false)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const { doChangeParentCompany } = props;
    const buildResponseObj = {cuitUsuario:values.cuitUsuario}
    doChangeParentCompany(buildResponseObj);
    console.log(buildResponseObj)
    setDisabledButton(true)
    setModalstate({ active: false });
  }


  React.useEffect(() => {
    switch (props.changeParentCompany.changeParentCompanyStatus) {
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
      {props.changeParentCompany.changeParentCompanyErrorMessage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error">
              {props.changeParentCompany.changeParentCompanyErrorMessage}
            </Alert>
          </Grid>
        </Grid>
      )}
      <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="card-content">
            <CardContent>
              <Grid container spacing={3} sm={6} md={4}>
                <Grid item xs={12} >
                    <UserSearch // react-select-2
                      onChange={(optionObj) => {
                        handleChange('cuitUsuario',optionObj.value);
                      }}
                      
                      placeholder="CUIT del nuevo usuario padre"
                      error={errors.cuitUsuario}
                      errorMessage={errors.cuitUsuario}
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
                    Hacerlo empresa padre
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
  changeParentCompany: state.supportReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doChangeParentCompany: actionDochangeParentCompany,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeParentCompany);


