import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// ! comps
import Footer from "./components/Footer";
import Header from "./components/Header";
// ! screens
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Notes from "./screens/Notes";
import Error from "./screens/Error";
import Profile from "./screens/Profile";
import NewNote from "./screens/NewNote";
import EditNote from "./screens/EditNote";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={setSearch} />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/notes">
          <Notes search={search} />
        </Route>
        <Route path="/profile" component={Profile} exact />
        <Route path="/createnote" component={NewNote} exact />
        <Route path="/note/:id" component={EditNote} exact />
        <Route component={Error} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
