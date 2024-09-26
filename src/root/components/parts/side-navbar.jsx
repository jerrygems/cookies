import React, { useState } from 'react';
import { Box, Button, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Flex, Text, Link, VStack, Icon } from '@chakra-ui/react';
import { FaHome, FaUser, FaCog, FaEdit, FaDatabase } from 'react-icons/fa';
import { ChevronRightIcon, SmallAddIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import { MdAnalytics } from "react-icons/md";
import { useIsAdmin } from '../authentication/is-admin-context';

const SideNavBar = ({ }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isAdmin = useIsAdmin()


    return (
        <Box>
            <Button
                onClick={onOpen}
                position="fixed"
                bottom="20px"
                left="20px"
                borderRadius="full"
                colorScheme="teal"
                size="lg"
                leftIcon={<ChevronRightIcon />}
            />

            <Drawer bg={'#1a202c'} isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Text fontSize="2xl" fontWeight="bold" mb={6}>
                            CookBook
                        </Text>
                    </DrawerHeader>

                    <DrawerBody>
                        <Flex direction="column" height="100%">
                            <VStack spacing={4} align="start">
                                {
                                    isAdmin ? (
                                        <>
                                            <Link href="/" display="flex" alignItems="center">
                                                <Icon as={FaHome} mr={2} />
                                                Home
                                            </Link>
                                            <Link href="/recipes" display="flex" alignItems="center">
                                                <Icon as={FaUser} mr={2} />
                                                Recipes
                                            </Link>
                                            <Link href="/tmp" display="flex" alignItems="center">
                                                <Icon as={FaCog} mr={2} />
                                                About
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/insights" display="flex" alignItems="center">
                                                <Icon as={MdAnalytics} mr={2} />
                                                DashBoard
                                            </Link>
                                            <Link href="/recipes" display="flex" alignItems="center">
                                                <Icon as={SmallAddIcon} mr={2} />
                                                Create Recipe
                                            </Link>
                                        </>
                                    )
                                }
                            </VStack>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>

    );
};

export default SideNavBar;