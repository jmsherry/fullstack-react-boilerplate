import React, { useContext, useEffect } from "react";
import PageFrame from "../../components/page-frame/page-frame";
import Header from "../../components/header/header";
import TodoForm from "../../components/forms/todo-form/todo-form";
import { useParams } from "react-router-dom";
import { TodosContext } from "./../../contexts/todos.context";

function UpdateTodos() {
  let { id } = useParams();
  const { todos, loaded, fetchTodos } = useContext(TodosContext);
  console.log("todos", todos);
  useEffect(() => {
    console.log("in useEffect", todos, loaded);
    if (!loaded) {
      fetchTodos();
    }
  }, [loaded, fetchTodos, todos]);

  console.log("todos", todos);
  const todoToBeUpdated = todos.find((todo) => todo._id === id);
  console.log("todoToBeUpdated", todoToBeUpdated);
  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Update Todos</h1>
          <TodoForm initialValues={todoToBeUpdated} />
        </PageFrame>
      </main>
    </div>
  );
}

export default UpdateTodos;
