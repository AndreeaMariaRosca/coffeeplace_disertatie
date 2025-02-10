import express from 'express';
import { Beverage } from '../models/beverages.js';

const beverageRouter = express.Router();
beverageRouter.use(express.json());

beverageRouter.get("/", async (_, res) => {
    try {
        const beverages = await Beverage.find({});
        if (!beverages) return res.status(404).json({ error: 'Beverages not found' });
        res.status(200).send(beverages);
    } catch (error) {
        res.status(500).send(`Error in retrieving all beverages: ${error}`);
    }
    finally {
        res.end();
    }
});

beverageRouter.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const beverage = await Beverage.findById(id);
        if (!beverage) {
            return res.status(404).json({ error: 'Beverage not found' });
        }
        res.status(200).send(beverage);
    } catch {
        res.status(500).json({ error: `Error in retrieving the beverage: ${error}` });
    }
    finally {
        res.end();
    }

});

export default beverageRouter;