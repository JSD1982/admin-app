import React from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDointegrations, actionDodetailIntegrations } from './../../../../../actions/managementActions';

import baseModule from "contabilium-base-module";
const {
  Grid,
  ContabiliumTable,
  Icon,
  IconButton,
  Button,
  Modal,
  Typography,
  Card,
  CardContent
} = baseModule.components;
const Integrations = (props) => {
  const [isLoadingCard, setIsLoadingCard] = React.useState(false);
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({ id: props.id });
  const [data, setData] = React.useState([]);
  const [dataDetail, setDataDetail] = React.useState([]);
  const [tableKey, setTableKey] = React.useState(0);
  React.useEffect(() => {
    //{props.id}
    setIsLoading((props.management.integrationsStatus === 'FETCHING'));
    if (props.management.integrationsStatus === 'FETCH') {
      const items = props.management.integrationsResponse.items;
      console.log("datos integraciones", items)
      setData(items);
      setTableKey(tableKey + 1);
    }

    if (props.management.detailIntegrationsStatus === 'FETCH') {
      const itemsDetail = props.management.detailIntegrationsResponse.items;
      console.log("datos integraciones", itemsDetail)
      setDataDetail(itemsDetail);
      
    }

  }, [props.management]);



  React.useEffect(() => {
    props.dointegrations({
      id: values.id
    })
  }, []);
  
  const handleDetail = (id) =>{
    props.dodetailIntegrations({
      id: values.id
    })
    setModalstate({ active: true })
    
  }
  return (
    <>
    
     <Card className="card-content profile-content-inner">
      <CardContent>
      <form>
      <Grid container spacing={4}>
        <Grid item xs={12}>
         
            <ContabiliumTable
              key={tableKey}
              defaultPage={0}
              rowsPerPage={100}
              columns={[
                {name: "id", label: 'ID'},
                {name: "integracion", label: 'Integración'},
                {name: "descripcion", label: 'Descripcion'},
                {name: "fechaAlta", label: 'Fecha de alta'},
                {name: "fechaBaja", label: 'Fecha de baja'},
                {name: "Detalle", label: ' '},
               
              ]}
              data={data.map(item => [item.id, item.integracion, item.descripcion, item.fechaAlta, item.fechaBaja, <IconButton
              edge="start"
              title="Ver parámetros"
              color="inherit"
              size="small"
              onClick={()=>handleDetail(item.id)}
            ><Icon name="search" fontSize="small"/></IconButton>])}
              
              viewColumns={false}
              download={false}
              filter={false}
              print={false}
              search={false}
              selectableRows="none"
              isLoading={isLoading}
            />
           
        </Grid>
      </Grid>
      {/* modal */}
      <Modal active={modalstate.active} size="medium" >
          <Modal.Title>
            <Typography variant="h5" component="h2">
              MercadoLibre
            </Typography>
          </Modal.Title>
          <hr/>
          <Modal.Body>
          <>
          {isLoadingCard && <Skeleton animation="wave" height={200}/>}
          {dataDetail.map(item => [
            <>
            <Typography variant="p" component="p" className="mt-8">
              <strong>{item.clave}: </strong>{item.valor}
            </Typography>
            </>
            ])}
          </>
          </Modal.Body>
          <Modal.Footer>
            <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setModalstate({ active: false })}
            >
              Cerrar
            </Button>
            </Grid>
          </Modal.Footer>
        </Modal>
        {/* modal */}
        </form>
      </CardContent>
    </Card> 

      
    </>
  );
};
const mapStateToProps = (state) => ({
  management: state.managementReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dointegrations: actionDointegrations,
      dodetailIntegrations: actionDodetailIntegrations
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Integrations);

