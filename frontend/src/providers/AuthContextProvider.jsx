

import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('user');
    return storedAuthData ? JSON.parse(storedAuthData) : {
      isAuthenticated: false,
      user: null,
      accessToken: null,
    };
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(authData));
  }, [authData]);

  const login = (userData) => {
    setAuthData({
      isAuthenticated: true,
      user: userData,
      accessToken: userData.accessToken,
    });
  };

  
  const logout = () => {
    setAuthData({
      isAuthenticated: false,
      user: null,
      accessToken: null,
    });
  };
  
/*
  const logout = () => {
    // Eliminar token del localStorage
    localStorage.removeItem('token');
    // Restablecer el estado del usuario
    setUser(null);
    setIsAuthenticated(false);
  };*/

  return (
    <AuthContext.Provider value={{ ...authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
