import React from 'react';
import { Box, Flex, Text, Link, Stack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" py={4}>
      <Flex
        maxW="1200px"
        mx="auto"
        justify="space-between"
        align="center"
        px={6}
        wrap="wrap"
      >
        <Text fontSize="sm">&copy; {new Date().getFullYear()} The Cookbook. All rights reserved.</Text>
        <Stack direction={['column', 'row']} spacing={4}>
          <Link href="#about" color="white" _hover={{ textDecoration: 'underline' }}>
            About
          </Link>
          <Link href="#recipes" color="white" _hover={{ textDecoration: 'underline' }}>
            Recipes
          </Link>
          <Link href="#contact" color="white" _hover={{ textDecoration: 'underline' }}>
            Contact
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;