import React,{useState,useEffect,useCallback} from 'react';
import customAxios from './customAxios';

export default function GetStashs () {

var [GetValue, setGetValue] = useState('');

var loadapi = useCallback(() => {customAxios.get("api/stashs")
  .then(function (response) {setGetValue(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);


useEffect(() => {loadapi();}, [loadapi]);

const listItems =  Object.values(GetValue).map(({ id, codename , type, country, adress, }) =>
<div className="green">
<li key={id}>
<h3>Planque {id} : Codename = {codename} &#128313; type = {type} &#128313; pays = {country}  &#128313; adresse = {adress}</h3>
</li>
</div>
);

return (
<ul>{listItems}</ul>
 );   

}