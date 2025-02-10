import React, { useState } from "react";
import {
    Box,
    Flex,
    Button,
    Select,
    Text,
    Spacer,
    useColorModeValue
} from "@chakra-ui/react";
import axios from 'axios';

function Coffee(props) {

    const secondaryBg = useColorModeValue("gray.200", "whiteAlpha.100");
    const mainText = useColorModeValue("#1d1d1d", "whiteAlpha");
    const boxBg = useColorModeValue("gray.100", "whiteAlpha.100");

    const [editableCoffee, setEditableCoffee] = useState({ ...props });
    const [isEditing, setIsEditing] = useState(false);
    const [cart, setCart] = useState([]);

    const handleInputChange = (e, field) => {
        const value = field === "hasIce" ? e.target.checked : e.target.value;
        setEditableCoffee((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Send updated data to the server
        props.onSave(editableCoffee);
        setIsEditing(false);
    };

    const handleAddToCart = async (coffeeId) => {
        try {
            console.log(`coffeeId=${coffeeId}`)
            const response = await axios.post("/api/cart", {coffeeId});
            console.log(`====response: ${response}`)
            setCart(response.data); // Update the cart state
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    return (
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
                    {editableCoffee.name}
                </Text>
            </Box>
            <Flex w="100%" p="20px" height="100%">
                <Flex direction="column" flex="1" mr="10px">
                    <Text color={mainText}>{editableCoffee.temperature}</Text>
                </Flex>

                <Flex mr="10px">
                    {isEditing ? (
                        <Select
                            value={editableCoffee.milk}
                            onChange={(e) => handleInputChange(e, "milk")}
                        >
                            <option value="regular">Regular</option>
                            <option value="almond">Almond</option>
                            <option value="soy">Soy</option>
                            <option value="coconut">Coconut</option>
                            <option value="none">None</option>
                        </Select>
                    ) : (
                        <Text color={mainText}>{editableCoffee.milk} milk</Text>
                    )}
                </Flex>

                <Flex mr="10px">
                    {isEditing ? (
                        <Select
                            value={editableCoffee.syrup}
                            onChange={(e) => handleInputChange(e, "syrup")}
                        >
                            <option value="none">None</option>
                            <option value="vanilla">Vanilla</option>
                            <option value="white chocolate">White Chocolate</option>
                            <option value="dark chocolate">Dark Chocolate</option>
                            <option value="caramel">Caramel</option>
                        </Select>
                    ) : (
                        <Text color={mainText}>{editableCoffee.syrup} syrup</Text>
                    )}
                </Flex>

                <Flex>
                    <Text color={mainText}>Price: ${editableCoffee.price.toFixed(2)}</Text>
                </Flex>

                <Spacer />

                <Flex>
                    {isEditing ? (
                        <Button background='#53589F' color={'white'} _hover={{ bg: '#7A7CC6' }} onClick={handleSave}>
                            Save
                        </Button>
                    ) : (
                        <div>
                            <Button background='#53589F' color={'white'} _hover={{ bg: '#7A7CC6' }} onClick={() => handleAddToCart(editableCoffee._id)} mr="10px"> Add to cart</Button>
                            <Button background="#7A7CC6" color={'white'} _hover={{ bg: '#9F9FED' }} onClick={() => setIsEditing(true)} mr="10px">
                                Edit
                            </Button>
                        </div>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Coffee;
