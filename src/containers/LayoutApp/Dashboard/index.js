import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TitleTopBar, AnimateComponent } from "../../../components";
const Dashboard = ({ location, auth }) => {

  React.useEffect(() => {
    // ComponentWillReceiveProps
    console.log("props QUE VINIERON", auth);
  
  },[auth]);


  const currentKey = location.pathname.split("/")[1] || "/";
  return (
    <>
      <TitleTopBar  titleName="Dashboard" iconName="dashboard"/>
      <section className="page-main-inner">
        <AnimateComponent keyAction={currentKey} className="page-main">
          <Button variant="contained" color="primary">
            Dashboard
          </Button>
          
        </AnimateComponent>
        
      </section>
    </>
  );
};


const mapStateToProps = state => ({
  auth: state.authReducer
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // doLogin: actionDoLogin,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

