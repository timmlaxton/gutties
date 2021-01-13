import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

export const SearchBar = ({history}) => {
  const [keyword, setKeyWord] = useState('')

  const submitHandler = (e) => {
    e.prevenDefault()
    if(keyword.trim()) {
      history.pus('/search/${keyword')
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control type="text" 
      name='q' 
      onChange={(e) => setKeyWord(e.target.value)} 
      placeholder='Search products'
      className='mr-sm-2 ml-sm-5'
      ></Form.Control>

      <Button type='submit' variant='black' className='p-2'>
       Search
      </Button>
    </Form>
  )
}
