import BaseLayout from './app/layout/BaseLayout.tsx';
import { useAppSelector } from './app/store/hooks.ts';
import { selectUser } from './features/user/userSlice.ts';
import { Route, Routes } from 'react-router-dom';
import Register from './features/user/Register.tsx';
import Login from './features/user/Login.tsx';
import ProtectedRoute from './componets/ProtectedRoute/ProtectedRoute.tsx';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <BaseLayout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<ProtectedRoute isAllowed={!!user}>HOME</ProtectedRoute>}
          />
          <Route
            path="/some"
            element={<ProtectedRoute isAllowed={!!user}>HOME</ProtectedRoute>}
          />
          <Route path={'*'} element={'Not found'} />
        </Routes>
      </BaseLayout>
    </>
  );
};

export default App;
