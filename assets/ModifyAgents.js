import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useCallback,useEffect} from 'react';
import customAxios from './customAxios';
import Select from 'react-select';
import Countries from './Countries';

export default function ModifyAgents () {

var tokentuse = sessionStorage.getItem("token");
var tokenforapi = "Bearer" + " " + tokentuse   

var [agents, setValueagents] = useState([]);

var [Valueid, getValueid] = useState([]);
var [Valuename, getValuename] = useState([]);
var [Valuesurname, getValuesurname] = useState([]);

var [Valuenationality, getValuenationality] = useState([]);
var [Valuebirthdate, getValuebirthdate] = useState([]);
var [Valuecodename, getValuecodename] = useState([]);
var [Valuespeciality, getValuespeciality] = useState([]);

var listItems =[];


var [dataagents, setagents] = useState([]);
var loadagents = useCallback(() => {customAxios.get("api/agents",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setValueagents(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


var loadspeciality = useCallback(() => {customAxios.get("api/specialities",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setValue(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


useEffect(() => {loadagents();loadspeciality();}, [loadagents,loadspeciality]);


var [nameAgent, setnameAgent] = useState (Valuename);
var [surname, setsurname] = useState (Valuesurname);
var [birthdate, setbirthdate] = useState (Valuebirthdate.toLocaleDateString);
var [codename, setcodename] = useState (Valuecodename);
var [nationality, setnationality] = useState ('');
var [dataspeciality, setspeciality] = useState([]);

var [selectedValueagents, setSelectedValueagents] = useState([]);

var [spec, setValue] = useState([]);

var optionsspeciality = Object.values(spec).map(({ id, type }) => ({ label: type, value: id }))

var optionsagents = Object.values(agents).map(({ id, codename }) => ({ label: codename, value: id }))

var [selectedValueSpeciality, setSelectedValueSpeciality] = useState([]);

var handleChangeagents  = (e) => {
setSelectedValueagents(e);
console.log(selectedValueagents);
console.log("selectedValueagents.id",selectedValueagents.id);
console.log("e.value",e.value);
var id = e.value;

customAxios.get('api/agents/' + id,{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  
     .then((response) => {
      getValueid(response.data.id);
      getValuename(response.data.name);
      setnameAgent(response.data.name);
      getValuesurname(response.data.surname);
      setsurname(response.data.surname);

      getValuebirthdate(response.data.birthdate); 

      var now = new Date(response.data.birthdate);

      var dateString = now.toISOString().slice(0, 10)

      setbirthdate(dateString);    

      getValuecodename(response.data.codename);
      setcodename(response.data.codename);

      getValuenationality(response.data.nationality);
      setnationality(response.data.nationality);
      getValuespeciality(response.data.speciality);

      const apipath = "/api/specialities/";
      const p = [];
      var t = [];
      console.log("longueur",response.data.speciality.length);
      for (let j = 0; j < (response.data.speciality.length) ; j++) {
        console.log("response.data.speciality[j]",response.data.speciality[j]);
        p.push(parseInt(response.data.speciality[j].replace(apipath, '')));
      };
      setSelectedValueSpeciality(p);
     })


}

var handleChangenameAgent = (e) => {
  setnameAgent(e.target.value);
  //console.log(nameAgent); 

}

var  handleChangesurname = (e) => {
  setsurname(e.target.value);
  //console.log(surname);
}

var  handleChangebirthdate = (e) => {
  setbirthdate(e.target.value);
  //console.log(birthdate);
}

var  handleChangecodename = (e) => {
  //setcodename(e.target.value);
  console.log(codename);
}

var  handleChangenationality = (e) => {
  //setnationality(e.target.value);
  console.log(nationality);
}


function handleChangeSpeciality (e){
  //setSelectedValueSpeciality(Array.isArray(e) ? e.map(x => x.value) : []);
}

const handleSubmit = (e) => {

  // console.log("nameAgent",nameAgent);
  // console.log("surname",surname);
  // console.log("birthdate",birthdate);
  // console.log("codename",codename);
  // console.log("nationality",nationality);
  setspeciality([]);
  var speclist = [];
  for (let i = 0; i < (selectedValueSpeciality.length) ; i++) {
    console.log("selectedValueSpeciality",selectedValueSpeciality[i]);
    speclist.push("/api/specialities/" + selectedValueSpeciality[i]);
    console.log("speclist",speclist);
    }

  var id = selectedValueagents.value;

  e.preventDefault();

customAxios.put('api/agents/' + id , {name : nameAgent,surname:surname, birthdate:birthdate,codename:parseInt(codename),nationality:nationality,speciality : speclist},{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
.then(res => {console.log(res)})
.catch(error => console.log(error));

      getValueid("");
      getValuename("");
      setnameAgent("");
      getValuesurname("");
      setsurname("");
      getValuebirthdate("");
      setbirthdate("");
      getValuecodename("");
      setcodename("");
      getValuenationality("");
      setnationality("");
      getValuespeciality("");
      setSelectedValueSpeciality("");
      loadagents();
}

var resetallValue = () => {
      
      getValueid("");
      getValuename("");
      setnameAgent("");
      getValuesurname("");
      setsurname("");
      getValuebirthdate("");
      setbirthdate("");
      getValuecodename("");
      setcodename("");
      getValuenationality("");
      setnationality("");
      getValuespeciality("");
      setSelectedValueSpeciality("");
      loadagents();
}

return (

<Form >
  <Form.Row style={{backgroundColor: '#f1f1f1'}}>
    <Form.Group as={Col} lg="3">
    <Form.Label>Choisir l'agent à Modifier</Form.Label>     
        <Select
        className="reactSelectcontact"
        placeholder="Select agents"
        value={selectedValueagents} // set selected values
        options={optionsagents} // set list of the data
        onChange={handleChangeagents} // assign onChange function
        isClearable
      /> 
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group  as={Col} lg="4" controlId="Formfirstnameagents">
    <Form.Label>Nom</Form.Label>
    <Form.Control type="text" name="nameAgent" placeholder={Valuename} value={nameAgent} onChange={handleChangenameAgent}/>
  </Form.Group>
  <Form.Group  as={Col} lg="4" controlId="Formlastnameagents">
    <Form.Label>Prenom</Form.Label>
    <Form.Control type="text" name="surname" placeholder={Valuesurname}  value={surname} onChange={handleChangesurname}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} lg="3" controlId="Formbirthdateagents">
    <Form.Label>Date de naissance</Form.Label>
    <Form.Control type="date" name="birthdate" value={birthdate} onChange={handleChangebirthdate}/>
  </Form.Group>
  <Form.Group as={Col} lg="3" controlId="Formnationalityagents">
  <Countries label="nationality" name="nationality" controlId="Formnationalitystashs"  value={nationality} onChange={handleChangenationality}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} lg="3" controlId="Formcodeagentagents">
  <Form.Label>Un Numéro de code</Form.Label>
    <Form.Control type="number" name="codename" placeholder={Valuecodename}  value={codename} onChange={handleChangecodename}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col} lg="8" controlId="Formspecialityagents" >     
    <Form.Label>Specialité</Form.Label>     
        <Select
        className="reactSelectspeciality"
        placeholder="Select speciality"
        //defaultValue={optionsspeciality[0]}
        value={optionsspeciality.filter(obj => selectedValueSpeciality.includes(obj.value))} // set selected values
        //value={selectedValueSpeciality}
        
        //value={selectedValueSpeciality}
        options={optionsspeciality} // set list of the data
        onChange={handleChangeSpeciality} // assign onChange function
        isMulti
        isClearable
        
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
