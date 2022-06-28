import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FoodListScreen } from './screens/food/FoodListScreen';
import { LoginScreen } from './screens/user/LoginScreen';
import { AuthProvider, RequireAuth } from './stores/auth';
import { Header } from './components/ui/Header';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <div className="app__header">
            <Header />
          </div>
          <div className="app__content">
            <Routes>
              <Route path="/" element={<RequireAuth><FoodListScreen /></RequireAuth>} />
              <Route path="/login" element={<LoginScreen />} />
            </Routes>
          </div>
          <div className="app__footer">
            Written by xyingsoft @2022
          </div>
        </div>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
