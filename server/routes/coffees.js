import express from 'express';
import { Coffee } from '../models/coffees.js';

const coffeeRouter = express.Router();
coffeeRouter.use(express.json());

coffeeRouter.get("/", async (_, res) => {
    try {
        const coffees = await Coffee.find();
        console.log(coffees);
        if (!coffees) return res.status(404).json({ error: 'Coffees not found' });
        res.status(200).send(coffees);
    } catch (error) {
        res.status(500).send(`Error in retrieving all coffees: ${error}`);
    }
    finally {
        res.end();
    }
});

coffeeRouter.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const coffee = await Coffee.findById(id);
        if (!coffee) {
            return res.status(404).json({ error: 'Coffee not found' })
        }
        res.status(200).send(Coffee);
    } catch {
        res.status(500).json({ error: `Error in retrieving the coffee: ${error}` });
    }
    finally {
        res.end();
    }

});

coffeeRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedCoffee = await Coffee.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      res.status(200).send(updatedCoffee);
    } catch (error) {
      res.status(500).send({ error: "Failed to update coffee" });
    }
  });
  

export default coffeeRouter;