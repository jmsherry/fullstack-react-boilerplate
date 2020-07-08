import React, { useEffect, useState } from "react";
import Header from "./../../components/header/header";
import PageFrame from "./../../components/page-frame/page-frame";
import NoResults from "./../../components/no-results/no-results";
import ErrorDisplay from "./../../components/error-display/error-display";
// import "./App.css";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    (async () => {
      if (!fetched) {
        try {
          const response = await fetch("/api/v1/todos");
          const data = await response.json();
          console.log("data", data);
          setTodos(data);
        } catch (err) {
          console.log("error", err);
          setError(err);
        } finally {
          setFetched(true);
        }
      }
    })();
  }, [todos, fetched]);

  const NoTodos = <NoResults dataName="todos" />;
  const TodosList = ({ todos }) => (
    <ul>
      {todos.map((todo, i) => (
        <li key={todo._id || i}>
          {todo.title} {todo.description} (
          {`${todo.owner.firstname} ${todo.owner.lastname}`})
        </li>
      ))}
    </ul>
  );
  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Todos</h1>
          {error && <ErrorDisplay error={error} />}
          {todos.length ? <TodosList todos={todos} /> : NoTodos}
        </PageFrame>
      </main>
    </div>
  );
}

export default Todos;
