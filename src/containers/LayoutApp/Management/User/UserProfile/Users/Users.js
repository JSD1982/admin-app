import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDoadditionalUser } from './../../../../../../actions/managementActions';
import baseModule from "contabilium-base-module";
const {
  ContabiliumTable
} = baseModule.components;
const Users = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({ id: props.id });
  const [data, setData] = React.useState([]);
  const [tableKey, setTableKey] = React.useState(0);
  React.useEffect(() => {
    //{props.id}
    setIsLoading((props.management.additionalUserStatus === 'FETCHING'));
    if (props.management.additionalUserStatus === 'FETCH') {
      const items = props.management.additionalUserResponse.items;
      console.log("datos usuarios adicionales", items)
      setData(items);
      setTableKey(tableKey + 1);
    }

  }, [props.management]);



  React.useEffect(() => {
    props.doadditionalUser({
      id: values.id
    })
  }, []);

  return (
    <div className="animate-fade-in"> 
    
      <ContabiliumTable
        key={tableKey}
        className="table-last-right"
        title="Estos son los usuarios adicionales que tiene"
        defaultPage={0}
        rowsPerPage={100}
        columns={[
          {name: "correo", label: 'Correo'},
          {name: "contraseña", label: 'Contraseña'},
          {name: "nivelSeguridad", label: 'Nivel de seguridad'},
          {name: "activo", label: 'Activo'},
        ]}
        data={data.map(item => [item.correo, item.contraseña, item.nivelSeguridad, item.activo])}
        viewColumns={false}
        download={false}
        filter={false}
        print={false}
        search={false}
        selectableRows="none"
        isLoading={isLoading}
      /> 
    </div>
  );
};


const mapStateToProps = (state) => ({
  management: state.managementReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      doadditionalUser: actionDoadditionalUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

