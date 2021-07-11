import React from "react";
import baseModule from "contabilium-base-module";
const { Grid, InputField, Button, Typography,SelectSearch, Alert, DatePicker, Modal } = baseModule.components;
const UnsubscribeUser = () => {
  const maxdate = new Date();
  return (
    <div className="animate-fade-in">
      <Grid container spacing={4} className="mb-8">
        <Grid item xs={12}>
        <Typography component="h5" variant="h5" >Baja del usuario</Typography>
          <Typography component="body2" variant="body2">Estos datos son referidos a la baja</Typography>
          <Grid container spacing={3} className="mt-16 mb-8">
            <Grid item xs={12} md={6}>
              <SelectSearch
                //error={errors.observations}
                //onChange={(optionObj) => handleChange('observations',optionObj.value)}
                options={[
                  { value: 'Si', label: 'Si' },
                  { value: 'No', label: 'No' }
                ]}
                placeholder="Observaciones"
              //errorMessage={errors.observations}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                  name="dischargeDate"
                  variant="inline"
                  inputVariant="outlined"
                  label="Fecha de baja"
                  format="dd/MM/yyyy"
                  //value={values.dischargeDate}
                  InputAdornmentProps={{ position: "start" }}
                  //onChange={(dischargeDate) => handleChange('dischargeDate',dischargeDate)}
                  //maxDate={maxdate}
                  invalidDateMessage="Formato incorrecto"
                  //error={errors.dischargeDate}
                  //disabled={disabledForm}
                />
            </Grid>
            <Grid item xs={12} md={12}>
              <SelectSearch
                //error={errors.reason}
                //onChange={(optionObj) => handleChange('reason',optionObj.value)}
                options={[
                  { value: 'SIN COMUNICACIÓN', label: 'SIN COMUNICACIÓN' },
                  { value: 'FALTA DE FUNCIONALIDADES', label: 'FALTA DE FUNCIONALIDADES' },
                  { value: 'SIN MOTIVO', label: 'SIN MOTIVO' },
                  { value: 'SIN USO', label: 'SIN USO' },
                  { value: 'CIERRE DE NEGOCIO', label: 'CIERRE DE NEGOCIO' },
                  { value: 'PRECIO', label: 'PRECIO' },
                  { value: 'SERVICIO DISCONFORME', label: 'SERVICIO DISCONFORME' },
                  { value: 'CONFLICTIVO -PAGOS', label: 'CONFLICTIVO -PAGOS' },
                  { value: 'UBER', label: 'UBER' },
                  { value: 'PLAN DOWNGRADE', label: 'PLAN DOWNGRADE' }
                ]}
                placeholder="Motivo"
              //errorMessage={errors.reason}
              />
            </Grid>
            <Grid item sm={12} md={12}>
            <InputField
                label="Observaciones"
                type="text"
                variant="outlined"
                className="form-element"
                name="observationText"
                multiline={true}
                rows={3}
              //onChange={(e) => handleChange('observationText',e.target.value)}
              //helperText={errors.observationText && errors.observationText}
              //error={errors.observationText}
              />
            </Grid>
          </Grid>
          <hr/>
          <Grid
          className="mt-32"
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end">
            <Button
              variant="contained"
              color="primary"
              //onClick={handleSubmit}
            >
              Actualizar
          </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UnsubscribeUser;
