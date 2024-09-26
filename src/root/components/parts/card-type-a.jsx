import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Button, Flex } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'

function CardTypeA({ tempId }) {
    const recipeId = tempId
    const [recipe, setRecipe] = useState({})
    useEffect(() => {
        const showRecipe = async () => {
            console.log(recipeId)
            const request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-recipe/${recipeId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (request.ok) {
                const resp = await request.json()
                console.log(resp.message)
                setRecipe(resp.message)
            } else {
                console.log("request failed")
            }
        }
        showRecipe()
    }, [recipeId])
    // const handleLike = () => {
    //     try {

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    const handleFav = async () => {
        try {
            const token = localStorage.getItem('vulntoken')
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/exists?id=${tempId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            if (response.ok) {
                console.log(response)
                const resp = await response.json()
                if (resp.message === true) {
                    try {
                        const deleteRequest = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/remove-fav?recipe=${tempId}`, {
                            method: 'DELETE',
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        if (deleteRequest.ok) {
                            console.log("removed i guess")
                        } else {
                            console.log("didn't got removed ")
                        }
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    try {
                        const addfav = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add-fav?recipe=${tempId}`, {
                            method: 'PUT',
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        if (addfav.ok) {
                            const resp = await addfav.json()
                            console.log("added ", resp)
                        }
                        console.log("failed to add")
                    } catch (err) {
                        console.log(err)
                    }
                }
            } else {
                console.error('failed to update')
            }
        } catch (error) {
            console.error('err updating', error)
        }
    }
    return (
        <>
            <Card m={4} width={'98%'}>
                <Flex>
                    <Image objectFit={'cover'} width={'100%'} height={400} src={`${recipe.image}`} />
                </Flex>
                <CardHeader>
                    <Heading size='md'>{recipe.recipeName}</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                summary
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {recipe.description}
                            </Text>
                        </Box>

                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                content
                            </Heading>
                            <Box className='ql-editor' dangerouslySetInnerHTML={{ __html: recipe.content }} >

                            </Box>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                ingredients
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {recipe.ingredients}
                            </Text>
                        </Box>
                        <Box>
                            <Button onClick={handleFav}><FaHeart m={2} /> Like</Button>
                            <Text fontSize={'small'} color={'gray'}>{recipe.postedAt}</Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}

export default CardTypeA