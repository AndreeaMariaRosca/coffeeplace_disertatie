import React, { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Button,
    Text,
    useColorModeValue,
    useDisclosure,
    ModalCloseButton,
    ModalHeader,
    ModalOverlay,
    Modal,
    ModalContent,
    Image,
    ModalBody,
    Icon,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../../utils/drinksApi";

function importAll(r) {
    const images = {};
    r.keys().forEach((key) => {
        const fileName = key.replace('./', '').split('.')[0];
        images[fileName.toLowerCase()] = r(key);
    });
    return images;
}

const images = importAll(require.context('../Profil/utils/coffees', false, /\.(png|jpe?g|svg)$/));

function Coffee(props) {
    const [editableCoffee, setEditableCoffee] = useState({ ...props });
    const [quantity, setQuantity] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const basePrice = props.price;

    // Unified color values
    const secondaryBg = useColorModeValue("gray.200", "whiteAlpha.100");
    const mainText = useColorModeValue("#1d1d1d", "whiteAlpha.900");
    const buttonBg = "#53589F";
    const buttonHoverBg = "#7A7CC6";

    // Reset editableCoffee when modal is closed
    useEffect(() => {
        if (!isOpen) {
            setEditableCoffee({ ...props });  // Reset to original props when modal closes
        }
    }, [isOpen, props]);

    const handleAddToCart = async (coffeeId) => {
        try {
            await addToCart(coffeeId, 'Coffee', quantity);
            onClose();
            setQuantity(1);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const handleCloseBtn = async () => {
        try {
            onClose();
            setQuantity(1);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const getImgByCoffeeName = (coffeeName) => {
        const key = coffeeName.replace(/\s+/g, '').toLowerCase();
        return images[key];
    };

    const handleCustomizationChange = (type, value) => {
        const newCoffee = { ...editableCoffee, [type]: value };
        let customPrice = basePrice;

        if (newCoffee.milk !== props.milk && newCoffee.milk !== "none") {
            customPrice += 0.5;
        }
        if (newCoffee.syrup !== props.syrup && newCoffee.syrup !== "none") {
            customPrice += 0.5;
        }

        setEditableCoffee({ ...newCoffee, price: customPrice });
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
                {/* Container for the image with white background */}
                <Box
                    w="100%"
                    h="200px"
                    bg="white" // white background for the image area
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image
                        src={getImgByCoffeeName(editableCoffee.name)}
                        alt={editableCoffee.name}
                        maxW="100%" // Ensures the image stays within container width
                        maxH="100%" // Ensures the image stays within container height
                        objectFit="contain" // The image will remain fully visible and centered
                    />
                </Box>

                <Box p={4}>
                    <Flex justify="space-between" align="start">
                        <Box>
                            <Text fontSize="xl" fontWeight="bold" color={mainText} mb={1}>
                                {editableCoffee.name}
                            </Text>
                            <Text fontSize="sm" color={mainText}>
                                {editableCoffee.temperature} • {editableCoffee.milk} milk • {editableCoffee.syrup} syrup
                            </Text>
                        </Box>
                        <Text fontSize="md" fontWeight="semibold" color="teal.500">
                            ${editableCoffee.price.toFixed(2)}
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
                            handleAddToCart(editableCoffee._id);
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>


            <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
                <ModalOverlay />
                <ModalContent
                    bg="white"
                    borderRadius="2xl"
                    p={4}
                    maxW="600px"
                    w="90%"
                    maxH="90vh"
                    overflowY="auto"
                >
                    <ModalHeader fontSize="2xl" fontWeight="bold" color={mainText}>
                        {editableCoffee.name}
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
                                    src={getImgByCoffeeName(editableCoffee.name)}
                                    alt={editableCoffee.name}
                                    maxW="100%"
                                    maxH="100%"
                                    objectFit="contain"
                                />
                            </Box>

                            <Text color={mainText} mb={4} fontSize="md">
                                {editableCoffee.description}
                            </Text>

                            <Box w="100%" mb={6}>
                                <Text fontWeight="medium" color={mainText} mb={2} textAlign="center">
                                    Choose your milk:
                                </Text>
                                <Flex justify="center" flexWrap="wrap" gap={2}>
                                    {["regular", "almond", "soy", "coconut", "none"].map((milk) => (
                                        <Button
                                            key={milk}
                                            size="sm"
                                            px={3}
                                            py={1}
                                            fontSize="sm"
                                            variant={editableCoffee.milk === milk ? "solid" : "outline"}
                                            colorScheme="purple"
                                            onClick={() => handleCustomizationChange("milk", milk)}
                                        >
                                            {milk.charAt(0).toUpperCase() + milk.slice(1)}
                                        </Button>
                                    ))}
                                </Flex>
                            </Box>

                            <Box w="100%" mb={6}>
                                <Text fontWeight="medium" color={mainText} mb={2}>
                                    Choose your syrup:
                                </Text>
                                <Flex justify="center" flexWrap="wrap" gap={2}>
                                    {[
                                        "vanilla",
                                        "white chocolate",
                                        "dark chocolate",
                                        "coconut",
                                        "salted caramel",
                                        "caramel",
                                        "irish cream",
                                        "hazelnuts",
                                        "none",
                                    ].map((syrup) => (
                                        <Button
                                            key={syrup}
                                            size="sm"
                                            px={3}
                                            py={1}
                                            fontSize="sm"
                                            variant={editableCoffee.syrup === syrup ? "solid" : "outline"}
                                            colorScheme="purple"
                                            onClick={() => handleCustomizationChange("syrup", syrup)}
                                        >
                                            {syrup.charAt(0).toUpperCase() + syrup.slice(1)}
                                        </Button>
                                    ))}
                                </Flex>
                            </Box>
                            {/* Quantity Selector */}
                            <Box mt={6} textAlign="center">
                                <Text fontSize="md" color={mainText} mb={2}>
                                    Quantity:
                                </Text>
                                <Flex justify="center" align="center" gap={4}>
                                    <Button
                                        size="sm"
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        background="gray.200"
                                        _hover={{ bg: "gray.300" }}
                                    >
                                        −
                                    </Button>
                                    <Text fontSize="lg" fontWeight="bold">
                                        {quantity}
                                    </Text>
                                    <Button
                                        size="sm"
                                        onClick={() => setQuantity((q) => q + 1)}
                                        background="gray.200"
                                        _hover={{ bg: "gray.300" }}
                                    >
                                        +
                                    </Button>
                                </Flex>
                            </Box>

                            <Box
                                border="1px"
                                borderColor="gray.200"
                                borderRadius="md"
                                p={3}
                                mt={4}
                                w="100%"
                                bg={useColorModeValue("gray.50", "whiteAlpha.100")}
                                textAlign="center"
                            >
                                <Text fontSize="lg" fontWeight="semibold" color={mainText}>
                                    Total Price:{" "}
                                    <Text as="span" fontWeight="bold" color="teal.500">
                                        ${(editableCoffee.price * quantity).toFixed(2)}
                                    </Text>
                                </Text>
                                <Text fontSize="sm" color="gray.600" mt={1}>
                                    Custom milk or syrup adds $0.50 each.
                                </Text>
                            </Box>

                            <Text mt={4} fontStyle="italic" color="gray.600">
                                This product is only available {editableCoffee.temperature}.
                            </Text>


                            <Flex mt={6} justify="flex-end" gap={3} w="100%">
                                <Button onClick={() => handleCloseBtn()}>Close</Button>
                                <Button
                                    background={buttonBg}
                                    color="white"
                                    _hover={{ bg: buttonHoverBg }}
                                    onClick={() => handleAddToCart(editableCoffee._id)}
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

export default Coffee;
