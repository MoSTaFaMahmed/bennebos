import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Cansel = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/cansel`}/>
    <Route path={`${match.url}/cansel`} component={asyncComponent(() => import('./Cansel/Cansel'))}/>
      </Switch>
);

export default Cansel;
