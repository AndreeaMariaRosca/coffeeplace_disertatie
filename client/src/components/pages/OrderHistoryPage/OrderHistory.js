// components/Profile/OrderHistory.jsx
import { useEffect, useState } from 'react';
import {
    VStack,
    Heading,
    Box,
    Text,
    Divider,
    Spinner,
    HStack,
    Skeleton,
    Flex,
} from '@chakra-ui/react';
import axios from 'axios';

export default function OrderHistory({ userId }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/orders/user/${userId}`);
                setOrders(res.data);
            } catch (err) {
                console.error('Failed to fetch order history:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) {
        return (
            <VStack spacing={4} align="start" mt={10}>
                <Heading size="md" color="gray.700">Order History</Heading>
                <Skeleton height="150px" width="100%" />
                <Skeleton height="150px" width="100%" />
            </VStack>
        );
    }

    return (
        <Flex justify="left" mt={10} w="100%">
            <VStack w="100%" maxW="700px" align="start" spacing={6}>
                <Heading size="md" color="gray.700">Order History</Heading>
                <Box
                    maxH="600px"
                    w="100%"
                    overflowY="auto"
                    pr={2}
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#b3b3b3',
                            borderRadius: '4px',
                        },
                    }}
                >
                    <VStack spacing={5} align="stretch">
                        {orders.length === 0 ? (
                            <Text color="gray.500" fontStyle="italic">No orders yet.</Text>
                        ) : (
                            orders.map((order, idx) => (
                                <Box
                                    key={idx}
                                    p={5}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    bg="white"
                                    shadow="sm"
                                    _hover={{ shadow: 'md' }}
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
                                                {item.quantity}× <strong>{item.itemId?.name || 'Unknown Item'}</strong> — ${item.price.toFixed(2)}
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
