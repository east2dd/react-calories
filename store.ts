import { BehaviorSubject } from "rxjs";

export interface FoodEntry {
  name: string;
  taken_on: string;
  calorie: string;
};

export const foodEntryList$ = new BehaviorSubject<FoodEntry[]>([]);

fetch('/food-entries.json')
  .then((res) => res.json())
  .then((data) => foodEntryList$.next(data));
