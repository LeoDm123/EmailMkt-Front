import axios from "axios";

const serverAPI = axios.create({
  baseURL: "http://localhost:10000",
});

export default serverAPI;
