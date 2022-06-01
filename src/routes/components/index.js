import React from "react";
import {Route, Switch} from "react-router-dom";


import Table from "./table";

import Carf from "./Car";
import Book from "./Booking";
import Cansel from "./CanselReasons";

const Components = ({match}) => (
  <Switch>
    <Route path={`${match.url}/table`} component={Table}/>
    <Route path={`${match.url}/car`} component={Carf}/>
    <Route path={`${match.url}/book`} component={Book}/>
    <Route path={`${match.url}/cansel`} component={Cansel}/>
  </Switch>
);

export default Components;
