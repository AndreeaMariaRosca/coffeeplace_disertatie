import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  Spinner,
  Icon,
  useColorModeValue,
  Flex,
  CloseButton,
  Progress,
  AlertTitle,
} from "@chakra-ui/react";
import axios from "axios";
import { getUserId } from "../../../utils/storage";
import { FaShoppingCart } from "react-icons/fa";
import Header from "../../navbar/Header";
import { FaMoon, FaSun } from "react-icons/fa";


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("success");
  const [progress, setProgress] = useState(100);

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

  useEffect(() => {
    if (!alertMessage) return;

    let interval;
    let timeout;
    const duration = 4000; // 4 seconds
    const step = 100; // ms
    const decrement = (step / duration) * 100;

    interval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - decrement));
    }, step);

    timeout = setTimeout(() => {
      setAlertMessage("");
      setProgress(100);
      clearInterval(interval);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [alertMessage]);


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
      setCartItems([]);
      setAlertStatus("success");
      setAlertMessage("Order placed successfully!");
    } catch (err) {
      console.error("Order failed:", err);
      setAlertStatus("error");
      setAlertMessage("Failed to place order");
    }
  };

  const handleDeleteItem = async (itemId, itemType) => {
    try {
      await axios.delete(`${apiURL}/cart/remove`, {
        data: { userId, itemId, itemType },
      });

      setCartItems((prev) => prev.filter((item) => item._id !== itemId));
      setAlertStatus("success");
      setAlertMessage("Item removed from cart.");
    } catch (err) {
      console.error("Failed to remove item:", err);
      setAlertStatus("error");
      setAlertMessage("Failed to remove item.");
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
      {alertMessage && (
        <Box
          position="fixed"
          top="100px"
          right="20px"
          zIndex="toast"
          minW="300px"
          maxW="90vw"
        >
          <Alert
            status={alertStatus}
            variant="surface"
            borderRadius="md"
            boxShadow="lg"
            padding={4}
          >
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>{alertMessage}</AlertTitle>
              <Progress
                mt={2}
                size="xs"
                colorScheme={alertStatus === "success" ? "green" : "red"}
                value={progress}
                borderRadius="sm"
              />
            </Box>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setAlertMessage("")}
            />
          </Alert>
        </Box>
      )}


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
                      <Button
                        mt={2}
                        size="xs"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => handleDeleteItem(item._id, item.type)}
                      >
                        Remove
                      </Button>
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
