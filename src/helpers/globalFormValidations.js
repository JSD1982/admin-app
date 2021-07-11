const required = "Este campo es obligatorio."

export function helperValidateAddFormInput(errors, labelNameAdd,valueNameAdd){
  if (!labelNameAdd) {errors.labelNameAdd = true;}
  if (!valueNameAdd) {errors.valueNameAdd = true;}
  return errors
}
export function helperValidatePaymentPlan(errors, planStartDate, planEndDate, paymentDate, amountId, promotion, amount, wayToPay, referenceNumber, state, plan) {
 
  if (!planStartDate) {errors.planStartDate = true;}
  if (!planEndDate) {errors.planEndDate = true;}
  if (!paymentDate) {errors.paymentDate = true;}
  if (!amountId) {errors.amountId = true;}
  if (!amount) {errors.amount = true;}
  if (!promotion) {errors.promotion = true;}
  if (!wayToPay) {errors.wayToPay = true;}
  if (!referenceNumber) {errors.referenceNumber = true;}
  if (!state) {errors.state = true;}
  if (!plan) {errors.plan = true;} 
   

  return errors
}



export function helperValidateQuantity(errors, quantity) {
 
  if (!quantity) {
    errors.quantity = true;
  } 
  return errors
}

export function helperValidateBonus(errors, bonus) {
  if (!bonus) {
    errors.bonus =true;
  } 
  return errors
}


export function helperValidateCuit(errors, cuitUsuario) {
 
  if (!cuitUsuario) {
    errors.cuitUsuario = "Cuit obligatorio";
  } 
  return errors
}
export function helperValidateSelect(errors, tipo) {
  if (!tipo) {
    errors.tipo = "Seleccione un tipo";
  }
  return errors
}
export function helperValidateFrom(errors, fechaDesde, fechaHasta) {

  if (fechaDesde > fechaHasta) {
    errors.fechaDesde = true;
  }
  return errors
}
export function helperValidateTo(errors, fechaHasta, fechaDesde) {

  if (fechaHasta < fechaDesde) {
    errors.fechaHasta = true;
  }
  return errors
}
export function helperValidatePtoVta(errors, pointSale) {
  if (!pointSale) {
    errors.pointSale = required;
  }
  return errors
}
export function helperValidateNroComprobante(errors, voucherNumber) {
  if (!voucherNumber) {
    errors.voucherNumber = required;
  }
  return errors
}
export function helperValidateUser(errors, idUsuario) {
  if (!idUsuario) {
    errors.idUsuario = required;
  }
  return errors
}
export function helperValidateDeleteUser(errors, idPersonaEliminar) {
  if (!idPersonaEliminar) {
    errors.idPersonaEliminar = required;
  }
  return errors
}
export function helperValidateKeepUser(errors, idPersonaMantener) {
  if (!idPersonaMantener) {
    errors.idPersonaMantener = required;
  }
  return errors
}
export function helperValidateParentUser(errors, idPadre) {
  if (!idPadre) {
    errors.idPadre = required;
  }
  return errors
}
export function helperValidateChildUser(errors, idHija) {
  if (!idHija) {
    errors.idHija = required;
  }
  return errors
}

export function helperValidateNroOrden(errors, nroOrden) {
  if (!nroOrden) {
    errors.nroOrden = required;
  }
  return errors
}

export function helperValidateEmail(errors, email) {
  if (!email) {
    errors.email = required;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email incorrecto";
  }
  return errors
}
