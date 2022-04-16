import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Carf = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/car`}/>
    <Route path={`${match.url}/car`} component={asyncComponent(() => import('./car/Car'))}/>
      </Switch>
);

export default Carf;
