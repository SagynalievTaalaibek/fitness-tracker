import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
  Alert,
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks.ts';
import { selectLoginError, selectLoginLoading } from './userSlice.ts';
import { login } from './userThunks.ts';
import { LoginMutation } from '../../types';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Fitness tracker
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.error}
          </Alert>
        )}
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                name="email"
                autoComplete="current-username"
                value={state.email}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Пароль"
                type="password"
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#0866FF',
              borderRadius: '30px',
            }}
          >
            Войти
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Зарегестрироваться
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
