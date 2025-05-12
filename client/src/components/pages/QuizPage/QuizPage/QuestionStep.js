import { VStack, Text, Button } from '@chakra-ui/react';

export default function QuestionStep({ question, onAnswer }) {
    return (
        <VStack spacing={6}>
            <Text fontSize="2xl" fontWeight="semibold" color="gray.700">
                {question.question}
            </Text>

            {question.options.map((option) => (
                <Button
                    key={option.value}
                    onClick={() => onAnswer(question.id, option)}
                    w="100%"
                    maxW="md"
                    colorScheme="purple"
                    variant="ghost"
                    borderWidth={2}
                    borderColor="purple.300"
                    _hover={{ bg: 'purple.50' }}
                    fontWeight="medium"
                >
                    {option.label}
                </Button>
            ))}
        </VStack>
    );
}
