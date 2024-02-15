import axios from "axios";
import TokenHelper from "@/helpers/Token.helper";
import { toast } from "react-toastify";

// axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.baseURL = "https://detaillingtitans-server.vercel.app/";

axios.interceptors.request.use(async (request) => {
  console.log(request);
  const token = TokenHelper.getToken();

  request.headers = {
    ...request.headers,
    Authorization: token && `Bearer ${token}`,
  };

  return request;
});

axios.interceptors.response.use(null, (err) => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;
  if (!expectedError) {
    toast.error("Unexpected error occured, please Try again");
  }
  return Promise.reject(err);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
