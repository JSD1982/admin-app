import React from "react";
import baseModule from "contabilium-base-module";
import { actionNoReduxDouserSearch } from './../../actions/globalActions';
const { SelectSearch} = baseModule.components;
const UserSearch = (props) => {

  const getOptions = () => {

    return new Promise((resolve, reject) => {
      /*
      actionNoReduxDouserSearch({}).then(result => {
        console.log('result',result)
        resolve({
          options: result.usuarios, // lo que vino del endpoints
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          complete: true
        });
      });
      */

      setTimeout(function () {
        resolve({
          options: [
            { value: '35325036', label: 'Juan - 35325036', social: 'Juan CO' },
            { value: '35657116', label: 'Carla - 35657116', social: 'Plantas CO' },
            { value: '28231151', label: 'Miguel - 35325036', social: 'NONE' },
            { value: '22222222', label: 'Julio - 22222222', social: 'Mudanzas' },
          ],
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          complete: true
        });
      }, 500);
    });
  };
  return(
  <SelectSearch
    filterOption={(obj, value) => {
      return (
        obj.data.value.toUpperCase().indexOf(value.toUpperCase()) !== -1 ||
        obj.data.label.toUpperCase().indexOf(value.toUpperCase()) !== -1 ||
        obj.data.social.toUpperCase().indexOf(value.toUpperCase()) !== -1
      );
    }}
    placeholder={props.placeholder}
    async={true}
    getOptions={getOptions}
    onChange={props.onChange}
    error={props.error}
    errorMessage={props.errorMessage}
  />
  )
};


export default UserSearch;

