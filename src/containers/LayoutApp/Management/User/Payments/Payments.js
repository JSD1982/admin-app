import React from "react";

import PaymentPlan from "./components/PaymentPlan"
import baseModule from "contabilium-base-module";
const {
  Grid,
  ContabiliumTable,
  Card,
  Icon,
  Modal,
  Alert,
  Typography,
  Button,
  IconButton,
  CardContent
} = baseModule.components;
const Payments = (props) => {
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [formstate, setFormstate] = React.useState({ form: "" });
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [notification, setNotification] = React.useState({ active: false });
  
  const handleNew = () =>{
    setFormstate({form:"new"})
    setModalstate({ active: true })
  }
  const handleEdit = () =>{
    setFormstate({form:"edit"})
    setModalstate({ active: true })
  }
  const handleDelete = () =>{
    setFormstate({form:"delete"})
    setModalstate({ active: true })
  }
  const handleClose = () =>{
    setModalstate({ active: false })
    setNotification({ active: false })
    setTimeout(() => {
      setFormstate({form:""})
    }, 300)
    
  }

  return (
    <>
     
     <Card className="card-content profile-content-inner">
      <CardContent>
      <form>
      <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container direction="row"
              justify="flex-end"
              alignItems="center">
              <Button
               onClick={handleNew}
                variant="outlined"
                color="primary"
                startIcon={<Icon name="add" fontSize="small" />}
              >
                Nuevo
              </Button>
            </Grid>
          </Grid>
        </Grid>  
      <Grid container spacing={4}>
        <Grid item xs={12}>
         
        <ContabiliumTable
              className="table-last-right payment-data"
              defaultPage={0}
              rowsPerPage={100}
              columns={[
                {name: "Plan", label: 'Plan'},
                {name: "Descuento", label: 'Descuento'},
                {name: "Inicio", label: 'Inicio'},
                {name: "Vencimiento", label: 'Vencimiento'},
                {name: "Foma de pago", label: 'Foma de pago'},
                {name: "Promo", label: 'Promo'},
                {name: "Nro ref", label: 'Nro ref'},
                {name: "Importe pagado", label: 'Importe pagado'},
                {name: "Fecha de pago", label: 'Fecha de pago'},
                {name: "Nro comprobante", label: 'Nro comprobante'},
                {name: "Estado", label: 'Estado'},
                {name: "Acciones", label: ' '},
              ]}
              data={[
              {"Plan":"Free", 
              "Descuento":<div className="amount-item">{"0,00"}</div>, 
              "Inicio":"10/06/2020", 
              "Vencimiento":"20/06/2020", 
              "Foma de pago":"-", 
              "Promo":"-",
              "Nro ref":"-", 
              "Importe pagado":<div className="amount-item">{"0,00"}</div>, 
              "Fecha de pago":"10/06/2020", 
              "Nro comprobante":"-", 
              "Estado":"Aceptado",  
              "Acciones":
              <>
              <IconButton
              onClick={handleEdit}
              edge="start"
              title="Editar addin"
              color="inherit"
              size="small"
              className="icon-table-addin"
              ><Icon name="edit" fontSize="small"/></IconButton>
              <IconButton
                onClick={handleDelete}
                edge="start"
                title="Eliminar addin"
                color="inherit"
                size="small"
                className="icon-table-addin"
              ><Icon name="delete" fontSize="small"/></IconButton>
            </>
            }
              ]}
              viewColumns={false}
              download={false}
              filter={false}
              print={false}
              search={false}
              selectableRows="none"
              isLoading={isLoading}
            />
           
        </Grid>
      </Grid>
      {/* modal */}
      <Modal active={modalstate.active} size="medium">
        {formstate.form==="new" && 
        <>
       
        <Modal.Title>
          <Typography variant="h5" component="h2">
            Plan de Pago
          </Typography>
        </Modal.Title>
        <hr/>
        <PaymentPlan handleCloseAction={handleClose}/>
       
        </>
        }

        {formstate.form==="edit" && 
        <>
        <Modal.Title>
          <Typography variant="h5" component="h2">
            Plan de Pago
          </Typography>
        </Modal.Title>
        <hr/>
        <PaymentPlan disabledForm handleCloseAction={handleClose}/>
        </>
        }


        {formstate.form==="delete" && 
        <>
        <Modal.Body>
          ¿Está seguro que desea <strong>eliminar</strong> el pago de la empresa: Contabilium SA?
        </Modal.Body>
        <hr/>
        <Modal.Footer>
          <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
          >
            Cerrar
          </Button>
          <Button
            variant="contained"
            color="primary"
          >
            Aceptar
          </Button>
          </Grid>
        </Modal.Footer>
        </>
        }
        </Modal>
        {/* modal */}
        </form>
      </CardContent>
    </Card> 
   
      
    </>
  );
};

export default Payments;
