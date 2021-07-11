import React from "react";
import useForm from "./../../../../helpers/useForm";
import { helperValidateCuit, helperValidateSelect, helperValidateFrom, helperValidateTo } from "./../../../../helpers/globalFormValidations";
import {UserSearch} from './../../../../components/UserSearch';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDoMassDelete } from "./../../../../actions/supportActions";

import baseModule from "contabilium-base-module";
const {
  Card,
  Button,
  CardContent,
  Grid,
  Alert,
  SelectSearch,
  Modal,
  DatePicker
} = baseModule.components;

//validate
function formValidateFn (values) {
  let errors = {};
  
  helperValidateCuit(errors, values.cuitUsuario);
  helperValidateSelect(errors, values.tipo)
  helperValidateFrom(errors, values.fechaDesde, values.fechaHasta)
  helperValidateTo(errors, values.fechaHasta, values.fechaDesde)
  return errors;
}
//validate

const MassDeleteData = (props) => {


  const [modalstate, setModalstate] = React.useState({ active: false });
  const [loadingstate, setLoadingstate] = React.useState({ active: false });
  const [notification, setNotification] = React.useState({ active: false });
  const [disabledButton, setDisabledButton] = React.useState(false);
 
  
  //useForm
  const { handleChange, handleSubmit, values, errors } = useForm({
    callback: formValidated,
    errorsCallback: (values) => (values),
    validate: formValidateFn, // TODO PONER VALIDADOR
    formBody: { cuitUsuario: "", tipo: "", fechaDesde: new Date(), fechaHasta: new Date() },
  });
   //useForm

  const maxdate = new Date();

  function formValidated() {
    setModalstate({ active: true });
    setDisabledButton(false)
  }

  const onSubmit = () => {
    const { doMassDelete } = props;
    const buildResponseObj = {
      cuitUsuario: values.cuitUsuario,
      tipo: values.tipo,
      fechaDesde: values.fechaDesde.toISOString().split("T")[0],
      fechaHasta: values.fechaHasta.toISOString().split("T")[0],
    }
    
    console.log('buildResponseObj',buildResponseObj);

    doMassDelete(buildResponseObj);
    setDisabledButton(true)
    setModalstate({ active: false });
  };

  React.useEffect(() => {
    switch (props.deleteMass.massDeleteStatus) {
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

 
  const dataDeleteItems = [
    { value: 'Productos', label: 'Productos' },
    { value: 'Clientes', label: 'Clientes' },
    { value: 'Proveedores', label: 'Proveedores' },
    { value: 'Ventas', label: 'Ventas' },
    { value: 'Compras', label: 'Compras' },
    { value: 'Cobranzas', label: 'Cobranzas' },
    { value: 'Pagos', label: 'Pagos' },
    { value: 'Ordenes Ventas', label: 'Ordenes Ventas' },
    { value: 'Ordenes Compra', label: 'Ordenes Compra' },
    { value: 'Movimientos Bancarios', label: 'Movimientos Bancarios' },
    { value: 'Turnos POS Web', label: 'Turnos POS Web' },
    { value: 'Movimientos de Cajas', label: 'Movimientos de Cajas' },
    { value: 'RESETEO (todo)', label: 'RESETEO (todo)' },
  ];

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
      {props.deleteMass.massDeleteErrorMessage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error">
              {props.deleteMass.massDeleteErrorMessage}
            </Alert>
          </Grid>
        </Grid>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card className="card-content">
              <CardContent>
                <Grid container spacing={3} sm={12} md={7}>
                  <Grid item xs={12} sm={6} md={6}>
                    <UserSearch 
                      onChange={(optionObj) => {
                        handleChange('cuitUsuario',optionObj.value);
                      }}
                      placeholder="CUIT del usuario"
                      error={errors.cuitUsuario}
                      errorMessage={errors.cuitUsuario}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <SelectSearch 
                      error={errors.tipo}
                      onChange={(optionObj) => handleChange('tipo',optionObj.value)}
                      options={dataDeleteItems}
                      placeholder="Qué desea eliminar?"
                      errorMessage={errors.tipo}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <DatePicker
                      variant="inline"
                      inputVariant="outlined"
                      name="fechaDesde"
                      label="Desde"
                      format="dd/MM/yyyy"
                      value={values.fechaDesde}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(fechaDesde) => handleChange('fechaDesde',fechaDesde)}
                      maxDate={maxdate}
                      
                      invalidDateMessage="Formato incorrecto"
                      error={errors.fechaDesde}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <DatePicker
                      name="fechaHasta"
                      variant="inline"
                      inputVariant="outlined"
                      label="Hasta"
                      format="dd/MM/yyyy"
                      value={values.fechaHasta}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(fechaHasta) => handleChange('fechaHasta',fechaHasta)}
                      maxDate={maxdate}
                      minDate={values.from}
                      minDateMessage="La fecha no puede ser menos a la fecha desde"
                      invalidDateMessage="Formato incorrecto"
                      error={errors.fechaHasta}
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
                      Eliminar
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
  deleteMass: state.supportReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doMassDelete: actionDoMassDelete,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MassDeleteData);


