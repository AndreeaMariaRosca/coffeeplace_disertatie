import nodemailer from 'nodemailer';
import express from 'express';
import { Beverage } from '../models/beverages.js';
import { Coffee } from '../models/coffees.js';
import { PersonalityCoffee } from '../models/personalityCoffee.js';
import { Cart } from '../models/cart.js';
import { Order } from '../models/order.js';

const cartRouter = express.Router();
cartRouter.use(express.json());

cartRouter.post("/add", async (req, res) => {
    const { userId, itemId, itemType, quantity } = req.body;

    try {
        let itemModel;
        switch (itemType) {
            case 'Beverage': itemModel = Beverage; break;
            case 'Coffee': itemModel = Coffee; break;
            case 'PersonalityCoffee': itemModel = PersonalityCoffee; break;
            default: return res.status(400).json({ message: 'Invalid item type' });
        }

        console.log('before')
        const item = await itemModel.findById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        console.log('after')

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
        }

        const existingItem = cart.items.find(i => i.itemId.equals(itemId) && i.itemType === itemType);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ itemId, itemType, quantity, price: item.price });
        }

        cart.totalPrice = cart.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
        await cart.save();
        res.json(cart);

    } catch (error) {
        console.log(`error = ${error}`)
        res.status(500).json({ message: error.message });
    }
});

cartRouter.post("/add-custom", async (req, res) => {
    const { userId, quantity, customData } = req.body;

    try {
        if (!customData) {
            return res.status(400).json({ message: 'Missing custom data' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
        }

        cart.items.push({
            itemType: "Custom",
            quantity,
            customData,
            price: customData.price
        });

        cart.totalPrice = cart.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

cartRouter.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) return res.json([]);

        const detailedItems = await Promise.all(
            cart.items.map(async (item) => {
                let data;
                if (item.itemType === 'Beverage') {
                    data = await Beverage.findById(item.itemId);
                } else if (item.itemType === 'Coffee') {
                    data = await Coffee.findById(item.itemId);
                } else if (item.itemType === 'PersonalityCoffee') {
                    data = await PersonalityCoffee.findById(item.itemId);
                }

                return {
                    _id: item._id,
                    name: data?.name || 'Unknown',
                    type: item.itemType,
                    price: item.price,
                    quantity: item.quantity,
                };
            })
        );

        res.json(detailedItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to load cart' });
    }
});

cartRouter.put("/update", async (req, res) => {
    const { userId, itemId, change } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).send("Cart not found");

    const item = cart.items.id(itemId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        cart.totalPrice = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        await cart.save();
        res.send(cart);
    } else {
        res.status(404).send("Item not found");
    }
});



// configure the transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'andreea.rosca204@gmail.com', // your shop's email
        pass: 'cmkn mosi vovu nzso', // for Gmail you might need an "App Password"
    },
});

cartRouter.post("/place-order", async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = await Order.create({
            userId,
            items: cart.items,
            totalPrice: cart.totalPrice
        });

        const orderSummary = cart.items.map(item => {
            return `
              Name: ${item.itemId.name}
              Type: ${item.itemType}
              Quantity: ${item.quantity}
              Price Each: $${item.price.toFixed(2)}
            `;
        }).join('\n\n');

        // Send the email
        await transporter.sendMail({
            to: 'roscamaria19@stud.ase.ro', // Shop's receiving email
            subject: 'New Order Received!',
            text: `You have a new order from user ${userId}:\n\n${orderSummary}\n\nTotal: $${cart.totalPrice}`,
        });

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({ message: "Order placed", order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order" });
    }
});

export default cartRouter;