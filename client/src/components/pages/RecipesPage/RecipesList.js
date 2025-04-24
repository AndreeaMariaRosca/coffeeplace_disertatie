import React from "react";
import Layout from "../../navbar/Layout";
import Profil from "../Profil";
import CreateForm from "../Profil/Profil/CreateForm";
import { VStack } from "@chakra-ui/react";
import axios from "axios";
import Recipe from "./Recipe";
import { getUserId } from "../../../utils/storage";

export default class RecipesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  // TODO: fix bug 
  // steps: register -> select recipes from navbar
  // intead of redirecting to recipes, it logs out
  fetchRecipes = async () => {
    try {
      const userID = getUserId();
      const response = await axios.get(`http://localhost:8080/api/recipes?userID=${userID}`);
      this.setState({ recipes: response.data });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  addNewRecipe = async (newRecipe) => {
    this.setState((prevState) => ({
      recipes: [...prevState.recipes, newRecipe],
    }));
    this.fetchRecipes();
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
        <Profil />
        <VStack alignItems={"end"}>
          {this.state.recipes.map((recipe) => (
            <Recipe key={recipe._id} {...recipe[0]} onRecipeRemoved={this.removeRecipe}/>
          ))}
          <CreateForm onRecipeAdded={this.addNewRecipe} isMaxRecipeListReached={this.state.recipes.length === 3} />
        </VStack>
      </Layout>
    );
  }

}
