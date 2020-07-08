import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useParams } from "react-router-dom";

import { PeopleContext } from "./../../../contexts/people.context";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formRow: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    justifyContent: 'center',
  },
}));

const schema = yup.object().shape({
  firstName: yup.string().required().min(2).max(20),
  lastName: yup.string().required().min(2).max(20),
  email: yup.string().email().required(),
});

function PersonForm({ initialValues }) {
  const classes = useStyles();
  let { id } = useParams();
  const [populated, setPopulated] = useState(false);

  const { addPerson, updatePerson } = useContext(PeopleContext);
  const { handleSubmit, errors, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  if (initialValues && !populated) {
    reset(initialValues);
    setPopulated(true);
  }

  // console.log("errors", errors);
  const onSubmit = async (formValues) => {
    console.log("formValues", formValues);
    // formValues._id = id; // pulled from the URL using router 'useParams' hook

    if (populated) {
      const updates = {};
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          if (initialValues[key] !== formValues[key] && key[0] !== "_") {
            updates[key] = formValues[key];
          }
        }
      }
      console.log("updates", updates);
      updatePerson(id, updates);
    } else {
      addPerson(formValues);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formRow}>
        {/* <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" ref={register} />
              {errors.firstName && "Title name is required"} */}
        <Controller
          as={TextField}
          error={!!errors.lastName}
          helperText={errors.lastName && errors.lastName.message}
          id="firstName"
          name="firstName"
          label="First Name"
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formRow}>
        {/* <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" ref={register} />
              {errors.lastName && "Title name is required"} */}
        <Controller
          as={TextField}
          error={!!errors.lastName}
          helperText={errors.lastName && errors.lastName.message}
          name="lastName"
          id="lastName"
          label="Last Name"
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formRow}>
        {/* <label htmlFor="email">Email</label>
              <input type="email" name="email" ref={register} />
              {errors.email && "Title name is required"} */}
        <Controller
          as={TextField}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          type="email"
          id="email"
          name="email"
          label="Email"
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formRow}>
        <Button
          onClick={() =>
            reset({
              firstName: "",
              lastName: "",
              email: "",
            })
          }
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!formState.isValid}
        >
          {populated ? "Update" : "Add"} Person
        </Button>
      </div>
    </form>
  );
}

export default PersonForm;
