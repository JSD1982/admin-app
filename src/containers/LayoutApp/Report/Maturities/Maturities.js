import React from "react";
import Table from "../../../../components/Table";
import baseModule from "contabilium-base-module";
const {
  Card,
  Button,
  CardContent,
  DatePicker,
  RadioButton,
  Icon,
  Alert,
  Modal,
  Grid
} = baseModule.components;
const Maturities = () => {
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());
  const [value, setValue] = React.useState("");
  const [value2, setValue2] = React.useState("");

  const maxdate = new Date();
 
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
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
              <Grid container spacing={3} sm={12} md={8}>
                <Grid item xs={12} sm={6} md={6}>
                    <RadioButton
                      checked={value === 'plan-vencido'}
                      onChange={handleChange}
                      value="plan-vencido"
                      label="Planes vencidos"
                      name="radio-button-demo"
                      
                    />
                    <RadioButton
                      checked={value === 'plan-a-vencer'}
                      onChange={handleChange}
                      value="plan-a-vencer"
                      label="Planes a vencer"
                      name="radio-button-demo"
                      
                    />
                  </Grid>
                <Grid item xs={12} sm={6} md={6}>
                   <RadioButton
                      checked={value2 === 'plan-mensual'}
                      onChange={handleChange2}
                      value="plan-mensual"
                      label="Planes mensuales"
                      name="radio-button-demo1"
                      
                    />
                    <RadioButton
                      checked={value2 === 'plan-anual'}
                      onChange={handleChange2}
                      value="plan-anual"
                      label="Planes anuales"
                      name="radio-button-demo1"
                      
                    />
                  </Grid>
                <Grid item xs={12} sm={6} lg={3}>
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
                <Grid item xs={12} sm={6} lg={3}>
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
                    startIcon={<Icon name="search" fontSize="small" />}
                  >
                    Buscar
                    </Button>
                 
                </Grid>
                <Grid item xs={12} >
                <Table title="Resultados"/>
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

export default Maturities;
