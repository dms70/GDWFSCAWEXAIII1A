import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useEffect} from 'react';
import Countries from './Countries';
import customAxios from './customAxios';
import makeAnimated from 'react-select/animated';

export default function NewStashs () {

const [codename, setcodename] = useState (0);
const [adress, setadress] = useState ('');
const [nationality, setnationality] = useState ('');
const [type, settype] = useState ('');

const handleChangecodename = (e) => {
  setcodename(e.target.value);
}

const handleChangeadress = (e) => {
  setadress(e.target.value);
}

const handleChangenationality = (e) => {
  setnationality(e.target.value);
}

const handleChangetype = (e) => {
  settype(e.target.value);
}

const resetallValue = () => {
  setcodename('');
  setadress('');
  setnationality('');
  settype('');
}


const handleSubmitType = (e) => {
  e.preventDefault();

  customAxios.post('/api/stashs', {
     codename:parseInt(codename),
     adress : adress,     
     country:nationality,
     type:type})
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
     resetallValue();  
}

return (
<Form onSubmit={handleSubmitType}>
  <Form.Row>
    <Form.Group as={Col}  lg="3" controlId="Formfirstnametype">
      <Form.Label>Code de la planque</Form.Label>
      <Form.Control type="number" name="codename" placeholder="please enter a code name"  value={codename} onChange={handleChangecodename}/>
    </Form.Group>
    <Form.Group as={Col}  lg="3" controlId="Formfirstnametype">
      <Form.Label>Type de planque</Form.Label>
      <Form.Control type="text" name="type" placeholder="please enter the type" value={type} onChange={handleChangetype}/>
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col}  lg="6" controlId="Formfirstnametype">
      <Form.Label>L'adresse de la planque</Form.Label>
      <Form.Control type="text" name="adress" placeholder="please enter the stash adress"  value={adress} onChange={handleChangeadress}/>
    </Form.Group>

  </Form.Row>
  <Form.Row>
  <Form.Group as={Col}  lg="3" controlId="Formcountriesstahs">
    <Countries label="Pays" name="nationality" controlId="Formfirstnametype" value={nationality} onChange={handleChangenationality}/>
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

