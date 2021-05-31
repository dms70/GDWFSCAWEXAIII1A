import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useEffect,useCallback,useRef} from 'react';
import "./country.json";
import Countries from './Countries';
import customAxios from './customAxios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


export default function Missions() {

var tokentuse = sessionStorage.getItem("token");
var tokenforapi = "Bearer" + " " + tokentuse

const animatedComponentscontact = makeAnimated();

var [title, settitle] = useState ('');
var [description, setdescription] = useState ('');
var [codename, setcodename] = useState ('');
var [type, settype] = useState ('');
var [status, setstatus] = useState ('');
var [begindate, setbegindate] = useState ('');
var [choicespeciality,setchoicespeciality] =  useState ('');

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

var [target, setValuetarget] = useState([]);
var [datatarget, settarget] = useState([]);
var loadtarget = useCallback(() => {customAxios.get("api/targets",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setValuetarget(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


var optionstarget = Object.values(target).map(({ id, name, nationality }) => ({ label: name, value: id , nationality: nationality}))

var [speciality, setValuespeciality] = useState([]);
var [dataspeciality, setspeciality] = useState([]);
var loadspeciality = useCallback(() => {customAxios.get("api/specialities",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setValuespeciality(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


const [valuesspeciality, setReactSelectspeciality] = useState({
selectedOptionSpeciality: ''
});

var optionsspeciality = Object.values(speciality).map(({ id, type }) => ({ label: type, value: id }))

var [agent, setValueAgent] = useState([]);
var  [dataagent, setagent] = useState([]);

const loadagents = useCallback(() => {customAxios.get("api/agents",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setValueAgent(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


var [optionscontact, setoptionscontact] = useState([]);
var [selectedValueContact, setSelectedValueContact] = useState([]);
var [optionsstashs, setoptionsstashs] = useState([]);
var [selectedValueStash, setSelectedValueStash] = useState([]);
var [selectedValueTarget, setSelectedValueTarget] = useState([]);
var [selectedValueSpeciality, setSelectedValueSpeciality] = useState([]);
var [optionsagent, setoptionsagent] = useState([]);
var [selectedValueAgent, setSelectedValueAgent] = useState([]);
 
  // handle onChange event of the dropdown
  const handleChangeContact = (e) => {
    setSelectedValueContact(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  // handle onChange event of the dropdown
  const handleChangeStashs = (e) => {
    setSelectedValueStash(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  var resetValueContact = () => {
    setSelectedValueContact([]);
    setnationality('');
  };

  var resetValueAgent = () => {
    setSelectedValueAgent([]);
  }


    var resetallValue = () => {
    setSelectedValueAgent([]);
    setSelectedValueContact([]);
    setSelectedValueTarget([]);
    setSelectedValueStash([]);
    settitle('');
    setdescription(''),
    setcodename('');

    setnationality('');
  }

var [nationality, setnationality] = useState ('');

var [contact, setValuecontact] = useState([]);
var [datacontact, setcontact] = useState([]);
var loadcontacts = useCallback(() => {customAxios.get("api/contacts",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setValuecontact(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


var [stashs, setValuestashs] = useState([]);
var [datastashs, setstashs] = useState([]);
var loadstashs = useCallback(() => {customAxios.get("api/stashs",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
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

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].nationality === nameKey) {
            return myArray;
        }
    }
}


var resetValueSpeciality = () => {
    setSelectedValueSpeciality('');
}

function handleChangeTarget (e){

resetValueAgent();
resetValueSpeciality();
resetValueContact();

for (let j = 0; j < (agent.length) ; j++) {
Object.assign(agent[j],{isDisabled:"false"});
}


let nationalityTarget = [];
  
setSelectedValueTarget(Array.isArray(e) ? e.map(x => x.value) : []);

var indextodelete = [];

for (let i = 0; i < (e.length) ; i++) {

nationalityTarget.push(e[i].nationality);

for (let j = 0; j < (agent.length) ; j++) {
    
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

var [selectedValueagents, setSelectedValueagents] = useState([]);
var [Valueagents, getValueagents] = useState([]);

var  choiceidspeciality = [];

var getagentswithspec = useCallback((id) => {customAxios.get('api/specialities/' + id ,{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
.then(function (response) {
  getValueagents(response.data.agents);
  console.log("getValueagents",response.data.agents);
  setSelectedValueagents(response.data.agents) })
},[]);


var handleChangeSpeciality = (e) => {
resetValueAgent();


setSelectedValueSpeciality(e.value);
setspeciality(e.value);

var id = e.value;

var choiceidspeciality = speciality.find(x => x.id === e.value).agents;

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

  console.log("e:",e);

  setSelectedValueAgent(Array.isArray(e) ? e.map(x => x.value) : []);
  
  console.log("selectedValueAgent",selectedValueAgent);

  //optionsagent = Object.values(agent).map(({ id, name, isDisabled }) => ({ label: name, value: id , isDisabled:"true"}));
  //setoptionsagent(optionsagent);
  
  console.log("optionsagenthandle" , optionsagent);   

}

function handleChangenationality (e) {

resetValueContact(); // reinit values choose from contact 

// console.log("copycontact:",copycontact);
// console.log("contact:",contact);
// console.log("stashs:",stashs);
setnationality(e.target.value);

// console.log("nationality:",e.target.value);
// console.log("contact.length:",contact.length);

let lengthcontact = contact.length

// console.log("lengthcontact",lengthcontact);

var copycontact = [];

for (let i = 0; i < (lengthcontact) ; i++) {
// console.log("boucle i" , i);

if (contact[i].nationality == e.target.value ){ 
    const total = copycontact.push(contact[i]);
    // console.log("add:" , copycontact[i]);
}

}

// console.log("copycontactafter:",copycontact);
optionscontact = Object.values(copycontact).map(({ id, name }) => ({ label: name, value: id }))
setoptionscontact(optionscontact);
// console.log("optionscontact:",optionscontact);

let lengthstashs = stashs.length;
var copystashs = [];

for (let i = 0; i < (lengthstashs) ; i++) {

if (stashs[i].country == e.target.value ){ 
    const total = copystashs.push(stashs[i]);
}
}

optionsstashs = Object.values(copystashs).map(({ id, codename, type}) => ({ label: type, value: id }))
setoptionsstashs(optionsstashs);

}

const handleSubmitMissions = (e) => {
e.preventDefault();


var choiXspeciality = [];
choiXspeciality = ("/api/specialities/" + dataspeciality);

var choiceidcontact = [];
for (let j = 0; j < (selectedValueContact.length) ; j++) {
choiceidcontact.push("/api/contacts/" + selectedValueContact[j]);
}

var choiceidstashs = [];
for (let j = 0; j < (selectedValueStash.length) ; j++) {
choiceidstashs.push("/api/stashs/" + selectedValueStash[j]);
}


var choiceidtarget = [];
for (let j = 0; j < (selectedValueTarget.length) ; j++) {
choiceidtarget.push("/api/targets/" + selectedValueTarget[j]);
}


var choiceidagent = [];
for (let j = 0; j < (selectedValueAgent.length) ; j++) {
choiceidagent.push("/api/agents/" + selectedValueAgent[j]);
}

customAxios.post('api/missions', {
     title : title,
     description:description, 
     codename:codename,
     country:nationality,
     type:type,
     status:status,
     begindate:begindate,
     speciality:choiXspeciality,
     agents:choiceidagent,
     targets:choiceidtarget,
     stashs:choiceidstashs,     
     contacts:choiceidcontact,    
     },{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
     .then(res => {console.log(res)})
     .catch(error => console.log(error));


     settitle(""); 
     setdescription(""); 
     setcodename(""); 
     setnationality(""); 
     settype(""); 
     setstatus(""); 
     setbegindate("");    
     setSelectedValueSpeciality(""); 
     setSelectedValueAgent([]);
     setSelectedValueContact([]);
     setSelectedValueTarget([]);
     setSelectedValueStash([]);

}


var resetallValue = () => {

  settitle(""); 
  setdescription(""); 
  setcodename(""); 
  setnationality(""); 
  settype(""); 
  setstatus(""); 
  setbegindate("");    
  setenddate(""); 
  setSelectedValueSpeciality(""); 
  setSelectedValueAgent([]);
  setSelectedValueContact([]);
  setSelectedValueTarget([]);
  setSelectedValueStash([]);

}


return (

<Form onSubmit={handleSubmitMissions}>
<Form.Row>
  <Form.Group   as={Col}  controlId="FormTitleMission">
  <Form.Label>Titre</Form.Label>
  <Form.Control type="title" placeholder="Entrer le Titre"  value={title} onChange={handleChangetitle}/>
  </Form.Group>
 
  <Form.Group  as={Col} controlId="FormCodeNameMission">
  <Form.Label>Code de la Mission</Form.Label>
  <Form.Control type="codename" placeholder="Entrer le nom code de la mission" value={codename} onChange={handleChangecodename}/>
  </Form.Group>

  <Form.Group  as={Col} controlId="FormstatusMission">
    <Form.Label>Statut</Form.Label>
    <Form.Control as="select" placeholder='aucun choix' value={status} onChange={handleChangeStatus} name="status">
      <option>Select status</option>
      <option>En preparation</option>
      <option>En cours</option>
      <option>Terminé</option>
      <option>Echec</option>
     </Form.Control>     
   </Form.Group>


    <Form.Group  as={Col}  controlId="FormdebutMission">
      <Form.Label>Date de début</Form.Label>
      <Form.Control type="date" name="debutdelamission" value={begindate} onChange={handleChangeBegindate} placeholder="debut de la mission" />
    </Form.Group>




  </Form.Row>
   

  <Form.Row>
    <Form.Group as={Col} controlId="FormDescriptionMission">
    <Form.Label>Description de la Mission</Form.Label>
    <Form.Control type="description" placeholder="Entrer la description de la mission" value={description} onChange={handleChangedescription}/>
   </Form.Group>
   </Form.Row>



   <Form.Row>
   <Form.Group  as={Col}  lg="4"  controlId="FormCodeNameMission">
  <Countries label="Pays de la mission" name="nationality" controlId="FormnationalityMission" value={nationality} onChange={handleChangenationality}/>
  </Form.Group>


  <Form.Group as={Col}  lg="4" controlId="FormTypeMission">
    <Form.Label>Type</Form.Label>
    <Form.Control as="select" placeholder = 'aucun choix' value={type} onChange={handleChangeType} name="type">
      <option>Select type</option>
      <option>Surveillance</option>
      <option>Assasinat</option>
      <option>Infiltration</option>
      <option>Recrutement</option>
     </Form.Control>     
   </Form.Group>

  <Form.Group as={Col} lg="4" controlId="FormstashsMissions" >     
  <Form.Label>Planque</Form.Label>     
        <Select
        className="reactSelectstash"
        placeholder="Select stash"
        value={optionsstashs.filter(obj => selectedValueStash.includes(obj.value))} // set selected values
        options={optionsstashs} // set list of the data
        onChange={handleChangeStashs} // assign onChange function
        isMulti
        isClearable
      /> 
  </Form.Group>
  </Form.Row>

   <Form.Row>
  <Form.Group as={Col}  lg="4" controlId="FormcontactTarget" >     
    <Form.Label>Cible</Form.Label>     
        <Select
        className="reactSelecttarget"
        placeholder="Select target"
        value={optionstarget.filter(obj => selectedValueTarget.includes(obj.value))} // set selected values
        options={optionstarget} // set list of the data
        onChange={handleChangeTarget} // assign onChange function
        isMulti
        isClearable
      /> 
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group  as={Col} >
    <Form.Label>Specialité</Form.Label>     
        <Select
        className="reactSelectspeciality"
        placeholder="Select speciality"
        //value={selectedValueSpeciality} // set selected values
        //value={optionsspeciality.filter(obj => selectedValueSpeciality.includes(obj.value))} // set selected values
        value={optionsspeciality.filter(obj => obj.value === selectedValueSpeciality)}
        options={optionsspeciality} // set list of the data
        onChange={handleChangeSpeciality} // assign onChange function

        isClearable
      /> 
  </Form.Group>

  <Form.Group  as={Col} controlId="FormcontactAgent" >   
    <Form.Label>Agent</Form.Label>     
        <Select
        className="reactSelectagent"
        placeholder="Select agent"
        value={optionsagent.filter(obj => selectedValueAgent.includes(obj.value))} // set selected values
        options={optionsagent} // set list of the data
        onChange={handleChangeAgent} // assign onChange function
        isOptionDisabled={(option) => option.isDisabled === 'true'}
        isMulti
        isClearable
      /> 
  </Form.Group>
 
  <Form.Group  as={Col} controlId="FormcontactMissions" >     
    <Form.Label>Contact</Form.Label>     
        <Select
        className="reactSelectcontact"
        placeholder="Select contact"
        value={optionscontact.filter(obj => selectedValueContact.includes(obj.value))} // set selected values
        options={optionscontact} // set list of the data
        onChange={handleChangeContact} // assign onChange function
        isMulti
        isClearable
      /> 
  </Form.Group>
  </Form.Row>




    <Form.Row>
    <Form.Group  controlId="ButtonsubmitMission">
    <div className="col-md-12 text-center">
    <Button variant="primary" type="submit">VALIDE</Button>
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