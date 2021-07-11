import React, { useState } from "react";
import { helperValidateAddFormInput } from "./../../../../../../../helpers/globalFormValidations"
import useForm from "./../../../../../../../helpers/useForm";
import baseModule from "contabilium-base-module";
const { Grid, Icon, InputField, Button, IconButton, Modal } = baseModule.components;

//validate
function formValidateFn (values) {
  let errors = {};
  
  helperValidateAddFormInput(
      errors, 
      values.labelNameAdd,
      values.valueNameAdd
  );
  
  return errors;
}
//validate

const AddFormInput = ({ handleCloseAction }) => {

  const [inputList, setInputList] = useState([]);



  const handleRemoveInput = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleClose = () => {
    handleCloseAction()
  }

 //useForm
 const { handleChange, handleSubmit, values, setValues, errors } = useForm({
  callback: formValidated,
  errorsCallback: (values) => (values),
  validate: formValidateFn,
  formBody: { 
    labelNameAdd: "", valueNameAdd: ""
  }
});
//useForm
function formValidated() {
  const list = [
    ...inputList,
    {
      labelName: values.labelNameAdd,
      valueName: values.valueNameAdd
    }
  ];
  setInputList(list);  
  setValues({labelNameAdd: "", valueNameAdd: ""})  

}



  return (
    <>
      <Modal.Body>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <InputField
              label="*Clave"
              onChange={(e) => handleChange('labelNameAdd',e.target.value)}
              value={values.labelNameAdd}
              type="text"
              variant="outlined"
              className="form-element"
              name="labelNameAdd"
              helperText=""
              error={errors.labelNameAdd}
            />
          </Grid>
          <Grid item xs={6}>
            <InputField
              label="*Valor"
              onChange={(e) => handleChange('valueNameAdd',e.target.value)}
              value={values.valueNameAdd}
              type="text"
              variant="outlined"
              className="form-element"
              name="valueNameAdd"
              helperText=""
              error={errors.valueNameAdd}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Agregar
          </Button>
          </Grid>
        </Grid>
        
        <hr />
        {inputList.map((item, i) => {
          return (
            <div key={i} className="content-input-add">
              <Grid container spacing={3}>

                <Grid item xs={10}>
                  <InputField
                    label={item.labelName}
                    type="text"
                    variant="outlined"
                    className="form-element"
                    name="valueName"
                    value={item.valueName}
                    helperText=""
                    error=""
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={e => handleRemoveInput(e, i)}
                    edge="start"
                    title="Eliminar addin"
                    color="inherit"
                    className="icon-table-addin"
                  ><Icon name="delete" /></IconButton>
                </Grid>

              </Grid>
            </div>
          );
        })}
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
            onClick={handleClose}
          >
            Cerrar
        </Button>
          <Button
            variant="contained"
            color="primary"
          >
            Guardar
        </Button>
        </Grid>
      </Modal.Footer>
    </>
  );
};

export default AddFormInput;

