import axios from "axios";
import { signout } from "./auth";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPublic.interceptors.response.use(
  (res) => {
     if (res.status === 401) {
      throw(new Error('Unauthorized'));
     }

     return res;
  },
  (err) => {
    signout(() => {});

    return Promise.reject(err);
  }
);
