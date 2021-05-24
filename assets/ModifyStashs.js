import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useCallback,useEffect} from 'react';
import customAxios from './customAxios';
import Select from 'react-select';
import Countries from './Countries';

export default function ModifyStashs () {

var [stashs, setValuestashs] = useState([]);

var [Valueadress, getValueadress] = useState([]);
var [Valuetype, getValuetype] = useState([]);
var [Valueid, getValueid] = useState([]);
var [Valuenationality, getValuenationality] = useState([]);
var [Valuecodename, getValuecodename] = useState([]);

var listItems =[];

var [datastashs, setstashs] = useState([]);
var loadstashs = useCallback(() => {customAxios.get("api/stashs")
  .then(function (response) {setValuestashs(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

useEffect(() => {loadstashs();}, [loadstashs]);

const [codename, setcodename] = useState (0);
const [adress, setadress] = useState ('');
const [nationality, setnationality] = useState ('');
const [type, settype] = useState ('');


var [selectedValuestashs, setSelectedValuestashs] = useState([]);

var [spec, setValue] = useState([]);

var optionsstashs = Object.values(stashs).map(({ id, codename }) => ({ label: codename, value: id }))

var handleChangestashs  = (e) => {
setSelectedValuestashs(e);
var id = e.value;

customAxios.get('api/stashs/' + id )
  
     .then((response) => {
      getValueid(response.data.id);
      getValueadress(response.data.adress);
      setadress(response.data.adress);
      getValuetype(response.data.type);
      settype(response.data.type);
      getValuecodename(response.data.codename);
      setcodename(response.data.codename);
      getValuenationality(response.data.country);
      setnationality(response.data.country);
      // console.log(response.data.id);
      // console.log(response.data);
      // console.log(response.data.name);
      // console.log(response.status);
      // console.log(response.data.nationality);
     
     })

}

var handleChangetype = (e) => {
  settype(e.target.value);
}

var  handleChangeadress = (e) => {
  setadress(e.target.value);
}

var  handleChangecodename = (e) => {
  setcodename(e.target.value);
}

var  handleChangenationality = (e) => {
  setnationality(e.target.value);
}

const handleSubmit = (e) => {

  // console.log("type",type);
  // console.log("adress",adress);
  // console.log("codename",codename);
  // console.log("country",nationality);

  var id = selectedValuestashs.value;

  e.preventDefault();

  customAxios.put('api/stashs/' + id , {
    type : type,
    adress:adress, 
    codename:parseInt(codename),
    country:nationality})
    .then(res => {console.log(res)})
    .catch(error => console.log(error));
}


var resetallValue = () => {

  // console.log("type",type);
  // console.log("adress",adress);
  // console.log("codename",codename);
  // console.log("nationality",nationality);


}

return (

<Form >
  
<Form.Row style={{backgroundColor: '#f1f1f1'}}>
  <Form.Group as={Col} lg="3" >
    <Form.Label>Choisir la planque à Modifier</Form.Label>     
        <Select
        className="reactSelectstashs"
        placeholder="Select stashs"
        value={selectedValuestashs} // set selected values
        options={optionsstashs} // set list of the data
        onChange={handleChangestashs} // assign onChange function
        isClearable
      /> 
  </Form.Group>
</Form.Row>

    <Form.Group as={Col}  lg="3" controlId="Formcodecontactstashs">
      <Form.Label>Code pour la planque</Form.Label>
      <Form.Control type="number" name="codename" placeholder={Valuecodename}  value={codename} onChange={handleChangecodename}/>
    </Form.Group>

    <Form.Group as={Col}  lg="6" controlId="Formfirstnamestashs">
        <Form.Label>L'adresse de la planque</Form.Label>
        <Form.Control type="text" name="adress" placeholder={Valueadress} value={adress} onChange={handleChangeadress}/>
    </Form.Group>

    <Form.Group as={Col} lg="3" controlId="Formfirstnamestashs">
    <Countries label="Pays" name="nationality" controlId="Formnationalitystashs"  value={nationality} onChange={handleChangenationality}/>   
    </Form.Group>

    <Form.Group  as={Col} lg="3" controlId="Formlastnamestashs">
        <Form.Label>Type de la planque</Form.Label>
        <Form.Control type="text" name="type" placeholder={Valuetype}  value={type} onChange={handleChangetype}/>
    </Form.Group>   
   
    <Form.Row>
    <Form.Group  controlId="ButtonsubmitMission">
    <div className="col-md-12 text-center">
    <Button onClick={handleSubmit}>VALIDATION</Button> 
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
