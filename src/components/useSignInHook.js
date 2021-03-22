import { useState } from "react";

const useSignInHook = () => {
    const [formValues, setFormValues] = useState({
      firstName: "",
      lastName: "",
      date: "",
      id: ""
    });
  
    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
  
      const valueToUse = type === "radio" ? checked : value;
  
      setFormValues({
        ...formValues,
        id: Date.now(),
        [name]: valueToUse
      });
    };
  
    return [formValues, setFormValues, handleChange];
  };
  
  export default useSignInHook;