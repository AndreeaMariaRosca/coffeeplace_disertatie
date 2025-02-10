import express from 'express';
import bcrypt from 'bcrypt';

const userRouter = express.Router();
userRouter.use(express.json());

import { User } from '../models/users.js';
import jwt from 'jsonwebtoken';

userRouter.post("/api/register", async (req, res) => {
  const body = req.body;

  if (!(body.email && body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }

  const existingUser = await User.findOne({ email: body.email })
  if (existingUser) {
    return res.status(400).send({ error: 'Email already in use' })
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(body.password, salt);
  const userRequest = { ...body, password };

  const user = new User(userRequest);
  console.log('user', user);
  const createdUser = await user.save();
  let token = jwt.sign({ _id: createdUser._id }, "process.env.SECRET_KEY")
  res.header('Authorization', token)
    .cookie('Authorization', token)
    .status(201)
    .send(createdUser);
});


userRouter.post("/api/login", async (req, res) => {
  const body = req.body;
  try {

    const user = await User.findOne({ email: body.email })
    console.log('=====user:', user);
    console.log('BODY' + JSON.stringify(body));

    if (!user) return res.status(401).json({ error: "Not allowed to login" });

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Passwords don't match" });
    }

    let token = jwt.sign({ _id: user._id }, "process.env.SECRET_KEY");
    res.header('Authorization', token).cookie('Authorization', token);
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: `Error for login ${error}` });
  }
  finally {
    res.end()
  }
});

userRouter.get('/api/users/:id', async (request, response) => {
  const id = request.params.id;
  if (!id) {
    return response.status(400).json({ error: 'user not found' })
  }

  const user = await User.findById(id, { password: 0 });
  try {
    if (!user) {
      return response.status(400).json({ error: 'user not found' })
    }
    return response.send(user)
  } catch {
    return response.status(400).json({ error: 'user not found' })
  }

});

export default userRouter;
