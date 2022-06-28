import { useObservableState } from "observable-hooks";
import { FoodFilter } from "../../components/food/FoodFilter";
import { useFoodList } from "../../stores/food";

export const FoodFilterContainer = () => {
  const { search$, searchTakenOnStart$ } = useFoodList();
  const search = useObservableState(search$, "");
  const searchTakenOnStart = useObservableState(searchTakenOnStart$, "");

  const handleNameChange = (name: string) => {
    search$.next(name);
  }

  const handleTakenOnStartChange = (takenOnStart: string) => {
    searchTakenOnStart$.next(takenOnStart)
  }

  return (
    <FoodFilter
      name={search}
      takenOnStart={searchTakenOnStart}
      onNameChange={handleNameChange}
      onTakenOnStartChange={handleTakenOnStartChange}
    ></FoodFilter>
  ) 
}
