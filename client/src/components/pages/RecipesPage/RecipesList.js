import React from "react";
import Layout from "../../navbar/Layout";
import { HStack, VStack, Text, Button, Center } from "@chakra-ui/react";
import axios from "axios";
import Recipe from "./Recipe";
import { getUserId } from "../../../utils/storage";
import { Link } from "react-router-dom";

export default class RecipesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    if (location && location.state && location.state.newRecipe) {
      await this.addNewRecipe(location.state.newRecipe);
      window.history.replaceState({}, document.title);
    }
    this.fetchRecipes();
  }

  fetchRecipes = async () => {
    const userID = getUserId();
    try {
      const response = await axios.get(`http://localhost:8080/api/recipes?userID=${userID}`);
      this.setState({ recipes: response.data });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  addNewRecipe = async (newRecipe) => {
    try {
      const getNewPersonalityCoffee = await axios.get(
        `http://localhost:8080/api/personalityCoffee/by-id/${newRecipe.personalityCoffeeID}`
      );

      const newCoffee = Array.isArray(getNewPersonalityCoffee.data)
        ? getNewPersonalityCoffee.data[0]
        : getNewPersonalityCoffee.data;

      this.setState(
        (prevState) => ({
          recipes: [...prevState.recipes, newCoffee],
        }),
        () => {
          console.log("Updated recipes:", this.state.recipes);
        }
      );
    } catch (error) {
      console.error("Error adding new recipe:", error);
    }
  };

  removeRecipe = (recipeID) => {
    this.setState((prevState) => ({
      recipes: prevState.recipes.filter(recipe => recipe._id !== recipeID),
    }));
    this.fetchRecipes();
  };

  render() {
    return (
      <Layout>

        <HStack
          align="start"
          justify="center"
          p={6}
          width="100%"
        >
          <VStack
            align="center"
            spacing={6}
            maxW="700px"
            w="100%"
          >
            {this.state.recipes.length === 0 ? (
              <Center>
                <VStack spacing={4} align="center" maxW="600px">
                  <Text fontSize="lg" color="gray.700" textAlign="center">
                    Your unique traits shape <Text as="span" fontWeight="bold" color="teal.600">every sip</Text>.
                    By completing a short and fun quiz about your preferences — including your
                    <Text as="span" fontWeight="semibold"> sex</Text>,
                    <Text as="span" fontWeight="semibold"> favorite genre</Text>,
                    <Text as="span" fontWeight="semibold"> color</Text>,
                    <Text as="span" fontWeight="semibold"> season</Text>, whether you're a
                    <Text as="span" fontWeight="semibold"> morning bird</Text> or
                    <Text as="span" fontWeight="semibold"> night owl</Text>, and your
                    <Text as="span" fontWeight="semibold"> zodiac sign</Text> — we craft a custom coffee recipe that matches your
                    <Text as="span" fontWeight="bold" color="teal.600"> vibe</Text>.
                  </Text>

                  <Text fontSize="lg" color="gray.700" textAlign="center">
                    Are you a <Text as="span" fontWeight="bold">bold and fiery Aries</Text> who thrives at
                    <Text as="span" fontWeight="semibold"> sunrise</Text>? Or a
                    <Text as="span" fontWeight="semibold"> calm, introspective</Text>
                    <Text as="span" fontWeight="bold"> night-loving Pisces</Text> who prefers
                    <Text as="span" fontWeight="semibold"> subtle, soothing flavors</Text>?
                    Your coffee reflects that.
                  </Text>
                  <Link to="/personality-coffee">
                    <Button className='createRecipeButton' background='#9F9FED' _hover={{ bg: '#D4C1EC' }} variant='solid' size='lg'>
                      <Text fontSize='xl' justifySelf={"center"}>Create a recipe</Text>
                    </Button>
                  </Link>
                </VStack>
              </Center>
            ) : (
              this.state.recipes.map((recipe) => (
                <Recipe
                  key={recipe._id}
                  {...recipe}
                  onRecipeRemoved={this.removeRecipe}
                />
              ))
            )}
          </VStack>
        </HStack>
      </Layout>

    );
  }
}
