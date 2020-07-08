import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useParams } from "react-router-dom";

import { TodosContext } from "./../../../contexts/todos.context";
import { PeopleContext } from "./../../../contexts/people.context";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formRow: {
    // padding: theme.spacing(1),
    margin: `0 auto ${theme.spacing(1)}px`,
    maxWidth: "50%",
  },
  errorMessage: {
    color: "red",
  },
}));

function TodoForm({ initialValues }) {
  const classes = useStyles();
  let { id } = useParams();
  const [populated, setPopulated] = useState(false);
  const { addTodo, updateTodo } = useContext(TodosContext);

  const { people, loaded: peopleLoaded, fetchPeople } = useContext(
    PeopleContext
  );

  useEffect(() => {
    console.log("in useEffect", people, peopleLoaded);
    if (!peopleLoaded) {
      fetchPeople();
    }
  }, [peopleLoaded, fetchPeople, people]);

  const ids = people.map((person) => person._id);
  const schema = yup.object().shape({
    title: yup.string().required().min(2).max(20),
    description: yup.string().required().min(2).max(50),
    owner: yup.mixed().oneOf(ids),
  });

  const { handleSubmit, errors, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  if (initialValues && !populated) {
    const formValues = { ...initialValues, owner: initialValues.owner._id };
    console.log("formValues", formValues);
    reset(formValues);
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
          if (initialValues[key] !== formValues[key] && key[0] !== '_') {
            updates[key] = formValues[key];
          }
        }
      }

      console.log("updates", updates);
      const args = [id, updates];

      if('owner' in updates) {
        console.log('adding back owner')
        const fullOwner = people.find(person => person._id === updates.owner);
        args.push(fullOwner)
      }
      
      updateTodo(...args);
    } else {
      addTodo(formValues);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formRow}>
        <Controller
          as={<TextField helperText={errors.title && errors.title.message} />}
          error={!!errors.title}
          id="title"
          name="title"
          label="Title"
          fullWidth
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formRow}>
        <Controller
          as={
            <TextField
              helperText={errors.description && errors.description.message}
            />
          }
          error={!!errors.description}
          helperText={errors.description && errors.description.message}
          id="description"
          name="description"
          label="Description"
          multiline
          fullWidth
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formRow}>
        <InputLabel id="owner">Owner</InputLabel>
        <Controller
          as={
            <Select>
              {people.map((todo, i) => (
                <MenuItem key={i} value={todo._id}>
                  {todo.lastName} {todo.firstName}
                </MenuItem>
              ))}
            </Select>
          }
          error={!!errors.owner}
          id="owner"
          name="owner"
          label="Owner"
          fullWidth
          control={control}
          rules={{ required: true }}
        />
        <InputLabel id="owner" className={classes.errorMessage}>
          {errors.owner && errors.owner.message}
        </InputLabel>
      </div>
      <div className={classes.formRow}>
        <Button
          onClick={() =>
            reset({
              title: "",
              description: "",
              owner: "",
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
          {populated ? "Update" : "Add"} Todo
        </Button>
      </div>
    </form>
  );
}

export default TodoForm;
