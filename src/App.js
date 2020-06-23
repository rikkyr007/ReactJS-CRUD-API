import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import TodoList from "./components/todo/TodoList";
import TodoCreate from "./components/todo/TodoCreate";
import TodoEdit from "./components/todo/TodoEdit";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/todo"} className="nav-link">
                Todo
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/todo/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/todo"]} component={TodoList} />
            <Route exact path="/todo/add" component={TodoCreate} />
            <Route exact path="/todo/edit/:id" component={TodoEdit} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;