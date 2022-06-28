import axios from "axios";
import { signout, token$ } from "./auth";

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


export const storeJwtToken = (token: string) => {
  axiosPublic.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  localStorage.setItem('jwt_token', token);
}

token$.subscribe((token)=> {
  storeJwtToken(token);
});
