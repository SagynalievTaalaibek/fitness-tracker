import mongoose from 'mongoose';
import config from './config';
import User from './models/UserModel';
import { randomUUID } from 'crypto';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  await User.create({
    email: 'admin@gmail.com',
    password: 'admin',
    fullName: 'Admin',
    token: randomUUID(),
    role: 'admin',
  });

  await User.create({
    email: 'sagynaliev@gmail.com',
    password: 'football',
    fullName: 'Sagynaliev Taalaibek',
    token: randomUUID(),
    role: 'user',
    dateOfBirth: '2002-03-25',
    avatar: 'fixtures/avatar.png',
    height: '170',
    width: '65',
    gender: 'male',
  });

  await User.create({
    email: 'john@gmail.com',
    password: 'football',
    fullName: 'John Doe',
    token: randomUUID(),
    role: 'user',
    dateOfBirth: '2000-01-25',
    avatar: 'fixtures/avatar.png',
    height: '185',
    width: '90',
    gender: 'male',
  });

  await db.close();
};
void run();
