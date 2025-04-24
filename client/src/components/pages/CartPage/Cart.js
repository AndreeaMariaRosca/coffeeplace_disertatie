import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  Divider,
  Spinner,
  Icon,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { getUserId } from "../../../utils/storage";
import { FaShoppingCart } from "react-icons/fa";
import Header from "../../navbar/Header";


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiURL = "http://localhost:8080/api";
  const userId = getUserId();

  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorder = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${apiURL}/cart?userId=${userId}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getTotalQuantity = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderItemDetails = (item) => {
    if (item.type === "Coffee" || item.type === "PersonalityCoffee") {
      return (
        <VStack spacing={1} align="start" mt={2} fontSize="sm" color="gray.600">
          <Text>Milk: {item.milk}</Text>
          <Text>Syrup: {item.syrup}</Text>
          <Text>Temperature: {item.temperature}</Text>
          <Text>Ice: {item.hasIce ? "Yes" : "No"}</Text>
          {item.type === "PersonalityCoffee" && item.description && (
            <>
              <Text>Description: {item.description}</Text>
              {item.score && (
                <Text>
                  Score Range: {item.score.minValue} - {item.score.maxValue}
                </Text>
              )}
            </>
          )}
        </VStack>
      );
    }

    return null; // Beverage doesn't need extra fields
  };

  const updateQuantity = async (itemId, change) => {
    try {
      const updatedItems = cartItems.map((item) => {
        if (item._id === itemId) {
          const newQuantity = item.quantity + change;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      });

      setCartItems(updatedItems); // Update local state for immediate UI feedback
      console.log(`cartItemId = ${itemId}`)

      await axios.put(`${apiURL}/cart/update`, {
        userId,
        itemId, // This is the _id of the item inside the cart's items array
        change,
      });
    } catch (err) {
      console.error("Failed to update item quantity:", err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      console.log(`userid = ${userId}`);
      await axios.post(`${apiURL}/cart/place-order`, { userId });
      alert("Order placed successfully!");
      setCartItems([]);
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to place order");
    }
  };



  if (loading)
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" thickness="4px" color="teal.400" />
      </Box>
    );

  return (
    <>
      <Header />

      {cartItems.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          height="60vh"
          textAlign="center"
          color="gray.500"
          gap={4}
        >
          <Icon as={FaShoppingCart} boxSize={16} color="teal.300" />
          <Heading size="md">Your cart is empty</Heading>
          <Text fontSize="sm" maxW="300px">
            Looks like you haven’t added anything yet. Browse our selection and start sipping!
          </Text>
        </Flex>

      ) : (
        <Box maxW="1200px" mx="auto" mt={10} px={6}>
          <HStack spacing={3} mb={6}>
            <Icon as={FaShoppingCart} w={6} h={6} color="teal.400" />
            <Heading size="lg">Your Cart</Heading>
          </HStack>
          <Flex direction={{ base: "column", md: "row" }} gap={16} align="start">
            {/* Left: Cart Items */}
            <VStack spacing={6} align="stretch" flex="2">
              {cartItems.map((item, index) => (
                <Box
                  key={index}
                  p={6}
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={cardBorder}
                  borderRadius="xl"
                  shadow="md"
                >
                  <HStack justify="space-between" align="start">
                    <Box>
                      <Text fontWeight="bold" fontSize="xl" mb={1}>
                        {item.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Type: {item.type}
                      </Text>
                      {renderItemDetails(item)}
                    </Box>
                    <Box textAlign="right">
                      <HStack spacing={2} justify="flex-end" align="center" mt={2}>
                        <Button size="sm" onClick={() => updateQuantity(item._id, -1)}>-</Button>
                        <Text fontWeight="medium">{item.quantity}</Text>
                        <Button size="sm" onClick={() => updateQuantity(item._id, 1)}>+</Button>
                      </HStack>
                      <Text fontSize="sm" color="gray.500">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </VStack>

            {/* Right: Summary */}
            <Box
              flex="1"
              minW="300px"
              bg="gray.50"
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={cardBorder}
              position="sticky"
              top="100px"
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontWeight="medium">Total Items:</Text>
                  <Text>{getTotalQuantity()}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="bold" fontSize="lg">
                    Total Price:
                  </Text>
                  <Text fontWeight="bold" fontSize="lg" color="teal.500">
                    ${getTotal().toFixed(2)}
                  </Text>
                </HStack>
                <Button
                  colorScheme="teal"
                  width="full"
                  size="lg"
                  borderRadius="lg"
                  mt={4}
                  onClick={handlePlaceOrder}
                >
                  Order Now
                </Button>
              </VStack>
            </Box>
          </Flex>
        </Box>
      )}
    </>

  );
};

export default CartPage;
