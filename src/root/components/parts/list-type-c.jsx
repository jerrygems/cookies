import React, { useEffect, useState } from 'react'
import { Image, Box, Flex, Heading, Text, Badge, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function ListTypeC({ id }) {
    console.log(id, "here it is")
    const navigate = useNavigate()
    const [result, setResult] = useState({})

    const getData = async () => {
        const req = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-recipe/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
        if (req.ok) {
            const resp = await req.json()
            setResult(resp.message)
        }
        console.log("unable to get the recipe")
    }

    useEffect(() => {
        getData()

    }, [])

    const handleClick = () => {
        navigate(`/recipe/${id}`)
    }
    return (
        <Box maxW="md" width={'90%'} height={'100%'} m={4} onClick={handleClick} borderWidth={1} borderRadius={8} overflow="hidden">
            <Flex height={'100%'}>
                <Image width={100} m={2} objectFit={'cover'} src={'https://github.com/AngelJumbo/gruvbox-wallpapers/blob/main/wallpapers/anime/wall.jpg?raw=true'} alt={'alt text here'} />
                <Box m={2}>
                    <Heading size="sm" mb={2}> {result.recipeName} </Heading>
                    <Text size={'xs'} mb={4}>{result.description?.substr(0,70)}...</Text>
                    <Flex direction={'column'} justifyContent="space-between" >
                        <Badge colorScheme="green">{result.ingredients}</Badge>
                        <Text color={'gray'} fontSize={'xs'}>{result.postedAt}</Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default ListTypeC