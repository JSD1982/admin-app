import React from "react";
import { Header } from "../../components";
import { actionCheckLocalStorage } from './../../actions/authActions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Layout = ({ children, checkLocalStorage }) => {

  React.useEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <>
      <Header />
      {children}
    </>
  );
};


const mapStateToProps = state => ({
  auth: state.authReducer
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkLocalStorage: actionCheckLocalStorage,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
