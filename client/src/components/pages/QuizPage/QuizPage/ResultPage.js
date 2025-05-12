import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button, VStack, Stack, Image } from '@chakra-ui/react';

export default function ResultPage({ result, onRestart, onAddToCart }) {
    const navigate = useNavigate();

    const handleAddAndRedirect = async () => {
        try {
            const savedRecipe = await onAddToCart(result);
            navigate('/recipes', { state: { newRecipe: savedRecipe } });
        } catch (err) {
            console.error("Error saving recipe:", err);
        }
    };

    return (
        <Box
            maxW="2xl"
            mx="auto"
            mt={12}
            p={10}
            bg="white"
            borderRadius="2xl"
            boxShadow="2xl"
            textAlign="center"
        >
            <VStack spacing={6}>
                <Heading size="md" color="gray.600">
                    Your Personality Coffee is:
                </Heading>

                <Heading size="3xl" color="purple.700">
                    {result.name}
                </Heading>

                {result.image && (
                    <Image
                        src={result.image}
                        alt={result.name}
                        boxSize="250px"
                        objectFit="cover"
                        borderRadius="xl"
                        shadow="lg"
                    />
                )}

                <Text fontSize="lg" color="gray.600" px={4}>
                    {result.description}
                </Text>

                <Stack direction={{ base: "column", md: "row" }} spacing={4} pt={6}>
                    <Button variant="outline" colorScheme="purple" onClick={onRestart}>
                        Retake Quiz
                    </Button>

                    <Button onClick={handleAddAndRedirect}>
                        Add Recipe to List
                    </Button>
                </Stack>
            </VStack>
        </Box>
    );
}
