import React from "react";
import { NavLink } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import baseModule from "contabilium-base-module";

const { MenuItem, MenuContent } = baseModule.components;
const NavBar = () => {
  return (
    <>
      <nav>
        <MenuItem
          component={NavLink}
          to="/dashboard"
          activeClassName="is-active"
          className="nav-link"
        >
          DASHBOARD
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/gestion"
          activeClassName="is-active"
          className="nav-link"
        >
          GESTION
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/marketing"
          activeClassName="is-active"
          className="nav-link"
        >
          MARKETING
        </MenuItem>
        <PopupState variant="popover" popupId="soporte-menu">
          {(popupState) => (
            <React.Fragment>
              <MenuItem
                component={NavLink}
                to="#" onClick={e => e.preventDefault()}
                activeClassName="is-active"
                className="nav-link"
                {...bindTrigger(popupState)}
              >
                SOPORTE
                <ExpandMoreIcon/>
              </MenuItem>
              <MenuContent
                {...bindMenu(popupState)}
                className="menu-link"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/soporte/recuperar-cae"
                >
                  Recuperar CAE
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/soporte/regenerar-pdf"
                >
                  Regenerar PDF
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/soporte/EliminarMasivamente"
                >
                  Eliminar datos masivamente
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/soporte/cambiar-empresa-padre"
                >
                  Cambiar empresa padre
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/soporte/unificar-personas"
                >
                  Unificar personas
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/soporte/agregar-empresa-hija"
                >
                  Agregar empresa hija
                </MenuItem>     
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/soporte/reprocesar-orden-venta"
                >
                  Reprocesar orden venta
                </MenuItem>
                
              </MenuContent>
            </React.Fragment>
          )}
        </PopupState>
        <PopupState variant="popover" popupId="report-menu">
          {(popupState) => (
            <React.Fragment>
              <MenuItem
                component={NavLink}
                to="#" onClick={e => e.preventDefault()}
                activeClassName="is-active"
                className="nav-link"
                {...bindTrigger(popupState)}
              >
                REPORTES
                <ExpandMoreIcon/>
              </MenuItem>
              <MenuContent
                {...bindMenu(popupState)}
                className="menu-link"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/reportes/altas-mensuales"
                >
                  Altas mensuales
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/reportes/referidos"
                >
                  Referidos
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/reportes/promociones"
                >
                  Promociones
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/reportes/vencimientos"
                >
                  Vencimientos
                </MenuItem>
                <MenuItem
                  onClick={popupState.close}
                  activeClassName="is-active"
                  className="drop-nav-link"
                  component={NavLink}
                  to="/reportes/usuarios"
                >
                  Usuarios
                </MenuItem>
              </MenuContent>
            </React.Fragment>
          )}
        </PopupState>
      </nav>
    </>
  );
};

export default NavBar;
