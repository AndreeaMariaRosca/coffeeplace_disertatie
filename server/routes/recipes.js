import express from 'express';
import { Recipe } from '../models/recipes.js';
import { PersonalityCoffee } from '../models/personalityCoffee.js';

const recipeRouter = express.Router();
recipeRouter.use(express.json());

recipeRouter.get("/", async (req, res) => {
    try {
        const { userID } = req.query;
        let recipes;
        if (userID) {
            recipes = await Recipe.find({ userID: userID });
        } else recipes = await Recipe.find({});

        if (!recipes) return res.status(404).json({ error: 'Recipes not found' });

        const personalityCoffees = [];
        for (let coffee of recipes) {
            const personalityCoffee = await PersonalityCoffee.find({ _id: coffee.personalityCoffeeID });
            personalityCoffees.push(personalityCoffee);
        }

        res.status(200).send(personalityCoffees);
    } catch (error) {
        res.status(500).send(`Error in retrieving all personality coffees: ${error}`);
    }
    finally {
        res.end();
    }
});

recipeRouter.post('/', async (request, response) => {
    const { body } = request;

    try {
        const recipe = await new Recipe(body).save();
        response.status(201).send(recipe);
    } catch (error) {
        response.status(500).json({ error: 'Internal server error!' })
    } finally {
        return response.end();
    }

});

recipeRouter.delete('/:recipeID', async (req, res) => {
    try {
        console.log("in delete")
        const { recipeID } = req.params;
        const deletedRecipe = await Recipe.findOneAndDelete({personalityCoffeeID: recipeID});
        if (!deletedRecipe) {
            res.status(404).json('recipe not found')
        }
        res.status(200).send(deletedRecipe);
    } catch (error) {
        console.log("hopa error" + error)
    }
});

export default recipeRouter;