import express from 'express';
const app = express();
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";

app.use(bodyParser.json());
app.use(cors());


// Load Config and Connect to DB
import {connectDB} from './config/database.js';
import userRouter from './routes/users.js';
import formRouter from './routes/form.js';
import coffeeRouter from './routes/coffees.js';
import beverageRouter from './routes/beverages.js';
import cartRouter from './routes/cart.js';
import personalityCoffeeRouter from './routes/personalityCoffees.js';
import recipeRouter from './routes/recipes.js';
import orderRouter from './routes/order.js';
dotenv.config({path: './config/config.env'})
connectDB();

const port = process.env.port;

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
	next();
  })

app.use((req, res, next) => {
  next();
});

app.use("/", userRouter);
app.use("/api/form", formRouter);
app.use("/api/cart", cartRouter);

app.use("/api/orders", orderRouter);
app.use("/api/coffees", coffeeRouter);
app.use("/api/beverages", beverageRouter);
app.use("/api/personalityCoffee", personalityCoffeeRouter);
app.use("/api/recipes", recipeRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


  // todo: on login, if username and password match, generate a jwt token that contains the user's role, the user's id + private key
  // jwt = json web token
  // todo: in announcement creation controller, get the request body and enhance it with the user id from the authorization header (jwt)
  
// todo: when saving in db the password that needs to be hashed
// todo: when saving in db the name/email address that needs to be encrypted