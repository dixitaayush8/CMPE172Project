import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Security, ImplicitCallback } from "@okta/okta-react";
import Directory from "./Directory/Directory";
import HomePage from "./home/HomePage";
import HistoryPage from "./employees/HistoryPage";
import DepartmentInfo from "./employees/DepartmentInfo";
import PositionInfo from "./employees/PositionInfo";
import InsertEmployee from "./employees/InsertEmployee"
import WebPortal from "./webportal/WebPortal";
import Login from "./auth/Login";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";

const config = {
  issuer: "https://dev-970892.okta.com/oauth2/default",
  redirect_uri: window.location.origin + "/implicit/callback",
  client_id: "0oajfj5gbpPa1yiaf356"

};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Security
            issuer={config.issuer}
            client_id={config.client_id}
            redirect_uri={config.redirect_uri}
            onAuthRequired={this.onAuthRequired}

          >
            <Directory />

            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
            <Route
              path="/(.+)"
              render={() => (
                <div>
                  <Switch>
                    <Route
                      path="/login"
                      render={() => (
                        <Login baseUrl="https://dev-970892.okta.com/" />
                      )}
                    />
                    <Route
                      path="/implicit/callback"
                      component={ImplicitCallback}
                    />
                    <Route path="/portal" component={WebPortal} />
                    <Route
                      path="/github"
                      component={() =>
                        (window.location = "http://github.com/login")
                      }
                    />

                    <Route
                    path="/facebook"
                    component={() =>
                      (window.location = "https://www.facebook.com/v3.3/dialog/oauth?client_id=340660639971302&redirect_uri=http%3A%2F%2Flocalhost%3A3000&state=WM6D")

                    }
                    />

                    <Route
                      exact
                      path="/history/:id(\d+)"
                      render={props => {
                        const id = props.match.params.id;
                        return <HistoryPage id={id} />;
                      }}
                    />
                    <Route
                    exact
                    path="/departmentinfo"
                    render={props =>
                      {
                      return <DepartmentInfo />
                    }}
                    />
                    <Route
                    exact
                    path="/positioninfo"
                    render={props =>
                      {
                      return <PositionInfo />
                    }}
                    />
                    <Route
                    exact
                    path="/insertemployee"
                    render={props =>
                      {
                      return <InsertEmployee />
                    }}
                    />
                    <Route
                      exact
                      path="/:id(\d+)"
                      render={props => {
                        const id = props.match.params.id;
                        return <HomePage id={id} />;
                      }}
                    />
                  </Switch>
                </div>
              )}
            />
          </Security>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
