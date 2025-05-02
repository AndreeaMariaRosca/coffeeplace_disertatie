import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Text,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useColorModeValue,
    Image,
    HStack,
} from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import badge1 from '../Profil/utils/badges/badge1.png';
import { getUserId } from "../../../utils/storage";
import { addToCart } from "../../../utils/drinksApi";

function Recipe(props) {
    const secondaryBg = useColorModeValue("gray.200", "whiteAlpha.100");
    const mainText = useColorModeValue("#1d1d1d", "whiteAlpha");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeletingOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const { onRecipeRemoved, _id, name, temperature, milk, syrup, description } = props;
    
    // TODO: when clicking Remove recipe, the popups overlap
    // only the deleting recipe modal should be opened
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // TODO: when having the 3 recipes, the recipes list overlaps with the user details
    // the recipes list should be in the same place no matter how many recipes are created

    const navigate = useNavigate();

    const apiURL = "http://localhost:8080/api";

    const onDeleteRecipe = async () => {
        try {
            onClose();
            await axios.delete(`${apiURL}/recipes/${_id}`);

            onRecipeRemoved(_id);

            onDeleteClose();
        } catch (error) {
            console.error("Error deleting recipe:", error);
            onDeleteClose();
        }
    };

    const cancelDeletion = () => {
        onClose();
        onDeleteClose();
        navigate("/recipes");
    };

    const handleAddToCart = async (recipeId) => {
        try {
            // TODO: to add multiple coffees
            await addToCart(recipeId, 'PersonalityCoffee', 1);
            
            onClose();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    return (
        <>
            <Box onClick={onOpen} cursor="pointer">
                <Flex
                    borderRadius="20px"
                    bg={secondaryBg}
                    h="150px"
                    w={{ base: "315px", md: "100%" }}
                    direction="column"
                    fontFamily="Poppins"
                >
                    <Box p="20px">
                        <Text fontWeight="600" w="100%" fontSize="2xl" color={mainText}>
                            {name}
                        </Text>
                    </Box>

                    <Flex w="100%" p="20px" height="100%">
                        <Flex direction="column" mr="10px">
                            <Text
                                color={mainText}
                                whiteSpace={description?.length > 80 ? "nowrap" : "regular"}
                                overflow={description?.length > 80 ? "hidden" : "visible"}
                                textOverflow={description?.length > 80 ? "ellipsis" : "unset"}
                                maxW="300px"
                            >
                                {description}
                            </Text>
                        </Flex>
                        <div>
                            <Button
                                background='#53589F'
                                color={'white'}
                                _hover={{ bg: '#7A7CC6' }}
                                mr="10px"
                                onClick={onOpen}
                            >
                                Add to cart
                            </Button>
                        </div>
                        <div>
                            <Button
                                background='#C33A3A'
                                color={'white'}
                                _hover={{ bg: '#D76A6A' }}
                                mr="10px"
                                onClick={onDeleteOpen}
                            >
                                Remove recipe
                            </Button>
                        </div>
                    </Flex>
                </Flex>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{name}</ModalHeader>
                    <HStack>

                        <Image
                            src={badge1}
                            boxSize="120px"
                            objectFit="cover"
                        />
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>{description}</Text>
                        </ModalBody>
                    </HStack>
                    <ModalBody>
                        <Text>{milk}</Text>
                        <Text>{syrup}</Text> 
                        <Text justifySelf={'center'} mt='35' fontStyle="italic">This product is only available {temperature}</Text>
                        <Flex mt="4" justify="space-between">
                            <Button onClick={onClose}>
                                Close
                            </Button>
                            <Button onClick={() => handleAddToCart(_id)}>
                                Add to cart
                            </Button>
                        </Flex>
                    </ModalBody>

                </ModalContent>
            </Modal>

            <Modal isOpen={isDeletingOpen} onClose={onDeleteClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Deletion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to delete the recipe "{name}"?</Text>
                        <Flex mt="4" justify="space-between">
                            <Button colorScheme="red" onClick={onDeleteRecipe}>
                                Yes, Delete
                            </Button>
                            <Button onClick={cancelDeletion}>
                                No, Cancel
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Recipe;
