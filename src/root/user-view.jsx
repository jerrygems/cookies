import React from 'react'
import Favourites from './components/userview/favourite'
import { Route, Routes } from 'react-router-dom'
import SearchPage from './components/userview/search-page'
import UserHomeScreen from './components/userview/user-home-screen'
import CreateRecipePage from './components/userview/create-recipe-page'
import RecipeMenu from './components/recipe-menu'
import ViewRecipe from './components/userview/view-recipe'
import ListTypeB from './components/parts/list-type-b'
import CreatedBy from './components/userview/created-by'

function UserView() {
  return (
    <Routes>
      <Route path='/' element={<RecipeMenu/>} />
      <Route path='/created' element={<CreatedBy/> } />
      <Route path={"/recipe/:recipeId"} element={<ViewRecipe />} />
      <Route path='/recipes' element={<RecipeMenu/>} />
      <Route path='/search' element={<SearchPage/>} />
      <Route path='/favourites' element={<Favourites/>} />
      <Route path='/update-recipe/:recipeId' element={<CreateRecipePage />} />
      <Route path='/create-recipe' element={<CreateRecipePage/>} />
    </Routes>
  )
}

export default UserView