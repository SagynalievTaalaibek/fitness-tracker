import axios from 'axios';
import { API_URL } from './constants/links.ts';
import { Store } from '@reduxjs/toolkit';
import { RootState } from './store/store.ts';

const axiosApi = axios.create({
  baseURL: API_URL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().user.user?.token;
    config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);

    return config;
  });
};

export default axiosApi;
