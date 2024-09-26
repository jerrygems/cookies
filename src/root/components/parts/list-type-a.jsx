import React, { useEffect, useState } from 'react'
import { Image, Flex, Box, Text, Heading, Badge, Button } from '@chakra-ui/react'
import { useIsAdmin } from '../authentication/is-admin-context'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { AiFillLike } from "react-icons/ai";


function ListTypeA({ id, image, recipeName, title, description, creator, ingredients, timeDate }) {
    const { isAdmin, isLoggedIn } = useIsAdmin()
    const [isFav, setIsFav] = useState(false);
    const navigate = useNavigate()


    const handleEdit = () => {
        navigate(`/update-recipe/${id}`)
    }
    const handleTrash = async () => {
        try {
            const token = localStorage.getItem('vulntoken')
            console.log(isAdmin)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delete-recipe?rid=${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                window.location.reload()
            } else {
                console.error('Failed to delete recipe')
            }
        } catch (error) {
            console.error('Error while deleting recipe:', error)
        }
    };
    const handleClicker = () => {
        navigate(`/recipe/${id}`)
    }
    useEffect(() => {
        const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
        setIsFav(favoriteRecipes.includes(id));
    }, [id]);
    const toggleFav = async () => {
        try {
            const token = localStorage.getItem('vulntoken')
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/exists?id=${id}`, {
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
                        const deleteRequest = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/remove-fav?recipe=${id}`, {
                            method: 'DELETE',
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        if (deleteRequest.ok) {
                            console.log("removed i guess")
                            setIsFav(false)
                        } else {
                            console.log("didn't got removed ")
                        }
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    try {
                        const addfav = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add-fav?recipe=${id}`, {
                            method: 'PUT',
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        if (addfav.ok) {
                            const resp = await addfav.json()
                            setIsFav(true)
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
    };
    const btns = async () => {
        const token = localStorage.getItem('vulntoken')
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/exists?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            const resp = response.json()
            resp.message === true ? setIsFav(true) : setIsFav(false)
        }
    }
    useEffect(() => {
        btns()
    }, [])

    return (
        <>
            <Box maxW="xs" minW='xs' m={4} borderWidth={1} borderRadius={8} overflow="hidden" justifyContent={'space-around'}>
                <Image height={200} width={'100%'} onClick={handleClicker} src={`${process.env.REACT_APP_BACKEND_URL}${image}`} alt={'alt text here'} />
                <Flex direction={'row'} mt={5} mr={5} fontSize={20} >
                    <Box width={"90%"}>
                        <Heading ml={5} size='md'>
                            {recipeName.substr(0, 30)}...
                        </Heading>
                    </Box>
                    {
                        isLoggedIn ? (
                            <AiFillLike color={isFav ? 'red' : 'black'} width={"10%"} onClick={toggleFav} />
                        ) : (<></>)
                    }

                </Flex>
                <Box p={6}>
                    <Text onClick={handleClicker} mb={4}>{description.substr(0, 100)}...</Text>
                    <Flex onClick={handleClicker} direction={'column'} justifyContent="space-between" alignItems="start">
                        <Badge colorScheme="green">{ingredients}</Badge>
                        <Text fontWeight="bold">{timeDate}</Text>
                        <Text fontWeight="bold">{creator}</Text>
                    </Flex>
                    {
                        isAdmin && (
                            <Flex direction={'row-reverse'} mt={2} justifyContent={'space-around'}>
                                <Button m={1} onClick={handleEdit}><FaEdit /> Edit</Button>
                                <Button bg={'red.700'} m={1} onClick={handleTrash}><FaTrash /> Drop</Button>
                            </Flex>
                        )
                    }
                </Box>
            </Box>
        </>
    )
}

export default ListTypeA