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

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(422).send({ error: 'Email and password not correct!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Email and password not correct!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password are correct!', user });
  } catch (error) {
    return next(error);
  }
});

userRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'Success!!' };

    if (!headerValue) {
      return res.send(successMessage);
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send(successMessage);
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send(successMessage);
    }

    user.generateToken();
    await user.save();

    return res.send(successMessage);
  } catch (e) {
    next(e);
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
          weight: req.body.weight,
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
