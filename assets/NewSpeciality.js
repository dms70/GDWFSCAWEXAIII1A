import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState} from 'react';
import customAxios from './customAxios';


export default function NewSpeciality () {

var tokentuse = sessionStorage.getItem("token");
var tokenforapi = "Bearer" + " " + tokentuse

const [dataToPost, setPostValue] = useState({typem: '',})

var [speciality, setspeciality] = useState ('');

var resetallValue = () => {
    setspeciality('');
  }

const handleChange = (event) => {
  const value = event.target.value;
  setPostValue({
    ...dataToPost,
    [event.target.name]: value,
  }); 
};

var handleChangespeciality = (e) => {
  setspeciality(e.target.value);
}


const handleSubmit = (e) => {
  e.preventDefault()
  const API_URL = process.env.REACT_APP_API_URL;
  console.log(API_URL); 
  customAxios.post('api/specialities', {type:speciality},{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
  resetallValue();   
}

return (
<Form onSubmit={handleSubmit}>

  <Form.Row>
  <Form.Group as={Col}  lg="4" controlId="Formnameofspec">
    <Form.Label>Specialisation</Form.Label>
    <Form.Control type="text" name="type" placeholder="please enter a speciality"  value={speciality}  onChange={handleChangespeciality}/>
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

