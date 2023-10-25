import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { DoneRecipes } from './components/DoneRecipes';
import { FavoriteRecipes } from './components/FavoriteRecipes';
import { Profile } from './components/Profile';
import { Drinks } from './components/Drinks';
import { Meals } from './components/Meals';
import { LayoutHF } from './components/LayoutHF';
import { LayoutH } from './components/LayoutH';
import { DetailsCard } from './components/DetailsCard';
import { ContextProvider } from './context/maincontext-provider';

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <LayoutHF /> }>
          <Route path="/meals" element={ <Meals /> } />
          <Route path="/drinks" element={ <Drinks /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>
        <Route element={ <LayoutH /> }>
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        </Route>
        <Route element={ <DetailsCard /> } path="/meals/:recipeID" />
        <Route element={ <DetailsCard /> } path="/drinks/:recipeID" />
        <Route element={ <DetailsCard /> } path="/meals/:recipeID/in-progress" />
        <Route element={ <DetailsCard /> } path="/drinks/:recipeID/in-progress" />
      </Routes>
    </ContextProvider>
  );
}

export default App;
