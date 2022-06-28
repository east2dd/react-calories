import {
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../stores/auth";
import { axiosPublic } from "../../stores/axios";
import { useObservableState } from "observable-hooks";

const StyledLoginScreenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 2rem;
`;

const StyledLoginScreen = styled.div`
  grid-column: 2 / 3;

  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2rem;

  input, button {
    width: 100%;
  }
`;

export const LoginScreen = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const {token$, signin, signout}  = useAuth();
  const navigate = useNavigate();
  const token = useObservableState(token$, null);

  if (token) {
    return <Navigate to="/" state={{ from: '/login' }} replace />;
  }

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

    axiosPublic.post("/users/sign_in", user).then((res) => {
      if (res.headers.authorization) {
        signin(res.headers.authorization.split(' ')[1], () => { navigate("/") });
      }
    }).catch((err) => {
      signout(() => {});
    })
  }

  return (
    <StyledLoginScreenGrid>
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
          <input type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            />
        </div>
        <div>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      </StyledLoginScreen>
    </StyledLoginScreenGrid>
  ) 
}
