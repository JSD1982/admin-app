import React from "react";
import { AnimateComponent } from "../../../../../components";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Company from "./Company";
import PrincipalInfo from "./PrincipalInfo";
import UnsubscribeUser from "./UnsubscribeUser";
import InternalData from "./InternalData";
import Users from "./Users";
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
  Card,
  CardContent,
  Grid
} = baseModule.components;
const UserProfile = (props) => {
  //const currentKey = props.location.pathname.split("/")[1] || "/";
  const [value, setValue] = React.useState(0);
  //let id = props.match.params.user_id;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      
        
          <Grid container spacing={3}>
            <Grid item xs={8} >
              <Grid container spacing={3}>
                <Grid item xs={12} >
                  <Card className="card-content profile-content-inner">
                    <CardContent>
                      
                      <PrincipalInfo id={props.id}/>
                     
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} >
                  <Card className="card-content profile-content-inner">
                    <CardContent>

                      <Grid container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start" className="nav-tabs-container">

                        <Tabs
                          value={value}
                          onChange={handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          centered
                        >
                          <Tab label="Usuarios" />
                          <Tab label="Empresas" />
                        </Tabs>

                      </Grid>
                      <TabPanel value={value} index={0}>
                        <Users id={props.id}/>
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <Company id={props.id}/>
                      </TabPanel>

                    </CardContent>
                  </Card>
                </Grid>

              </Grid>
            </Grid>

            <Grid item xs={4} >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card className="card-content profile-content-inner">
                    <CardContent>
                      <InternalData id={props.id}/>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                <Card className="card-content profile-content-inner">
                    <CardContent>
                      <UnsubscribeUser/>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        
     


    </>
  );
};

export default UserProfile;
