import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDomassiveProcesses } from './../../../../../actions/managementActions';
import baseModule from "contabilium-base-module";
const {
  Grid,
  ContabiliumTable,
  Card,
  CardContent
} = baseModule.components;
const MassiveProcesses = (props) => {
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({ id: props.id });
  const [data, setData] = React.useState([]);
  const [tableKey, setTableKey] = React.useState(0);
  React.useEffect(() => {
    //{props.id}
    setIsLoading((props.management.massiveProcessesStatus === 'FETCHING'));
    if (props.management.massiveProcessesStatus === 'FETCH') {
      const items = props.management.massiveProcessesResponse.items;
      console.log("datos procesos masivos", items)
      setData(items);
      setTableKey(tableKey + 1);
    }

  }, [props.management]);



  React.useEffect(() => {
    props.domassiveProcesses({
      id: values.id
    })
  }, []);
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
                { name: "inicio", label: 'Fecha inicio' },
                { name: "fin", label: 'Fecha fin' },
                { name: "proceso", label: 'Tipo' },
               
      
              ]}
              data={data.map(item => [item.inicio, item.fin, item.proceso])}
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
      domassiveProcesses: actionDomassiveProcesses
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MassiveProcesses);

