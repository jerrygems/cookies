import React from 'react'
import CreateRecipeForm from '../parts/create-recipe-form'
import { useParams } from 'react-router-dom'

function CreateRecipePage() {
  const { recipeId } = useParams()
  return (
    <CreateRecipeForm recipeId={recipeId} />
  )
}

export default CreateRecipePage