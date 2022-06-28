import styled from "styled-components";

const StyledAuthStatus = styled.div`
  display: flex;
  align-items: center;
`;

export function AuthStatus(props: any) {
  if (!props.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <StyledAuthStatus>
      <span>Welcome {props.user.email}&nbsp;</span>
      <button onClick={props.onSignoutClick}>Logout</button>
    </StyledAuthStatus>
  );
}
