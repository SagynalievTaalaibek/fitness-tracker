export interface UserFields {
  email: string;
  password: string;
  fullName: string;
  token: string;
  role: string;
  dateOfBirth?: string;
  avatar?: string;
  height?: string;
  weight?: string;
  gender?: 'male' | 'female';
}

export interface UserMethods {
  generateToken(): void;
  checkPassword(password: string): Promise<boolean>;
}

export type UserModel = Model<UserFields, unknown, UserMethods>;
