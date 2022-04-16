import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";


const Book = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/book`}/>
    <Route path={`${match.url}/book`} component={asyncComponent(() => import('./booking/Booking'))}/>
      </Switch>
);

export default Book;
