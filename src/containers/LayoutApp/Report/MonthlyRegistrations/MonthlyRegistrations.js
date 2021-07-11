import React from "react";
import { PlanDataTotal } from '../../../../helpers/formatData'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDomonthlyRegistrations, actionDomonthlyRegistrationsDetail } from "./../../../../actions/reportActions";
import baseModule from "contabilium-base-module";
const {
  Card,
  CardContent,
  Grid,
  Button,
  Modal,
  Alert,
  ContabiliumTable,
  SelectSearch
} = baseModule.components;


const MonthlyRegistrations = ({ doMonthlyRegistrations, doMonthlyRegistrationsDetail, reports }) => {
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [values, setValues] = React.useState({ selectItem: null });
  const [table, setTable] = React.useState({ type: "" });
  const [tableTitle, setTableTitle] = React.useState({ title: "" });
  const [isLoading, setIsLoading] = React.useState({});
  const [isLoadingDetail, setIsLoadingDetail] = React.useState({});
  const [data, setData] = React.useState([]);
  const [dataDetail, setDataDetail] = React.useState([]);
  const [tableKey, setTableKey] = React.useState(0);

  const dataYears = [
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
    { value: 2018, label: 2018 },
    { value: 2017, label: 2017 },
    { value: 2016, label: 2016 },
    { value: 2015, label: 2015 },
    { value: 2014, label: 2014 },
  ];

  const handleChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    });

  };

  React.useEffect(() => {
    setIsLoading((reports.monthlyRegistrationsStatus === 'FETCHING'));
    if (reports.monthlyRegistrationsStatus === 'FETCH') {
      const items = reports.monthlyRegistrationsResponse.items;
      console.log("datos", items)
      setData(items);
      setTableKey(tableKey + 1);
    }
    
    setIsLoadingDetail((reports.monthlyRegistrationsDetailStatus === 'FETCHING'));
    if (reports.monthlyRegistrationsDetailStatus === 'FETCH') {
      const itemsDetail = reports.monthlyRegistrationsDetailResponse.items;
      console.log("datos detail", itemsDetail)
      setDataDetail(itemsDetail);
      setTableKey(tableKey + 1);
    }
     
  }, [reports]);

  React.useEffect(() => {
    if (values.selectItem) {
      const buildResponseObj = {
        selectItem: values.selectItem
      }

      doMonthlyRegistrations(buildResponseObj);

    }

  }, [values])


  //function altas   
  const handleAltas = (month, nameMonth) => {
    setModalstate({ active: true });
    setTable({ type: "A" })
    if (month <= 9) { month = 0 + month } else { month = month }
    const buildResponseObj = {
      selectItem: values.selectItem,
      month: month,
      type: "A"
    }
    doMonthlyRegistrationsDetail(buildResponseObj);
    setTableTitle({ title: nameMonth });

  }
  //function altas 

  //function bajas  
  const handleBajas = (month, nameMonth) => {
    setModalstate({ active: true });
    setTable({ type: "B" });
    if (month <= 9) { month = 0 + month } else { month = month }
    const buildResponseObj = {
      selectItem: values.selectItem,
      month: month,
      type: "B"
    }
    doMonthlyRegistrationsDetail(buildResponseObj);
    setTableTitle({ title: nameMonth });

  }
  //function bajas 

  //function impagos 
  const handleImpagos = (month, nameMonth) => {
    setModalstate({ active: true });
    setTable({ type: "C" });
    if (month <= 9) { month = 0 + month } else { month = month }
    const buildResponseObj = {
      selectItem: values.selectItem,
      month: month,
      type: "C"
    }
    doMonthlyRegistrationsDetail(buildResponseObj);
    setTableTitle({ title: nameMonth });

  }
  //function impagos 

  const handleClose = () => {
    setModalstate({ active: false });
    setDataDetail([]);
  }


  Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };


  const planData = PlanDataTotal(dataDetail)



  return (

    <>

      {reports.monthlyRegistrationsErrorMessage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error">
              {reports.monthlyRegistrationsErrorMessage}
            </Alert>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Alert severity="info">
            <strong>Altas =</strong> Usuarios nuevos que empezaron a pagar. <strong>Bajas =</strong> Usuarios que pagaron alguna vez, pero se dieron de baja en el sistema. <strong>Impagos =</strong> Usuarios activos, con planes vencidos. Cada mes muestra a partir del día 10 del mes anterior hasta el día 10 del mes actual.
            </Alert>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="card-content">
            <CardContent>
              <Grid container spacing={3} sm={12} md={12}>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <SelectSearch // react-select-2
                    placeholder={"Filtrar año"}
                    className="zindex-0"
                    options={dataYears}
                    value=""
                    onChange={(optionObj) => {
                      handleChange('selectItem', optionObj.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} className="reset-zindex">

                  <ContabiliumTable
                    key={tableKey}
                    defaultPage={0}
                    rowsPerPage={100}
                    isLoading={isLoading}
                    columns={[
                      { name: "nombreMes", label: 'Mes', options: { filter: false, sort: false }, },
                      { name: "cantidad", label: "Altas", options: { filter: false, sort: false } },
                      { name: "bajas", label: "Bajas", options: { filter: false, sort: false } },
                      { name: "impagos", label: "Impagos", options: { filter: false, sort: false } },
                      { name: "pagos", label: "Total pagos ", options: { filter: false, sort: false } },
                      { name: "registros", label: "Registros", options: { filter: false, sort: false } },
                      { name: "totales", label: "Total usuarios", options: { filter: false, sort: false } },
                      { name: "conversiones", label: "Conversiones", options: { filter: false, sort: false } }
                    ]}
                    data={data.map(item => [<div className="first-item">{item.nombreMes}</div>, <div className="id-item-detail" onClick={() => handleAltas(item.mes, item.nombreMes)}>{item.cantidad}</div>, <div className="id-item-detail" onClick={() => handleBajas(item.mes, item.nombreMes)}>{item.bajas}</div>, <div className="id-item-detail" onClick={() => handleImpagos(item.mes, item.nombreMes)}>{item.impagos}</div>, item.pagos, item.registros, item.totales,
                    (<div className="last-item"><span className={item.conversiones <= 10 ? "chip chip-denger" : item.conversiones <= 15 ? "chip chip-alert" : item.conversiones > 15 ? "chip chip-success" : ""}>{item.conversiones}</span></div>)])}
                    title={data.length === 0 ? "No hay resultados" : "Resultados"}
                    filter={false}
                    print={false}
                    selectableRows="none"
                  />

                </Grid>

              </Grid>
            </CardContent>

          </Card>

        </Grid>
      </Grid>
      {/* modal */}

      <Modal active={modalstate.active} size="large">
        <Modal.Body>
          {table.type == "A" && (
            <>
              <ContabiliumTable
                key={tableKey}
                isLoading={isLoadingDetail}
                defaultPage={0}
                rowsPerPage={20}
                columns={[
                  { name: "idUsuario", label: "ID", options: { filter: false, sort: false } },
                  { name: "razonSocial", label: "Razon social", options: { filter: false, sort: false } },
                  { name: "cuit", label: "CUIT", options: { filter: false, sort: false } },
                  { name: "email", label: "Email", options: { filter: false, sort: false } },
                  { name: "fechaAlta", label: "Fecha alta", options: { filter: false, sort: false } },
                  { name: "fechaDePago", label: "Fecha pago", options: { filter: false, sort: false } },
                  { name: "nombrePlan", label: "Plan", options: { filter: false, sort: false } },
                  { name: "importePagado", label: "Importe pagado", options: { filter: false, sort: false } },
                  { name: "codigoPromo", label: "Cod. Promo", options: { filter: false, sort: false } },

                ]}
                data={dataDetail.map(item => [<div className="first-item">{item.idUsuario}</div>, item.razonSocial, item.cuit, item.email, item.fechaAlta.substring(0, 10), item.fechaDePago.substring(0, 10), item.nombrePlan, <div className="amount-item">{item.importePagado.format(2, 3, '.', ',')}</div>, <div className="last-item">{item.codigoPromo}</div>,])}
                title={dataDetail.length == 0 ? "No hay resultados" : "Resultados: Altas del mes de " + tableTitle.title}
                filter={false}
                print={false}
                selectableRows="none"
              />

            </>
          )}
          {table.type == "B" && (
            <ContabiliumTable
              key={tableKey}
              isLoading={isLoadingDetail}
              defaultPage={0}
              rowsPerPage={20}
              columns={[
                { name: "idUsuario", label: "ID", options: { filter: false, sort: false } },
                { name: "razonSocial", label: "Razon social", options: { filter: false, sort: false } },
                { name: "cuit", label: "CUIT", options: { filter: false, sort: false } },
                { name: "email", label: "Email", options: { filter: false, sort: false } },
                { name: "fechaBaja", label: "Fecha", options: { filter: false, sort: false } },
                { name: "motivo", label: "Motivo", options: { filter: false, sort: false } },
                { name: "plan", label: "Plan", options: { filter: false, sort: false } },
                { name: "antiguedad", label: "Pagos", options: { filter: false, sort: false } },
              ]}
              data={dataDetail.map((item) => [<div className="first-item">{item.idUsuario}</div>, item.razonSocial, item.cuit, item.email, item.fechaBaja.substring(0, 10), item.motivo, item.plan, <div className="last-item"><span className={item.antiguedad <= 10 ? "chip chip-denger chip-month" : item.antiguedad <= 15 ? "chip chip-alert chip-month" : item.antiguedad > 15 ? "chip chip-success chip-month" : ""}>{item.antiguedad}</span></div>])}
              title={dataDetail.length == 0 ? "No hay resultados" : "Resultados: Bajas del mes de " + tableTitle.title}
              filter={false}
              print={false}
              selectableRows="none"
            />
          )}
          {table.type == "C" && (
            <ContabiliumTable
              key={tableKey}
              isLoading={isLoadingDetail}
              defaultPage={0}
              rowsPerPage={20}
              columns={[
                { name: "idUsuario", label: "ID", options: { filter: false, sort: false } },
                { name: "razonSocial", label: "Razon social", options: { filter: false, sort: false } },
                { name: "fechaUltLogin", label: "Fecha login", options: { filter: false, sort: false } },
                { name: "fechaVencimiento", label: "Fecha vencimiento", options: { filter: false, sort: false } },
                { name: "nombrePlan", label: "Plan", options: { filter: false, sort: false } },
                { name: "cuit", label: "CUIT", options: { filter: false, sort: false } },
                { name: "email", label: "Email", options: { filter: false, sort: false } },
                { name: "debito", label: "Debito", options: { filter: false, sort: false } },
                { name: "antiguedad", label: "Antiguedad", options: { filter: false, sort: false } },
                { name: "codigoPromo", label: "Cod. Promo", options: { filter: false, sort: false } },
                { name: "importe", label: "Importe", options: { filter: false, sort: false } }
              ]}
              data={dataDetail.map((item) => [<div className="first-item">{item.idUsuario}</div>, item.razonSocial, item.fechaUltLogin.substring(0, 10), item.fechaVencimiento.substring(0, 10), item.nombrePlan, item.cuit, item.email, item.debito, item.antiguedad, item.codigoPromo, <div className="last-item">{item.importe}</div>])}
              title={dataDetail.length == 0 ? "No hay resultados" : "Resultados: Impagos del mes de " + tableTitle.title}
              filter={false}
              print={false}
              selectableRows="none"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Grid container
            direction="row"
            justify="space-between"
            alignItems="center">
            <Grid xs={8}>
              {table.type == "A" && (
                <>
                  {Object.keys(planData).map(oKey => (
                    <div className="total-items">
                      <h4>Plan: {planData[oKey].value}</h4>
                      <p>cantidad: {planData[oKey].count}</p>
                      {planData[oKey].sumPrice ? <p>suma precio: <span className="amount-item">{planData[oKey].sumPrice.format(2, 3, '.', ',')}</span></p> : null}
                    </div>
                  ))}
                </>
              )}
              {table.type == "B" && (
                <>
                  {Object.keys(planData).map(oKey => (
                    <div className="total-items">
                      <h4>Plan: {planData[oKey].value}</h4>
                      <p>cantidad: {planData[oKey].count}</p>
                      {planData[oKey].sumPrice ? <p>suma precio: <span className="amount-item">{planData[oKey].sumPrice.format(2, 3, '.', ',')}</span></p> : null}
                    </div>
                  ))}
                </>
              )}
              {table.type == "C" && (
                <>
                  {Object.keys(planData).map(oKey => (
                    <div className="total-items">
                      <h4>Plan: {planData[oKey].value}</h4>
                      <p>cantidad: {planData[oKey].count}</p>
                      {planData[oKey].sumPrice ? <p>suma precio: <span className="amount-item">{planData[oKey].sumPrice.format(2, 3, '.', ',')}</span></p> : null}
                    </div>
                  ))}
                </>
              )}
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
              >
                Cerrar
                </Button>
            </Grid>
          </Grid>
        </Modal.Footer>
      </Modal>
      {/* modal */}
    </>
  );
};

const mapStateToProps = (state) => ({
  reports: state.reportReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doMonthlyRegistrations: actionDomonthlyRegistrations,
      doMonthlyRegistrationsDetail: actionDomonthlyRegistrationsDetail,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyRegistrations);
