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


function CreateForm({ onRecipeAdded, isMaxRecipeListReached = false }) {
    const onAdd = async (form, recipe) => {
        await axios.post(`${apiURL}/form`, form);

        const recipeRes = await axios.post(`${apiURL}/recipes`, recipe);
        onRecipeAdded(recipeRes.data);

        onClose();
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <VStack>

            {isOpen &&
                <FillForm
                onAdd={onAdd}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                />
            }
            {isMaxRecipeListReached ?
                (<Text alignSelf={'flex-end'}>You are allowed a maximum of three recipes. For new ones, remove one or more recipes.</Text>) :
                (<Button className='createRecipeButton' background='#9F9FED' _hover={{ bg: '#D4C1EC' }} variant='solid' onClick={onOpen} onClose={onClose} size='lg' px="320">
                    <Text fontSize='xl' justifySelf={"center"}>Create your new recipe</Text>
                </Button>)
            }
        </VStack>
    );
}

export default CreateForm;