import axios from "axios";
import { signout, token$ } from "./auth";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:3001",
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


export const setJwtToken = (token: string) => {
  localStorage.setItem('jwt_token', token);
  axiosPublic.defaults.headers.common['Authorization'] = token;
}

token$.subscribe((token)=> {
  setJwtToken(token);
})
