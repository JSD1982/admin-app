import React from "react";
import baseModule from "contabilium-base-module";
const {
  Card,
  Button,
  CardContent,
  InputField,
  Alert,
  Modal,
  DatePicker,
  RadioButton,
  Grid
} = baseModule.components;
const UpdateAccountingAccounts = () => {
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());
  const [value, setValue] = React.useState("a");

  const maxdate = new Date();
 
  const handleChange = (event) => {
    setValue(event.target.value);
  };
 
  
  return (
    <>
    <Grid container spacing={4}>
        <Grid item xs={12}>
          <Alert severity="info">This is an info alert — check it out!</Alert>
        </Grid>
      </Grid>
      <form>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="card-content">
            <CardContent>
              <Grid container spacing={3} sm={12} md={12}>
                <Grid item xs={12} sm={6} md={3} >
                   <InputField
                      label="ID Usuario"
                      type="number"
                      variant="outlined"
                      className="form-element"
                      helperText=""
                      name="idUser"
                      error={false}
                    />
                  </Grid>
                <Grid item xs={12} sm={6} md={3}>
                   <InputField
                      label="Codigo cuenta contable"
                      type="number"
                      variant="outlined"
                      className="form-element"
                      helperText=""
                      name="code"
                      error={false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                
                    <RadioButton
                      checked={value === 'a'}
                      onChange={handleChange}
                      value="a"
                      label="Venta"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'A' }}
                    />
                    <RadioButton
                      checked={value === 'b'}
                      onChange={handleChange}
                      value="b"
                      label="Compra"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'B' }}
                    />
                    <RadioButton
                      checked={value === 'c'}
                      onChange={handleChange}
                      value="c"
                      label="Ambas"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'C' }}
                    />
                    
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}>
                <DatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      name="form"
                      label="Fecha desde"
                      format="MM/dd/yyyy"
                      value={selectedDateFrom}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={setSelectedDateFrom}
                      maxDate={maxdate}
                      invalidDateMessage="Formato incorrecto"

                    />
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}>
                  <DatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      label="Fecha hasta"
                      format="MM/dd/yyyy"
                      value={selectedDateTo}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={setSelectedDateTo}
                      maxDate={maxdate}
                      invalidDateMessage="Formato incorrecto"
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
                    loading={false}
                    onClick={() => setModalstate({ active: true })}
                  >
                    Actualizar
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

export default UpdateAccountingAccounts;
