import React from 'react';
import { Text, VStack, HStack, Flex, Spacer, useDisclosure, Button } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { IoMail } from 'react-icons/io5';
import './UserDetails.css';
import AvatarIcon from './AvatarIcon'

function UserDetails({ user: { username, email } = {} }) {

    return (
        <Flex>
            <VStack className='avatar' >

                <AvatarIcon />
                <Text fontSize='4xl' color='#7A7CC6'>{username}</Text>
                <Spacer />
                <Spacer />
                <HStack className='contact'>
                    <Icon as={IoMail} w={8} h={8} color='#7A7CC6' />
                    <Text fontSize='xl'>{email}</Text>
                </HStack>
                
            </VStack>
            <Spacer />

        </Flex>
    )
}

export default UserDetails;