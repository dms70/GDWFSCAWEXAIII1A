import React,{useState,useEffect,useCallback} from 'react';
import customAxios from './customAxios';

export default function GetTargets () {

var [GetValue, setGetValue] = useState('');

var loadapi = useCallback(() => {customAxios.get("api/targets")
  .then(function (response) {setGetValue(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

useEffect(() => {loadapi();}, [loadapi]);

const listItems =  Object.values(GetValue).map(({ id, codename , name, surname, birthdate , nationality }) =>
<div className="green">
<li key={id}>
<h3>Cible {id} : codename = {codename} &#128313; Nom = {name} &#128313; Prénom = {surname} &#128313; Nationalité = {nationality}</h3>
</li>
</div>
);

return (
<ul>{listItems}</ul>
 );   

}

