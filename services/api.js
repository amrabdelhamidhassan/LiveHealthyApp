import axios from "axios";
import { store } from "../store/store";

export const baseURL = "http://192.168.1.2:8000/api";
const api = axios.create({
    baseURL: baseURL,
    timeout: 80000,
});
api.interceptors.request.use(config => {
  const token = store.getState().userReducer.user==null ? null:store.getState().userReducer.user.token;//  =store.getState().session.token; (get token from store)
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error),);
api.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log('logging from api.js >>>>>>>');
      console.log(error);
      // On unauthorized error logout and navigate to AuthStack
      if (error?.response?.status === 401) {
      }
      return Promise.reject(error);
    },
  );
  export default api;