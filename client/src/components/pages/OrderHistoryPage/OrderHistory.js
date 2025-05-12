import { useEffect, useState } from "react";
import {
    VStack,
    Heading,
    Box,
    Text,
    Divider,
    HStack,
    Skeleton,
    Flex,
} from "@chakra-ui/react";
import axios from "axios";

export default function OrderHistory({ userId }) {
    const [orders, setOrders] = useState([]);
    const [itemDetailsMap, setItemDetailsMap] = useState({});
    const [loading, setLoading] = useState(true);

    const apiURL = "http://localhost:8080/api";

    useEffect(() => {
        if (!userId) return;

        const fetchOrdersWithDetails = async () => {
            try {
                if (!userId) return;
                const res = await axios.get(`${apiURL}/orders/user/${userId}`);
                const ordersData = res.data;

                const itemRequests = [];

                ordersData.forEach((order) => {
                    order.items.forEach((item) => {
                        const key = `${item.itemId}_${item.itemType}`;
                        if (!itemDetailsMap[key]) {
                            const itemType = item.itemType.toLowerCase();
                            let getOrderItemUrl;
                            if (itemType === 'personalitycoffee') {
                                getOrderItemUrl = `${apiURL}/${itemType}s/by-id/${item.itemId}`;
                            } else getOrderItemUrl = `${apiURL}/${itemType}s/${item.itemId}`;

                            itemRequests.push({
                                key,
                                promise: axios.get(getOrderItemUrl),
                            });
                        }
                    });
                });

                const responses = await Promise.all(itemRequests.map((r) => r.promise));
                const newDetailsMap = { ...itemDetailsMap };

                responses.forEach((response, i) => {
                    const key = itemRequests[i].key;
                    newDetailsMap[key] = response.data;
                });

                setItemDetailsMap(newDetailsMap);
                setOrders(ordersData);
            } catch (err) {
                console.error("Failed to fetch order history with details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersWithDetails();
    }, [userId]);

    if (loading) {
        return (
            <VStack spacing={4} align="start" mt={10}>
                <Heading size="md" color="gray.700">
                    Order History
                </Heading>
                <Skeleton height="150px" width="100%" />
                <Skeleton height="150px" width="100%" />
            </VStack>
        );
    }

    const getItemName = (item) => {
        const key = `${item.itemId}_${item.itemType}`;
        return itemDetailsMap[key]?.name || "Unknown Item";
    };

    return (
        <Flex justify="left" mt={10} w="100%">
            <VStack w="100%" maxW="700px" align="start" spacing={6}>
                <Heading size="md" color="gray.700">
                    Order History
                </Heading>
                <Box
                    maxH="600px"
                    w="100%"
                    overflowY="auto"
                    pr={2}
                    css={{
                        "&::-webkit-scrollbar": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-track": {
                            background: "#f1f1f1",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#b3b3b3",
                            borderRadius: "4px",
                        },
                    }}
                >
                    <VStack spacing={5} align="stretch">
                        {orders.length === 0 ? (
                            <Text color="gray.500" fontStyle="italic">
                                No orders yet.
                            </Text>
                        ) : (
                            orders.map((order, idx) => (
                                <Box
                                    key={idx}
                                    p={5}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    bg="white"
                                    shadow="sm"
                                    _hover={{ shadow: "md" }}
                                >
                                    <HStack justify="space-between">
                                        <Text fontWeight="semibold" color="purple.600">
                                            Order #{orders.length - idx}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </Text>
                                    </HStack>

                                    <Divider my={3} />

                                    <VStack align="start" spacing={1}>
                                        {order.items.map((item, i) => (
                                            <Text key={i}>
                                                {item.quantity}× <strong>{getItemName(item)}</strong> — $
                                                {item.price.toFixed(2)}
                                            </Text>
                                        ))}
                                    </VStack>

                                    <Text fontWeight="bold" mt={4} textAlign="right">
                                        Total: ${order.totalPrice.toFixed(2)}
                                    </Text>
                                </Box>
                            ))
                        )}
                    </VStack>
                </Box>
            </VStack>
        </Flex>
    );
}