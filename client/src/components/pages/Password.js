import React from 'react'
import { Button, Input, InputGroup, InputRightElement} from '@chakra-ui/react'


function Password(props) {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick} focusBorderColor = "red.500">
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }
  export default Password;
