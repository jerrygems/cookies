import { Routes, Route } from 'react-router-dom'
import React from 'react'
import RecipeMenu from './components/recipe-menu'
import CreateRecipePage from './components/userview/create-recipe-page'
import Favourites from './components/userview/favourite'
import ViewRecipe from './components/userview/view-recipe'
import SearchPage from './components/userview/search-page'
import CreatedBy from './components/userview/created-by'
const RootView = () => {
  return (
    <Routes>
      <Route path='/' element={<RecipeMenu />} />
      <Route path='/created' element={<CreatedBy/> } />
      <Route path={"/recipes"} element={<RecipeMenu />} />
      <Route path='/insights' element={<></>} />
      <Route path={"/recipe/:recipeId"} element={<ViewRecipe />} />
      <Route path={"/favourites"} element={<Favourites />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/update-recipe/:recipeId' element={<CreateRecipePage />} />
      <Route path='/create-recipe' element={<CreateRecipePage />} />
    </Routes>
  )
}

export default RootView