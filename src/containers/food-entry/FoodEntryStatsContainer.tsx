import { useObservableState } from "observable-hooks";
import { FoodEntryStats } from "../../components/food-entry/FoodEntryStats";
import { useFoodEntryList } from "../../stores/food-entry";

export const FoodEntryStatsContainer = () => {
  const { stats$ } = useFoodEntryList();
  const stats = useObservableState(stats$, { calories: 0, count: 0 });

  return (
    <FoodEntryStats stats={stats}></FoodEntryStats>
  );
}
