import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionDodaughterCompany } from './../../../../../../actions/managementActions';
import baseModule from "contabilium-base-module";
const {
  Card,
  CardContent,
  Grid,
  ContabiliumTable
} = baseModule.components;
const Company = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({ id: props.id });
  const [data, setData] = React.useState([]);
  const [tableKey, setTableKey] = React.useState(0);

  React.useEffect(() => {
    //{props.id}
    setIsLoading((props.management.daughterCompanyStatus === 'FETCHING'));
    if (props.management.daughterCompanyStatus === 'FETCH') {
      const items = props.management.daughterCompanyResponse.items;
      console.log("datos compania hija", items)
      setData(items);
      setTableKey(tableKey + 1);
    }

  }, [props.management]);



  React.useEffect(() => {
    props.dodaughterCompany({
      id: values.id
    })
  }, []);

  return (
    <div className="animate-fade-in">
      
      <ContabiliumTable
        key={tableKey}
        className="table-last-right"
        title="Estas son las empresa que tiene el usuario"
        defaultPage={0}
        rowsPerPage={100}
        columns={[
          { name: "razonSocial", label: 'Razón social' },
          { name: "email", label: 'Email' },
          { name: "cuit", label: 'CUIT' },
          { name: "domicilio", label: 'Direccion' },
          { name: "condicionIVA", label: 'Condicion IVA' },
          { name: "usaProd", label: 'Usa Produccion' },
          { name: "tieneFacturaElectronica", label: 'Factura Electrónica' },

        ]}
        data={data.map(item => [item.razonSocial, item.email, item.cuit, item.domicilio, item.condicionIVA, item.usaProd, item.tieneFacturaElectronica])}
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
      dodaughterCompany: actionDodaughterCompany
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);

