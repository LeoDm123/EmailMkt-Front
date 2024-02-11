import axios from "axios";

const serverAPI = axios.create({
  baseURL: "http://localhost:4040",
  //baseURL: "https://emakt-api.onrender.com",
});

export default serverAPI;
