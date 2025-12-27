import axios, { AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5001", // #CHANGE
  // baseURL: 'http://hello-03.eba-b7ijmy2v.us-east-2.elasticbeanstalk.com/'
  // baseURL: 'http://Pokemon-env.eba-pza3qpzy.us-east-2.elasticbeanstalk.com/'
  // baseURL: "http://Pokemon2-env.eba-mbbbdjgx.us-east-2.elasticbeanstalk.com/",
});
