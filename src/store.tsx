import { createContext, useContext } from "react";
import { BehaviorSubject, map, combineLatestWith } from "rxjs";

export interface FoodEntry {
  id: string;
  name: string;
  taken_on: Date;
  calorie: string;
  selected?: boolean;
};

export const rawList$ = new BehaviorSubject<FoodEntry[]>([]);
export const selected$ = new BehaviorSubject<string[]>([]);
export const search$ = new BehaviorSubject("");

export const listWithDate$ = rawList$.pipe(
  map((foodEntry) => 
    foodEntry.map((f) => ({
      ...f,
      taken_on: new Date(f.taken_on),
    }))
  )
);

export const list$ = listWithDate$.pipe(
  combineLatestWith(selected$),
  map(
    ([list, selected]) => (
      list.map((f) => ({
        ...f,
        selected: selected.includes(f.id)
      })
    ))
  )
);

export const deck$ = list$.pipe(
  map((list) => (list.filter((f) => f.selected)))
);

fetch('/food-entries.json')
  .then((res) => res.json())
  .then((data) => rawList$.next(data));

const FoodEntryListContext = createContext({
  deck$,
  list$,
  selected$,
  search$
});

export const useFoodEntryList = () => useContext(FoodEntryListContext);

export const FoodEntryListProvider = (props: any) => {
  return (
    <FoodEntryListContext.Provider value={{
      deck$,
      list$,
      selected$,
      search$
    }}>
      { props.children }
    </FoodEntryListContext.Provider>
  );
}
