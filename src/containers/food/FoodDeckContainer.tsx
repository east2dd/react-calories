import { useObservableState } from "observable-hooks";
import { FoodDeck } from "../../components/food/FoodDeck";
import { updateFoodSelection, useFoodList } from "../../stores/food";

export const FoodDeckContainer = () => {
  const { deck$ } = useFoodList();
  const deck = useObservableState(deck$, []);

  return (
    <FoodDeck items={deck} onSelectionChange={updateFoodSelection}></FoodDeck>
  );
}
