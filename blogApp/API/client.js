//Axios Setup - for communication with backend, you can use Fetch as well
import axios from "axios";

const client = axios.create({baseURL: 'https://blog-app-service-gag1.onrender.com/api'});

export default client;