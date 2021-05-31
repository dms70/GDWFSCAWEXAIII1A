import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useCallback,useEffect} from 'react';
import customAxios from './customAxios';
import Select from 'react-select';

export default function DeleteMissions () {

var tokentuse = sessionStorage.getItem("token");
var tokenforapi = "Bearer" + " " + tokentuse

var [missions, setValuemissions] = useState([]);
var [selectedValuemissions, setSelectedValuemissions] = useState([]);

var loadmissions = useCallback(() => {customAxios.get("api/missions",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setValuemissions(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


useEffect(() => {loadmissions();}, [loadmissions]);

var optionsmissions = Object.values(missions).map(({ id, codename }) => ({ label: codename, value: id }))

var handleChangemissions  = (e) => {
setSelectedValuemissions(e);
console.log(selectedValuemissions);
console.log("selectedValuemissions.id",selectedValuemissions.id);
console.log("e.value",e.value);

}

var resetallValue = () => {
    setSelectedValuemissions('');
    console.log(selectedValuemissions); 
}

const handleSubmit = (e) => {
  console.log("e.value",e.value);
  console.log("e.value",selectedValuemissions.value);
  var id = selectedValuemissions.value;
  console.log("e.id",id);
  e.preventDefault()
  customAxios.delete('api/missions/' + id)
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
     resetallValue();
     loadmissions();
}

return (

<Form onSubmit={handleSubmit}>
  <Form.Group as={Col} lg="4">
    <Form.Label>Choisir la mission à supprimer</Form.Label>     
        <Select
        className="reactSelectcontact"
        placeholder="Select missions"
        value={selectedValuemissions} // set selected values
        options={optionsmissions} // set list of the data
        onChange={handleChangemissions} // assign onChange function

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
