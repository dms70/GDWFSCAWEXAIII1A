import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useCallback,useEffect} from 'react';
import customAxios from './customAxios';
import Select from 'react-select';

export default function DeleteAgents () {

var [agents, setValueagents] = useState([]);

var loadagents = useCallback(() => {customAxios.get("api/agents")
  .then(function (response) {setValueagents(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

useEffect(() => {loadagents();}, [loadagents]);

var [selectedValueagents, setSelectedValueagents] = useState([]);

var optionsagents = Object.values(agents).map(({ id, codename, missions }) => ({ label: codename, value: id , missions: missions}))

var handleChangeagents  = (e) => {setSelectedValueagents(e);}

var resetallValue = () => {
    setSelectedValueagents('');
    console.log(selectedValueagents); 
}

const handleSubmit = (e) => {
  var id = selectedValueagents.value;
  e.preventDefault()
  if ( typeof selectedValueagents.missions == "undefined" ) {
  customAxios.delete('api/agents/' + id)
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
     resetallValue();
     loadagents();    
  } else {
    alert("Impossible de supprimer un agent associé à une mission");  
  }
}

return (

<Form onSubmit={handleSubmit}>
  <Form.Group as={Col} lg="4">
    <Form.Label>Choisir le contact à supprimer</Form.Label>     
        <Select
        className="reactSelectcontact"
        placeholder="Select agents"
        value={selectedValueagents} // set selected values
        options={optionsagents} // set list of the data
        onChange={handleChangeagents} // assign onChange function
        isClearable
      /> 
  </Form.Group>

  <Form.Row>
    <Form.Group  controlId="ButtonsubmitMission">
    <div className="col-md-12 text-center">
    <Button type = "submit" >SUPPRESION</Button>
    </div>
    </Form.Group>
  </Form.Row>

</Form>       

 );       
}
