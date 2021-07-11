import React from "react";
import baseModule from "contabilium-base-module";
const { ContabiliumTable } = baseModule.components;

const Table = ({title, ...rest}) => {
  
  const columns = [
    {name:"Name", options: { filter: false, sort: false }, }, 
    {name:"Company", options: { filter: false, sort: false } }, 
    {name:"City", options: { filter: false, sort: false } }, 
    {name:"State", options: { filter: false, sort: false } }, ];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];

  
  const options = {
    filterType: false,
  };
  
  return (
      <ContabiliumTable
        title={title}
        data={data}
        columns={columns}
        options={options}
        {...rest}
      />
    );
  }



export default Table;
