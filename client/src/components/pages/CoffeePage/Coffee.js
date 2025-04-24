import React, { useState } from "react";
import {
    Box,
    Flex,
    Button,
    Select,
    Text,
    Spacer,
    useColorModeValue,
    useDisclosure,
    ModalCloseButton,
    ModalHeader,
    ModalOverlay,
    Modal,
    ModalContent,
    HStack,
    Image,
    ModalBody
} from "@chakra-ui/react";
import { addToCart } from "../../../utils/drinksApi";
import badge1 from '../Profil/utils/badges/badge1.png';

function Coffee(props) {
    const secondaryBg = useColorModeValue("gray.200", "whiteAlpha.100");
    const mainText = useColorModeValue("#1d1d1d", "whiteAlpha");

    const [editableCoffee, setEditableCoffee] = useState({ ...props });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setEditableCoffee((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        props.onSave(editableCoffee);
    };

    const handleAddToCart = async (coffeeId) => {
        try {
            await addToCart(coffeeId, 'Coffee', 1);
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
                        <Text fontWeight="600" fontSize="2xl" color={mainText}>
                            {editableCoffee.name}
                        </Text>
                    </Box>
                    <Flex p="20px" align="center" gap={4} wrap="wrap">
                        <Text color={mainText}>{editableCoffee.temperature}</Text>
                        <Text color={mainText}>{editableCoffee.milk} milk</Text>
                        <Text color={mainText}>{editableCoffee.syrup} syrup</Text>
                        <Text color={mainText}>Price: ${editableCoffee.price.toFixed(2)}</Text>
                        <Spacer />
                        <Button
                            background="#53589F"
                            color="white"
                            _hover={{ bg: "#7A7CC6" }}
                            onClick={() => handleAddToCart(editableCoffee._id)}
                        >
                            Add to cart
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                }}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{editableCoffee.name}</ModalHeader>
                    <HStack p={4} spacing={4}>
                        <Image src={badge1} boxSize="120px" objectFit="cover" />
                        <ModalCloseButton />
                        <ModalBody>
                            <Text mb={4}>{editableCoffee.description}</Text>

                            <Select
                                mb={2}
                                value={editableCoffee.milk}
                                onChange={(e) => handleInputChange(e, "milk")}
                            >
                                <option value="regular">Regular</option>
                                <option value="almond">Almond</option>
                                <option value="soy">Soy</option>
                                <option value="coconut">Coconut</option>
                                <option value="none">None</option>
                            </Select>

                            <Select
                                mb={4}
                                value={editableCoffee.syrup}
                                onChange={(e) => handleInputChange(e, "syrup")}
                            >
                                <option value="none">None</option>
                                <option value="vanilla">Vanilla</option>
                                <option value="white chocolate">White Chocolate</option>
                                <option value="dark chocolate">Dark Chocolate</option>
                                <option value="caramel">Caramel</option>
                            </Select>

                            <Text mt={6} fontStyle="italic">
                                This product is only available {editableCoffee.temperature}
                            </Text>

                            <Flex mt="6" justify="space-between">
                                <Button onClick={onClose}>Close</Button>
                                {/* <Button colorScheme="green" onClick={handleSave}>Save</Button> */}
                                <Button colorScheme="blue" onClick={() => handleAddToCart(editableCoffee._id)}>
                                    Add to cart
                                </Button>
                            </Flex>
                        </ModalBody>
                    </HStack>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Coffee;
