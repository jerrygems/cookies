import './App.css';
import { ChakraProvider, Flex } from '@chakra-ui/react'
import RootView from './root/root-view';
import { BrowserRouter } from 'react-router-dom';
import UserView from './root/user-view';
import React from 'react';
import Header from './root/components/header';
import Footer from './root/components/footer';
import SideNavBar from './root/components/parts/side-navbar';
import { IsAdminProvider, useIsAdmin } from './root/components/authentication/is-admin-context';

function AppContent() {
  const { isAdmin } = useIsAdmin()

  return (
    <>
      <Header />
      <Flex direction={'row'} justifyContent={'center'}>
        {/* <SideNavBar /> */}
        {isAdmin ? <RootView /> : <UserView />}
      </Flex>
      <Footer />
    </>
  )
}

function App() {
  return (
    <ChakraProvider>
      <IsAdminProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </IsAdminProvider>
    </ChakraProvider>
  );
}

export default App;
