import { AuthResponse, GlobalError, IUser, ValidationError } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store/store.ts';
import { login, register } from './userThunks.ts';

interface UserState {
  user: IUser | null;
  registerLoading: boolean;
  loginLoading: boolean;
  registerError: ValidationError | null;
  loginError: GlobalError | null;
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  loginLoading: false,
  registerError: null,
  loginError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(
      register.fulfilled,
      (state, { payload: data }: PayloadAction<AuthResponse>) => {
        state.registerLoading = false;
        state.user = data.user;
      },
    );
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, { payload: data }: PayloadAction<AuthResponse>) => {
        state.loginLoading = false;
        state.user = data.user;
      },
    );
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  },
});

export const userReducer = userSlice.reducer;
export const { unsetUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectRegisterLoading = (state: RootState) =>
  state.user.registerLoading;
export const selectLoginLoading = (state: RootState) => state.user.loginLoading;
export const selectRegisterError = (state: RootState) =>
  state.user.registerError;
export const selectLoginError = (state: RootState) => state.user.loginError;
