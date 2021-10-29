import axios from "axios";

export const ENDPOINT = `${process.env.REACT_APP_API}/api`;

export default axios.create({
  baseURL: ENDPOINT,
  timeout: 6000,
});
