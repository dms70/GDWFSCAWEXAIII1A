import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useEffect} from 'react';
import Countries from './Countries';
import customAxios from './customAxios';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

export default function NewTargets () {

const animatedComponents = makeAnimated();

const [nameTarget, setnameTarget] = useState ('');
const [surname, setsurname] = useState ('');
const [birthdate, setbirthdate] = useState ('');
var [codename, setcodename] = useState ('');
const [nationality, setnationality] = useState ('');

const handleChangenameTarget = (e) => {
  setnameTarget(e.target.value);
}

const handleChangesurname = (e) => {
  setsurname(e.target.value);
}

const handleChangebirthdate = (e) => {
  setbirthdate(e.target.value);
}

const handleChangecodename = (e) => {
  setcodename(e.target.value);
}

const handleChangenationality = (e) => {
  setnationality(e.target.value);
}

const resetallValue = () => {
  setnameTarget ('');
  setsurname('');
  setbirthdate('');
  setcodename(0);
  setnationality('');
}

const handleSubmitTarget = (e) => {
  e.preventDefault();

  customAxios.post('api/targets', {
     name : nameTarget,
     surname:surname, 
     birthdate:birthdate,
     codename:codename,
     nationality:nationality})
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
  
  resetallValue();
}

return (
<Form onSubmit={handleSubmitTarget}>

  <Form.Row>
    <Form.Group as={Col}  lg="4" controlId="Formfirstnamestashs">
      <Form.Label>Nom</Form.Label>
      <Form.Control type="text" name="handleSubmitTarget" placeholder="please enter your first name"  value={nameTarget} onChange={handleChangenameTarget}/>
    </Form.Group>
    <Form.Group as={Col}  lg="4" controlId="handleSubmitTarget">
      <Form.Label>Prénom</Form.Label>
        <Form.Control type="text" name="surname" placeholder="please enter your last name"  value={surname} onChange={handleChangesurname}/>
    </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col}  lg="3" controlId="handleSubmitTarget">
      <Form.Label>Date de naissance</Form.Label>
        <Form.Control type="date" name="birthdate" placeholder="please enter your birth date" value={birthdate} onChange={handleChangebirthdate}/>
        </Form.Group>
    <Form.Group as={Col}  lg="3" controlId="handleSubmitTarget">
      <Countries label="nationality" name="nationality" controlId="handleSubmitTarget" value={nationality} onChange={handleChangenationality}/>
    </Form.Group>
  </Form.Row>

  <Form.Row>
  <Form.Group as={Col}  lg="3" controlId="handleSubmitTarget">
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

