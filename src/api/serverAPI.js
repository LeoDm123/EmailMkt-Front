import axios from "axios";

const serverAPI = axios.create({
  baseURL:
    "mongodb+srv://leomeiners1:6SWQ3vV8PJudTm82@portaldm.a5dtqas.mongodb.net/Exchange",
});

export default serverAPI;
