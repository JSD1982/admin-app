import React from "react";
import { TitleTopBar, AnimateComponent } from "../../../components";
import baseModule from "contabilium-base-module";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDousers } from './../../../actions/managementActions';
import useForm from "./../../../helpers/useForm";

const {
  FilterTable,
  Card,
  CardContent,
  Grid
} = baseModule.components;

const Management = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const currentKey = props.location.pathname.split("/")[1] || "/";
  const [activeDrop, setActiveDrop] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [tableKey, setTableKey] = React.useState(0);
  const [selectedDatedesde, setSelectedDatedesde] = React.useState(
    new Date()
  );
  const [selectedDatehasta, setSelectedDatehasta] = React.useState(
    new Date()
  );
  const ToggleMenu = () => {
    setActiveDrop(!activeDrop);
  }
  const CloseMenu = () => {
    setActiveDrop(false);
  }
  const HandleSearch = () => {
    setActiveDrop(false);
    setIsLoading(true);
  }
  const OpenMenu = () => {
    setActiveDrop(true);
  }

  const submit = () => {
    console.log("Va a buscar por estos valores", values);
    props.doUsers(values);
    setData([]);
  }

  //useForm
  const { handleChange, handleSubmit, values } = useForm({
    callback: submit,
    errorsCallback: (values) => (values),
    validate: () => ({}),

    formBody: {
      Periodo: 30

    },
  });


  React.useEffect(() => {
    submit();
  }, []);

  const filters = [
    { filterType: "input", label: "Codigo de referido", placeholder: "Codigo de referido", type: "number" },
    {
      filterType: "dischargeDate", label: "select", placeholder: "seleccione un campo", 
      onChangeFrom: setSelectedDatedesde, valueFrom: selectedDatedesde, labelFrom: "Desde",
      onChangeTo: setSelectedDatehasta, valueTo: selectedDatehasta, labelTo: "Hasta", minDate: selectedDatedesde
    }
  ]
  const actions = [
    { text: "Buscar", onClick: HandleSearch }
  ]

  React.useEffect(() => {
    setIsLoading((props.management.usersStatus === 'FETCHING'));

    if (props.management.usersStatus === 'FETCH') {
      const items = props.management.usersResponse.items;
      console.log("datos", items)
      setData(items);
      setTableKey(tableKey + 1);
    }

  }, [props.management]);



  React.useEffect(() => {

    props.doUsers()

  }, []);


  return (
    <>
      <TitleTopBar titleName="Usuarios" iconName="users" />
      <section className="page-main-inner">
        <AnimateComponent key={currentKey} className="page-main">
          {/* {reports.promotionsErrorMessage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error">
              {reports.promotionsErrorMessage}
            </Alert>
          </Grid>
        </Grid>
        )} */}
          <form>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Card className="card-content">
                  <CardContent>
                    <FilterTable
                      key={tableKey}
                      defaultPage={0}
                      rowsPerPage={100}
                      columns={[
                        { name: "id", label: 'ID' },
                        { name: "razonSocial", label: 'Razón social' },
                        { name: "iva", label: 'IVA' },
                        { name: "cuit", label: 'CUIT' },
                        { name: "tel", label: 'Tel' },
                        { name: "referido", label: 'Referido' },
                        { name: "email", label: 'Email' },
                        { name: "actividad", label: 'Actividad' },
                        { name: "setup", label: 'Setup' },
                        { name: "plan", label: 'Plan' },
                        { name: "ultLogin", label: 'Ult login' },
                        { name: "alta", label: 'Alta' },
                      ]}
                      ///gestion/usuario
                    data={data.map(item => [<Link to={`/gestion/usuario/${item.id}`} className="id-link" target="_blank">{item.id}</Link>, item.razonSocial, item.iva, item.cuit, item.tel, item.referido, item.email, item.actividad, item.setup, item.plan, item.ultLogin, item.alta])}
                      selectableRows="none"
                      filterOptions={filters}
                      filterActions={actions}
                      filterPlaceholder="Buscar..."
                      filterActiveDrop={activeDrop}
                      filterCloseDrop={CloseMenu}
                      filterToggleDrop={ToggleMenu}
                      filterDisabled={false}
                      //filterOnchange={OpenMenu}
                      isLoading={isLoading}
                      print={false}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
        </AnimateComponent>
      </section>
    </>
  );
};


const mapStateToProps = (state) => ({
  management: state.managementReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doUsers: actionDousers
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Management);

