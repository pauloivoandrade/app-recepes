import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { DoneRecipes } from './components/DoneRecipes';
import { FavoriteRecipes } from './components/FavoriteRecipes';
import { Profile } from './components/Profile';
import { LayoutHF } from './components/LayoutHF';
import { LayoutH } from './components/LayoutH';
import { DetailsCard } from './components/RecipeDetails';
import { ContextProvider } from './context/maincontext-provider';
import { Recipes } from './components/Recipes';

function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <LayoutHF /> }>
          <Route path="/meals" element={ <Recipes /> } />
          <Route path="/drinks" element={ <Recipes /> } />
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
