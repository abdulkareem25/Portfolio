import { useSelector, useDispatch } from 'react-redux';
import { loginThunk, signupThunk, logout, clearError } from '../state/auth.slice';

export const useAuth = () => {
  const { token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // credential = email or phone (as expected by backend)
  const login = (credential, password) =>
    dispatch(loginThunk({ credential, password }));

  // signup with all required backend fields
  const signup = (fullName, email, phone, password, role = 'admin') =>
    dispatch(signupThunk({ fullName, email, phone, password, role }));

  const logoutUser = () => dispatch(logout());
  const clearAuthError = () => dispatch(clearError());

  return {
    token,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout: logoutUser,
    clearError: clearAuthError,
  };
};
