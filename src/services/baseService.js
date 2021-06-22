import axios from "axios";
import { toast } from "react-toastify";
const baseApiUrl = "http://localhost:8080/";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Data-Type": "json",
  "X-Requested-With": "XMLHttpRequest",
};
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    errorHandler(error);
    return window.Promise.reject(error);
  }
);
//global http error handling
const errorHandler = (error) => {
  // check for errorHandle config
  if (
    error.config.hasOwnProperty("errorHandle") &&
    error.config.errorHandle === false
  ) {
    return;
  }
  // if has response show the error
  if (error.response) {
    if (error.response.data.hasOwnProperty("ExceptionMessage")) {
      showMessage(
        error.response.data.Message +
          "(" +
          error.response.data.ExceptionMessage +
          ")"
      );
    } else if (error.response.data.hasOwnProperty("Message")) {
      showMessage(error.response.data.Message);
    } else if (error.response.statusText) {
      showMessage(error.response.statusText);
    }
  }
};
const showMessage = (message) => toast.error(message.toString());
const fullUrl = (uri) => baseApiUrl + uri;
const baseService = {
  get: (uri, config) => {
    return axios
      .get(fullUrl(uri), { headers: headers, ...config })
      .then((res) => res.data);
  },
  post: (uri, params, config) => {
    return axios.post(fullUrl(uri), JSON.stringify(params), {
      headers: headers,
      ...config,
    });
  },
};
export default baseService;
