import { useObservableState } from 'observable-hooks';
import React, { useMemo } from 'react';
import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import './App.css';
import { FoodEntryListProvider, useFoodEntryList } from './store';

const ListItem = (props: any) => {
  const { selected$ } = useFoodEntryList();
  const f = props.item;

  return (
    <div style={{display: "grid", gridTemplateColumns: "repeat(7, 1fr)"}}>
      <div>
        <input type="checkbox"
          checked={f.selected}
          onChange={(e) => {
            if(f.selected) {
              selected$.next(selected$.value.filter((s) => s!==f.id));
            } else {
              selected$.next([...selected$.value, f.id]);
            }
          }}
        />
      </div>
      <div>{f.name}</div>
      <div>&nbsp;|&nbsp;</div>
      <div>{f.calorie}</div>
      <div>&nbsp;|&nbsp;</div>
      <div>{f.taken_on.toISOString()}</div>
    </div>
  );
}

const Deck = () => {
  const { deck$ } = useFoodEntryList();
  const deck = useObservableState(deck$, []);

  return (
    <div>
      <h4>Deck</h4>
      <div>
      { deck.map((f) => (
        <ListItem item={f} key={f.id}/>
      ))}
      </div>
    </div>
  );
}

const Search = () => {
  const { list$ } = useFoodEntryList();
  const search$ = useMemo(() => new BehaviorSubject(""), [])
  const [filteredList] = useObservableState(() => (
    list$.pipe(
      combineLatestWith(search$),
      map(([list, search])=>(
        list.filter((f) => {
          return f.name.toLowerCase().includes(search.toLowerCase())
        })
      ))
    )
  ), []);

  return (
    <div>
      <input
        type="text"
        value={search$.value}
        onChange={(e)=> search$.next(e.target.value)}
        />

      <hr/>

      <div>
        { filteredList.map((f) => (
          <ListItem item={f} key={f.id}/>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App" style={{ display: "grid", gridTemplateColumns: "1fr 1fr"}}>
      <FoodEntryListProvider>
        <Search />
        <Deck />
      </FoodEntryListProvider>
    </div>
  );
}

export default App;
