import axios from 'axios';


const customAxios = axios.create({
baseURL: `http://marcais.online:8000/`,
});

export default customAxios;