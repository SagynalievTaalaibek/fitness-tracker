import React from 'react';
import { CssBaseline } from '@mui/material';
import Dashboard from '../../componets/Dashboard/Dashboard.tsx';

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Dashboard>{children}</Dashboard>
    </>
  );
};

export default BaseLayout;
