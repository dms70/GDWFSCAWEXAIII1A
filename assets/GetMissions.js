import React,{useState,useEffect,useCallback} from 'react';
import customAxios from './customAxios';
import './GetMission.css';
import { useHistory } from "react-router-dom";

export default function GetMissions () {

var tokentuse = sessionStorage.getItem("token");
var tokenforapi = "Bearer" + " " + tokentuse

var [GetValue, setGetValue] = useState('');

var loadapi = useCallback(() => {customAxios.get("api/missions",{headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}})
  .then(function (response) {setGetValue(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

useEffect(() => {loadapi();}, [loadapi]);

let history = useHistory();

function handleClick(id) {
    history.push({pathname: "/DetailMissions", state: {  id:id}});
    console.log("id",id);
}

const isRed = "Terminé"

//GetValue.filter(status => status ='Terminé')
const listItemsGreen =  (Object.values(GetValue)).filter(statut => statut.status == "En preparation").map(({ id, codename , title, status, country }) =>
(

  <div className="green">
  <li key={id}>
  <span>Mission {id} : Codename = {codename} &#128313; Titre = {title} &#128313; Statut = {status}&#128313; Pays = {country}</span>
  <button 
  type="button"
  id={id}
  onClick={() => handleClick(id)}
  >
  Détails
  </button>
  </li>
  </div>

)
);

const listItemsBlue =  (Object.values(GetValue)).filter(statut => statut.status == "Terminé").map(({ id, codename , title, status, country }) =>
(

  <div className="blue">
  <li key={id}>
  <span>Mission {id} : Codename = {codename} &#128313; Titre = {title} &#128313; Statut = {status} &#128313; Pays = {country}</span>
  <button 
  type="button"
  id={id}
  onClick={() => handleClick(id)}
  >
  Détails
  </button>
  </li>
  </div>

)
);

const listItemsRed =  (Object.values(GetValue)).filter(statut => statut.status == "Echec").map(({ id, codename , title, status, country }) =>
(

  <div className="red">
  <li key={id}>
  <span>Mission {id} : Codename = {codename} &#128313;3 Titre = {title} &#128313; Statut = {status} &#128313; Pays = {country}</span>
  <button 
  type="button"
  id={id}
  onClick={() => handleClick(id)}
  >
  Détails
  </button>
  </li>
  </div>

)
);


const listItemsYellow =  (Object.values(GetValue)).filter(statut => statut.status == "En cours").map(({ id, codename , title, status, country }) =>
(

  <div className="yellow">
  <li key={id}>
  <span>Mission {id} : Codename = {codename} &#128313;3 Titre = {title} &#128313; Statut = {status} &#128313; Pays = {country}</span>
  <button 
  type="button"
  id={id}
  onClick={() => handleClick(id)}
  >
  Détails
  </button>
  </li>
  </div>

)
);

console.log("GetValue",GetValue);

return (
<ul>{listItemsYellow}{listItemsGreen}{listItemsBlue}{listItemsRed}</ul>
);   

}
