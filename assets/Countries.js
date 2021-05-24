import "./country.json";
import Form from "react-bootstrap/Form";
import React,{useState,useEffect} from 'react';

export default function Countries ({label,controlId,value,name,onChange}) {

const [country,setData]=useState([]);

const getData=()=>{
    fetch('./country.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }

  useEffect(()=>{getData()},[]);

return (
    <Form.Group controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <Form.Control as="select" custom  value={value} name={name} onChange={onChange}  >
    {country.map(option => 
                    <option key={option.code} value={option.name} >                                   
                    {option.name}
                    </option>)
                   }
    </Form.Control>
    </Form.Group>   
    )
};













