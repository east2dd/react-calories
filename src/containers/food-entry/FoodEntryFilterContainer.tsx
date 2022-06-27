import { useObservableState } from "observable-hooks";
import { FoodEntryFilter } from "../../components/food-entry/FoodEntryFilter";
import { useFoodEntryList } from "../../stores/food-entry";

export const FoodEntryFilterContainer = () => {
  const { search$, searchTakenOnStart$ } = useFoodEntryList();
  const search = useObservableState(search$, "");
  const searchTakenOnStart = useObservableState(searchTakenOnStart$, "");

  const handleNameChange = (name: string) => {
    search$.next(name);
  }

  const handleTakenOnStartChange = (takenOnStart: string) => {
    searchTakenOnStart$.next(takenOnStart)
  }

  return (
    <FoodEntryFilter
      name={search}
      takenOnStart={searchTakenOnStart}
      onNameChange={handleNameChange}
      onTakenOnStartChange={handleTakenOnStartChange}
    ></FoodEntryFilter>
  ) 
}
