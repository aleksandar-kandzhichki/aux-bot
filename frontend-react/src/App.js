import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect, Router, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Search from "./components/Search";
import NotFound from "./components/NotFound";
import CommandsContextProvider from "./context/CommandContext";
import CommandAction from "./components/Commands/CommandAction";
import UsersContextProvider from "./context/UsersContext";
import Login from "./components/Users/Login";
import Profile from "./components/Users/Profile";
import Register from "./components/Users/Register";

class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
  };

  render() {
    return (
      <BrowserRouter>
        <span class="forkongithub"><a id="user-banner" href="https://github.com/Yog9/SnapShot">Fork me on GitHub</a></span>
        <Switch>

          <Route path="/commands">
            <CommandsContextProvider>
              <BrowserRouter exact basename="/commands">
                <div className="container">
                  <Route path="/:commandName"
                    render={props => (
                      <Header
                        handleSubmit={this.handleSubmit}
                        history={props.history}
                        commandName={props.match.params.commandName}
                      />
                    )}
                  />


                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => <Redirect to="all" />}
                    />
                    <Route exact path="/:commandName/actions/:actionName"
                      render={props => <CommandAction actionName={props.match.params.actionName} commandName={props.match.params.commandName}></CommandAction>}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </BrowserRouter>
            </CommandsContextProvider>
          </Route>

          <Route path="/users">
            <UsersContextProvider>
              <BrowserRouter exact basename="/users">
                <Switch>
                  <Route path="/login">
                    <h1> LOGIN </h1>
                    <Login></Login>
                  </Route>
                  <Route path="/profile">
                    <h1> PROFILE </h1>
                    <Profile></Profile>
                  </Route>
                  <Route path="/register">
                    <h1> REGISTER </h1>
                    <Register></Register>
                  </Route>
                  <Redirect to="/login"></Redirect>
                </Switch>
              </BrowserRouter>
            </UsersContextProvider>
          </Route>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
