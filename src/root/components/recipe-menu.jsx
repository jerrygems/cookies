import React, { useEffect, useState } from 'react'
import { Flex, Link, Heading, Button } from '@chakra-ui/react'
import ListTypeA from './parts/list-type-a'
import { MdAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function RecipeMenu() {
  const [recipes, setRecipes] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const showRecipe = async () => {
      try {
        const request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-all-recipes`,{
          method:'GET',
        })
        if (request.ok) {
          const resp = await request.json()
          setRecipes(resp.message)
        } else {
          console.log("something went wrong")
        }
      } catch (err) {
        console.log(err)
      }
    }
    showRecipe()
  }, [])

  const handleNavigation = ()=>{
    navigate('/create-recipe')
  }
  return (
    <>
      <Flex direction={'column'} justifyContent={'center'} width={"100%"}>
        <Flex flex={'row'} wrap={'wrap'} justifyContent={'space-between'} >
          <Heading m={2}>Recipe Menu</Heading>
          <Button bg={'lime.700'} m={2} rightIcon={<MdAdd />} onClick={handleNavigation} >Create Recipe</Button>
        </Flex>
        <Flex direction={'row'} wrap={'wrap'} justifyContent={'center'}>
          {
            Array.isArray(recipes) && recipes.map((recipe, index) => {
              return (
                  <ListTypeA key={index} recipeName={recipe.recipeName} id={recipe._id} image={recipe.image} name={recipe.recipeName} description={recipe.description} content={recipe.content} creator={recipe.creator} ingredients={recipe.ingredients} timeDate={recipe.timeDate} />
              )
            })
          }

        </Flex>
      </Flex >
    </>
  )
}

export default RecipeMenu