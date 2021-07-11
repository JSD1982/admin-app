import React from "react";
import Switch from '@material-ui/core/Switch';
import baseModule from "contabilium-base-module";
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDouserProfile } from './../../../../../../actions/managementActions';
const { Grid, Typography } = baseModule.components;
const GeneralInfo = (props) => {
  const [isLoadingCard, setIsLoadingCard] = React.useState(false);
  const [values, setValues] = React.useState({ id: props.id });
  const [data, setData] = React.useState([]);
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
        <Grid item xs={12} md={12}>
  <Typography component="h5" variant="h5" >Datos principales</Typography>
          <Typography component="body2" variant="body2">Estos son los datos básicos y obligatorios que el sistema necesita para poder facturar.</Typography>
          <Grid container spacing={3} className="mt-16 mb-8">
            <Grid item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Razon Social</Typography>
  <Typography component={"label"} variant={"label"}>{item.razonSocial === "" ? "-" : item.razonSocial}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Categoria Impositiva</Typography>
              <Typography component={"label"} variant={"label"}>{item.condicionIva === "" ? "-" : item.condicionIva}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">CUIT</Typography>
              <Typography component={"label"} variant={"label"}>{item.cuit === "" ? "-" : item.cuit}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Email</Typography>
              <Typography component={"label"} variant={"label"}>{item.email === "" ? "-" : item.email}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Contacto Celular</Typography>
              <Typography component={"label"} variant={"label"}>{item.telefono === "" ? "-" : item.telefono}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Domicilio Fiscal</Typography>
              <Typography component={"label"} variant={"label"}>{item.domicilio === "" ? "-" : item.domicilio}</Typography>
            </Grid>
          </Grid>
          <hr />
          <Typography component="h5" variant="h5" className="mt-32 mb-32">Configuracion</Typography>
          <Grid container spacing={4} >
          <Grid item xs={12} md={3}>
          <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Factura Electronica </Typography>
          <Switch
            checked={state.checkedA}
            onChange={handleChange}
            color="primary"
            name="checkedA"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          </Grid>
          <Grid item xs={12} md={3}>
          <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Habilitar modulo de contable</Typography>
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          </Grid>
          <Grid item xs={12} md={3}>
          <Typography component={"body2"} variant={"body2"} display="block" color="secondary" className="mb-4">Habilitar multi moneda</Typography>
          <Switch
            checked={state.checkedC}
            onChange={handleChange}
            color="primary"
            name="checkedC"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          </Grid>

          </Grid>
        </Grid>
      </Grid>
     
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

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfo);

