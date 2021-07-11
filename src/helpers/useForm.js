import { useState, useEffect } from "react";

const useForm = ({ formBody, callback, errorsCallback, validate }) => {
  const [values, setValues] = useState(formBody);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    });
  };

  /* LOGGER */
  useEffect(() => {
    //setErrors(validate(values));
    console.log("NUEVOS VALORES", values)
  }, [values]);

  const handleSubmit = event => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  useEffect(() => {
    if (isSubmitting) {
      if(Object.keys(errors).length === 0 ) callback();
      else errorsCallback(errors);
      setIsSubmitting(false);
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors,
  };
};

export default useForm;