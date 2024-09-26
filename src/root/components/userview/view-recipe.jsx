import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import CardTypeA from '../parts/card-type-a'
import { useParams } from 'react-router-dom'

function ViewRecipe() {
  const { recipeId } = useParams()
  return (
    <Flex justifyContent={'center'} direction={'column'} width={'100%'} >
      <Heading m={4}>Preview Recipe :-) </Heading>
      <hr />
      <CardTypeA tempId={recipeId} />
    </Flex>
  )
}

export default ViewRecipe