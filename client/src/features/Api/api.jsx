import axios from "axios";

const headers = {
  Accept: "application/json",
};

if (localStorage.getItem("token")) {
  headers["Authorization"] = "Bearer " + localStorage.getItem("token");
}

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers,
});

api.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }
  return config;
});

export default api;
