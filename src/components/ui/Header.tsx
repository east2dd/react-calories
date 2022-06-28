import styled from "styled-components"
import { AuthStatusContainer } from "../../containers/ui/AuthStatusContainer";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <h2>Calories</h2>
      <AuthStatusContainer />
    </StyledHeader>
  )
}
