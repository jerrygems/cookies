import React, { useEffect, useState } from 'react'
import CardTypeA from '../parts/card-type-a'
import CreateRecipes from '../create-recipe'
import QuillEditorBox from '../parts/quill-editor-box'
import Auth from '../authentication/auth'
import ListTypeA from '../parts/list-type-a'
import Favourites from './favourite'
import Insights from '../insights'
import Header from '../header'
import Footer from '../footer'
import RecipeMenu from '../recipe-menu'
import { Flex, Heading, useStatStyles, Link } from '@chakra-ui/react'
import ListTypeB from '../parts/list-type-b'
import CreateRecipePage from './create-recipe-page'

function UserHomeScreen() {

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const showRecipes = async () => {
            try {
                const request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-all-recipes`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (request.ok) {
                    console.log("got the data now to show")
                    const data = await request.json()
                    setRecipes(data.message)
                } else {
                    console.log("didn't got the data")
                }


            } catch (err) {
                console.log(err)
            }
        }
        showRecipes()
    }, [])
    return (
        <>

            <Flex justifyContent={'start'} direction={'column'}>
                <Heading m={6}>Latest ;-)</Heading>
                <hr />
                <Flex direction={'row'} wrap={'wrap'}>
                    {
                        Array.isArray(recipes) && recipes.map((recipe, index) => {
                            return (
                                <ListTypeA key={recipe._id} title={recipe.recipeName} description={recipe.description} creator={recipe.creator} ingredients={recipe.ingredients} timeDate={recipe.postedAt} />
                            )
                        })
                    }
                </Flex>
                <hr />
                <Heading m={6}>By Date :-)</Heading>
                <hr />
                <Flex direction={'row'} wrap={'wrap'}>
                    {/* <ListTypeA/>
                    <ListTypeA/>
                    <ListTypeA/>
                    <ListTypeA/> */}
                </Flex>
                <hr />
            </Flex>

            {/* <CardTypeA/> */}
            {/* <SearchBar/> */}
            {/* <QuillEditorBox/> */}
            {/* <Favourites/> */}
            {/* <Header/> */}
            {/* <Insights/> */}
            {/* <Footer/> */}
            {/* <RecipeMenu/> */}
        </>
    )
}

export default UserHomeScreen