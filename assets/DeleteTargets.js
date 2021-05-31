import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useCallback,useEffect} from 'react';
import customAxios from './customAxios';
import Select from 'react-select';

export default function DeleteTargets () {

var tokentuse = sessionStorage.getItem("token");
var tokenforapi = "Bearer" + " " + tokentuse


var [targets, setValuetargets] = useState([]);

var loadtargets = useCallback(() => {customAxios.get("api/targets",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setValuetargets(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


useEffect(() => {loadtargets();}, [loadtargets]);

var [selectedValuetargets, setSelectedValuetargets] = useState([]);

var optionstargets = Object.values(targets).map(({ id, codename , missions}) => ({ label: codename, value: id , missions:missions}))

var handleChangetargets  = (e) => {
setSelectedValuetargets(e);
//console.log("e.missions",e.missions);
//console.log("selectedValuetargets.id",selectedValuetargets.id);
}

var resetallValue = () => {
    setSelectedValuetargets('');
    console.log(selectedValuetargets); 
}

const handleSubmit = (e) => {
  //console.log("e.value",e.value);
  //console.log("e.label",e.label);
  console.log("selectedValuetargets.value",selectedValuetargets.value);
  console.log("selectedValuetargets.missions",selectedValuetargets.missions);
  //console.log("e.missions",e.missions);
  var id = selectedValuetargets.value;
  //console.log("e.id",id);
  event.preventDefault()
  if ( selectedValuetargets.missions.length == 0 ) {
  customAxios.delete('api/targets/' + id,{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
    
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
     resetallValue();
     loadtargets();   
  } else {
    alert("Impossible de supprimer une cible associé à une mission");
  
  }
}

return (

<Form onSubmit={handleSubmit}>

  <Form.Group as={Col} lg="4">
    <Form.Label>Choisir le contact à supprimer</Form.Label>     
        <Select
        className="reactSelectcontact"
        placeholder="Select targets"
        value={selectedValuetargets} // set selected values
        options={optionstargets} // set list of the data
        onChange={handleChangetargets} // assign onChange function
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
