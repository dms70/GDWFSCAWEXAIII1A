import axios from 'axios';

  var tokentuse = localStorage.getItem("token");
  console.log("agenttoken",tokentuse);
  var tokenforapi = "Bearer" + " " + tokentuse
  console.log("customAxios js",tokenforapi);

  const customAxios = axios.create({
  baseURL: `http://marcais.online:8000/`,
  headers: { 
      'Content-Type': 'application/json',
       Authorization: tokenforapi}
});

export default customAxios;