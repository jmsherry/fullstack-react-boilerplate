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
          {loading ? <CircularProgress /> : null}
          {!loading && error ? (<ErrorDisplay error={error} />): null}
          {/* The '?' below is an 'optional chaining operator' (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) */}
          {!loading && !error && !todos?.length ? (
            <NoResults dataName="todos" />
          ): null}
          {!loading && !error && todos?.length ? (<TodosList todos={todos} />) : null}
        </PageFrame>
      </main>
    </div>
  );
}

export default Todos;
