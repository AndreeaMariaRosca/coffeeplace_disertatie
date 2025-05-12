import express from 'express';
import { PersonalityCoffee } from '../models/personalityCoffee.js';

const personalityCoffeeRouter = express.Router();
personalityCoffeeRouter.use(express.json());

personalityCoffeeRouter.get("/", async (_, res) => {
    try {
        const coffees = await PersonalityCoffee.find();
        if (!coffees) return res.status(404).json({ error: 'Personality coffee not found' });
        res.status(200).send(coffees);
    } catch (error) {
        res.status(500).send(`Error in retrieving all personality coffees: ${error}`);
    }
    finally {
        res.end();
    }
});

personalityCoffeeRouter.get('/by-id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const coffees = await PersonalityCoffee.findById(id);
        if (!coffees) return res.status(404).json({ error: 'Recipe coffees not found' });
        res.status(200).send(coffees);
    } catch (error) {
        res.status(500).send(`Error in retrieving all recipe coffees: ${error}`);
    }
    finally {
        res.end();
    }
});

personalityCoffeeRouter.get('/:score', async (req, res) => {
    const score = parseInt(req.params.score, 10);

    if (isNaN(score)) {
        return res.status(400).json({ error: 'Score must be a valid number' });
    }
    try {
        const coffee = await PersonalityCoffee.findOne({
            'score.minValue': { $lte: score },
            'score.maxValue': { $gte: score }
        });

        if (!coffee) {
            return res.status(404).json({ error: 'Personality coffee not found' });
        }

        res.status(200).send(coffee);
    } catch (error) {
        res.status(500).json({ error: `Error in retrieving the coffee: ${error.message}` });
    } finally {
        res.end();
    }
});


personalityCoffeeRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedCoffee = await PersonalityCoffee.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        res.status(200).send(updatedCoffee);
    } catch (error) {
        res.status(500).send({ error: "Failed to update personality coffee" });
    }
});


export default personalityCoffeeRouter;