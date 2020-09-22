import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch,
} from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { AuthProvider } from "./contexts/auth.context";
import { PeopleProvider } from "./contexts/people.context";
import { TodosProvider } from "./contexts/todos.context";
import { MenuProvider } from "./contexts/menu.context";

import Home from "./pages/home/home";
import People from "./pages/people/people";
import Todos from "./pages/todos/todos";
import NotFound from "./pages/404/404";
import AddPeople from "./pages/add-people/add-people";
import UpdatePeople from "./pages/update-people/update-people";
import AddTodos from "./pages/add-todos/add-todos";
import UpdateTodos from "./pages/update-todos/update-todos";

function App() {
  return (
    <Router>
      <ToastProvider autoDismiss={true}>
        <AuthProvider>
          <PeopleProvider>
            <TodosProvider>
              <MenuProvider>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/people" component={People} />
                  <Route exact path={`/people/add`} component={AddPeople} />
                  <Route
                    exact
                    path={`/people/update/:id`}
                    component={UpdatePeople}
                  />
                  <Route exact path="/todos" component={Todos} />
                  <Route exact path={"/todos/add"} component={AddTodos} />
                  <Route
                    exact
                    path={`/todos/update/:id`}
                    component={UpdateTodos}
                  />
                  <Route path="*" component={NotFound} />
                </Switch>
              </MenuProvider>
            </TodosProvider>
          </PeopleProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
