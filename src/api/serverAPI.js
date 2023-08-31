import axios from "axios";

const serverAPI = axios.create({
  baseURL: "https://trixchange-api.onrender.com",
  // baseURL: "http://localhost:4040",
});

export default serverAPI;
