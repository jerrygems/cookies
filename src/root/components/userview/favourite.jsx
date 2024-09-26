import React, { useEffect, useState } from 'react'
import { Box, Heading, Flex } from '@chakra-ui/react'
import ListTypeC from '../parts/list-type-c'
function Favourites() {
  const [results, setResults] = useState([])

  const getAllFavs = async () => {
    const token = localStorage.getItem("vulntoken")

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-favs`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'

      }
    })
      .then(response => response.json())
      .then(data => {
        setResults(data.message)
      })
      .catch(error => console.error('Error:', error));
  }
  useEffect(() => {
    getAllFavs()
  }, [])
  return (
    <>
      <Box gap={4}>
        <Heading size={'lg'} m={4} >Favourites </Heading>
        <hr />
        <Flex wrap={'wrap'} direction={'row'} alignItems={'center'} m={4}>
          {

            Array.isArray(results) && results.map((result, index) => {
              return (
                <ListTypeC key={index} id={result} />
              )
            })
          }
        </Flex>
      </Box>
    </>
  )
}

export default Favourites