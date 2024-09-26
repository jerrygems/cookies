import {
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Input,
  ModalFooter,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



function Auth({ isOpen, onClose, onOpen, isSignUp }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [confPassword, setConfPassword] = useState('')

  const registerForm = async () => {
    try {
      if (password !== confPassword || !email) {
        console.log("validation failed")
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      if (response.ok) {
        const data = await response.json()
        console.log('registered', data)
        onClose()
        window.location.reload()
      } else {
        console.log('registration failed')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const loginForm = async () => {
    try {
      if (!email || !password) {
        console.log("both fields are required")
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      if (response.ok) {
        const data = await response.json()
        console.log("logged in ig", data)
        localStorage.setItem('vulntoken', data.token)
        window.location.reload()
      } else {
        console.log("response not okay")
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isSignUp ? 'Register' : 'Login'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="email" type='email' mb={3} value={email} onChange={(evnt) => setEmail(evnt.target.value)} />
            <Input placeholder="password" type="password" mb={3} value={password} onChange={(e) => setPassword(e.target.value)} />
            {
              isSignUp ?
                (<Input placeholder="Confirm Password" type="password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />) : (<></>)
            }
          </ModalBody>
          <ModalFooter>
            {
              isSignUp ?
                (<Button onClick={registerForm} colorScheme="blue" mr={3}>
                  Register
                </Button>) :
                (<Button onClick={loginForm} colorScheme="blue" mr={3}>
                  Login
                </Button>)
            }
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    </>
  )



}

export default Auth