//Axios Setup - for communication with backend, you can use Fetch as well
import axios from "axios";

// Server Client
const client = axios.create({baseURL: 'https://blog-app-service-gag1.onrender.com/api'});

//Dev Client
//const client = axios.create({baseURL: 'http://10.2.0.2:4848/api'});

export default client;