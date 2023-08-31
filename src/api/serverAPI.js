import axios from "axios";

const serverAPI = axios.create({
  baseURL:
    "https://sa-east-1.aws.data.mongodb-api.com/app/data-vigln/endpoint/data/v1",
});

export default serverAPI;
