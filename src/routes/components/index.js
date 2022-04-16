import React from "react";
import {Route, Switch} from "react-router-dom";

import DataDisplay from "./dataDisplay";
import DataEntry from "./dataEntry";
import Feedback from "./feedback";
import Navigation from "./navigation";
import Others from "./others";
import General from "./general";
import Table from "./table";

import Carf from "./Car";
import Book from "./Booking";

const Components = ({match}) => (
  <Switch>
    <Route path={`${match.url}/dataDisplay`} component={DataDisplay}/>
    <Route path={`${match.url}/dataEntry`} component={DataEntry}/>
    <Route path={`${match.url}/feedback`} component={Feedback}/>
    <Route path={`${match.url}/general`} component={General}/>
    <Route path={`${match.url}/navigation`} component={Navigation}/>
    <Route path={`${match.url}/others`} component={Others}/>
    <Route path={`${match.url}/table`} component={Table}/>
    <Route path={`${match.url}/car`} component={Carf}/>
    <Route path={`${match.url}/book`} component={Book}/>
  </Switch>
);

export default Components;
