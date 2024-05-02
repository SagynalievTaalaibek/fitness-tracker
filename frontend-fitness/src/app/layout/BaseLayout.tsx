import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <header>TOOLBAR</header>
      <Box sx={{ mt: 1 }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </>
  );
};

export default BaseLayout;
