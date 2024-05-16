import express from 'express';
import mongoose from 'mongoose';
import User from '../models/UserModel';
import { imageUpload } from '../multer';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.fullName,
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

userRouter.patch(
  '/:id',
  imageUpload.single('avatar'),
  async (req, res, next) => {
    try {
      const userId = req.params.id;

      const user = await User.updateOne(
        {
          _id: userId,
        },
        {
          fullName: req.body.fullName,
          dateOfBirth: req.body.dateOfBirth,
          avatar: req.file && req.file.filename,
          height: req.body.height,
          width: req.body.width,
          gender: req.body.gender,
        },
      );

      if (user.matchedCount === 0) {
        return res.status(404).send({ message: 'User not found!' });
      }

      return res.send({ message: 'ok' });
    } catch (e) {
      console.error(e);
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      return next(e);
    }
  },
);

export default userRouter;
