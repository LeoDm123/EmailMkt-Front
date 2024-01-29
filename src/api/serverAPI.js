import axios from "axios";

const serverAPI = axios.create({
  //baseURL: "http://localhost:4040",
  baseURL: "https://e-mkt-back.vercel.app/",
});

export default serverAPI;
