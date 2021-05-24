import React from 'react';
import ReactDom from 'react-dom';
import Headervisitor from './Headervisitor';
import GetMissions from "./GetMissions";
import DetailMissions from "./DetailMissions";

import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'  

ReactDom.render(
    <React.StrictMode>
    <Router>
      <Headervisitor />     
      <Switch>       
        <Route path="/GetMissions" component={GetMissions} /> 
        <Route path="/DetailMissions" component={DetailMissions} />              
        </Switch> 
    </Router>
    </React.StrictMode>,
    document.getElementById('rootvisitor')
);









