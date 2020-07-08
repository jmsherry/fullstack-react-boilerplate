import React, {useContext} from "react";
import { TodosContext } from './../../contexts/todos.context'
import List from './../list/list';
import TodosListItem from './../todo-list-item/todo-list-item'

const TodosList = ({
  title,
}) => {
  const { todos } = useContext(TodosContext);
  return (
    <div className="todosListDisplay">
      <h1>{title || 'Todos'}</h1>
      <List data={todos} ItemComponent={TodosListItem}  />
    </div>
  );
};

export default TodosList;
