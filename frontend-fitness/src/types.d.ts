// USER

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  token: string;
  role: string;
  dateOfBirth?: string;
  avatar?: string;
  height?: string;
  weight?: string;
  gender?: 'male' | 'female';
}

export interface UserCompleteProfile {
  dateOfBirth: string;
  avatar: File | null;
  height: string;
  weight: string;
  gender: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: IUser;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
