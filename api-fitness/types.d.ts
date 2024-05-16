export interface UserFields {
  email: string;
  password: string;
  fullName: string;
  token: string;
  role: string;
  dateOfBirth?: string;
  profile_picture?: string;
  height?: string;
  width?: string;
  gender?: 'male' | 'female';
}

export interface UserMethods {
  generateToken(): void;
  checkPassword(password: string): Promise<boolean>;
}

export type UserModel = Model<UserFields, unknown, UserMethods>;
