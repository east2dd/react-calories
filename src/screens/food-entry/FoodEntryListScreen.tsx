import { useMemo } from "react"
import styled from "styled-components"
import { FoodEntryDeckContainer } from "../../containers/food-entry/FoodEntryDeckContainer"
import { FoodEntryFilterContainer } from "../../containers/food-entry/FoodEntryFilterContainer"
import { FoodEntryListContainer } from "../../containers/food-entry/FoodEntryListContainer"
import { FoodEntryStatsContainer } from "../../containers/food-entry/FoodEntryStatsContainer"
import { fetchFoodEntryRawList } from "../../stores/food-entry"

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


export const FoodEntryListScreen = () => {
  useMemo(() => {
    fetchFoodEntryRawList();
  }, []);

  return <>
    <StyledFilterSection>
      <div>
        <FoodEntryFilterContainer />
      </div>
      <div>
        <FoodEntryStatsContainer />
      </div>
    </StyledFilterSection>

    <StyledContentSection>
      <div className="app__content__main">
        <FoodEntryListContainer />
      </div>
      <div className="app__content__aside">
        <FoodEntryDeckContainer />
      </div>
    </StyledContentSection>
  </>
}
