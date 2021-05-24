import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useCallback,useEffect} from 'react';
import customAxios from './customAxios';
import Select from 'react-select';
import Countries from './Countries';

export default function ModifyTargets () {

var [targets, setValuetargets] = useState([]);

var [Valuename, getValuename] = useState([]);
var [Valuesurname, getValuesurname] = useState([]);
var [Valueid, getValueid] = useState([]);
var [Valuenationality, getValuenationality] = useState([]);
var [Valuebirthdate, getValuebirthdate] = useState([]);
var [Valuecodename, getValuecodename] = useState([]);
var [Valuespeciality, getValuespeciality] = useState([]);

var listItems =[];

var [datatargets, settargets] = useState([]);
var loadtargets = useCallback(() => {customAxios.get("api/targets")
  .then(function (response) {setValuetargets(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

useEffect(() => {loadtargets();}, [loadtargets]);

var [namecontact, setnamecontact] = useState (Valuename);
var [surname, setsurname] = useState (Valuesurname);
var [birthdate, setbirthdate] = useState (Valuebirthdate.toLocaleDateString);
var [codename, setcodename] = useState (Valuecodename);
var [nationality, setnationality] = useState ('');

var [selectedValuetargets, setSelectedValuetargets] = useState([]);

var [spec, setValue] = useState([]);

var optionstargets = Object.values(targets).map(({ id, codename }) => ({ label: codename, value: id }))


var handleChangetargets  = (e) => {
setSelectedValuetargets(e);
var id = e.value;

customAxios.get('api/targets/' + id )
  
     .then((response) => {
      getValueid(response.data.id);
      getValuename(response.data.name);
      setnamecontact(response.data.name);
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
     
     })

}

var handleChangenamecontact = (e) => {
  setnamecontact(e.target.value);
}

var  handleChangesurname = (e) => {
  setsurname(e.target.value);
}

var  handleChangebirthdate = (e) => {
  setbirthdate(e.target.value);
}

var  handleChangecodename = (e) => {
  setcodename(e.target.value);
}

var  handleChangenationality = (e) => {
  setnationality(e.target.value);
}

const handleSubmit = (e) => {

  // console.log("namecontact",namecontact);
  // console.log("surname",surname);
  // console.log("birthdate",birthdate);
  // console.log("codename",codename);
  // console.log("nationality",nationality);

  var id = selectedValuetargets.value;

  e.preventDefault();

  customAxios.put('api/targets/' + id , {
    name : namecontact,
    surname:surname, 
    birthdate:birthdate,
    codename:codename,
    nationality:nationality})
    .then(res => {console.log(res)})
    .catch(error => console.log(error));
}


var resetallValue = () => {

  // console.log("namecontact",namecontact);
  // console.log("surname",surname);
  // console.log("birthdate",birthdate);
  // console.log("codename",codename);
  // console.log("nationality",nationality);

}


return (

<Form >

  <Form.Row style={{backgroundColor: '#f1f1f1'}}>
    <Form.Group as={Col} lg="3">
    <Form.Label>Choisir la cible à Modifier</Form.Label>     
        <Select
        className="reactSelectcontact"
        placeholder="Select targets"
        value={selectedValuetargets} // set selected values
        options={optionstargets} // set list of the data
        onChange={handleChangetargets} // assign onChange function
        isClearable
      /> 
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col}  lg="4" controlId="Formfirstnametargets">
    <Form.Label>nom de l'contact</Form.Label>
    <Form.Control type="text" name="namecontact" placeholder={Valuename} value={namecontact} onChange={handleChangenamecontact}/>
  </Form.Group>
  <Form.Group as={Col}  lg="4" controlId="Formlastnametargets">
    <Form.Label>prenom de l'contact</Form.Label>
    <Form.Control type="text" name="surname" placeholder={Valuesurname}  value={surname} onChange={handleChangesurname}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col}  lg="3" controlId="Formbirthdatetargets">
    <Form.Label>date de naissance</Form.Label>
    <Form.Control type="date" name="birthdate" value={birthdate} onChange={handleChangebirthdate}/>
  </Form.Group>
  <Form.Group as={Col}  lg="3" controlId="Formnationalitytargets">
  <Countries label="nationality" name="nationality" controlId="Formnationalitystashs"  value={nationality} onChange={handleChangenationality}/>
  </Form.Group>
  </Form.Row>
  
  <Form.Row>
  <Form.Group as={Col}  lg="4" controlId="Formcodecontacttargets">
  <Form.Label>Nom de code</Form.Label>
    <Form.Control type="text" name="codename" placeholder={Valuecodename}  value={codename} onChange={handleChangecodename}/>
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
