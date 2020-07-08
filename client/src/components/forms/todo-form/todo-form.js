import React, { useContext, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useToasts } from "react-toast-notifications";

import { TodosContext } from "./../../../contexts/todos.context";

// const useStyles = makeStyles({
//   form: {
//     maxWidth: "80%",
//     margin: "auto",
//   },
//   formRow: {
//     padding: "0px 15px",
//   },
// });

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function TodoForm({ loadingBehaviour = true }) {
  const classes = useStyles();
  const { todos, addTodos } = useContext(TodosContext);
  const { addToast } = useToasts();

  useEffect(() => {
    if (!todos.length) {
      (async () => {
        
      })();
    }
  }, [todos, addTodos, addToast]);

  const ids = todos.map((todo) => todo._id);
  const schema = yup.object().shape({
    title: yup.string().required().min(2).max(20),
    description: yup.string().required().min(2).max(50),
    owner: yup.mixed().oneOf(ids),
  });
  const { handleSubmit, errors, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      owner: "",
    },
  });
  console.log("errors", errors);
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  if (loadingBehaviour) return <p>Loading...</p>;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <FormControl className={classes.formControl}>
        {/* <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" ref={register} />
              {errors.firstName && "Title name is required"} */}
        <Controller
          as={<TextField />}
          error={!!errors.title}
          helperText={errors.title && errors.title.message}
          id="title"
          name="title"
          label="Title"
          fullWidth
          control={control}
          // defaultValue=""
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        {/* <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" ref={register} />
              {errors.firstName && "Title name is required"} */}
        <Controller
          as={<TextField />}
          error={!!errors.lastName}
          helperText={errors.lastName && errors.lastName.message}
          id="description"
          name="description"
          label="Description"
          multiline
          fullWidth
          control={control}
          // defaultValue=""
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="owner">Owner</InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem key={-1} value="">
                Pick a todo
              </MenuItem>
              {todos.map((todo, i) => (
                <MenuItem key={i} value={todo._id}>
                  {todo.lastName} {todo.firstName}
                </MenuItem>
              ))}
            </Select>
          }
          error={!!errors.owner}
          helperText={errors.owner && errors.owner.message}
          id="owner"
          name="owner"
          label="Owner"
          fullWidth
          control={control}
          // defaultValue=""
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className={clsx(classes.formControl, classes.controls)}>
        <Button onClick={reset}>Reset</Button>
        <Button type="submit" color="primary" disabled={!formState.isValid}>
          Submit
        </Button>
      </FormControl>
    </form>
  );
}

export default TodoForm;
