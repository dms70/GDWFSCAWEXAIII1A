import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useCallback,useEffect} from 'react';
import Select from 'react-select';
import customAxios from './customAxios';

export default function DeleteSpeciality () {

 var tokentuse = sessionStorage.getItem("token");
var tokenforapi = "Bearer" + " " + tokentuse 

var [speciality, setValuespeciality] = useState([]);
var [selectedValueSpeciality, setSelectedValueSpeciality] = useState([]);
var optionsspeciality = Object.values(speciality).map(({ id, type, agents }) => ({ label: type, value: id , agents : agents}))

var loadspeciality = useCallback(() => {customAxios.get("api/specialities",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setValuespeciality(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

useEffect(() => {loadspeciality();}, [loadspeciality]);

var handleChangespeciality  = (e) => {
setSelectedValueSpeciality(e);
/*console.log(selectedValueSpeciality);
console.log("selectedValueSpeciality.id",selectedValueSpeciality.id);
console.log("e.value",e.value);*/
}

var resetallValue = () => {
    setSelectedValueSpeciality('');
}

const handleSubmit = (e) => {
  //console.log("vide",selectedValueSpeciality.agents.length);
  //console.log("e.value",e.value);
  //console.log("e.value",selectedValueSpeciality.value);
  var id = selectedValueSpeciality.value;
  //console.log("e.id",id);
  //console.log("selectedValueSpeciality",selectedValueSpeciality);
  event.preventDefault()
  if ( selectedValueSpeciality.agents.length == 0 ) {
    
  customAxios.delete('/api/specialities/' + id,{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
     resetallValue();
     loadspeciality();
     //alert("Suppression de la specialité")
  } else {
    alert("Impossible de supprimer une spécilialité associé à un agent");  
  }
}

return (

<Form onSubmit={handleSubmit}>
  <Form.Group as={Col} lg="4">
    <Form.Label>Choisir une specialité à supprimer</Form.Label>     
        <Select
        className="reactSelectspeciality"
        placeholder="Select speciality"
        value={selectedValueSpeciality} // set selected values
        options={optionsspeciality} // set list of the data
        onChange={handleChangespeciality} // assign onChange function
        isClearable
      /> 
</Form.Group>


<Form.Row>
    <Form.Group  controlId="ButtonsubmitMission">
    <div className="col-md-12 text-center"><Button type = "submit" >SUPPRESION</Button></div>
    </Form.Group>
</Form.Row>

</Form>       

 );       
}

