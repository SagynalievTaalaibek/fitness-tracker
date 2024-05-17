import React from 'react';
import { Container } from '@mui/material';

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Container maxWidth="xl">{children}</Container>;
};

export default AuthLayout;
