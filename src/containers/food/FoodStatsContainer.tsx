import { useObservableState } from "observable-hooks";
import { FoodStats } from "../../components/food/FoodStats";
import { useFoodList } from "../../stores/food";

export const FoodStatsContainer = () => {
  const { stats$ } = useFoodList();
  const stats = useObservableState(stats$, { calories: 0, count: 0 });

  return (
    <FoodStats stats={stats}></FoodStats>
  );
}
