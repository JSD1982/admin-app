import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { actionDoreferrals } from "./../../../../actions/reportActions";
import Skeleton from '@material-ui/lab/Skeleton';
import baseModule from "contabilium-base-module";
const {
  Card,
  Button,
  CardContent,
  Alert,
  Modal,
  IconButton,
  ContabiliumTable,
  Grid
} = baseModule.components;
const Referrals = ({reports, doReferrals}) => {
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [values, setValues] = React.useState({paginationRef: 1 });
  const [data, setData] = React.useState([]);
  const [tableKey, setTableKey] = React.useState(0);
  
  const [isLoading, setIsLoading] = React.useState({});

  React.useEffect(() => {
    
    const buildResponseObj = {
      paginationRef: values.paginationRef
    }
    console.log('buildResponseObj', buildResponseObj);
    doReferrals(buildResponseObj);
  
  }, [values])

  React.useEffect(() => {

    setIsLoading((reports.referralsStatus === 'FETCHING'));

    if(reports.referralsStatus === 'FETCH') {
      const items = reports.referralsResponse.items;
      console.log("datos", items)
      setData(items);
      setTableKey(tableKey + 1);
    }else{
      
    }
  },[reports]);
  
  return (
    <>
      {reports.referralsErrorMessage && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error">
              {reports.referralsErrorMessage}
            </Alert>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Alert severity="info">
          <strong>Pagando =</strong> Usuarios que estan pagando actualmente.   <strong>Bajas =</strong> Usuarios que pagaron alguna vez, pero se dieron de baja en el sistema.   <strong>Impagos =</strong> Usuarios activos, con planes vencidos.
            </Alert>
        </Grid>
      </Grid>
      <form>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="card-content">
            <CardContent>
              <Grid container spacing={3} >
                <Grid item xs={12} >
                
                  <ContabiliumTable
                    key={tableKey}
                    defaultPage={0}
                    rowsPerPage={10}
                    isLoading={isLoading}
                    customFooter={(a,b,c,d) => (
                      <div className="content-filter-footer">
                        <div className="items-footer-left">
                          {((reports.referralsStatus === 'FETCH') && (
                            <>
                              {/* <p>total: {reports.referralsResponse.totalCount}</p>
                              <p>en esta pagina: {reports.referralsResponse.resultCount}</p> 
                              <p>{reports.referralsResponse.currentPage}</p>*/}
                              <p>{JSON.stringify(a)} de {reports.referralsResponse.pages}</p>
                              
                              
                            </>
                          ))}
                        </div>
                         {/* {JSON.stringify(a)}
                        <br/>
                        {JSON.stringify(b)}
                        <br/>
                        {JSON.stringify(c)}
                        <br/>
                        {JSON.stringify(d)}  */}
                        <div className="items-footer-right">
                          <IconButton aria-label="prev" size="small" onClick={() => {
                            setValues({paginationRef: (reports.referralsResponse.currentPage - 2 > 1) ? reports.referralsResponse.currentPage - 2 : 1  })
                          }}>
                          <ExpandMoreIcon className="icon-prev"/>
                          </IconButton>
                          <IconButton aria-label="next" size="small" onClick={() => {
                            setValues({paginationRef: reports.referralsResponse.currentPage + 2 })
                          }}>
                          <ExpandMoreIcon className="icon-next"/>
                          </IconButton>
                        </div>
                        
                      </div>
                    )}
                    columns={[
                      {name:"codigoPromo", label: 'Codigo Promo', options: { filter: false, sort: false }, }, 
                      {name:"registros", label: "Registrados", options: { filter: false, sort: false } }, 
                      {name:"pagos", label: "Pagando", options: { filter: false, sort: false } }, 
                      {name:"bajas", label: "Bajas", options: { filter: false, sort: false } },
                      {name:"impagos", label: "Impagos", options: { filter: false, sort: false } },
                      {name:"rentabilidad", label: "Rentabilidad", options: { filter: false, sort: false } },
                      
                    ]}
                    data={data.map(item => [
                    <div className="first-item">{item.codigoPromo}</div>,
                    item.registros,
                    item.pagos,
                    item.bajas,
                    item.impagos,
                    <div className="last-item">{item.rentabilidad}</div>
                    ])}
                    title="Resultados"
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
      <Modal active={modalstate.active}>
          <Modal.Body>
            ¿Está seguro que desea eliminar los del CUIT seleccionado?
            
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setModalstate({ active: false })}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              
            >
              Aceptar
            </Button>
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
      doReferrals: actionDoreferrals,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Referrals);
