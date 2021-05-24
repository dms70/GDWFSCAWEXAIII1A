import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useCallback,useEffect} from 'react';
import customAxios from './customAxios';
import Select from 'react-select';


export default function DeleteContacts () {

var [contacts, setValuecontacts] = useState([]);
var [datacontacts, setcontacts] = useState([]);

var loadcontacts = useCallback(() => {customAxios.get("api/contacts")
  .then(function (response) {setValuecontacts(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


useEffect(() => {loadcontacts();}, [loadcontacts]);

var [selectedValuecontacts, setSelectedValuecontacts] = useState([]);

var optionscontacts = Object.values(contacts).map(({ id, codename, missions }) => ({ label: codename, value: id, missions : missions }))

var handleChangecontacts  = (e) => {
setSelectedValuecontacts(e);
console.log(selectedValuecontacts);
console.log("selectedValuecontacts.id",selectedValuecontacts.id);
console.log("e.value",e.value);

}

var resetallValue = () => {
    setSelectedValuecontacts('');
    //console.log(selectedValuecontacts); 
}

const handleSubmit = (e) => {
  //console.log("e.value",e.value);
  //console.log("e.value",selectedValuecontacts.value);
  var id = selectedValuecontacts.value;
  //console.log("e.id",id);
  e.preventDefault()
  if ( typeof selectedValuecontacts.missions == "undefined" ) {
  customAxios.delete('api/contacts/' + id)
     .then(res => {console.log(res)})
     .catch(error => console.log(error));
     resetallValue();
     loadcontacts();
  } else {
    alert("Impossible de supprimer un contact associé à une mission");
  
  }
}

return (

<Form onSubmit={handleSubmit}>

  <Form.Group as={Col} lg="4">
    <Form.Label>Choisir le contact à supprimer</Form.Label>     
        <Select
        className="reactSelectcontact"
        placeholder="Select contacts"
        value={selectedValuecontacts} // set selected values
        options={optionscontacts} // set list of the data
        onChange={handleChangecontacts} // assign onChange function
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
