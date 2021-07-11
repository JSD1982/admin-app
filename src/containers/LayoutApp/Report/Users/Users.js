import React from "react";
import Table from "../../../../components/Table";
import baseModule from "contabilium-base-module";
const {
  Card,
  Button,
  CardContent,
  InputField,
  RadioButton,
  Icon,
  Alert,
  Modal,
  SelectDropdown,
  MenuItem,
  Typography,
  Grid
} = baseModule.components;
const User = () => {
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [value, setValue] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const [value3, setValue3] = React.useState("");
  const [selectPlan, setSelectPlan] = React.useState("");
  const [selectPayment, setSelectPayment] = React.useState("");
  const [selectSearchDate, setSelectSearchDate] = React.useState("");

  const handleSelectChange = (event) => {
    setSelectPlan(event.target.value);
  };
  const handleSelectChange2 = (event) => {
    selectPayment(event.target.value);
  };
  const handleSelectChange3 = (event) => {
    setSelectSearchDate(event.target.value);
  };
  const planItems = [
    "Item 1",
    "Item 2",
  ];
  const paymentItems = [
    "Item 1",
    "Item 2",
  ];
  const searchDateItems = [
    "Item 1",
    "Item 2",
  ];
  
 
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };
  const handleChange3 = (event) => {
    setValue3(event.target.value);
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
                <Grid item xs={12} sm={6} lg={3}>
                <SelectDropdown
                    id="plan"
                    value={selectPlan}
                    onChange={handleSelectChange}
                    labelText="Ingrese un plan"
                    variant="outlined"
                    name="plan"


                  >
                    {planItems.map((planItem) => {
                      return (
                        <MenuItem
                          value={planItem}
                          key={planItem}
                        >
                          {planItem}
                        </MenuItem>
                      );
                    })}
                  </SelectDropdown>
                </Grid>
               
                <Grid item xs={12} sm={6} lg={3}>
                  <InputField
                        label="Codigo de promo"
                        type="number"
                        variant="outlined"
                        className="form-element"
                        helperText=""
                        name="code"
                        error={false}
                      />
                </Grid>
               
                <Grid item xs={12} sm={6} lg={3}>
                <SelectDropdown
                    id="payment"
                    value={selectPayment}
                    onChange={handleSelectChange2}
                    labelText="Ultimo metodo de pago"
                    variant="outlined"
                    name="payment"


                  >
                    {paymentItems.map((paymentItem) => {
                      return (
                        <MenuItem
                          value={paymentItem}
                          key={paymentItem}
                        >
                          {paymentItem}
                        </MenuItem>
                      );
                    })}
                  </SelectDropdown>
                </Grid>
                
                <Grid item xs={12} sm={6} lg={3}>
                <SelectDropdown
                    id="searchDate"
                    value={selectSearchDate}
                    onChange={handleSelectChange3}
                    labelText="Filtrar por fecha de ultimo login"
                    variant="outlined"
                    name="searchDate"


                  >
                    {searchDateItems.map((searchDateItem) => {
                      return (
                        <MenuItem
                          value={searchDateItem}
                          key={searchDateItem}
                        >
                          {searchDateItem}
                        </MenuItem>
                      );
                    })}
                  </SelectDropdown>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Typography variant="p" component="p">Con/Sin Integraciones</Typography>
                    <div>
                    <RadioButton
                      checked={value === 'con-integracion'}
                      onChange={handleChange}
                      value="con-integracion"
                      label="Con integraciones"
                      name="radio-button-demo"
                      
                    />
                    <RadioButton
                      checked={value === 'sin-integracion'}
                      onChange={handleChange}
                      value="sin-integracion"
                      label="Sin integraciones"
                      name="radio-button-demo"
                      
                    />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <Typography variant="p" component="p">Ultima forma de pago</Typography>
                  <div>
                    <RadioButton
                      checked={value2 === 'mensual'}
                      onChange={handleChange2}
                      value="mensual"
                      label="Mensual"
                      name="radio-button-demo1"
                      
                    />
                    <RadioButton
                      checked={value2 === 'anual'}
                      onChange={handleChange2}
                      value="anual"
                      label="Anual"
                      name="radio-button-demo1"
                      
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} lg={5}>
                    <Typography variant="p" component="p">Ingrese un parametro</Typography>
                    <div>
                    <RadioButton
                      checked={value3 === 'total-activos'}
                      onChange={handleChange3}
                      value="total-activos"
                      label="Total activos"
                      name="radio-button-demo1"
                      
                    />
                    <RadioButton
                      checked={value3 === 'total-usuarios'}
                      onChange={handleChange3}
                      value="total-usuarios"
                      label="Total usuarios"
                      name="radio-button-demo1"
                      
                    />
                    <RadioButton
                      checked={value3 === 'dados-de-baja'}
                      onChange={handleChange3}
                      value="dados-de-baja"
                      label="Dados de baja"
                      name="radio-button-demo1"
                      
                    />
                    </div>
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

export default User;
