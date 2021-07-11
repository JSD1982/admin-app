import React from "react";
import SelectSearch from 'react-select-search';

const UserSearch = (props) => {

  const [options, setOptions] = React.useState(props.options);
  const [value, setValue] = React.useState(null);
  const [isLoadingExternally, setIsLoadingExternally] = React.useState(false);

  const delay = 300;
  const maxChar2Call = 3;

  React.useEffect(() => {
    console.log(value)
    if(props.options && props.options != options) setOptions(props.options) ;
  },[props,value]);

  const async_callMoreOptions = (query) => {
    if (query.length >= maxChar2Call) {
      if (!isLoadingExternally) {
        setIsLoadingExternally(true);
        setTimeout(() => {
          props.getOptions(query).then(r => {
            setIsLoadingExternally(false);
            setOptions(r);
          }).catch(() => {
            setIsLoadingExternally(false);
            setOptions([]);
          })
        }, delay);
      }
    }
  }


  return (
    <div className={`${isLoadingExternally ? 'is-loading' : ''} UserSearch2`}>
      {props.label && (
        <label>{props.label}</label>
      )}
      {props.async ? (
        <SelectSearch 
          
          getOptions={async_callMoreOptions}
          search={true}
          value={value}
          onChange={setValue}
          options={options} 
          name="language" 
          placeholder="Busca" 
        />
      ) : (
        <SelectSearch 
          search={true}
          value={value}
          onChange={setValue}
          options={options} 
          name="languge" 
          placeholder="Busca" 
        />
        )}
    </div>
  );
};


export default UserSearch;

