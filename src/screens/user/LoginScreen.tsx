import {
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../stores/auth";
import { axiosPublic } from "../../stores/axios";

const StyledLoginScreen = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1rem;
`;

export const LoginScreen = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const {signin, signout}  = useAuth();
  const navigate = useNavigate();
  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const handleLoginClick = (e: any) => {
    const user = {
      user: {
       email: email,
       password: password, 
      }
    }

    signout(() => {});
    axiosPublic.post("/users/sign_in", user).then((res) => {
      if (res.headers.authorization) {
        signin(res.headers.authorization, () => { navigate("/") });
      }
    }).catch((err) => {
      signout(() => {});
    })
  }

  return (
    <StyledLoginScreen>
      <div>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          />
      </div>
      <div>
        <input type="text"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          />
      </div>
      <div>
        <input type="button"
          value="Login"
          onClick={handleLoginClick}
        />
      </div>
    </StyledLoginScreen>
  ) 
}
