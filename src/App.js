import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import Login from "./components/auth/Login";
import TodoList from "./components/todo/TodoList";
import TodoForm from "./components/todo/TodoForm";
import AssignmentList from "./components/assignment/AssignmentList";
import AssignmentForm from "./components/assignment/AssignmentForm";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/todo/list"} className="nav-link">
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
            {/* <Route exact path={["/", "/login"]} component={Login} /> */}
            <Route exact path="/todo/list" component={TodoList} />
            <Route exact path="/todo/add" component={TodoForm} />
            <Route exact path="/todo/edit/:id" component={TodoForm} />
            <Route exact path="/todo/assignment/" component={AssignmentList} />
            <Route exact path="/todo/assignment/edit/:id" component={AssignmentForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;