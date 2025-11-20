// Utility functions for authentication

export const AUTH_KEY = 'growell_auth';

export const saveAuth = (userData) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
};

export const getAuth = () => {
  const authData = localStorage.getItem(AUTH_KEY);
  return authData ? JSON.parse(authData) : null;
};

export const isAuthenticated = () => {
  return getAuth() !== null;
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getUserData = () => {
  return getAuth();
};

