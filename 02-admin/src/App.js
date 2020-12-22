import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routers/route";
import { connect } from "react-redux";
import "./App.css"
function App(props) {
  return (
    <div className="container">
      <BrowserRouter >
        <Switch>
          {routes.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                render={() =>
                  !item.auth ? (
                    <item.component {...props} />
                  ) : props.token ? (
                    <item.component {...props} />
                  ) : (
                        <Redirect
                          to={{
                            pathname: "/login",
                            state: { from: props.location },
                          }}
                        />
                      )
                }
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStatetiProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStatetiProps)(App);
