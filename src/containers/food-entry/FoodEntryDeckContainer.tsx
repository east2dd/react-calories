import { useObservableState } from "observable-hooks";
import { FoodEntryDeck } from "../../components/food-entry/FoodEntryDeck";
import { updateFoodEntrySelection, useFoodEntryList } from "../../stores/food-entry";

export const FoodEntryDeckContainer = () => {
  const { deck$ } = useFoodEntryList();
  const deck = useObservableState(deck$, []);

  return (
    <FoodEntryDeck items={deck} onSelectionChange={updateFoodEntrySelection}></FoodEntryDeck>
  );
}
