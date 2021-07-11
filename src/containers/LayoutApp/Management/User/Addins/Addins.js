import React from "react";
import AddFormInput from "./components/AddFormInput"
import useForm from "./../../../../../helpers/useForm";
import { 
  helperValidateSelect,
  helperValidateFrom,
  helperValidateTo,
  helperValidateQuantity,
  helperValidateBonus
} from "./../../../../../helpers/globalFormValidations";
import baseModule from "contabilium-base-module";
const {
  Grid,
  ContabiliumTable,
  Button,
  Icon,
  IconButton,
  Modal,
  Typography,
  SelectSearch,
  InputField,
  RadioButton,
  DatePicker,
  Card,
  CardContent,
  Alert
} = baseModule.components;


//validate
function formValidateFn (values) {
  let errors = {};
  helperValidateSelect(errors, values.tipo)
  helperValidateFrom(errors, values.fechaDesde, values.fechaHasta)
  helperValidateTo(errors, values.fechaHasta, values.fechaDesde)
  helperValidateQuantity(errors, values.quantity)
  helperValidateBonus(errors, values.bonus)
  return errors;
}
//validate

const Addin = (props) => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [formstate, setFormstate] = React.useState({ form: "" });
  const [modalstate, setModalstate] = React.useState({ active: false });
  const [notification, setNotification] = React.useState({ active: false });

  const maxdate = new Date();

  
  //useForm
  const { handleChange, handleSubmit, values, errors } = useForm({
    callback: formValidated,
    errorsCallback: (values) => (values),
    validate: formValidateFn, // TODO PONER VALIDADOR
    formBody: {  
      tipo:"", 
      fechaDesde: new Date(), 
      fechaHasta: new Date(),
      integrationItem: "Activo", 
      quantity:"",
      bonus:"" 

      },
  });
   //useForm
   function formValidated() {
    setModalstate({ active: false });
    
  }


  const handleAdd = () =>{
    setFormstate({form:"add"})
    setModalstate({ active: true })
  }
  const handleEdit = () =>{
    setFormstate({form:"edit"})
    setModalstate({ active: true })
  }
  const handleEditParam = () =>{
    setFormstate({form:"editParam"})
    setModalstate({ active: true })
  }
  const handleDelete = () =>{
    setFormstate({form:"delete"})
    setModalstate({ active: true })
  }
  const handleClose = () =>{
    setModalstate({ active: false })
    setNotification({ active: false })
    setTimeout(() => {
      setFormstate({form:""})
    }, 300)
    
  }

  return (
    <>
    
     <form >
     <Card className="card-content profile-content-inner">
      <CardContent>
      
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container direction="row"
              justify="flex-end"
              alignItems="center">
              <Button
              
                variant="outlined"
                color="primary"
                onClick={handleAdd}
                startIcon={<Icon name="add" fontSize="small" />}
              >
                Agregar addin
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>

            <ContabiliumTable
             
              className="table-last-right"
              defaultPage={0}
              rowsPerPage={100}
              columns={[
                {name: "Addin", label: 'Addin'},
                {name: "Fecha desde", label: 'Fecha desde'},
                {name: "Fecha hasta", label: 'Fecha hasta'},
                {name: "Bonificación", label: 'Bonificación'},
                {name: "Cantidad", label: 'Cantidad'},
                {name: "Activo", label: 'Activo'},
                {name: "Acciones", label: ' '},
              ]}
              data={[
              {"Addin":"MailsPersonalizados", "Fecha desde":"12/12/2017", "Fecha hasta":"12/12/2052", "Bonificación":"0 %", "Cantidad":"1", "Activo":"SI", 
              "Acciones":
              <>
              <IconButton
              onClick={handleEdit}
              edge="start"
              title="Editar addin"
              color="inherit"
              size="small"
              className="icon-table-addin"
              ><Icon name="edit" fontSize="small"/></IconButton>
              <IconButton
              onClick={handleEditParam}
                edge="start"
                title="Editar parametros"
                color="inherit"
                size="small"
                className="icon-table-addin"
              ><Icon name="copy" fontSize="small"/></IconButton>
              <IconButton
              onClick={handleDelete}
                edge="start"
                title="Eliminar addin"
                color="inherit"
                size="small"
                className="icon-table-addin"
              ><Icon name="delete" fontSize="small"/></IconButton>
            </>
            }
              ]}
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
        <Modal active={modalstate.active} size="medium">
        {formstate.form==="add" && 
        <>
       
        <Modal.Title>
          <Typography variant="h5" component="h2">
            Agregar addin
          </Typography>
        </Modal.Title>
        <hr/>
        {errors.tipo || errors.bonus || errors.quantity ? (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error" >
              Hay campos incompletos
            </Alert>
          </Grid>
        </Grid>
        ):null}
        <Modal.Body>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SelectSearch 
                error={errors.tipo}
                onChange={(optionObj) => handleChange('tipo',optionObj.value)}
                placeholder="*Addin"
                options={[
                  { value: 'MailsPersonalizados', label: 'MailsPersonalizados' },
                  { value: 'NotificacionesIntegracionTN', label: 'NotificacionesIntegracionTN' },
                  { value: 'NotificacionesIntegracionML', label: 'NotificacionesIntegracionML' },
                  { value: 'PermisosPersonalizados', label: 'PermisosPersonalizados' },
                  { value: 'DebitosAutomaticos', label: 'DebitosAutomaticos' },
                  { value: 'App Vendedores', label: 'App Vendedores' },
                  { value: 'Plugin Wordpress', label: 'Plugin Wordpress' },
                  { value: 'Plugin PrestaShop', label: 'Plugin PrestaShop' },
                  { value: 'Plugin Magento', label: 'Plugin Magento' },
                  { value: 'Plugin OpenCart', label: 'Plugin OpenCart' },
                  { value: '2 Cuits extras', label: '2 Cuits extras' },
                  { value: '5 Cuits extras', label: '5 Cuits extras' },
                  { value: '5 Usuarios adicionales extras', label: '5 Usuarios adicionales extras' },
                  { value: '10 Usuarios adicionales extras', label: '10 Usuarios adicionales extras' },
                ]}
                
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                variant="inline"
                inputVariant="outlined"
                name="fechaDesde"
                label="*Fecha desde"
                format="dd/MM/yyyy"
                value={values.fechaDesde}
                InputAdornmentProps={{ position: "start" }}
                onChange={(fechaDesde) => handleChange('fechaDesde',fechaDesde)}
                maxDate={maxdate}
                
                invalidDateMessage="Formato incorrecto"
                error={errors.fechaDesde}
              />
            </Grid>
            <Grid item xs={6}>
            <DatePicker
                variant="inline"
                inputVariant="outlined"
                name="fechaHasta"
                label="Fecha hasta"
                format="dd/MM/yyyy"
                value={values.fechaHasta}
                InputAdornmentProps={{ position: "start" }}
                onChange={(fechaHasta) => handleChange('fechaHasta',fechaHasta)}
                maxDate={maxdate}
                
                invalidDateMessage="Formato incorrecto"
                error={errors.fechaHasta}
              />
            </Grid>
            <Grid item xs={12}>
            <Typography variant="p" component="p">*Estado</Typography>
                <div>
                  <RadioButton
                    checked={values.integrationItem == "Activo"}
                    value={"Activo"}
                    label="Activo"
                    variant="outlined"
                    name="integrationItem"
                    onChange={(e) => handleChange('integrationItem',e.target.value)}
                  />
                  <RadioButton
                    checked={values.integrationItem == "Inactivo"}
                    value={"Inactivo"}
                    label="Inactivo"
                    variant="outlined"
                    name="integrationItem"
                    onChange={(e) => handleChange('integrationItem',e.target.value)}
                  />
                </div>
            </Grid>
            <Grid item xs={6}>
              <InputField
                label="*Cantidad"
                type="number"
                variant="outlined"
                className="form-element"
                name="quantity"
                value={values.quantity}
                onChange={(e) => handleChange('quantity',e.target.value)}
                error={errors.quantity}
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                label="Bonificación"
                type="number"
                variant="outlined"
                className="form-element"
                name="bonus"
                value={values.bonus}
                onChange={(e) => handleChange('bonus',e.target.value)}
                error={errors.bonus}
              />
            </Grid>
          </Grid>
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
            onClick={handleSubmit}
          >
            Guardar
          </Button>
          </Grid>
        </Modal.Footer>
        </>
        }

        {formstate.form==="edit" && 
        <>
        <Modal.Title>
          <Typography variant="h5" component="h2">
            Edición addin
          </Typography>
        </Modal.Title>
        <hr/>
        {errors.bonus || errors.quantity ? (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Alert severity="error" >
              Hay campos incompletos
            </Alert>
          </Grid>
        </Grid>
        ):null}
        <Modal.Body>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SelectSearch 
                
                onChange={(optionObj) => handleChange('tipo',optionObj.value)}
                placeholder="MailsPersonalizados"
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                variant="inline"
                inputVariant="outlined"
                name="fechaDesde"
                label="*Fecha desde"
                format="dd/MM/yyyy"
                value={values.fechaDesde}
                InputAdornmentProps={{ position: "start" }}
                onChange={(fechaDesde) => handleChange('fechaDesde',fechaDesde)}
                maxDate={maxdate}
                error={errors.fechaDesde}
              />
            </Grid>
            <Grid item xs={6}>
            <DatePicker
                variant="inline"
                inputVariant="outlined"
                name="fechaHasta"
                label="Fecha hasta"
                format="dd/MM/yyyy"
                value={values.fechaHasta}
                InputAdornmentProps={{ position: "start" }}
                onChange={(fechaHasta) => handleChange('fechaHasta',fechaHasta)}
                maxDate={maxdate}
                error={errors.fechaHasta}
              />
            </Grid>
            <Grid item xs={12}>
            <Typography variant="p" component="p">*Estado</Typography>
                <div>
                  <RadioButton
                    checked={values.integrationItem == "Activo"}
                    value={"Activo"}
                    label="Activo"
                    variant="outlined"
                    name="integrationItem"
                    onChange={(e) => handleChange('integrationItem',e.target.value)}
                  />
                  <RadioButton
                    checked={values.integrationItem == "Inactivo"}
                    value={"Inactivo"}
                    label="Inactivo"
                    variant="outlined"
                    name="integrationItem"
                    onChange={(e) => handleChange('integrationItem',e.target.value)}
                  />
                </div>
            </Grid>
            <Grid item xs={6}>
              <InputField
                label="*Cantidad"
                type="number"
                variant="outlined"
                className="form-element"
                name="quantity"
                onChange={(e) => handleChange('quantity',e.target.value)}
                error={errors.quantity}
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                label="Bonificación"
                type="number"
                variant="outlined"
                className="form-element"
                name="bonus"
                onChange={(e) => handleChange('bonus',e.target.value)}
                error={errors.bonus}
              />
            </Grid>
          </Grid>
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
            onClick={handleSubmit}
          >
            Guardar
          </Button>
          </Grid>
        </Modal.Footer>
        </>
        }

        {formstate.form==="editParam" && 
        <>
        <Modal.Title>
          <Typography variant="h5" component="h2">
          Edición parametros
          </Typography>
        </Modal.Title>
        <hr/>
        <AddFormInput handleCloseAction={handleClose}/>
        
        </>
        }

        {formstate.form==="delete" && 
        <>
        <Modal.Body>
          ¿Está seguro que desea <strong>eliminar</strong> el Addin MailsPersonalizados?
        </Modal.Body>
        <hr/>
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
            Aceptar
          </Button>
          </Grid>
        </Modal.Footer>
        </>
        }
        </Modal>
        {/* modal */}
      
      </CardContent>
    </Card> 
    </form>
    

      
    </>
  );
};

export default Addin;
