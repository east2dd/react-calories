import styled from "styled-components";

const StyledFoodFilter = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

export const FoodFilter = (props: any) => {
  const handleNameChange = (e: any) => {
    props.onNameChange(e.target.value);
  }

  const handleTakenOnStartChange = (e: any) => {
    props.onTakenOnStartChange(e.target.value);
  }

  return (
    <StyledFoodFilter>
      <div>
        <input
          type="text"
          value={props.name}
          onChange={handleNameChange}
          placeholder="Search by name"
          />
      </div>
      <div>
      <input type="date" id="start" name="start"
        value={props.takenOnStart}
        onChange={handleTakenOnStartChange}
        min="2022-01-01" max="2022-12-31" />
      </div>
    </StyledFoodFilter>
  ) 
}
