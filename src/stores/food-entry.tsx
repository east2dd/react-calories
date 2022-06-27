import { createContext, useContext } from "react";
import { BehaviorSubject, map, combineLatestWith } from "rxjs";

export interface FoodEntry {
  id: string;
  name: string;
  taken_on: Date;
  calorie: string;
  price_cents: number;
  selected?: boolean;
  taken_on_date?: string;
};

const rawList$ = new BehaviorSubject<FoodEntry[]>([]);
const selected$ = new BehaviorSubject<string[]>([]);
const search$ = new BehaviorSubject("");
const searchTakenOnStart$ = new BehaviorSubject("");

const listWithDate$ = rawList$.pipe(
  map((foodEntry) => 
    foodEntry.map((f) => ({
      ...f,
      taken_on_date: new Date(f.taken_on),
    }))
  )
);

const list$ = listWithDate$.pipe(
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

const deck$ = list$.pipe(
  map((list) => (list.filter((f) => f.selected)))
);

const filtered$ = list$.pipe(
  combineLatestWith(search$, searchTakenOnStart$),
  map(([list, search, searchTakenOnStart])=>(
    list.filter((f) => {
      const isNameMatched = !search || f.name.toLowerCase().includes(search.toLowerCase());

      const d1 = f.taken_on_date;
      const d2 = new Date(searchTakenOnStart);
      d1.setUTCHours(0,0,0,0);
      d2.setUTCHours(0,0,0,0);
      const isDateMatched = !searchTakenOnStart || d1.getTime() === d2.getTime();

      return isNameMatched && isDateMatched;
    })
  ))
)

const stats$ = filtered$.pipe(
  map((item) => {
    const calories = item.reduce((acc, curr) => acc + parseFloat(curr.calorie), 0);

    return {
      calories: calories,
      count: item.length
    } 
  })
)

const FoodEntryListContext = createContext({
  deck$,
  list$,
  selected$,
  filtered$,
  search$,
  searchTakenOnStart$,
  stats$,
});

export const FoodEntryListProvider = (props: any) => {
  return (
    <FoodEntryListContext.Provider value={{
      deck$,
      list$,
      selected$,
      filtered$,
      search$,
      searchTakenOnStart$,
      stats$
    }}>
      { props.children }
    </FoodEntryListContext.Provider>
  );
}

export const useFoodEntryList = () => useContext(FoodEntryListContext);

const fetchFoodEntryListEndpoint = () => {
  return fetch('/food-entries.json')
    .then((res) => res.json());
}

export const fetchFoodEntryRawList = () => {
  fetchFoodEntryListEndpoint().then((data) => rawList$.next(data));
}

export const updateFoodEntrySelection = (id: string, selected: boolean) => {
  if(selected) {
    selected$.next(selected$.value.filter((s) => s!==id));
  } else {
    selected$.next([...selected$.value, id]);
  }
}