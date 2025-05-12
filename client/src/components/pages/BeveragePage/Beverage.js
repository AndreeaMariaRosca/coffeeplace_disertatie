import React, { useState } from "react";
import {
    Box,
    Flex,
    Button,
    Text,
    useColorModeValue,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Image,
    Icon,
    useToast
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../../utils/drinksApi";

// Helper function if you have multiple images
function importAll(r) {
    const images = {};
    r.keys().forEach((key) => {
        const fileName = key.replace('./', '').split('.')[0];
        images[fileName.toLowerCase()] = r(key);
    });
    return images;
}
const images = importAll(require.context('../Profil/utils/beverages', false, /\.(png|jpe?g|svg)$/));

function Beverage(props) {
    const secondaryBg = useColorModeValue("gray.200", "whiteAlpha.100");
    const mainText = useColorModeValue("#1d1d1d", "whiteAlpha.900");
    const buttonBg = "#53589F";
    const buttonHoverBg = "#7A7CC6";
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [quantity, setQuantity] = useState(1);
    const toast = useToast();

    const getImgByName = (name) => {
        const key = name.replace(/\s+/g, '').toLowerCase();
        return images[key];
    };

    const handleAddToCart = async (beverageId) => {
        try {

            await addToCart(beverageId, 'Beverage', quantity);
            onClose();
            setQuantity(1);
                        toast({
                title: "Added to cart",
                description: `${props.name} (${quantity}) has been added to your cart.`,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            console.error("Error adding beverage to cart:", error);
        }
    };

    return (
        <>
            <Box
                onClick={onOpen}
                cursor="pointer"
                borderRadius="xl"
                bg={secondaryBg}
                boxShadow="md"
                transition="0.2s"
                _hover={{ transform: "scale(1.02)" }}
                w="100%"
                maxW="400px"
                overflow="hidden"
            >
                {/* Image area with white background */}
                <Box
                    w="100%"
                    h="200px"
                    bg="white"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image
                        src={getImgByName(props.name)}
                        alt={props.name}
                        maxW="100%"
                        maxH="100%"
                        objectFit="contain"
                    />
                </Box>

                <Box p={4}>
                    <Flex justify="space-between" align="start">
                        <Text fontSize="xl" fontWeight="bold" color={mainText}>
                            {props.name}
                        </Text>
                        <Text fontSize="md" fontWeight="semibold" color="teal.500">
                            ${props.price.toFixed(2)}
                        </Text>
                    </Flex>

                    <Button
                        leftIcon={<Icon as={FaShoppingCart} />}
                        background={buttonBg}
                        color="white"
                        _hover={{ bg: buttonHoverBg }}
                        mt={4}
                        w="full"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(props._id);
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
                <ModalOverlay />
                <ModalContent bg="white" borderRadius="2xl" p={6} maxW="600px" w="90%">
                    <ModalHeader fontSize="2xl" fontWeight="bold" color={mainText}>
                        {props.name}
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pt={4}>
                        <Flex direction="column" align="center" textAlign="center">
                            <Box
                                w="100%"
                                h="200px"
                                bg="white"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Image
                                    src={getImgByName(props.name)}
                                    alt={props.name}
                                    maxW="100%"
                                    maxH="100%"
                                    objectFit="contain"
                                />
                            </Box>

                            <Text color={mainText} mb={4} fontSize="md">
                                {props.description}
                            </Text>

                            <Text fontSize="md" fontWeight="medium" color="gray.600" mt={2}>
                                Total: ${(props.price * quantity).toFixed(2)}
                            </Text>

                            {/* Quantity controls */}
                            <Flex align="center" justify="center" gap={3} mt={4}>
                                <Button
                                    size="sm"
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                >
                                    −
                                </Button>
                                <Text fontSize="lg">{quantity}</Text>
                                <Button size="sm" onClick={() => setQuantity((q) => q + 1)}>
                                    +
                                </Button>
                            </Flex>

                            <Flex mt={6} justify="flex-end" gap={3} w="100%">
                                <Button onClick={() => {
                                    setQuantity(1);
                                    onClose();
                                }}>
                                    Close
                                </Button>
                                <Button
                                    background={buttonBg}
                                    color="white"
                                    _hover={{ bg: buttonHoverBg }}
                                    onClick={() => handleAddToCart(props._id)}
                                >
                                    Add to cart
                                </Button>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    );
}

export default Beverage;
