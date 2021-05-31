import customAxios from './customAxios';
import React,{useState,useEffect,useCallback} from 'react';


export default function GetSpeciality () {

var tokentuse = sessionStorage.getItem("token");
var tokenforapi = "Bearer" + " " + tokentuse

var [GetValue, setGetValue] = useState('');

var loadspecialities = useCallback(() => {customAxios.get('api/specialities',{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setGetValue(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


useEffect(() => {loadspecialities();}, [loadspecialities]);

const listItems =  Object.values(GetValue).map(({ id, type }) =>
  <div className="green" > 
  <li key="{id}">
  <h3>specialite {id} : &#128313; {type} &#128313; </h3>
  </li>
  </div>

);

return (
<ul>{listItems}</ul>
 );   

}

