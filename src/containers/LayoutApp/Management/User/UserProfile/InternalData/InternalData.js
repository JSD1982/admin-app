import React from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDouserProfile } from './../../../../../../actions/managementActions';
import baseModule from "contabilium-base-module";
const { Grid, Button, IconButton, Typography, Icon, SelectSearch, Alert, DatePicker, Modal } = baseModule.components;
const InternalData = (props) => {
  const [isLoadingCard, setIsLoadingCard] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [values, setValues] = React.useState({ id: props.id });
  const [data, setData] = React.useState([]);
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  React.useEffect(() => {
    //{props.id}
    setIsLoadingCard((props.management.userProfileStatus === 'FETCHING'));
    if (props.management.userProfileStatus === 'FETCH') {
      const items = props.management.userProfileResponse;
      console.log("datos", items)
      setData(items);
     
    }

  }, [props.management]);



  React.useEffect(() => {
    props.doUserProfile({
      id: values.id
    })
  }, []);
  return (
    <>
    {isLoadingCard && <Skeleton animation="wave" height={200}/>}
    {data.map(item => [
    <div className="animate-fade-in">
      <Grid container spacing={4} >
        <Grid item xs={12}>
        <Typography component="h5" variant="h5" >Datos internos</Typography>
        <Typography component="body2" variant="body2">Estos datos son internos y solo lo veremos nosotros</Typography>
          {/* <Grid container spacing={3} className="mt-8">
            <Grid item item xs={12} md={3}>
              <Typography variant="label" component="label" className="ml-4">
                Usa Producción
                  <Checkbox
                  //checked={checked}
                  color="primary"
                  //onChange={handleChangeCheck}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Typography>
            </Grid>
          </Grid> */}
          <Grid container spacing={3} className="mt-16 mb-8">
            <Grid item item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Cant de empresas habilitadas para crear</Typography>
              <Typography component={"label"} variant={"label"}>{item.cantEmpresasHabilitadas === "" ? "-" : item.cantEmpresasHabilitadas}</Typography>
            </Grid>
            <Grid item item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Password</Typography>
              <Typography component={"label"} variant={"label"}className="mr-16">{item.pwd === "" ? "-" : item.pwd}</Typography>
              <IconButton
              onClick={()=>setModalstate({active:true})}
              edge="start"
              title="Editar password"
              color="inherit"
              size="small"
              className="icon-table-addin "
              ><Icon name="reload" fontSize="small"/></IconButton>
            </Grid>
            <Grid item item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Esta bloqueado</Typography>
              <Typography component={"label"} variant={"label"}>{item.estaBloqueado ? "Si" : "No"}</Typography>
             
            </Grid>
            <Grid item item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Tiene usuarios adicionales bloqueados</Typography>
              <Typography component={"label"} variant={"label"}>{item.estaBloqueadoAd ? "Si" : "No"}</Typography>
             
            </Grid>
            <Grid item item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Actividad</Typography>
              <Typography component={"label"} variant={"label"}>{item.actividad  === null ? "-" : item.actividad}</Typography>
             
            </Grid>
            <Grid item item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Cant empleados</Typography>
              <Typography component={"label"} variant={"label"}>{item.infoCantEmpleados  === "" ? "-" : item.infoCantEmpleados}</Typography>
             
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Sector</Typography>
              <Typography component={"label"} variant={"label"}>{item.infoSector  === "" ? "-" : item.infoSector}</Typography>
             
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Como Nos Conoció</Typography>
              <Typography component={"label"} variant={"label"}>{item.infoComoNosConociste === "" ? "-" : item.infoComoNosConociste}</Typography>
           
            </Grid>
            <Grid item xs={8}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Observaciones</Typography>
              <Typography component={"label"} variant={"label"}>{item.observaciones === null ? "-" : item.observaciones}</Typography>
           
            </Grid>

          </Grid>
        </Grid>
      </Grid>
      {/* modal */}
      <Modal active={modalstate.active}>
            
            <Modal.Body>
            ¿Está seguro que desea enviarle la contraseña por email a {item.razonSocial} ?
              
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outlined"
                color="primary"
                onClick={()=>setModalstate({active:false})}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={()=>setModalstate({active:false})}
                
              >
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>
          {/* modal */}
          
    </div>
    ])}
    </>
  );
};


const mapStateToProps = (state) => ({
  management: state.managementReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doUserProfile: actionDouserProfile
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InternalData);

