import React, { Component } from "react";
import { Route, withRouter, Switch, Link } from "react-router-dom";

import Header from "./components/Header";
import SignInForm from "./components/SignInForm";
import Inventory from "./components/Inventory";

import API from "./API";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }

  signin = user => {
    localStorage.setItem("token", user.token);
    this.setState({ username: user.username });
  };

  signout = () => {
    localStorage.removeItem("token");
    this.setState({ username: "" });
  };

  componentDidMount() {
    API.validate().then(userData => {
      if (userData.error) {
        this.signout();
      } else {
        this.signin(userData);
        this.props.history.push("/inventory");
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Header username={this.state.username} />

        <button onClick={this.signout}>sign out!</button>

        <button>
          <Link to="/">home</Link>
        </button>

        {this.state.username === "" ? (
          <button>
            <Link to="/signin">sign in</Link>
          </button>
        ) : (
          <button>
            <Link to="/inventory">inventory</Link>
          </button>
        )}

        <Switch>
          <Route exact path="/" component={() => <h1>Home page!</h1>} />
          <Route
            path="/signin"
            component={routerProps => (
              <SignInForm signin={this.signin} {...routerProps} />
            )}
          />
          <Route
            path="/inventory"
            component={routerProps => (
              <Inventory username={this.state.username} {...routerProps} />
            )}
          />
          <Route component={() => <h1>Page not found.</h1>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
