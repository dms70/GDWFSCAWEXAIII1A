import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import React,{useState,useEffect,useCallback} from 'react';
import Countries from './Countries';
import customAxios from './customAxios';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

export default function NewAgents () {

const animatedComponents = makeAnimated();

const [nameAgent, setnameAgent] = useState ('');
const [surname, setsurname] = useState ('');
const [birthdate, setbirthdate] = useState ('');
const [codename, setcodename] = useState (0);
const [nationality, setnationality] = useState ('');
const [dataspeciality, setspeciality] = useState([]);
const [values, setReactSelect] = useState({selectedOption: []});

const [spec, setValue] = useState([]);

const handleChangespec = (event) => {
  console.log(event.target.value);
}

var loadspeciality = useCallback(() => {customAxios.get("api/specialities")
  .then(function (response) {setValue(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

useEffect(() => {

loadspeciality();

}, [loadspeciality]);

var optionsspeciality = Object.values(spec).map(({ id, type }) => ({ label: type, value: id }))

const handleMultiChange  = (selectedOption) => {
setValue('reactSelect', selectedOption);
setReactSelect({ selectedOption });
setspeciality(dataspeciality => [...dataspeciality, "/api/specialities/" + selectedOption[dataspeciality.length].value]);
}

const handleChangenameAgent = (e) => {
  setnameAgent(e.target.value);
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

var [selectedValueSpeciality, setSelectedValueSpeciality] = useState([]);

function handleChangeSpeciality (e){ 
  setSelectedValueSpeciality(Array.isArray(e) ? e.map(x => x.value) : []);
}


const resetallValue = () => {

  var choiceidspeciality = [];
  for (let j = 0; j < (selectedValueSpeciality.length) ; j++) {
  choiceidspeciality.push("/api/specialities/" + selectedValueSpeciality[j]);
  }
  setnameAgent ('');
  setsurname('');
  setbirthdate('');
  setcodename(0);
  setnationality('');
  setspeciality([]);
  setSelectedValueSpeciality([]);


}

const handleSubmitAgent = (e) => {
  e.preventDefault();

  var choiceidspeciality = [];
  for (let j = 0; j < (selectedValueSpeciality.length) ; j++) {
  choiceidspeciality.push("/api/specialities/" + selectedValueSpeciality[j]);
  }

  customAxios.post('api/agents', {
     name : nameAgent,
     surname:surname, 
     birthdate:birthdate,
     codename:parseInt(codename),
     nationality:nationality,
     speciality : choiceidspeciality})
     .then(res => {console.log(res)})
     .catch(error => console.log(error));


  resetallValue();
}



return (
<Form onSubmit={handleSubmitAgent}>
        
<Form.Row>
  <Form.Group  as={Col}  lg="4" controlId="FormnameAgent">
    <Form.Label>Nom</Form.Label>
      <Form.Control type="text" name="nameAgent" placeholder="please enter your first name"  value={nameAgent} onChange={handleChangenameAgent}/>
  </Form.Group>
  <Form.Group as={Col}  lg="4" controlId="FormsurnameAgent">
      <Form.Label>Prénom</Form.Label>
      <Form.Control type="text" name="surname" placeholder="please enter your last name"  value={surname} onChange={handleChangesurname}/>
  </Form.Group>
</Form.Row>  
<Form.Row>
  <Form.Group as={Col}  lg="3" controlId="FormbirthdateAgent">
    <Form.Label>date de naissance</Form.Label>
    <Form.Control type="date" name="birthdate" placeholder="please enter your birth date" value={birthdate} onChange={handleChangebirthdate}/>
  </Form.Group>
  <Form.Group as={Col}  lg="3" controlId="FormnationalityAgent">
    <Countries label="nationality" name="nationality" controlId="Formnationalitystashs"   value={nationality} onChange={handleChangenationality}/>
  </Form.Group>
</Form.Row>  
      
<Form.Row>      
  <Form.Group as={Col}  lg="3" controlId="FormcodenameAgent">
    <Form.Label>Nom de code</Form.Label>
    <Form.Control type="number" name="codename" placeholder="please enter a code"  value={codename} onChange={handleChangecodename}/>
  </Form.Group>
</Form.Row>        

<Form.Row>  
  <Form.Group as={Col}  lg="8" controlId="FormspecialityAgent" >     
    <Form.Label>Specialité de l'agent</Form.Label>     
        <Select
        className="reactSelectspeciality"
        placeholder="Select speciality"
        defaultValue={selectedValueSpeciality}
        value={optionsspeciality.filter(obj => selectedValueSpeciality.includes(obj.value))} // set selected values
        options={optionsspeciality} // set list of the data
        onChange={handleChangeSpeciality} // assign onChange function
        isMulti
        isClearable
      /> 
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

