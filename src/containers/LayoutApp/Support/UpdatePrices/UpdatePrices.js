import React from "react";
import baseModule from "contabilium-base-module";
const {
  Card,
  Button,
  CardContent,
  InputField,
  Alert,
  Modal,
  Grid
} = baseModule.components;
const UpdatePrices = () => {
  const [modalstate, setModalstate] = React.useState({ active: false });
 
  
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
              <Grid container spacing={3} sm={12} md={7}>
                <Grid item xs={12} sm={6} md={6}>
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
                <Grid item xs={12} sm={6} md={6}>
                  <InputField
                      label="ID Combo"
                      type="number"
                      variant="outlined"
                      className="form-element"
                      helperText=""
                      name="idCombo"
                      error={false}
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

export default UpdatePrices;
