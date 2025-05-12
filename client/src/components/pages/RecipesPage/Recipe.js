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
    VStack,
    Stack,
    Divider,
    Heading,
    useToast,
} from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../utils/drinksApi";

function importAll(r) {
    const images = {};
    r.keys().forEach((key) => {
        const fileName = key.replace('./', '').split('.')[0];
        images[fileName.toLowerCase()] = r(key);
    });
    return images;
}

const images = importAll(require.context('../Profil/utils/recipes', false, /\.(png|jpe?g|svg)$/));
const apiURL = "http://localhost:8080/api";

function Recipe(props) {
    const { onRecipeRemoved, _id, name, temperature, milk, syrup, hasIce, description, price, shortDescription } = props;

    const [selectedMilk, setSelectedMilk] = useState('regular');
    const [quantity, setQuantity] = useState(1);
    const [basePrice] = useState(price || 0);

    const milkOptions = [
        { label: 'Regular Milk', value: 'regular', extraCost: 0 },
        { label: 'Almond Milk', value: 'almond', extraCost: 0.5 },
        { label: 'Oat Milk', value: 'oat', extraCost: 0.7 },
        { label: 'Soy Milk', value: 'soy', extraCost: 0.6 },
    ];

    const selectedMilkOption = milkOptions.find((milk) => milk.value === selectedMilk);
    const milkCost = selectedMilkOption ? selectedMilkOption.extraCost : 0;
    const totalPrice = (basePrice + milkCost) * quantity;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeletingOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const toast = useToast();

    const getImgByCoffeeName = (coffeeName) => {
        const key = coffeeName?.replace(/\s+/g, '').toLowerCase();
        return images[key];
    };

    const onDeleteRecipe = async () => {
        try {
            await axios.delete(`${apiURL}/recipes/${_id}`);
            onRecipeRemoved(_id);
            onDeleteClose();
            toast({ title: "Recipe deleted", status: "success", duration: 2000 });
        } catch (error) {
            console.error("Error deleting recipe:", error);
            onDeleteClose();
        }
    };

    const handleAddToCart = async () => {
        try {
            await addToCart(_id, 'PersonalityCoffee', quantity);
            onClose();
            setQuantity(1);
            toast({ title: "Added to cart", status: "success", duration: 2000 });
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    return (
        <>
            <Box
                bg={useColorModeValue("white", "gray.700")}
                boxShadow="lg"
                borderRadius="2xl"
                p={6}
                width="100%"
                maxW={{ base: "100%", md: "1000px", lg: "1200px" }}
                mx="auto"
                my={6}
            >
                <Flex direction={{ base: "column", md: "row" }} gap={8} align="center">
                    <Image
                        src={getImgByCoffeeName(name)}
                        alt={name}
                        boxSize={{ base: "150px", md: "220px" }}
                        objectFit="contain"
                        borderRadius="lg"
                        shadow="md"
                    />
                    <Box flex="1">
                        <Heading size="lg" mb={2}>{name}</Heading>
                        <Text fontSize="md" color="gray.600" mb={4}>{description}</Text>
                        <Stack spacing={1} fontSize="sm" color="gray.500">
                            <Text><strong>Temperature:</strong> {temperature}</Text>
                            <Text><strong>Milk:</strong> {milk}</Text>
                            <Text><strong>Syrup:</strong> {syrup || 'None'}</Text>
                            <Text><strong>Ice:</strong> {hasIce ? 'Yes' : 'No'}</Text>
                            <Text><strong>Base Price:</strong> ${price.toFixed(2)}</Text>
                        </Stack>
                        <Flex mt={6} gap={4}>
                            <Button colorScheme="purple" onClick={onOpen}>
                                Customize & Add to Cart
                            </Button>
                            <Button variant="ghost" colorScheme="red" onClick={onDeleteOpen}>
                                Remove
                            </Button>
                        </Flex>
                    </Box>
                </Flex>

            </Box>

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
                <ModalOverlay />
                <ModalContent borderRadius="xl">
                    <ModalHeader textAlign="center">{name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="center" textAlign="center">
                            <Image
                                src={getImgByCoffeeName(name)}
                                alt={name}
                                boxSize="180px"
                                objectFit="contain"
                                borderRadius="md"
                                mx="auto"
                            />
                            <Text>{shortDescription}</Text>
                            <Divider />

                            {/* Choose Milk */}
                            <Box>
                                <Text fontWeight="medium" mb={2}>Choose Milk:</Text>
                                <Flex justify="center" wrap="wrap" gap={2}>
                                    {milkOptions.map((milk) => (
                                        <Button
                                            key={milk.value}
                                            variant={selectedMilk === milk.value ? "solid" : "outline"}
                                            colorScheme="teal"
                                            size="sm"
                                            onClick={() => setSelectedMilk(milk.value)}
                                        >
                                            {milk.label} {milk.extraCost > 0 ? `(+${milk.extraCost.toFixed(2)})` : ''}
                                        </Button>
                                    ))}
                                </Flex>
                            </Box>

                            {/* Quantity */}
                            <Box>
                                <Text fontWeight="medium" mb={2}>Quantity:</Text>
                                <Flex justify="center" align="center" gap={3}>
                                    <Button size="sm" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</Button>
                                    <Text fontSize="md">{quantity}</Text>
                                    <Button size="sm" onClick={() => setQuantity(q => q + 1)}>+</Button>
                                </Flex>
                            </Box>

                            {/* Total */}
                            <Text fontSize="lg" fontWeight="bold">
                                Total: ${totalPrice.toFixed(2)}
                            </Text>

                            <Flex justify="space-between" pt={4}>
                                <Button variant="outline" onClick={onClose}>Cancel</Button>
                                <Button colorScheme="purple" onClick={handleAddToCart}>Add to Cart</Button>
                            </Flex>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>


            <Modal isOpen={isDeletingOpen} onClose={onDeleteClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Recipe?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={4}>Are you sure you want to delete <strong>{name}</strong>?</Text>
                        <Flex justify="space-between">
                            <Button colorScheme="red" onClick={onDeleteRecipe}>Yes, Delete</Button>
                            <Button onClick={onDeleteClose}>Cancel</Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Recipe;
