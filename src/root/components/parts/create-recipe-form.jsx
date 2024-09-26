import React, { useEffect, useState } from 'react'
import { Button, Box, Center, VStack, Input, InputGroup, InputRightElement, Heading } from '@chakra-ui/react'
import { Search2Icon, SmallAddIcon } from '@chakra-ui/icons'
import { BiSolidImageAdd } from "react-icons/bi";
import QuillEditor from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { MdEdit } from "react-icons/md"

function CreateRecipeForm({ recipeId }) {
  const flag = recipeId ? "update" : "create"
  const [recipeName, setRecipeName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [content, setContent] = useState("")
  const [creator, setCreator] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [recipe, setRecipe] = useState({})
  const [fetched, setFetched] = useState(false)
  const handleSubmission = async () => {
    const token = localStorage.getItem("vulntoken")
    try {
      if (!token) {
        console.log("token is neccessary")
      }
      if (recipeName || description || content || creator || ingredients) {
        console.log(recipeName, description, image, content, creator, ingredients)
        const dataToUpdate = new FormData()
        dataToUpdate.append("recipeName", recipeName)
        dataToUpdate.append("description", description)
        if (image) {
          dataToUpdate.append("image", image);
        } else {
          console.log('undefined')
        }
        dataToUpdate.append("content", content)
        dataToUpdate.append("creator", creator)
        dataToUpdate.append("ingredients", ingredients)
        const url = flag === "update" ? `${process.env.REACT_APP_BACKEND_URL}/api/update-recipe?recipeId=${recipeId}` : `${process.env.REACT_APP_BACKEND_URL}/api/create-recipe`
        const request = await fetch(url, {
          method: `${flag === "update" ? "PUT" : "POST"}`,
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: dataToUpdate
        })
        if (request.ok) {
          const resp = request.json()
          console.log("updated succesfully")
          resetForm()
        } else {
          console.log("failed while updating")
        }
      }
    } catch (e) {
      console.log(e)
    }


  }
  useEffect(() => {
    handleSubmission()
  }, [])


  const getRecipe = async () => {
    const request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-recipe/${recipeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (request.ok) {
      const resp = await request.json()
      console.log(resp.message)
      setRecipeName(resp.message.recipeName)
      setDescription(resp.message.description)
      setContent(resp.message.content)
      setCreator(resp.message.creator)
      setIngredients(resp.message.ingredients)

    } else {
      console.log("request failed")
    }
  }
  useEffect(() => {
    getRecipe()
  }, [])


  const resetForm = () => {
    setRecipeName("");
    setDescription("");
    setImage(null);
    setContent("");
    setCreator("");
    setIngredients("");
  };

  // here quill stuff
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['image', 'link', 'video', 'code'],
      [{ 'table': 'true' }],
      [{ 'syntax': 'true' }],
      ['clipboard']
    ]

  }
  const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video']

  return (

    <VStack
      m={4}
      spacing={4}
      bg="white"
      p={8}
      boxShadow="md"
      borderRadius="md"
      width={{ base: "90%", sm: "600px" }}
    >
      <Center>
        <Heading size="lg">{flag === "update" ? "Update Recipe" : "Create Recipes"}</Heading>
      </Center>
      <hr />
      <VStack spacing={4} width="100%">
        <InputGroup>
          <Input placeholder="Recipe Name" type='text' value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          <InputRightElement>
            <MdEdit />
          </InputRightElement>
        </InputGroup>
        <InputGroup>
          <Input placeholder="Recipe Description" type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
          <InputRightElement>
            <MdEdit />
          </InputRightElement>
        </InputGroup>
        <InputGroup>
          <Input placeholder="Thumbnail Image For Recipe" type="file" accept='.png,.jpg,.jpeg' onChange={(e) => setImage(e.target.files[0])} />
          <InputRightElement>
            <BiSolidImageAdd />
          </InputRightElement>
        </InputGroup>
        <Box>
          <QuillEditor
            theme="snow"
            className='TextEditor'
            value={content}
            formats={formats}
            modules={modules}
            onChange={(value) => setContent(value)}
          />
        </Box>

        <InputGroup>
          <Input placeholder="Creator Name" value={creator} onChange={(e) => setCreator(e.target.value)} />
          <InputRightElement>
            <MdEdit />
          </InputRightElement>
        </InputGroup>

        <InputGroup>
          <Input placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
          <InputRightElement>
            <MdEdit />
          </InputRightElement>
        </InputGroup>
      </VStack>
      <Box width="100%">
        <Button colorScheme="teal" size="md" width="full" onClick={handleSubmission}>
          {flag === 'update' ? "update recipe" : "create recipe"}
        </Button>
      </Box>
    </VStack>
  )
}

export default CreateRecipeForm