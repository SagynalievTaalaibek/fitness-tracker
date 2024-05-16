import express from 'express';
import mongoose from 'mongoose';
import User from '../models/UserModel';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      height: req.body.height,
      width: req.body.width,
      gender: req.body.gender,
    });

    user.generateToken();
    await user.save();
    return res.send({ message: 'Registered!', user });
  } catch (e) {
    console.error(e);
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

export default userRouter;
