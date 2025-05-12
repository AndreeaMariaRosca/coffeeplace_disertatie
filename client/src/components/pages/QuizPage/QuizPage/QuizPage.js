import { Box, Progress, Heading, Spinner, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { questions } from '../data/questions';
import { getCoffeeResult } from '../utils/getCoffeeResult';
import { getUserId } from '../../../../utils/storage';
import QuestionStep from './QuestionStep';
import ResultPage from './ResultPage';
import { useNavigate } from 'react-router-dom';

export default function QuizPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const apiURL = `http://localhost:8080/api`

    const handleAnswer = (questionId, option) => {
        setAnswers((prev) => ({ ...prev, [questionId]: option }));
        if (currentStep < questions.length - 1) {
            setCurrentStep((s) => s + 1);
        } else {
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setAnswers({});
        setCurrentStep(0);
        setShowResult(false);
        setResult(null);
    };

const addToCart = async (recipe) => {
  const userID = getUserId();
  if (!userID) return;

  try {
    const response = await axios.post(`${apiURL}/recipes`, {
      userID,
      personalityCoffeeID: recipe._id
    });
    console.log('Recipe saved:', response.data);

    // ✅ Navigate with new recipe data
    navigate('/recipes', { state: { newRecipe: response.data } });

  } catch (error) {
    console.error('Failed to save recipe:', error);
  }
};


    useEffect(() => {
        if (showResult) {
            setLoading(true);
            getCoffeeResult(answers)
                .then((res) => {
                    setResult(res.data);
                })
                .catch((err) => {
                    console.error('Error fetching result:', err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [showResult]);

    if (showResult) {
        if (loading) {
            return (
                <Box textAlign="center" mt={20}>
                    <Spinner size="xl" color="purple.500" />
                    <Text mt={4}>Brewing your perfect coffee...</Text>
                </Box>
            );
        }

        if (result) {
            return <ResultPage result={result} onRestart={restartQuiz} onAddToCart={addToCart} />;
        }
    }

    return (
        <Box maxW="2xl" mx="auto" mt={12} p={8} bg="white" rounded="2xl" shadow="2xl">
            <Heading textAlign="center" mb={6} size="lg" color="purple.600">
                Personality Coffee Quiz
            </Heading>
            <Progress
                value={(currentStep + 1) * (100 / questions.length)}
                mb={6}
                colorScheme="purple"
                borderRadius="full"
            />
            <QuestionStep question={questions[currentStep]} onAnswer={handleAnswer} />
        </Box>
    );
}
