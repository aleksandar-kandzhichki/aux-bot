import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect, Router } from "react-router-dom";
import Header from "./components/Header";
import Search from "./components/Search";
import NotFound from "./components/NotFound";
import CommandsContextProvider from "./context/CommandContext";
import CommandAction from "./components/Commands/CommandAction";
import UsersContextProvider from "./context/UsersContext";

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
      <div>
        <CommandsContextProvider>
          <HashRouter exact basename="/commands">
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
                {/* <Route
                path="/search/:searchInput"
                render={props => (
                  <Search searchTerm={props.match.params.searchInput} />
                )}
              /> */}
                <Route component={NotFound} />
              </Switch>
            </div>
          </HashRouter>
        </CommandsContextProvider>

        <UsersContextProvider>
          <HashRouter exact basename="/users">
            <Switch>
              <Route exact path="/login">
                <h1> LOGIN </h1>
              </Route>
              <Router exact path="/profile">
                <h1> PROFILE </h1>
              </Router>
              <Router exact path="/register">
                <h1> REGISTER </h1>
              </Router>
              {/* <Redirect to="/login"></Redirect> */}
            </Switch>
          </HashRouter>
        </UsersContextProvider>
      </div>
    );
  }
}

export default App;
