import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../features/home/pages/HomePage';
import { LoginPage } from '../features/auth/pages/Login';
import Protected from '../features/auth/components/Protected';
import Signup from '../features/auth/pages/Signup';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/admin"
        element={
          <Protected>
            {/* Admin dashboard content goes here */}
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            </div>
          </Protected>
        }
      />
    </Routes>
  );
};
