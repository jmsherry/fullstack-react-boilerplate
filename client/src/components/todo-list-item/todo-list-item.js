import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { TodosContext } from "./../../contexts/todos.context";
import { useToasts } from "react-toast-notifications";
import ListItem from "@material-ui/core/ListItem";

const TodoListItem = ({
  item: {
    _id,
    title,
    description,
    owner: { firstName, lastName, email },
  },
  headingLevel = "h2",
}) => {
  const { updateTodo, deleteTodo } = useContext(TodosContext);
  const { addToast } = useToasts();
  async function updateHandler(id) {}

  async function deleteHandler(id) {
    try {
      const response = await fetch(`/api/v1/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status < 200 || response.status >= 300) {
        throw response;
      }
      const data = await response.json();
      deleteTodo(id);
      addToast(`Successfully deleted ${data.title}`, {
        appearance: "success",
      });
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message || err.statusText}`, {
        appearance: "error",
      });
    }
  }
  const HeadingTag = headingLevel;
  return (
    <ListItem>
      <HeadingTag>{title}</HeadingTag>
      <p>{description}</p>
      <p>
        Owned by:{" "}
        {`${firstName} ${lastName} (<a href="mailto:${email}">${email}</a>)`}
      </p>
      <div className="controls">
        <Button onClick={() => updateHandler(_id)}>Update</Button>
        <Button onClick={() => deleteHandler(_id)}>Delete</Button>
      </div>
    </ListItem>
  );
};

export default TodoListItem;
