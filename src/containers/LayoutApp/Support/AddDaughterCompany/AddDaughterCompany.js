import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDoaddDaughterCompany } from "./../../../../actions/supportActions";
import useForm from "./../../../../helpers/useForm";
import {UserSearch} from './../../../../components/UserSearch';
import { 
  helperValidateParentUser,
  helperValidateChildUser
} from "./../../../../helpers/globalFormValidations";
import baseModule from "contabilium-base-module";

//validate
function formValidateFn (values) {
  let errors = {};
  helperValidateParentUser(errors, values.idPadre);
  helperValidateChildUser(errors, values.idHija);
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
const AddDaughterCompany = (props) => {
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [loadingstate, setLoadingstate] = React.useState({ active: false });
  const [notification, setNotification] = React.useState({ active: false });
  const [disabledButton, setDisabledButton] = React.useState(false);
 
   //useForm
   const { handleChange, handleSubmit, values, errors } = useForm({
    callback: formValidated,
    errorsCallback: (values) => (values),
    validate: formValidateFn, // TODO PONER VALIDADOR
    formBody: { idPadre: "", idHija:"" },
  });
   //useForm

  function formValidated() {
    setModalstate({ active: true });
    setDisabledButton(false)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const { doAddDaughterCompany } = props;
    const buildResponseObj = {
      idPadre: values.idPadre, 
      idHija:values.idHija
    }
    doAddDaughterCompany(buildResponseObj);
    console.log(buildResponseObj)
    setDisabledButton(true)
    setModalstate({ active: false });
  }


  React.useEffect(() => {
    switch (props.addDaughterCompany.addDaughterCompanyStatus) {
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
      {props.addDaughterCompany.addDaughterCompanyErrorMessage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error">
              {props.addDaughterCompany.addDaughterCompanyErrorMessage}
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
                        handleChange('idPadre',optionObj.value);
                      }}
                      
                      placeholder="ID usuario padre"
                      error={errors.idPadre}
                      errorMessage={errors.idPadre}
                    />
                  </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <UserSearch // react-select-2
                      onChange={(optionObj) => {
                        handleChange('idHija',optionObj.value);
                      }}     
                      placeholder="ID usuario hijo"
                      error={errors.idHija}
                      errorMessage={errors.idHija}
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
                    Agregar
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
  addDaughterCompany: state.supportReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doAddDaughterCompany: actionDoaddDaughterCompany,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDaughterCompany);


