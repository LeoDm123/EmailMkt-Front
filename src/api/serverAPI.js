import axios from "axios";

const serverAPI = axios.create({
  baseURL: "http://localhost:4040",
});

export default serverAPI;
