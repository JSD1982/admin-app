import React from "react";
import NavBar from "../NavBar";
import MobileNavBar from "../MobileNavBar";
import baseModule from "contabilium-base-module";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDoLogout } from "./../../actions/authActions";

const {
  Image,
  Icon,
  MenuContent,
  MenuItem,
  Hidden,
  IconButton,
} = baseModule.components;

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.doLogout()
    
  };

  React.useEffect(() => {
    // ComponentWillReceiveProps
    console.log("props QUE VINIERON AL HEADER", props.auth);
  }, [props]);

  return (
    <>
      <header>
        <div className="left-topbar-side">
          <div className="inner-left-bar">
            <Hidden mdUp>
              <MobileNavBar />
            </Hidden>
            <Hidden smDown>
              <Link to="/dashboard">
                <Image
                  src="https://admin.contabilium.com/images/logo-inside.png"
                  className="img-logo"
                />
              </Link>
            </Hidden>

            <div className="content-search-input">
              <Icon name="search" className="icon-search" />
              <input placeholder="Buscar usuario..." />
            </div>
          </div>
        </div>

        <Hidden smDown>
          <NavBar/>
        </Hidden>

        <div className="right-topbar-side">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="avatar"
            onClick={handleClick}
          >
            <div className="avatar-mask">
              <Image src="https://admin.contabilium.com/images/photos/loggeduser.png" />
            </div>
          </IconButton>
          <MenuContent
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem  onClick={handleLogout}>
              Cerrar sesión
            </MenuItem>
          </MenuContent>
        </div>
      </header>
    </>
  );
};


const mapStateToProps = (state) => ({
  auth: state.authReducer,
   
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doLogout: actionDoLogout,
      
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

