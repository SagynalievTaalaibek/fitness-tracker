import { ChangeEvent, FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Grid, Link, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks.ts';
import { selectRegisterError, selectRegisterLoading } from './userSlice.ts';
import { register } from './userThunks.ts';
import { RegisterMutation } from '../../types';

const Register = () => {
  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    fullName: '',
  });
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const loading = useAppSelector(selectRegisterLoading);

  const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(register(state)).unwrap();
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
          Регистрация
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="fullName"
                value={state.fullName}
                onChange={changeFields}
                error={Boolean(getFieldError('fullName'))}
                helperText={getFieldError('fullName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                name="email"
                value={state.email}
                onChange={changeFields}
                autoComplete="new-email"
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Пароль"
                type="password"
                value={state.password}
                onChange={changeFields}
                autoComplete="new-password"
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
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
            Зарегистрироваться
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
