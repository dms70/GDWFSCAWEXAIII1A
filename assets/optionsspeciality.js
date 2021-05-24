import {useState,useCallback,useEffect} from 'react';
import customAxios from './customAxios';

var [speciality, getValue] = useState([]);

var loadspeciality = useCallback(() => {customAxios.get("api/specialities")
  .then(function (response) {getValue(response.data['hydra:member'])})
  .catch(error => console.log(error));
},[]);

loadspeciality();

export var optionsspeciality = Object.values(speciality).map(({ id, type }) => ({ label: type, value: id }))


