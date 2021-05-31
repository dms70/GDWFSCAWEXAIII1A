import React,{useState,useEffect,useCallback} from 'react';
import customAxios from './customAxios';

export default function GetAgents () {

var tokentuse = sessionStorage.getItem("token");
var tokenforapi = "Bearer" + " " + tokentuse

var [GetValue, setGetValue] = useState('');

var loadapi = useCallback(() => {customAxios.get("api/agents",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setGetValue(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

useEffect(() => {loadapi();}, [loadapi]);

const listItems =  Object.values(GetValue).map(({ id, codename , name, surname, nationality}) =>
  <div className="green">
  <li key={id}>
  <h3>Agents {id} : Codename = {codename} &#128313; Name = {name} &#128313; Prénom = {surname} &#128313; Nationalité = {nationality} &#128313;</h3>
  </li>
  </div>
);

return (
<ul>{listItems}</ul>
 );   

}

