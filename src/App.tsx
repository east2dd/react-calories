import './App.scss';

import { FoodEntryListScreen } from './screens/food-entry/FoodEntryListScreen';

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <h2>Calories</h2>
      </div>
      <div className="app__content">
        <FoodEntryListScreen /> 
      </div>
      <div className="app__footer">
        Written by xyingsoft @2022
      </div>
    </div>
  );
}

export default App;
