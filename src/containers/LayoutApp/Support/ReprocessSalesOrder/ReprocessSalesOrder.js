import React from "react";
import useForm from "./../../../../helpers/useForm";
import { 
  helperValidateNroOrden, 
  helperValidateEmail,
  helperValidateFrom, 
  helperValidateTo 
} from "./../../../../helpers/globalFormValidations";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDoreprocessSalesOrder } from "./../../../../actions/supportActions";
import baseModule from "contabilium-base-module";
const {
  Card,
  Button,
  CardContent,
  InputField,
  RadioButton,
  Alert,
  Modal,
  DatePicker,
  Grid,
  Typography
} = baseModule.components;


//validate
function formValidateFn (values) {
  let errors = {};
  helperValidateNroOrden(errors, values.nroOrden);
  helperValidateEmail(errors, values.email);
  helperValidateFrom(errors, values.from, values.to)
  helperValidateTo(errors, values.to, values.from)
  return errors;
}
//validate

const ReprocessSalesOrder = (props) => {
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [loadingstate, setLoadingstate] = React.useState({ active: false });
  const [notification, setNotification] = React.useState({ active: false });
  const [disabledButton, setDisabledButton] = React.useState(false);

  //useForm
  const { handleChange, handleSubmit, values, errors } = useForm({
    callback: formValidated,
    errorsCallback: (values) => (values),
    validate: formValidateFn, // TODO PONER VALIDADOR
    formBody: {  integrationItem:"ml", nroOrden: "", email:"", from: new Date(), to: new Date() },
  });
   //useForm

  const maxdate = new Date();

  function formValidated() {
    setModalstate({ active: true });
    setDisabledButton(false)
  }

  const onSubmit = () => {
    const { doReprocessSalesOrder } = props;
    const buildResponseObj = {
      integrationItem:values.integrationItem,
      email:values.email,
      nroOrden: values.nroOrden,
      desde: values.from.toISOString().split("T")[0],
      hasta: values.to.toISOString().split("T")[0],
    }
    
    console.log('buildResponseObj',buildResponseObj);

    doReprocessSalesOrder(buildResponseObj);
    setDisabledButton(true)
    setModalstate({ active: false });
  };

  React.useEffect(() => {
    switch (props.reprocessSalesOrder.reprocessSalesOrderStatus) {
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
      {props.reprocessSalesOrder.reprocessSalesOrderErrorMessage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error">
              {props.reprocessSalesOrder.reprocessSalesOrderErrorMessage}
            </Alert>
          </Grid>
        </Grid>
      )}
      <form onSubmit={handleSubmit} noValidate>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="card-content">
            <CardContent>
              <Grid container spacing={3} sm={12} md={9}>
                <Grid item xs={12} sm={6} md={4}>
                <Typography variant="p" component="p">Tipo de integracion</Typography>
                <div>
                <RadioButton
                  checked={values.integrationItem == "ml"}
                  value={"ml"}
                  label="Mercado Libre"
                  labelText="Qué desea eliminar?"
                  variant="outlined"
                  name="integrationItem"
                  onChange={(e) => handleChange('integrationItem',e.target.value)}
                />
                <RadioButton
                  checked={values.integrationItem == "tn"}
                  value={"tn"}
                  label="TiendaNube"
                  labelText="Qué desea eliminar?"
                  variant="outlined"
                  name="integrationItem"
                  onChange={(e) => handleChange('integrationItem',e.target.value)}
                />
                 </div>
                  </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputField
                      label="Email Integracion"
                      type="email"
                      variant="outlined"
                      className="form-element"
                      helperText={errors.email && errors.email}
                      name="email"
                      onChange={(e) => handleChange('email',e.target.value)}
                      error={errors.email}
                    />
                  </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputField
                      label="Nro de Ordenes"
                      type="number"
                      variant="outlined"
                      className="form-element"
                      helperText={errors.nroOrden && errors.nroOrden}
                      name="nroOrden"
                      onChange={(e) => handleChange('nroOrden',e.target.value)}
                      error={errors.nroOrden}
                    />
                  </Grid>
                <Grid item xs={12} sm={3} md={3}>
                <DatePicker
                      variant="inline"
                      inputVariant="outlined"
                      name="from"
                      label="Desde"
                      format="dd/MM/yyyy"
                      value={values.from}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(from) => handleChange('from',from)}
                      maxDate={maxdate}
                      invalidDateMessage="Formato incorrecto"
                      error={errors.from}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}>
                  <DatePicker
                      name="to"
                      variant="inline"
                      inputVariant="outlined"
                      label="Hasta"
                      format="dd/MM/yyyy"
                      value={values.to}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(to) => handleChange('to',to)}
                      maxDate={maxdate}
                      minDate={values.from }
                      invalidDateMessage="Formato incorrecto"
                      error={errors.to}
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
                      type="submit"
                      loading={loadingstate.active}
                    >
                      Reprocesar
                    </Button>
                    {/* <input type="submit" /> */}
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
  reprocessSalesOrder: state.supportReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doReprocessSalesOrder: actionDoreprocessSalesOrder,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReprocessSalesOrder);