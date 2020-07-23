import React, { createContext, useState } from "react";
import { useToasts } from "react-toast-notifications";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex
// import {PeopleContext} from './people.context';

export const TodosContext = createContext({
  fetchTodos: () => [],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  loaded: false,
  loading: false,
  error: null,
  todos: [],
});

export const TodosProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState("");
  const { addToast } = useToasts();
  // const { people } = useContext(PeopleContext);

  const fetchTodos = async () => {
    // console.log('loading', loading);
    // console.log('error', error);
    if (loading || loaded || error) {
      return;
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch("/api/v1/todos");
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      setTodos(data);
      // setLoading(false);
      // console.log('todos from context', todos);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded("true");
    }
  };

  const addTodo = async (formData) => {
    try {
      const response = await fetch("/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(formData),
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedTodo = await response.json();
      console.log("got data", savedTodo);
      setTodos([...todos, savedTodo]);
      addToast(`Saved ${savedTodo.title}`, {
        appearance: "success",
      });
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message || err.statusText}`, {
        appearance: "error",
      });
    }
  };

  const updateTodo = async (id, updates, fullOwner) => {
    console.log("here", id, updates);
    let newTodo = null;
    try {
      const response = await fetch(`/api/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(updates),
      });
      if (response.status !== 200) {
        throw response;
      }
      // Get index
      const index = todos.findIndex((todo) => todo._id === id);

      // Get actual todo
      const oldTodo = todos[index];
      console.log("here", oldTodo);
      // Merge with updates
      newTodo = {
        ...oldTodo,
        ...updates, // order here is important for the override!!
      };

      // this is a bit sketchy, but shouldn't go out of line
      if(typeof newTodo.owner === 'string') {
        newTodo.owner = fullOwner;
      }

      console.log("here", newTodo);
      // recreate the todos array
      const updatedTodos = [
        ...todos.slice(0, index),
        newTodo,
        ...todos.slice(index + 1),
      ];
      
      setTodos(updatedTodos);
      addToast(`Updated ${newTodo.title}`, {
        appearance: "success",
      });
    } catch (err) {
      console.log(err);
      addToast(
        `Error: Failed to update ${newTodo.title}`,
        {
          appearance: "error",
        }
      );
    }
  };

  const deleteTodo = async (id) => {
    let deletedTodo = null;
    try {
      const response = await fetch(`/api/v1/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status !== 204) {
        throw response;
      }
      // Get index
      const index = todos.findIndex((todo) => todo._id === id);
      deletedTodo = todos[index];
      // recreate the todos array without that todo
      const updatedTodos = [
        ...todos.slice(0, index),
        ...todos.slice(index + 1),
      ];
      await setTodos(updatedTodos);
      addToast(
        `Deleted ${deletedTodo.title}`,
        {
          appearance: "success",
        }
      );
    } catch (err) {
      console.log(err);
      addToast(
        `Error: Failed to update ${deletedTodo.title}`,
        {
          appearance: "error",
        }
      );
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        loaded,
        loading,
        error,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
