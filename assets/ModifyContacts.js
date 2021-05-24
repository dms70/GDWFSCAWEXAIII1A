import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useCallback,useEffect} from 'react';
import customAxios from './customAxios';
import Select from 'react-select';
import Countries from './Countries';
import makeAnimated from 'react-select/animated';



export default function ModifyContacts () {

var [contacts, setValuecontacts] = useState([]);

var [Valuename, getValuename] = useState([]);
var [Valuesurname, getValuesurname] = useState([]);
var [Valueid, getValueid] = useState([]);
var [Valuenationality, getValuenationality] = useState([]);
var [Valuebirthdate, getValuebirthdate] = useState([]);
var [Valuecodename, getValuecodename] = useState([]);
var [Valuespeciality, getValuespeciality] = useState([]);

var listItems =[];


var [datacontacts, setcontacts] = useState([]);
var loadcontacts = useCallback(() => {customAxios.get("api/contacts")
  .then(function (response) {setValuecontacts(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

useEffect(() => {loadcontacts();}, [loadcontacts]);

var [namecontact, setnamecontact] = useState (Valuename);
var [surname, setsurname] = useState (Valuesurname);
var [birthdate, setbirthdate] = useState (Valuebirthdate.toLocaleDateString);
var [codename, setcodename] = useState (Valuecodename);
var [nationality, setnationality] = useState ('');
var [selectedValuecontacts, setSelectedValuecontacts] = useState([]);
var [spec, setValue] = useState([]);

var optionscontacts = Object.values(contacts).map(({ id, codename }) => ({ label: codename, value: id }))

var handleChangecontacts  = (e) => {
setSelectedValuecontacts(e);
console.log(selectedValuecontacts);
console.log("selectedValuecontacts.id",selectedValuecontacts.id);
console.log("e.value",e.value);
var id = e.value;

customAxios.get('api/contacts/' + id )
  
     .then((response) => {
      getValueid(response.data.id);
      getValuename(response.data.name);
      setnamecontact(response.data.name);
      getValuesurname(response.data.surname);
      setsurname(response.data.surname);

      getValuebirthdate(response.data.birthdate); 
      //console.log("birthdate",response.data.birthdate);
      var now = new Date(response.data.birthdate);
      //console.log("now",now);
      var dateString = now.toISOString().slice(0, 10)
      //console.log("dateString",dateString);
      setbirthdate(dateString);    

      getValuecodename(response.data.codename);
      setcodename(response.data.codename);

      getValuenationality(response.data.nationality);
      setnationality(response.data.nationality);
      // console.log(response.data.id);
      // console.log(response.data);
      // console.log(response.data.name);
      // console.log(response.status);
     
     })


}

var handleChangenamecontact = (e) => {
  setnamecontact(e.target.value);
  //console.log(namecontact); 

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
  setcodename(e.target.value);
  //console.log(codename);
}

var  handleChangenationality = (e) => {
  setnationality(e.target.value);
  //console.log(nationality);
}


function handleChangeSpeciality (e){
  setSelectedValueSpeciality(Array.isArray(e) ? e.map(x => x.value) : []);
}

const handleSubmit = (e) => {

  var id = selectedValuecontacts.value;

  event.preventDefault();

  customAxios.put('api/contacts/' + id , {
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
      <Form.Label>Choisir le contact à Modifier</Form.Label>     
        <Select
        className="reactSelectcontact"
        placeholder="Select contacts"
        value={selectedValuecontacts} // set selected values
        options={optionscontacts} // set list of the data
        onChange={handleChangecontacts} // assign onChange function
        isClearable
      /> 
    </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col}  lg="4" controlId="Formfirstnamecontacts">
    <Form.Label>Nom</Form.Label>
    <Form.Control type="text" name="namecontact" placeholder={Valuename} value={namecontact} onChange={handleChangenamecontact}/>
  </Form.Group>
  <Form.Group as={Col}  lg="4" controlId="Formlastnamecontacts">
    <Form.Label>Prenom</Form.Label>
    <Form.Control type="text" name="surname" placeholder={Valuesurname}  value={surname} onChange={handleChangesurname}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col}  lg="3" controlId="Formbirthdatecontacts">
    <Form.Label>Date de naissance</Form.Label>
    <Form.Control type="date" name="birthdate" value={birthdate} onChange={handleChangebirthdate}/>
  </Form.Group>

  <Form.Group as={Col}  lg="3" controlId="Formnationalitycontacts">
  <Countries label="nationality" name="nationality" controlId="Formnationalitycontacts"  value={nationality} onChange={handleChangenationality}/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col}  lg="3" controlId="Formcodecontactcontacts">
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
