import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Locations from "./containers/Locations"
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewLocation from "./containers/NewLocation"
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";


export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/locations/new" exact component={NewLocation} props={childProps} />
    <AuthenticatedRoute path="/locations/:countryId/:locationId" exact component={Locations} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
