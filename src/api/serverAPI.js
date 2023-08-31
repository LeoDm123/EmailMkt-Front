import axios from "axios";

const serverAPI = axios.create({
  baseURL: "https://sa-east-1.aws.data.mongodb-api.com/app/data-vigln/endpoint",
});

export default serverAPI;
