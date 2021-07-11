import React from "react";
import UserProfile from "./UserProfile";
import Addins from "./Addins";
import Payments from "./Payments";
import MassiveProcesses from "./MassiveProcesses";
import Integrations from "./Integrations";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import baseModule from "contabilium-base-module";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

const {
  Grid,
  Image,
  Card,
  Typography,
  CardContent,
  Hidden,
  Button,
  Modal,
  InputField,
  Checkbox,
  Icon
} = baseModule.components;
const User = (props) => {
  const [checked, setChecked] = React.useState(true);
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [value, setValue] = React.useState(0);
  //const currentKey = props.location.pathname.split("/")[1] || "/";
  let id = props.match.params.user_id;
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} >

          <Card className="card-content profile-content">
            <CardContent>
              {/* <IconButton
                component={Link}
                to="/gestion"
                edge="start"
                title="Editar addin"
                color="inherit"
                size="large"
                className="icon-user-close"
              >
                <Icon name="close" fontSize="large" />
              </IconButton> */}
              <Grid container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Grid item className="profile-left-container">
                  <div className="avatar-circle"><Image src="http://app.contabilium.com/files/usuarios/no-photo.png" className="avatar-profile" /></div>
                  <div className="content-username ml-16">
                    <Typography align="left" className="mb-4 mt-16" variant="body1">GRUPO TBPI | 15782</Typography>
                    <Typography align="left" variant="caption">CUIT: 33716782749</Typography>
                    <Typography align="left" variant="caption">bronxpizza.ar@gmail.com</Typography>
                  </div>
                </Grid>
                <Hidden smDown>
                  <Grid item className="profile-right-container">
                    <Typography align="right" component="h2" variant="h5" className="mb-4">Plan actual: Full</Typography>
                    <div>
                      <Button
                        onClick={() => setModalstate({ active: true })}
                        variant="flat"
                        startIcon={<Icon name="edit" fontSize="small" />}
                      >
                        Modificar
                </Button>
                    </div>
                    <Typography align="right" variant="body2" ><Icon name="card" fontSize="small" /> Descuento actual: 36% | Promo: POPFULL</Typography>
                    <Typography align="right" variant="body2" >Antiguedad: 36 meses</Typography>
                  </Grid>
                </Hidden>
              </Grid>
            </CardContent>
            <div className="menu-content ml-32 mt-32">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                className="user-tab"
              >
                <Tab label="Perfil" />
                <Tab label="Pagos" />
                <Tab label="Procesos masivos" />
                <Tab label="Integraciones" />
                <Tab label="Addins" />
              </Tabs>


            </div>
          </Card>
          <div className="user-cards-container">
            <TabPanel value={value} index={0}>
              <UserProfile id={id}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Payments id={id}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <MassiveProcesses id={id}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Integrations id={id}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Addins id={id}/>
            </TabPanel>
          </div>

        </Grid>
      </Grid>
      <form>
        {/* modal */}
        <Modal active={modalstate.active} size="medium">
          <Modal.Title>
            <Typography variant="h5" component="h2">
              Edición
          </Typography>
          </Modal.Title>
          <hr />
          <Modal.Body>
            <Grid container spacing={2} className="mt-8 mb-8">
              <Grid item xs={8}>
                <InputField
                  label="*Descuento"
                  type="number"
                  variant="outlined"
                  className="form-element"
                  name="quantity"
                />
              </Grid>
              <Grid item xs={8}>
                <InputField
                  label="*Promo"
                  type="text"
                  variant="outlined"
                  className="form-element"
                  name="quantity"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="label" component="label" className="ml-4">
                  Adherido al débito automático:
                  <Checkbox
                    checked={checked}
                    color="primary"
                    onChange={handleChangeCheck}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setModalstate({ active: false })}
            >
              Cerrar
          </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalstate({ active: false })}

            >
              Guardar
          </Button>
          </Modal.Footer>
        </Modal>
        {/* modal */}
      </form>
    </>
  );
};

export default User;
