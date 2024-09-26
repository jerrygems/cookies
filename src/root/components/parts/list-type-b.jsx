import React, { useEffect, useState } from 'react'
import { Box, Flex, Image, Text, Badge, Heading, Button } from '@chakra-ui/react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function ListTypeB({ id, recipeName, description, image, creator, ingredients, postedAt }) {
    const navigate = useNavigate()
    const [isCreatedBy, setIsCreatedBy] = useState(false)
    const checkIt = async () => {
        const token = localStorage.getItem('vulntoken')
        console.log(id)
        const req = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/is-the-creator/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (req.ok) {
            const resp = await req.json()
            console.log(typeof (resp.message))
            console.log(resp.message)
            setIsCreatedBy(resp.message)
        }
    }
    useEffect(() => {
        checkIt()
    })
    const handleTrash = async () => {
        try {
            const token = localStorage.getItem('vulntoken')
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
    const handleEdit = () => {
        navigate(`/update-recipe/${id}`)
    }
    return (
        <Box maxW="sm" m={4} borderWidth={1} borderRadius={8} overflow="hidden">
            <Image src={`${process.env.REACT_APP_BACKEND_URL}${image}`} alt={'alt text here'} />
            <Box p={6}>
                <Heading size="md" mb={2}>{recipeName}</Heading>
                <Text mb={4}>{description}</Text>
                <Flex direction={'column'} justifyContent="space-between" alignItems="start">
                    <Badge colorScheme="green">{ingredients}</Badge>
                    <Text fontWeight="bold">{postedAt}</Text>
                </Flex>
                {
                    (isCreatedBy === true) ?
                        < Flex direction={'row-reverse'} mt={2} justifyContent={'space-around'}>
                            <Button m={1} onClick={handleEdit}><FaEdit /> Edit</Button>
                            <Button bg={'red.700'} m={1} onClick={handleTrash}><FaTrash /> Drop</Button>
                        </Flex>
                        : <></>
                }
            </Box>
        </Box >
    )
}

export default ListTypeB