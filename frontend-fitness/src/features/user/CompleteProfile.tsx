import React, { useState } from 'react';
import { UserCompleteProfile } from '../../types';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../componets/FileInput/FileInput.tsx';
import { useAppSelector } from '../../app/store/hooks.ts';
import { selectProfileEditLoading } from './userSlice.ts';

const CompleteProfile = () => {
  const loading = useAppSelector(selectProfileEditLoading);
  const [state, setState] = useState<UserCompleteProfile>({
    avatar: null,
    dateOfBirth: '',
    gender: '',
    weight: '',
    height: '',
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(state);
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
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
        <Typography component="h2" variant="h5" sx={{ fontWeight: 'bold' }}>
          Let’s complete your profile
        </Typography>
        <Typography component="p" variant="h6">
          It will help us to know more about you!
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FileInput
                name={'avatar'}
                label={'Put avatar'}
                onChange={fileInputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                id="gender"
                label="Choose gender"
                value={state.gender}
                onChange={inputChangeHandler}
                name="gender"
                required
              >
                <MenuItem value="" disabled>
                  Choose gender
                </MenuItem>
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="dateOfBirth"
                type="date"
                value={state.dateOfBirth}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <OutlinedInput
                  name="height"
                  type={'number'}
                  value={state.height}
                  onChange={inputChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">sm</InputAdornment>
                  }
                />
                <FormHelperText>Height</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <OutlinedInput
                  name="weight"
                  type={'number'}
                  value={state.weight}
                  onChange={inputChangeHandler}
                  endAdornment={
                    <InputAdornment position="end">kg</InputAdornment>
                  }
                />
                <FormHelperText>Weight</FormHelperText>
              </FormControl>
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
              borderRadius: '30px',
            }}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default CompleteProfile;
