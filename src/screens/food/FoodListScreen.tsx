import { useMemo } from "react"
import styled from "styled-components"
import { FoodDeckContainer } from "../../containers/food/FoodDeckContainer"
import { FoodFilterContainer } from "../../containers/food/FoodFilterContainer"
import { FoodListContainer } from "../../containers/food/FoodListContainer"
import { FoodStatsContainer } from "../../containers/food/FoodStatsContainer"
import { fetchFoodRawList } from "../../stores/food"

const StyledFilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  border-bottom: 1px solid #f2f2f2;
`;

const StyledContentSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 4rem;
  padding: 2rem;  
`;


export const FoodListScreen = () => {
  useMemo(() => {
    fetchFoodRawList();
  }, []);

  return <>
    <StyledFilterSection>
      <div>
        <FoodFilterContainer />
      </div>
      <div>
        <FoodStatsContainer />
      </div>
    </StyledFilterSection>

    <StyledContentSection>
      <div className="app__content__main">
        <FoodListContainer />
      </div>
      <div className="app__content__aside">
        <FoodDeckContainer />
      </div>
    </StyledContentSection>
  </>
}
