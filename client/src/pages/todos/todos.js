import React, { useContext, useEffect } from "react";
import Header from "./../../components/header/header";
import PageFrame from "./../../components/page-frame/page-frame";
import NoResults from "./../../components/no-results/no-results";
import ErrorDisplay from "./../../components/error-display/error-display";
import { CircularProgress } from "@material-ui/core";
import TodosList from "./../../components/todos-list/todos-list";
import { TodosContext } from "./../../contexts/todos.context";
// import { useToasts } from "react-toast-notifications";
// import useFetch from "react-fetch-hook";

function Todos() {
  const { todos, loaded, fetchTodos, loading, error } = useContext(
    TodosContext
  );
  console.log("todos", todos);
  useEffect(() => {
    console.log("in useEffect", todos, loaded);
    if (!loaded) {
      fetchTodos();
    }
  }, [loaded, fetchTodos, todos]);
  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Todos</h1>
          {loading && <CircularProgress />}
          {!loading && error && <ErrorDisplay error={error} />}
          {!loading && !error && todos && !todos.length && (
            <NoResults dataName="todos" />
          )}
          {!loading && !error && todos && todos.length && (
            <TodosList todos={todos} />
          )}
        </PageFrame>
      </main>
    </div>
  );
}

export default Todos;
