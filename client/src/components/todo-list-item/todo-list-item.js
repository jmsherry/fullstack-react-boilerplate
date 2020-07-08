import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { TodosContext } from "./../../contexts/todos.context";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  item: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  display: {
    marginInlineEnd: "50px",
  },
}));

const TodoListItem = ({
  item: {
    _id,
    title,
    description,
    owner: { firstName, lastName, email },
  },
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { deleteTodo } = useContext(TodosContext);

  function updateHandler(id) {
    history.push(`/todos/update/${id}`);
  }

  return (
    <li className={classes.item}>
      <div className={classes.display}>
        <p>{title}</p>
      </div>
      <div className={classes.display}>
        <p>{description}</p>
      </div>
      <div className={classes.display}>
        <p>
          {/* Could use a person list item component here... */}
          {firstName} {lastName} (<a href={`mailto:${email}`}>{email}</a>)
        </p>
      </div>
      <div className={classes.controls}>
        <Button onClick={() => updateHandler(_id)} aria-label="update todo">
          <EditOutlinedIcon />
        </Button>
        <Button onClick={() => deleteTodo(_id)} aria-label="delete todo">
          <DeleteOutlineIcon />
        </Button>
      </div>
    </li>
  );
};

export default TodoListItem;
