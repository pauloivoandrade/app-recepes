import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { DoneRecipes } from './components/DoneRecipes';
import { FavoriteRecipes } from './components/FavoriteRecipes';
import { Profile } from './components/Profile';
import { Drinks } from './components/Drinks';
import { Meals } from './components/Meals';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}

export default App;
