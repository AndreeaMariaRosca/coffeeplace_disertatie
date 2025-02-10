import React from "react";
import {
    VStack,
    useDisclosure,
    Button, 
    Text,
    Flex
} from '@chakra-ui/react';

import axios from 'axios';
import { FillForm } from "./FillForm";

const apiURL = "http://localhost:8080/api";


function CreateForm({ onRecipeAdded }) {
    const onAdd = async (form, recipe) => {
        await axios.post(`${apiURL}/form`, form);

        const recipeRes = await axios.post(`${apiURL}/recipes`, recipe);
        console.log(`=== recipeRes = ${JSON.stringify(recipeRes)}`)
        onRecipeAdded(recipeRes.data);

        onClose();
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
            <VStack>
                <Button className='button' background='#9F9FED' _hover={{ bg: '#D4C1EC' }} variant='solid' onClick={onOpen} onClose={onClose} size='lg' px="400">
                    <Text fontSize='xl'>Create your new recipe drink</Text>
                </Button>
                {isOpen &&
                    <FillForm
                        onAdd={onAdd}
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                    />
                }
            </VStack>
    );
}

export default CreateForm;