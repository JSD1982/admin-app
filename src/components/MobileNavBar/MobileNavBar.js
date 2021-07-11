import React from "react";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { NavLink } from "react-router-dom";
import baseModule from "contabilium-base-module";
const { IconButton, Image } = baseModule.components;

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

export default function MobileNavBar() {
  //drawer
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  //drawer

  //expandible
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //expandible

  const list = (anchor) => (
    <div className="mobile-menu-container">
      <Image
        src="https://www.contabilium.com/wp-content/uploads/2018/10/logo_contabilium_header-2-1.png"
        className="mobile-logo"
      />
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <NavLink
            to="/dashboard"
            activeClassName="is-active"
            className="nav-link"
            onClick={toggleDrawer(anchor, false)}
          >
            DASHBOARD
          </NavLink>
        </ExpansionPanelSummary>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary>
          <NavLink
            to="/gestion"
            activeClassName="is-active"
            className="nav-link"
            onClick={toggleDrawer(anchor, false)}
          >
            GESTION
          </NavLink>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <NavLink
            to="/marketing"
            activeClassName="is-active"
            className="nav-link"
            onClick={toggleDrawer(anchor, false)}
          >
            MARKETING
          </NavLink>
        </ExpansionPanelSummary>
      </ExpansionPanel>

      <ExpansionPanel
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <NavLink to="#" onClick={(e) => e.preventDefault()}>
            SOPORTE
          </NavLink>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="expandible-menu">
          <div>
            <NavLink
              to="/soporte/recuperar-cae"
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
            >
              Recuperar CAE
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/soporte/regenerar-pdf"
            >
              Regenerar PDF
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/soporte/EliminarMasivamente"
            >
              Eliminar datos masivamente
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/soporte/cambiar-empresa-padre"
            >
              Cambiar empresa padre
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/soporte/unificar-personas"
            >
              Unificar personas
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/soporte/agregar-empresa-hija"
            >
              Agregar empresa hija
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/soporte/reprocesar-orden-venta"
            >
              Reprocesar orden venta
            </NavLink>
            {/*<NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/soporte/reprocesar-saldo"
            >
              Reprocesar saldo
            </NavLink>
             <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/soporte/importar-publicaciones"
            >
              Importar publicaciones
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/soporte/actualizar-cuentas-contables"
            >
              Actualizar cuentas contables
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/soporte/actualizar-precios"
            >
              Actualizar precios
            </NavLink> */}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <NavLink to="#" onClick={(e) => e.preventDefault()}>
            REPORTES
          </NavLink>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="expandible-menu">
          <div>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/reportes/altas-mensuales"
            >
              Altas mensuales
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/reportes/referidos"
            >
              Referidos
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/reportes/promociones"
            >
              Promociones
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/reportes/vencimientos"
            >
              Vencimientos
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              onClick={toggleDrawer(anchor, false)}
              to="/reportes/usuarios"
            >
              Usuarios
            </NavLink>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
