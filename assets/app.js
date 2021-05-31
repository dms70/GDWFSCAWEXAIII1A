import React from 'react';
import useEffect from 'react';

import AsyncStorage from 'react';

import ReactDom from 'react-dom';
import Header from './Header';
import NewMissions from "./NewMissions";
import GetMissions from "./GetMissions";
import DeleteMissions from "./DeleteMissions";
import ModifyMissions from "./ModifyMissions";
import DetailMissions from "./DetailMissions";
import NewAgents from "./NewAgents";
import GetAgents from "./GetAgents";
import ModifyAgents from "./ModifyAgents";
import DeleteAgents from "./DeleteAgents";
import NewStashs from "./NewStashs";
import NewSpeciality from "./NewSpeciality";
import GetSpeciality from "./GetSpeciality";
import DeleteSpeciality from "./DeleteSpeciality";
import NewTargets from "./NewTargets";
import GetTargets from "./GetTargets";
import DeleteTargets from "./DeleteTargets";
import ModifyTargets from "./ModifyTargets";
import NewContacts from "./NewContacts";
import GetContacts from "./GetContacts";
import DeleteContacts from "./DeleteContacts";
import ModifyContacts from "./ModifyContacts";
import GetStashs from "./GetStashs";
import DeleteStashs from "./DeleteStashs";
import ModifyStashs from "./ModifyStashs";
import gettoken from "./gettoken";

import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'  

gettoken();

ReactDom.render(
    <React.StrictMode>
    <Router>
      <Header />
      
      <Switch>       
        <Route path="/NewMissions" component={NewMissions} />
        <Route path="/GetMissions" component={GetMissions} />
        <Route path="/NewMissions" component={NewMissions} /> 
        <Route path="/DeleteMissions" component={DeleteMissions} /> 
        <Route path="/ModifyMissions" component={ModifyMissions} /> 
        <Route path="/DetailMissions" component={DetailMissions} /> 
    
        <Route path="/NewAgents" component={NewAgents} />
        <Route path="/GetAgents" component={GetAgents} />
        <Route path="/DeleteAgents" component={DeleteAgents} />
        <Route path="/ModifyAgents" component={ModifyAgents} />

        <Route path="/NewTargets" component={NewTargets} />
        <Route path="/GetTargets" component={GetTargets} />
        <Route path="/DeleteTargets" component={DeleteTargets} />
        <Route path="/ModifyTargets" component={ModifyTargets} />

        <Route path="/GetContacts" component={GetContacts} />
        <Route path="/NewContacts" component={NewContacts} />
        <Route path="/DeleteContacts" component={DeleteContacts} />
        <Route path="/ModifyContacts" component={ModifyContacts} />

        <Route path="/NewSpeciality" component={NewSpeciality} />
        <Route path="/GetSpeciality" component={GetSpeciality} />
        <Route path="/DeleteSpeciality" component={DeleteSpeciality} />
        
     
        <Route path="/NewStashs" component={NewStashs} />
        <Route path="/GetStashs" component={GetStashs} />
        <Route path="/ModifyStashs" component={ModifyStashs} />
        <Route path="/DeleteStashs" component={DeleteStashs} />
       
        </Switch> 
    </Router>
    </React.StrictMode>,
    document.getElementById('root')
);









