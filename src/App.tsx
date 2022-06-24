import { useObservableState } from 'observable-hooks';
import { combineLatestWith, map } from 'rxjs';
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

const Filter = () => {
  const { search$ } = useFoodEntryList();
  const search = useObservableState(search$, "");

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e)=> search$.next(e.target.value)}
        />
    </div>
  ) 
}

const List = () => {
  const { list$, search$ } = useFoodEntryList();
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
    <FoodEntryListProvider>
      <h2>Calories App</h2>
      <div className="App" style={{ display: "grid", gridTemplateColumns: "1fr 1fr"}}>
        <div>
          <Filter />
          <List />
        </div>
        <Deck />
      </div>
    </FoodEntryListProvider>
  );
}

export default App;
