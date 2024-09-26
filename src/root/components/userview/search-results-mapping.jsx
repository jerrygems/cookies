import React from 'react'
import ListTypeA from '../parts/list-type-a'
import { Flex, Heading } from '@chakra-ui/react'

function SearchResultsMapping({ searchit, results }) {
    console.log(searchit, results)
    return <>
        {
            (searchit.length) ?
                (
                    results.length ? (
                        results.map((result, index) => {
                            console.log(results.length, "-----")
                            return (
                                <ListTypeA
                                    key={index}
                                    id={result._id}
                                    recipeName={result.recipeName}
                                    image={result.image}
                                    name={result.recipeName}
                                    description={result.description}
                                    content={result.content} creator={result.creator}
                                    ingredients={result.ingredients}
                                    timeDate={result.timeDate}
                                />
                            )
                        })
                    ) : (
                        <>
                            <Flex justifyContent={'center'} alignItems={'center'} m={5}>
                                <Heading m={5} color={'gray'}>seems like there's nothing like that</Heading>
                            </Flex>
                        </>
                    )
                )
                :
                (
                    <Flex justifyContent={'center'} alignItems={'center'} m={5}>
                        <Heading color={'gray'}>Type something in searchbar</Heading>
                    </Flex>
                )
        }
    </>
}

export default SearchResultsMapping