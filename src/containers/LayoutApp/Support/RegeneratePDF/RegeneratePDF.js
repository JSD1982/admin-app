import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDoregeneratePDF } from "./../../../../actions/supportActions";
import useForm from "./../../../../helpers/useForm";
import {UserSearch} from './../../../../components/UserSearch';
import baseModule from "contabilium-base-module";
import { 
  helperValidateCuit, 
  helperValidateSelect,
  helperValidatePtoVta,
  helperValidateNroComprobante
} from "./../../../../helpers/globalFormValidations";

//validate
function formValidateFn (values) {
  let errors = {};
  helperValidatePtoVta(errors, values.pointSale);
  helperValidateNroComprobante(errors, values.voucherNumber);
  helperValidateCuit(errors, values.idItem);
  helperValidateSelect(errors, values.selectItem)
  return errors;
}
//validate


const {
  Card,
  Button,
  CardContent,
  InputField,
  Alert,
  SelectSearch,
  Modal,
  Grid
} = baseModule.components;
const RegeneratePDF = (props) => {

 
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [loadingstate, setLoadingstate] = React.useState({ active: false });
  const [notification, setNotification] = React.useState({ active: false });
  const [disabledButton, setDisabledButton] = React.useState(false);

  
  //useForm
  const { handleChange, handleSubmit, values, errors } = useForm({
    callback: formValidated,
    errorsCallback: (values) => (values),
    validate: formValidateFn, // TODO PONER VALIDADOR
    formBody: { idItem: "", selectItem: "", ptoVta: "", voucherNumber: "" },
  });
   //useForm

  function formValidated() {
    setModalstate({ active: true });
    setDisabledButton(false)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const { doRegeneratePDF } = props;
    const buildResponseObj = {
      idItem: values.idItem,
      selectItem: values.selectItem,
      pointSale: values.pointSale,
      voucherNumber: values.voucherNumber,
    }
    doRegeneratePDF(buildResponseObj);
    console.log(buildResponseObj)
    setDisabledButton(true)
    setModalstate({ active: false });
  }


  React.useEffect(() => {
    switch (props.regeneratePDF.regeneratePDFStatus) {
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


  const receiptItems = [
    { value: 'FCA', label: 'FCA' },
    { value: 'FCB', label: 'FCB' },
    { value: 'FCC', label: 'FCC' },
    { value: 'FCM', label: 'FCM' },
    { value: 'FCE', label: 'FCE' },
    { value: 'NCA', label: 'NCA' },
    { value: 'NCB', label: 'NCB' },
    { value: 'NCC', label: 'NCC' },
    { value: 'NCC', label: 'NCC' },
    { value: 'NCM', label: 'NCM' },
    { value: 'NCE', label: 'NCE' },
    { value: 'NDA', label: 'NDA' },
    { value: 'NDB', label: 'NDB' },
    { value: 'NDC', label: 'NDC' },
    { value: 'NDM', label: 'NDM' },
    { value: 'NDE', label: 'NDE' },
  ];

  return (
    <>
    {notification.active && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="success">
              Datos actualizados
            </Alert>
          </Grid>
        </Grid>
      )}
      {props.regeneratePDF.regeneratePDFErrorMessage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error">
              {props.regeneratePDF.regeneratePDFErrorMessage}
            </Alert>
          </Grid>
        </Grid>
      )}
      <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="card-content">
            <CardContent>
              <Grid container spacing={3} sm={12} md={9} lg={6}>
                <Grid item xs={12} sm={8} md={12} >
                  <UserSearch 
                    onChange={(optionObj) => {
                      handleChange('idItem',optionObj.value);
                    }}
                    placeholder="CUIT del usuario"
                    error={errors.idItem}
                    errorMessage={errors.idItem}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} className="reset-zindex" >
                <SelectSearch 
                      error={errors.selectItem}
                      onChange={(optionObj) => handleChange('selectItem',optionObj.value)}
                      options={receiptItems}
                      placeholder="Tipo de comprobante"
                      errorMessage={errors.selectItem}
                    />
                  </Grid>
                <Grid item xs={12} sm={4} md={4}>
                <InputField
                      label="Pto. Vta"
                      type="number"
                      variant="outlined"
                      className="form-element"
                      name="pointSale"
                      onChange={(e) => handleChange('pointSale',e.target.value)}
                      helperText={errors.pointSale && errors.pointSale}
                      error={errors.pointSale}
                    />
                  </Grid>
                <Grid item xs={12} sm={4} md={4}>
                <InputField
                      label="Nro comprobante"
                      type="number"
                      variant="outlined"
                      className="form-element"
                      name="voucherNumber"
                      onChange={(e) => handleChange('voucherNumber',e.target.value)}
                      helperText={errors.voucherNumber && errors.voucherNumber}
                      error={errors.voucherNumber}
                    />
                  </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card className="card-action" >
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} >
                  <Button
                  
                    variant="contained"
                    color="primary"
                    loading={loadingstate.active}
                    type="submit"
                  >
                    Regenerar PDF
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
  regeneratePDF: state.supportReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doRegeneratePDF: actionDoregeneratePDF,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegeneratePDF);

