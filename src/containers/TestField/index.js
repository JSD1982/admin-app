import React from "react";
import {UserSearch} from './../../components/UserSearch';
import UserSearch2 from './UserSearch_test';
import baseModule from "contabilium-base-module";
const { Card, Grid } = baseModule.components;

const TestField = (props) => {

  const [year, setYear] = React.useState(null);
  const staticOptions = [
    { value: 'Juan', label: 'Juan - 1111' },
    { value: 'Martin', label: 'Martin - 2222' },
    { value: 'Jose', label: 'Jose - 3333' },
    { value: 'Noelia', label: 'Noelia - 444' },
    
  ];

  React.useEffect(() => {
    console.log("el año que se selecciono, ",year)
  },[year]);

  var getOptions = function (input) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({
          options: [
            { value: '2020', label: '2020' },
            { value: '2019', label: '2019' },
          ],
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
          complete: true
        });
      }, 500);
    });
  };

  var getOptions2 = (query) => {
    return new Promise((resolve, reject) => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(({ drinks }) => {
          if(drinks) resolve(drinks.map(({ idDrink, strDrink }) => ({ value: idDrink, name: strDrink })));
          else reject('bad');
        })
        .catch(reject);
    });
  }

  return (
    <Grid container spacing={4} style={{ padding: '15px' }}>
      <Grid item xs={12} sm={4}>
        <UserSearch // react-select-2
          label={'Usuarios'}
          options={staticOptions}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <UserSearch // react-select-2 async
          async={true}
          label={'Usuarios Sync'}
          getOptions={getOptions}
          onChange={(obj) => setYear(obj.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <UserSearch2 // react-select-search
          label={'Usuarios'}
          options={[
            { name: 'Swedish', value: 'sv' },
            { name: 'English', value: 'en' },
            {
              type: 'group',
              name: 'Group name',
              items: [
                { name: 'Spanish', value: 'es' },
              ]
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <UserSearch2 // react-select-search async
          async={true}
          label={'Usuarios'}
          options={[]}
          getOptions={getOptions2}
        />
      </Grid>
    </Grid>
  );
};

export default TestField;
