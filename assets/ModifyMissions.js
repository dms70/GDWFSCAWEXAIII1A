import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useEffect,useCallback} from 'react';
import "./country.json";
import Countries from './Countries';
import customAxios from './customAxios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axiosRetry from 'axios-retry';

export default function ModifyMissions() {


var [Valueid, getValueid] = useState([]);
var [Valuetitle, getValuetitle] = useState([]);
var [Valuedescription, getValuedescription] = useState([]);
var [Valuecodename, getValuecodename] = useState([]);
var [Valuenationality, getValuenationality] = useState([]);
var [Valuetype, getValuetype] = useState([]);
var [Valuestatus, getValuestatus] = useState([]);
var [Valuebegindate, getValuebegindate] = useState([]);
var [Valueenddate, getValueenddate] = useState([]);
var [Valuespeciality, getValuespeciality] = useState([]);
var [Valueagents, getValueagents] = useState([]);
var [Valuecontacts, getValuecontacts] = useState([]);
var [Valuetargets, getValuetargets] = useState([]);
var [Valuestashs, getValuestashs] = useState([]);

var [title, settitle] = useState ('Mission');
var [description, setdescription] = useState ('');
var [codename, setcodename] = useState ('');
var [type, settype] = useState ('');
var [status, setstatus] = useState ('');
var [begindate, setbegindate] = useState ('');
var [enddate, setenddate] = useState ('');
var [choicespeciality,setchoicespeciality] =  useState ('');

axiosRetry(customAxios, { retries: 10 });

var handleChangetitle = (e) => {
  settitle(e.target.value);
}

var handleChangedescription = (e) => {
  setdescription(e.target.value);
}

var handleChangecodename = (e) => {
  setcodename(e.target.value);
}


var handleChangeType = (e) => {
  settype(e.target.value);
}

var handleChangeStatus = (e) => {
  setstatus(e.target.value);
}


var handleChangeBegindate = (e) => {
  setbegindate(e.target.value);
}

var handleChangeEnddate = (e) => {
  setenddate(e.target.value);
}

var [target, setValuetarget] = useState([]);
var [datatarget, settarget] = useState([]);
var loadtarget = useCallback(() => {customAxios.get("api/targets")
  .then(function (response) {setValuetarget(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


var optionstarget = Object.values(target).map(({ id, name, nationality }) => ({ label: name, value: id , nationality: nationality}))

var [speciality, setValuespeciality] = useState([]);
var [dataspeciality, setspeciality] = useState([]);
var loadspeciality = useCallback(() => {customAxios.get("api/specialities")
  .then(function (response) {setValuespeciality(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);



const [valuesspeciality, setReactSelectspeciality] = useState({
selectedOptionSpeciality: ''
});

var optionsspeciality = Object.values(speciality).map(({ id, type }) => ({ label: type, value: id }))

var [agent, setValueAgent] = useState([]);
var  [dataagent, setagent] = useState([]);

const loadagents = useCallback(() => {customAxios.get("api/agents")
  .then(function (response) {setValueAgent(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


var [optionscontact, setoptionscontact] = useState([]);
var [selectedValuecontacts, setSelectedValuecontacts] = useState([]);
var [optionsstashs, setoptionsstashs] = useState([]);
var [selectedValuestashs, setSelectedValuestashs] = useState([]);
var [selectedValuetarget, selectedValueTarget] = useState([]);
var [selectedValueSpeciality, setSelectedValueSpeciality] = useState([]);
var [optionsagent, setoptionsagent] = useState([]);
var [selectedValueagents, setSelectedValueAgent] = useState([]);
 
  // handle onChange event of the dropdown
  const handleChangeContact = (e) => {
    setSelectedValuecontacts(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  // handle onChange event of the dropdown
  const handleChangeStashs = (e) => {
    setSelectedValuestashs(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  var resetValueContact = () => {
    setSelectedValueContact([]);
    setnationality('France');
  };

  var resetValueAgent = () => {
    setSelectedValueAgent([]);
  }


    var resetallValue = () => {
    setSelectedValueAgent([]);
    setSelectedValueContact([]);
    selectedValueTarget([]);
    setSelectedValueStash([]);
    settitle('');
    setdescription(''),
    setcodename('');

    setnationality('France');
  }

var [nationality, setnationality] = useState ('France');

var [contact, setValuecontact] = useState([]);
var [datacontact, setcontact] = useState([]);
var loadcontacts = useCallback(() => {customAxios.get("api/contacts")
  .then(function (response) {setValuecontact(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);




var [stashs, setValuestashs] = useState([]);
var [datastashs, setstashs] = useState([]);
var loadstashs = useCallback(() => {customAxios.get("api/stashs")
  .then(function (response) {setValuestashs(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


useEffect(() => {

loadagents();
loadtarget();
loadspeciality();
loadstashs();
loadcontacts();
}, [loadagents,loadtarget,loadspeciality,loadstashs,loadcontacts]);


var optionsstashs = Object.values(stashs).map(({ id, codename }) => ({ label: codename, value: id }));
var optionsagent = Object.values(agent).map(({ id, name, isDisabled }) => ({ label: name, value: id , isDisabled:isDisabled}));
var optionscontact = Object.values(contact).map(({ id, name }) => ({ label: name, value: id }))

function handleChangeTarget (e){

  resetValueAgent();
  
  for (let j = 0; j < (agent.length) ; j++) { 
  Object.assign(agent[j],{isDisabled:"false"});  
  }

  let nationalityTarget = [];
    
  selectedValueTarget(Array.isArray(e) ? e.map(x => x.value) : []);

  var indextodelete = [];
  
  for (let i = 0; i < (e.length) ; i++) { 
  nationalityTarget.push(e[i].nationality);

  
  for (let j = 0; j < (agent.length) ; j++) {
      
      console.log("j",j);
      if (e[i].nationality === agent[j].nationality) {  
      indextodelete.push(agent.indexOf(agent[j]));
      console.log ("to be delete:",agent[j].id);
      if (agent[j].isDisabled === "false") {
      Object.assign(agent[j],{isDisabled:"true"});
      }
  
      } else {
        
      console.log("to keep in the list:",agent[j].id)
      console.log("agent[j].isDisabled",agent[j].isDisabled);
      if (agent[j].isDisabled === "false") {
        Object.assign(agent[j],{isDisabled:"false"});
      }
  }
  }
  }
  }

var [selectedValueSpeciality, setSelectedValueSpeciality] = useState([]);

  
  function handleChangeSpeciality (e) {
    setSelectedValueSpeciality(e);
    console.log("selectedValueSpeciality",selectedValueSpeciality);
    console.log("selectedValueSpeciality.id",selectedValueSpeciality.id);
    console.log("e.LABEL",e.label);
    console.log("e.value",e.value);
    
    var id = e.value;
    
    var choiceidspeciality = speciality.find(x => x.id === e.value).agents;
    
    console.log("choiceidspeciality",choiceidspeciality);
    
    let nationalityTarget = [];
    
    const agentlist = [];
    
    for (let i = 0; i < (agent.length) ; i++) {
      agentlist.push("/api/agents/" + agent[i].id);
    }
    console.log("agentlist:", agentlist);
    console.log("agent:", agent);
    
    for (let j = 0; j < (agentlist.length) ; j++) {
    
        var findornot = choiceidspeciality.includes(agentlist[j]);
    
        if (findornot === true ) {
        console.log("find:", j, findornot);
    
        } else {
        console.log("notfind:", findornot);
        if (agent[j].isDisabled === "false") {
    
        Object.assign(agent[j],{isDisabled:"true"});
        }
        }
    
    }
    
    optionsagent = Object.values(agent).map(({ id, name, isDisabled }) => ({ label: name, value: id , isDisabled:isDisabled}));
    setoptionsagent(optionsagent);
    
    }

  function handleChangeAgent(e)  {


    setSelectedValueAgent(Array.isArray(e) ? e.map(x => x.value) : []);
    console.log("e:",e);
    console.log("selectedValueAgent",selectedValueAgent);

    optionsagent = Object.values(agent).map(({ id, name, isDisabled }) => ({ label: name, value: id , isDisabled:"true"}));
    setoptionsagent(optionsagent);
    
    console.log("optionsagenthandle" , optionsagent);
    
    
    }
    

function handleChangenationality (e) {

resetValueContact(); // reinit values choose from contact 

console.log("copycontact:",copycontact);
console.log("contact:",contact);
console.log("stashs:",stashs);
setnationality(e.target.value);

console.log("nationality:",e.target.value);
console.log("contact.length:",contact.length);

let lengthcontact = contact.length

console.log("lengthcontact",lengthcontact);

var copycontact = [];

for (let i = 0; i < (lengthcontact) ; i++) {
console.log("boucle i" , i);

if (contact[i].nationality == e.target.value ){ 
    const total = copycontact.push(contact[i]);
    console.log("add:" , copycontact[i]);
}

}

console.log("copycontactafter:",copycontact);
optionscontact = Object.values(copycontact).map(({ id, name }) => ({ label: name, value: id }))
setoptionscontact(optionscontact);

let lengthstashs = stashs.length;
var copystashs = [];

for (let i = 0; i < (lengthstashs) ; i++) {
console.log("boucle i" , i);
if (stashs[i].country == e.target.value ){ 
    const total = copystashs.push(stashs[i]);
}
}

optionsstashs = Object.values(copystashs).map(({ id, codename }) => ({ label: codename, value: id }))
setoptionsstashs(optionsstashs);

}

var [missions, setValuemissions] = useState([]);

var loadmissions = useCallback(() => {customAxios.get("api/missions")
  .then(function (response) {setValuemissions(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


useEffect(() => {

loadmissions();

}, [loadmissions]);


var optionsmissions = Object.values(missions).map(({ id, title }) => ({ label: title, value: id }))

var [selectedValuemissions, setSelectedValuemissions] = useState([]);

var handleChangemissions  = (e) => {
setSelectedValuemissions(e);
console.log(selectedValuemissions);
console.log("selectedValuemissions.id",selectedValuemissions.id);
console.log("e.value",e.value);
var id = e.value;



customAxios.get('api/missions/' + id )
  
     .then((response) => {
      getValueid(response.data.id); 

      getValuetitle(response.data.title);
      settitle(response.data.title);

      getValuedescription(response.data.description);
      setdescription(response.data.description);

      getValuecodename(response.data.codename);
      setcodename(response.data.codename);

      getValuenationality(response.data.country);
      setnationality(response.data.country);

      getValuetype(response.data.type);
      settype(response.data.type);

      getValuestatus(response.data.status);
      setstatus(response.data.status);

      getValuebegindate(response.data.begindate); 
      var now = new Date(response.data.begindate);
      var dateString = now.toISOString().slice(0, 10)
      setbegindate(dateString);    

      getValuespeciality(response.data.speciality);
      console.log(response.data.speciality);

      getValueagents(response.data.agents);
      console.log(response.data.agents);

      getValuecontacts(response.data.contacts);
      console.log("response.data.contacts",response.data.contacts);

      getValuetargets(response.data.targets);
      console.log(response.data.targets);

      getValuestashs(response.data.stashs);
      console.log(response.data.stashs);

      const apipath = "/api/specialities/";
      var p = [];
      var t = [response.data.speciality];
      for (let j = 0; j < (t.length) ; j++) {
        p.push(parseInt(t[j].replace(apipath, '')));       
      };

      setSelectedValueSpeciality(p);

      const apipathstashs = "/api/stashs/";
      const pstashs = [];

      for (let j = 0; j < (response.data.stashs.length) ; j++) {
        pstashs.push(parseInt(response.data.stashs[j].replace(apipathstashs, '')));
      };
      setSelectedValuestashs(pstashs);

      const apipathcontact = "/api/contacts/";
      const pcontacts = [];

      for (let j = 0; j < (response.data.contacts.length) ; j++) {
        pcontacts.push(parseInt(response.data.contacts[j].replace(apipathcontact, '')));
      };
      setSelectedValuecontacts(pcontacts);

      const apipathtargets = "/api/targets/";
      const ptargets = [];
      for (let j = 0; j < (response.data.targets.length) ; j++) {
        ptargets.push(parseInt(response.data.targets[j].replace(apipathtargets, '')));
      };
      selectedValueTarget(ptargets);

      const apipathagents = "/api/agents/";
      const pagents = [];
      for (let j = 0; j < (response.data.agents.length) ; j++) {
        pagents.push(parseInt(response.data.agents[j].replace(apipathagents, '')));
      };
      setSelectedValueAgent(pagents);


     })
}



const handleSubmit = (e) => {
e.preventDefault();

customAxios.put('api/missions', {
     title : title,
     description:description, 
     codename:codename,
     country:nationality,
     type:type,
     status:status,
     begindate:begindate,
     enddate:enddate,
     speciality:choicespeciality,
     agents:dataagent,
     contacts:datacontact,
     targets:datatarget,
     stashs:datastashs,         
     })
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
}


var resetallValue = () => {

// console.log("title",title);
// console.log("description",description);
// console.log("codename",codename);
// console.log("country",nationality);
// console.log("type",type);
// console.log("nationality",nationality);
// console.log("status",status);
// console.log("begindate",begindate);

// console.log("selectedValueSpeciality",selectedValueSpeciality);


var agentslist = [];
  for (let i = 0; i < (selectedValueagents.length) ; i++) {
    agentslist.push("/api/agents/" + selectedValueagents[i]);
    }
console.log("selectedValuecontacts.length",selectedValuecontacts.length);
          var contactslist = [];
  for (let i = 0; i < (selectedValuecontacts.length) ; i++) {
    contactslist.push("/api/contacts/" + selectedValuecontacts[i]);
    }

    
          var targetslist = [];
  for (let i = 0; i < (selectedValuetarget.length) ; i++) {
    targetslist.push("/api/targets/" + selectedValuetarget[i]);
    }

          var stashslist = [];
  for (let i = 0; i < (selectedValuestashs.length) ; i++) {
    stashslist.push("/api/stashs/" + selectedValuestashs[i]);
    }


}


return (

<Form >

<Form.Row style={{backgroundColor: '#f1f1f1'}}>
    <Form.Group as={Col} lg="3">
    <Form.Label>Choisir la Mission à Modifier</Form.Label>     
        <Select
        className="reactSelectmission"
        placeholder="Select mission"
        value={selectedValuemissions} // set selected values
        options={optionsmissions} // set list of the data
        onChange={handleChangemissions} // assign onChange function
        isClearable
      /> 
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col}  controlId="FormTitleMission">
    <Form.Label>Titre</Form.Label>
    <Form.Control type="title" placeholder={title}  value={title} onChange={handleChangetitle}/>
  </Form.Group>

  <Form.Group as={Col} controlId="FormCodeNameMission">
    <Form.Label>Nom de code</Form.Label>
    <Form.Control type="codename" placeholder={codename} value={codename} onChange={handleChangecodename}/>
  </Form.Group>

  <Form.Group as={Col} controlId="FormstatusMission">
    <Form.Label>Statut</Form.Label>
    <Form.Control as="select" placeholder='aucun choix' value={status} onChange={handleChangeStatus} name="status">
      <option>Choisir un statut</option>
      <option>En preparation</option>
      <option>En cours</option>
      <option>Terminé</option>
      <option>Echec</option>
     </Form.Control>     
   </Form.Group>

   <Form.Group as={Col} controlId="FormdebutMission">
      <Form.Label>Date de début de la mission</Form.Label>
      <Form.Control type="date" name="debutdelamission" value={begindate} onChange={handleChangeBegindate} placeholder="debut de la mission" />
    </Form.Group>

    <Form.Group as={Col} controlId="FormfindeMission">
      <Form.Label>Date de fin de la mission</Form.Label>
      <Form.Control type="date" name="findelamission" value={enddate} onChange={handleChangeEnddate} placeholder="Fin de la mission" />
    </Form.Group>

  </Form.Row>

  <Form.Row>
  <Form.Group as={Col}  lg="9"  controlId="FormDescriptionMission">
    <Form.Label>Description</Form.Label>
    <Form.Control type="description" placeholder={description}  value={description} onChange={handleChangedescription}/>
  </Form.Group>
  <Form.Group  as={Col}  lg="3" controlId="FormcountryMission">
  <Countries label="Pays" name="nationality" controlId="FormnationalityMission" disabled value={nationality} onChange={handleChangenationality}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  

  <Form.Group  as={Col}  lg="2" controlId="FormTypeMission">
    <Form.Label>Type</Form.Label>
    <Form.Control as="select" placeholder = 'aucun choix' value={type} onChange={handleChangeType} name="type">
      <option>Choisir un type</option>
      <option>Surveillance</option>
      <option>Assasinat</option>
      <option>Infiltration</option>
      <option>Recrutement</option>
     </Form.Control>     
   </Form.Group>

  <Form.Group  as={Col}  lg="5" controlId="FormstashsMissions" >     
  <Form.Label>Choisir une planque - 0 ou plusieurs</Form.Label>     
        <Select
        className="reactSelectstash"
        placeholder="Select stash"
        value={optionsstashs.filter(obj => selectedValuestashs.includes(obj.value))} // set selected values
        options={optionsstashs} // set list of the data
        onChange={handleChangeStashs} // assign onChange function
        isMulti
        isClearable
        isDisabled
      /> 
  </Form.Group>

  <Form.Group as={Col}  lg="5" controlId="FormTarget" >     
    <Form.Label>Choisir une ou plusieurs cible - </Form.Label>     
        <Select
        className="reactSelecttarget"
        placeholder="Select target"
        value={optionstarget.filter(obj => selectedValuetarget.includes(obj.value))} // set selected values
        options={optionstarget} // set list of the data
        onChange={handleChangeTarget} // assign onChange function
        isMulti
        isClearable
        isDisabled
      /> 
  </Form.Group>
  </Form.Row>


  <Form.Row>
  <Form.Group as={Col}  lg="2">
    <Form.Label>Specialité</Form.Label>     
        <Select
        className="reactSelectspeciality"
        placeholder="Select speciality"
        value={optionsspeciality.filter(obj => selectedValueSpeciality.includes(obj.value))}
        //value={selectedValueSpeciality} // set selected values
        options={optionsspeciality} // set list of the data
        onChange={handleChangeSpeciality} // assign onChange function
        isDisabled
        isClearable
      /> 
  </Form.Group>

  <Form.Group as={Col}  lg="5" controlId="Formagents" >     
    <Form.Label>Choisir un ou plusieurs agents</Form.Label>     
        <Select
        className="reactSelectagents"
        placeholder="Select agents"
        value={optionsagent.filter(obj => selectedValueagents.includes(obj.value))} // set selected values
        options={optionsagent} // set list of the data
        onChange={handleChangeAgent} // assign onChange function
        isOptionDisabled={(option) => option.isDisabled === 'true'}
        isMulti
        isClearable
        isDisabled
      /> 
  </Form.Group>


  <Form.Group as={Col}  lg="5" controlId="Formcontacts" >     
    <Form.Label>Choisir un ou plusieurs contacts</Form.Label>     
        <Select
        className="reactSelectcontacts"
        placeholder="Select contacts"
        value={optionscontact.filter(obj => selectedValuecontacts.includes(obj.value))} // set selected values
        options={optionscontact} // set list of the data
        onChange={handleChangeContact} // assign onChange function
        isMulti
        isClearable
        isDisabled
      /> 
  </Form.Group>
  </Form.Row>




  





    <Form.Row>
    <Form.Group  controlId="ButtonsubmitMission">
    <div className="col-md-12 text-center">
    <Button onClick={handleSubmit}>VALIDATION</Button> 
    </div>
    </Form.Group>
    <Form.Group  controlId="ButtonresetallValueMission">
    <div className="col-md-12 text-center">
    <Button onClick={resetallValue}>EFFACER</Button>
    </div>
    </Form.Group>
    </Form.Row>

</Form>

  );
}