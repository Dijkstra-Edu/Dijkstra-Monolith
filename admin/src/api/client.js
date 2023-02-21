//Axios Setup - for communication with backend, you can use Fetch as well
import axios from "axios";

const client = axios.create({baseURL: 'http://172.17.56.205:4848/api'});

export default client;