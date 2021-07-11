import React from "react";
import baseModule from "contabilium-base-module";
import Skeleton from '@material-ui/lab/Skeleton';
import useForm from "./../../../../helpers/useForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionDopromotions, actionDopromotionsDetail } from './../../../../actions/reportActions';

const {
  Card,
  Button,
  CardContent,
  InputField,
  Alert,
  Modal,
  DatePicker,
  Grid,
  ContabiliumTable,
  Icon
} = baseModule.components;

const Promotions = ({ dopromotions, dopromotionsDetail, reports }) => {
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [tableKey, setTableKey] = React.useState(0);
  const [dataDetail, setDataDetail] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState({});
  const [isLoadingDetail, setIsLoadingDetail] = React.useState({});
  const [data, setData] = React.useState([]);
  const [tableTitle, setTableTitle] = React.useState({ title: "" });

  const submit = () => {
    console.log("Va a buscar por estos valores", values);
    dopromotions(values);
    setData([]);
  }


  //useForm
  const { handleChange, handleSubmit, values, errors } = useForm({
    callback: submit,
    errorsCallback: (values) => (values),
    validate: () => ({}),

    formBody: {
      inputCode: "",
      from: new Date(),
      to: new Date(),

    },
  });

  const maxdate = new Date();


  const handleDetails = (idcodigoPromocion, codigoPromo) => {
    const buildResponseObj = {
      idcodigoPromocion: idcodigoPromocion
    }
    
    dopromotionsDetail(buildResponseObj)
    setModalstate({ active: true });
    setTableTitle({ title: codigoPromo });
  }
  const handleClose = () =>{
    setModalstate({ active: false });
    setDataDetail([]);
  }


  

  React.useEffect(() => {
    setIsLoading((reports.promotionsStatus === 'FETCHING'));
    setIsLoadingDetail((reports.promotionsDetailStatus === 'FETCHING'));
    if (reports.promotionsStatus === 'FETCH') {
      const items = reports.promotionsResponse.items;
      console.log("datos", items)
      setData(items);
      setTableKey(tableKey + 1);
    }
    if (reports.promotionsDetailStatus === 'FETCH') {
      const itemsDetail = reports.promotionsDetailResponse.items;
      setDataDetail(itemsDetail)
      setTableKey(tableKey + 1);
    }
  }, [reports]);


  React.useEffect(() => {
    submit();
  }, []);

  Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };



  return (
    <>
      {reports.promotionsErrorMessage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error">
              {reports.promotionsErrorMessage}
            </Alert>
          </Grid>
        </Grid>
      )}
      <form>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card className="card-content">
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <InputField
                      label="Ingrese el codigo"
                      variant="outlined"
                      className="form-element"
                      helperText=""
                      name="code"
                      error={false}
                      onChange={(e) => handleChange('inputCode', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <DatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      name="form"
                      label="Fecha desde"
                      format="MM/dd/yyyy"
                      InputAdornmentProps={{ position: "start" }}
                      value={values.from}
                      onChange={(date) => handleChange('from', date)}
                      maxDate={maxdate}
                      invalidDateMessage="Formato incorrecto"

                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <DatePicker
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      label="Fecha hasta"
                      format="MM/dd/yyyy"
                      InputAdornmentProps={{ position: "start" }}
                      value={values.to}
                      onChange={(date) => handleChange('to', date)}
                      maxDate={maxdate}
                      invalidDateMessage="Formato incorrecto"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      startIcon={<Icon name="search" fontSize="small" />}
                    >
                      Buscar
                    </Button>
                  </Grid>
                </Grid>

              </CardContent>
            </Card>
            <Card className="card-content">
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} >
                    
                      <ContabiliumTable
                        isLoading={isLoading}
                        key={tableKey}
                        defaultPage={0}
                        rowsPerPage={100}
                        columns={[
                          { name: "codigoPromo", label: 'Codigo', options: { filter: false, sort: false }, },
                          { name: "fechaInicio", label: "Fecha Inicio", options: { filter: false, sort: false } },
                          { name: "fechaFin", label: "Fecha Fin", options: { filter: false, sort: false } },
                          { name: "cantidad", label: "Cantidad ", options: { filter: false, sort: false } },
                          { name: "descuento", label: "Descuento ", options: { filter: false, sort: false } },
                          { name: "descripcion", label: "Descripcion ", options: { filter: false, sort: false } },
                          { name: "total", label: "Importe ", options: { filter: false, sort: false } }
                        ]}
                      data={data.map(item => [<div className="id-item-detail first-item" onClick={() => handleDetails(item.idcodigoPromocion, item.codigoPromo)}>{item.codigoPromo}</div>, item.fechaInicio.substring(0, 10), item.fechaFin.substring(0, 10), item.cantidad, item.descuento,"...", <div className="amount-item last-item">{item.total.format(2, 3, '.', ',')}</div>])}
                        title="Resultados"
                        className="table import-table promotion-data"
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
            <ContabiliumTable
            
                isLoading={isLoadingDetail}
                key={tableKey}
                defaultPage={0}
                rowsPerPage={20}
                className="promotion-data-detail"
                columns={[
                  
                  { name: "nombre", label: "Plan", options: { filter: false, sort: false } },
                  { name: "descuento", label: "Descuento", options: { filter: false, sort: false } },
                  { name: "precio", label: "Precio", options: { filter: false, sort: false } },
                  { name: "idusuario", label: "ID", options: { filter: false, sort: false } },
                  { name: "email", label: "Email", options: { filter: false, sort: false } },
                  { name: "razonSocial", label: "Razon social", options: { filter: false, sort: false } },
                  { name: "fechaRegistro", label: "Fecha desde", options: { filter: false, sort: false } },
                  { name: "fechaDePago", label: "Fecha hasta", options: { filter: false, sort: false } }
                ]}
              data={dataDetail.map(item => [<div className="first-item">{item.nombre}</div>,<div className="chip color-gray">{item.descuento}</div>,<div className="amount-item">{item.precio.format(2, 3, '.', ',')}</div>,item.idusuario,item.email,item.razonSocial,item.fechaRegistro.substring(0, 10),<div className="last-item">{item.fechaDePago.substring(0, 10)}</div> ])}
                title={"Resultados de la promo " + tableTitle.title}
                filter={false}
                print={false}
                selectableRows="none"
              />
          </Modal.Body>
          <Modal.Footer>
            <Grid container
              direction="row"
              justify="flex-end"
              alignItems="center">
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
      </form>
    </>
  );
};



const mapStateToProps = (state) => ({
  reports: state.reportReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dopromotions: actionDopromotions,
      dopromotionsDetail: actionDopromotionsDetail,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);

