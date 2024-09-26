import React, { useEffect, useState } from 'react'
import ListTypeB from '../parts/list-type-b'
import { Flex, Heading } from '@chakra-ui/react'


function CreatedBy() {
    const [results, setResults] = useState([])

    const resolver = async () => {
        try {
            const token = localStorage.getItem('vulntoken')
            const req = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/created-by`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(req)
            if (req.ok) {
                const resp = await req.json()
                console.log(resp)
                setResults(resp.message)
            }
        } catch (e) { console.log(e) }
    }
    useEffect(() => {
        resolver()
    }, [])
    return (

        <>
            <Flex>

                {
                    (results.length > 0) ? Array.isArray(results) && results.map((result, index) => {
                        return (
                            <ListTypeB
                                key={result._id}
                                id={result._id}
                                recipeName={result.recipeName}
                                description={result.description}
                                image={result.image}
                                creator={result.creator}
                                ingredients={result.ingredients}
                                postedAt={result.postedAt}
                            />
                        )
                    }) : (
                        <>
                            <Heading>
                                helium
                            </Heading>
                        </>
                    )


                }
            </Flex>
        </>
    )
}

export default CreatedBy