import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useCallback,useEffect} from 'react';
import customAxios from './customAxios';
import Select from 'react-select';


export default function DeleteStashs () {

var tokentuse = sessionStorage.getItem("token");
var tokenforapi = "Bearer" + " " + tokentuse


var [stashs, setValuestashs] = useState([]);

var loadstashs = useCallback(() => {customAxios.get("api/stashs",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setValuestashs(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

useEffect(() => {loadstashs();}, [loadstashs]);

var [selectedValuestashs, setSelectedValuestashs] = useState([]);

var optionsstashs = Object.values(stashs).map(({ id, codename, missions }) => ({ label: codename, value: id , missions: missions}))

var handleChangestashs  = (e) => {
setSelectedValuestashs(e);
console.log(selectedValuestashs);
console.log("selectedValuestashs.id",selectedValuestashs.id);
console.log("e.value",e.value);

}

var resetallValue = () => {
    setSelectedValuestashs('');
    console.log(selectedValuestashs); 
}

const handleSubmit = (e) => {
  console.log("e.value",e.value);
  console.log("e.value",selectedValuestashs.value);
  var id = selectedValuestashs.value;
  console.log("selectedValuestashs",selectedValuestashs);
  console.log("e.id",id);
  e.preventDefault()
  if ( selectedValuestashs.missions.length == 0 ) {
  customAxios.delete('api/stashs/' + id,{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
     resetallValue();
     loadstashs();
  }
  else {
    alert("Impossible de supprimer une planque associé à une mission");
  
  }
}

return (

<Form onSubmit={handleSubmit}>
  <Form.Group as={Col} lg="4">
    <Form.Label>Choisir une planque à supprimer</Form.Label>     
      <Select
      className="reactSelectstashsy"
      placeholder="Select stashs"
      value={selectedValuestashs} // set selected values
      options={optionsstashs} // set list of the data
      onChange={handleChangestashs} // assign onChange function
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
