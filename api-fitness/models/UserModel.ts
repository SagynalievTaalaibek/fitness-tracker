import mongoose, { HydratedDocument } from 'mongoose';
import { UserFields, UserMethods, UserModel } from '../types';

const userSchema = new mongoose.Schema<UserFields, UserModel, UserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (
        this: HydratedDocument<UserFields>,
        email: string,
      ): Promise<boolean> {
        if (!this.isModified('email')) return true;

        const user: HydratedDocument<UserFields> | null = await User.findOne({
          email,
        });

        return !user;
      },
      message: 'This user is already registered!',
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  profile_picture: {
    type: String,
  },
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
});

const User = mongoose.model<UserFields, UserModel>('User', userSchema);
export default User;
