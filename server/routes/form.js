import express from 'express';

const formRouter = express.Router();
formRouter.use(express.json());

import { Form } from '../models/form.js';

formRouter.post('/', async (request, response) => {
    const body = request.body;
    console.log(`post /api/form being called`);

    try {
        console.log(`body=${JSON.stringify(body)}`);
        const form = await new Form(body).save();
        response.status(201).send(form);
    } catch (error) {
        response.status(500).json({ error: 'Internal server error!' })
    } finally {
        return response.end();
    }

});

formRouter.get('/:id', async (request, response) => {
    const id = request.params.id;
    if (!id) {
        return response.status(400).json({ error: 'form not found' })
    }

    try {
        const form = await Form.findById(id);
        if (!form) {
            return response.status(400).json({ error: 'form not found' })
        }
        return response.status(200).send(form);
    } catch {
        return response.status(500).json({ error: 'Internal server error!' })
    }

});

export default formRouter;
