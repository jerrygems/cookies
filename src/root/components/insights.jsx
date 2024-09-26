import React from 'react'
import { TableContainer,Table,TableCaption,Thead,Tr,Th,Tbody,Td,Tfoot } from '@chakra-ui/react'
function Insights() {
    return (
        <>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>UserName</Th>
                            <Th>Ingredients</Th>
                            <Th>PostedAt</Th>
                            <Th>IP</Th>
                            <Th>Browser</Th>
                            
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>whoever</Td>
                            <Td>Pizza,Cheese,Shushi</Td>
                            <Td>8:64pm </Td>
                            <Td>0.0.0.0</Td>
                            <Td>mozilla</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    )
}

export default Insights