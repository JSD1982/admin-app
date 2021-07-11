import React, { useState } from "react";
import { helperValidatePaymentPlan } from "./../../../../../../../helpers/globalFormValidations"
import useForm from "./../../../../../../../helpers/useForm";
import baseModule from "contabilium-base-module";
const { Grid, InputField, Button, Typography, Checkbox, SelectSearch, Alert, DatePicker, Modal } = baseModule.components;

//validate
function formValidateFn (values) {
    let errors = {};
    
    helperValidatePaymentPlan(
        errors, 
        values.planStartDate, 
        values.planEndDate, 
        values.paymentDate, 
        values.amountId, 
        values.promotion, 
        values.amount, 
        values.wayToPay, 
        values.referenceNumber, 
        values.state,
        values.plan
    );
    
    return errors;
  }
  //validate

const PaymentPlan = ({ disabledForm, handleCloseAction}) => {
    const [checked, setChecked] = React.useState(false);
    const handleChangeCheck = (event) => {
      setChecked(event.target.checked);
    };
  //useForm
  const { handleChange, handleSubmit, values, errors } = useForm({
    //callback: formValidated,
    errorsCallback: (values) => (values),
    validate: formValidateFn,
    formBody: { 
        planStartDate: new Date(), 
        planEndDate: new Date(), 
        paymentDate: new Date(), 
        amountId: "", 
        promotion: "", 
        amount: "", 
        wayToPay: "", 
        referenceNumber: "", 
        state: "", 
        plan: "" 
    }
  });
  //useForm

  const maxdate = new Date();


  const handleClose = () =>{
    handleCloseAction()
  }
  

    return (
        <>
        {
        errors.planStartDate || errors.planEndDate || errors.paymentDate || errors.amountId || errors.promotion || errors.amount || errors.wayToPay ||errors.referenceNumber || errors.state || errors.plan 
        ?(
        <Grid container spacing={4} className="mb-8">
          <Grid item xs={12}>
            <Alert severity="error" >
              Hay campos obligatorios sin completar
            </Alert>
          </Grid>
        </Grid>
        ): null
        }
        <Modal.Body>
        <Grid container spacing={3} className="mt-8">
            <Grid item xs={4}>
                <DatePicker
                variant="inline"
                inputVariant="outlined"
                name="planStartDate"
                label="Fecha Inicio Plan"
                format="dd/MM/yyyy"
                value={values.planStartDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(planStartDate) => handleChange('planStartDate',planStartDate)}
                maxDate={maxdate}
                invalidDateMessage="Formato incorrecto"
                error={errors.planStartDate}
                />
            </Grid>
            <Grid item xs={4}>
                <DatePicker
                name="planEndDate"
                variant="inline"
                inputVariant="outlined"
                label="Fecha Fin Plan"
                format="dd/MM/yyyy"
                value={values.planEndDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(planEndDate) => handleChange('planEndDate',planEndDate)}
                maxDate={maxdate}
                minDate={values.planStartDate}
                minDateMessage="La fecha no puede ser menos a la fecha inicio"
                invalidDateMessage="Formato incorrecto"
                error={errors.planEndDate}
                />
            </Grid>
            <Grid item xs={4}>
                <DatePicker
                name="paymentDate"
                variant="inline"
                inputVariant="outlined"
                label="Fecha Pago"
                format="dd/MM/yyyy"
                value={values.paymentDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={(paymentDate) => handleChange('paymentDate',paymentDate)}
                maxDate={maxdate}
                invalidDateMessage="Formato incorrecto"
                error={errors.paymentDate}
                disabled={disabledForm}
                />
            </Grid>
            <Grid item xs={6}>
                <InputField
                label="ID Comprobante"
                type="number"
                variant="outlined"
                className="form-element"
                name="amountId"
                onChange={(e) => handleChange('amountId',e.target.value)}
                helperText={errors.amountId && errors.amountId}
                error={errors.amountId}
                />
            </Grid>
            <Grid item xs={6}>
                <InputField
                label="Nro comprobante"
                type="text"
                variant="outlined"
                className="form-element"
                name="promotion"
                onChange={(e) => handleChange('promotion',e.target.value)}
                helperText={errors.promotion && errors.promotion}
                error={errors.promotion}
                />
            </Grid>
            <Grid item xs={6}>
                <InputField
                label="Importe"
                type="number"
                variant="outlined"
                className="form-element"
                name="amount"
                onChange={(e) => handleChange('amount',e.target.value)}
                helperText={errors.amount && errors.amount}
                error={errors.amount}
                disabled={disabledForm}
                />
            </Grid>
            <Grid item xs={6}>
                <SelectSearch 
                error={errors.wayToPay}
                onChange={(optionObj) => handleChange('wayToPay',optionObj.value)}
                options={[
                    { value: 'Mercado Pago', label: 'Mercado Pago' },
                    { value: 'Transferencia', label: 'Transferencia' },
                    { value: 'Depósito', label: 'Depósito' },
                    { value: 'Débito', label: 'Débito' },
                    { value: 'PayU', label: 'PayU' }        
                  ]}
                placeholder="Forma de pago"
                errorMessage={errors.wayToPay}
                disabled={disabledForm}
                />
            </Grid>
            <Grid item xs={6}>
                <InputField
                label="Nro de Referencia"
                type="number"
                variant="outlined"
                className="form-element"
                name="referenceNumber"
                onChange={(e) => handleChange('referenceNumber',e.target.value)}
                helperText={errors.referenceNumber && errors.referenceNumber}
                error={errors.referenceNumber}
                disabled={disabledForm}
                />
            </Grid>
            <Grid item xs={6}>
                <SelectSearch 
                error={errors.state}
                onChange={(optionObj) => handleChange('state',optionObj.value)}
                options={[
                    { value: 'Aceptado', label: 'Aceptado' },
                    { value: 'Pendiente', label: 'Pendiente' },
                    { value: 'Cancelado', label: 'Cancelado' },
                    { value: 'Rechazado', label: 'Rechazado' }        
                  ]}
                placeholder="Estado"
                errorMessage={errors.state}
                />
            </Grid>
            <Grid item xs={6}>
                <SelectSearch 
                error={errors.plan}
                onChange={(optionObj) => handleChange('plan',optionObj.value)}
                options={[
                    { value: 'Individuo', label: 'Individuo' },
                    { value: 'Profesional', label: 'Profesional' },
                    { value: 'Standard', label: 'Standard' },
                    { value: 'Pro', label: 'Pro' },
                    { value: 'Full', label: 'Full' },
                    { value: 'Prueba', label: 'Prueba' },
                    { value: 'Contable', label: 'Contable' },
                    { value: 'Free', label: 'Free' }        
                  ]}
                placeholder="Plan"
                errorMessage={errors.plan}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="label" component="label" className="ml-4">
                Pago Anual
                <Checkbox
                    checked={checked}
                    color="primary"
                    onChange={handleChangeCheck}
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
                </Typography>
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
    );
};

export default PaymentPlan;

