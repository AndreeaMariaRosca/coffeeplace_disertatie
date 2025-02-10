import express from 'express';

const cartRouter = express.Router();
cartRouter.use(express.json());

import { Cart } from '../models/cart.js';

// cartRouter.post('/', async (request, response) => {
//     console.log(`sunt in post!`)
//     const body = request.body;

//     try {
//         console.log(`body=${JSON.stringify(body)}`);
//         const cart = await new Cart(body).save();
//         response.status(201).send(cart);
//     } catch (error) {
//         response.status(500).json({ error: 'Internal server error!' })
//     } finally {
//         return response.end();
//     }

// });

cartRouter.post("/", async (req, res) => {
    const { coffeeId } = req.body;
  
    console.log("in post")
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }
  
    // Check if the coffee item is already in the cart
    const existingItem = cart.items.find(
      (item) => item.coffeeId.toString() === coffeeId
    );
  
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      cart.items.push({ coffeeId, quantity: 1 });
    }
  
    await cart.save();
    const updatedCart = await cart.populate("items.coffeeId");
    res.json(updatedCart.items);
  });

cartRouter.get('/:id', async (request, response) => {
    const id = request.params.id;
    if (!id) {
        return response.status(400).json({ error: 'form not found' })
    }

    try {
        const cart = await Cart.findById(id);
        if (!cart) {
            return response.status(400).json({ error: 'form not found' })
        }
        return response.status(200).send(form);
    } catch {
        return response.status(500).json({ error: 'Internal server error!' })
    }
});

export default cartRouter;
