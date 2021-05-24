import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useEffect} from 'react';
import Countries from './Countries';
import customAxios from './customAxios';
import makeAnimated from 'react-select/animated';

export default function NewContacts () {

const animatedComponents = makeAnimated();

const [nameContact, setnameContact] = useState ('');
const [surname, setsurname] = useState ('');
const [birthdate, setbirthdate] = useState ('');
const [codename, setcodename] = useState ('');
const [nationality, setnationality] = useState ('');


const handleChangespec = (event) => {
  console.log(event.target.value);
}


const handleChangenameContact = (e) => {
  setnameContact(e.target.value);
  console.log(nameContact); 

}

const handleChangesurname = (e) => {
  setsurname(e.target.value);
  console.log(surname);
}

const handleChangebirthdate = (e) => {
  setbirthdate(e.target.value);
  console.log(birthdate);
}

const handleChangecodename = (e) => {
  setcodename(e.target.value);
  console.log(codename);
}

const handleChangenationality = (e) => {
  setnationality(e.target.value);
  console.log(nationality);
}

const resetallValue = () => {
  setnameContact ('');
  setsurname('');
  setbirthdate('');
  setcodename(0);
  setnationality('');
}


const handleSubmitContact = (e) => {
  e.preventDefault();

  customAxios.post('api/contacts', {
     name : nameContact,
     surname:surname, 
     birthdate:birthdate,
     codename:codename,
     nationality:nationality})
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
    resetallValue();
}


return (
<Form onSubmit={handleSubmitContact}>
        
      <Form.Row>
        <Form.Group  as={Col}  lg="4" controlId="FormfirstnameContact">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" name="nameContact" placeholder="please enter your first name"  value={nameContact} onChange={handleChangenameContact}/>
        </Form.Group>
        <Form.Group  as={Col}  lg="4" controlId="FormfirstnameContact">
          <Form.Label>Prénom</Form.Label>
          <Form.Control type="text" name="surname" placeholder="please enter your last name"  value={surname} onChange={handleChangesurname}/>
        </Form.Group>
      </Form.Row>

      <Form.Row>
      <Form.Group  as={Col}  lg="3" controlId="FormfirstnameContact">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control type="date" name="birthdate" placeholder="please enter your birth date" value={birthdate} onChange={handleChangebirthdate}/>
      </Form.Group>
      
      <Form.Group  as={Col}  lg="3" controlId="FormfirstnameContact">
        <Countries label="nationality" name="nationality" controlId="Formnationalitystashs" value={nationality} onChange={handleChangenationality}/>
      </Form.Group>
      </Form.Row>

      <Form.Row>
      <Form.Group  as={Col}  lg="3" controlId="FormfirstnameContact">
        <Form.Label>Nom de code</Form.Label>
        <Form.Control type="text" name="codename" placeholder="please enter a code name"  value={codename} onChange={handleChangecodename}/>
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

