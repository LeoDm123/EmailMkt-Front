import axios from "axios";

const serverAPI = axios.create({
  baseURL: "https://trixchange-api.onrender.com",
});

export default serverAPI;
