import { useObservableState } from "observable-hooks";
import { FoodList } from "../../components/food/FoodList";
import { updateFoodSelection, useFoodList } from "../../stores/food";

export const FoodListContainer = () => {
  const { filtered$ } = useFoodList();
  const filtered = useObservableState(filtered$, []);

  return (
    <FoodList items={filtered} onSelectionChange={updateFoodSelection}></FoodList>
  );
}
