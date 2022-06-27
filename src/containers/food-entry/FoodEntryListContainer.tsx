import { useObservableState } from "observable-hooks";
import { FoodEntryList } from "../../components/food-entry/FoodEntryList";
import { updateFoodEntrySelection, useFoodEntryList } from "../../stores/food-entry";

export const FoodEntryListContainer = () => {
  const { filtered$ } = useFoodEntryList();
  const filtered = useObservableState(filtered$, []);

  return (
    <FoodEntryList items={filtered} onSelectionChange={updateFoodEntrySelection}></FoodEntryList>
  );
}
