  
Number.prototype.format =  (n, x, s, c) => {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};


//totalizador
export const PlanDataTotal = original => {
  console.log('original', original)
  const r = {};
  for (let index = 0; index < original.length; index++) {
    const element = original[index];
    if(!r[element.nombrePlan]) r[element.nombrePlan] = { sumPrice: 0, count: 0, value: element.nombrePlan };
    r[element.nombrePlan].sumPrice = Number(r[element.nombrePlan].sumPrice) + Number(element.importePagado);
    r[element.nombrePlan].count = r[element.nombrePlan].count + 1;  
  }
  console.log('original result', r);
  return r;
}

