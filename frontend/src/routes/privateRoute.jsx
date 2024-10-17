import React, { useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from './../providers/AuthContextProvider';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const userRole = user?.user?.rol?.nombre;


  const gerentePaths = [
    '/dashboard', 
    '/expedientes/ReporteExpediente', 
    '/combustible/ReporteCombustible', 
    '/home'
  ];

  const asistenteAdminPaths = [
    '/vehiculos/nuevo', 
    '/combustible/nuevo', 
    '/combustible/reporteCombustible', 
    '/dashboard', 
    '/home'
  ]; 

  const administradorPaths = [
    '/roles/nuevo', 
    '/editarUsuario', 
    '/home'
  ];

  const tecnicoArchivoPaths = [
    '/notificaciones', 
    '/dashboard', 
    '/departamentos/nuevo', 
    '/municipios/nuevo', 
    '/expedientes/nuevo', 
    '/estadoExpedientes/nuevo', 
    '/expedientes/ReporteExpediente', 
    '/home'
  ];

  // Comprobación de la ruta
  const isAllowedPath =
  (userRole === 'TECNICO-ARCHIVO' && (tecnicoArchivoPaths.includes(location.pathname) || location.pathname.startsWith('/expedientes/'))) ||
  (userRole === 'GERENTE' && gerentePaths.includes(location.pathname)) ||
  (userRole === 'ASISTENTE-ADMINISTRATIVO' && asistenteAdminPaths.includes(location.pathname)) ||
  (userRole === 'ADMINISTRADOR' && administradorPaths.includes(location.pathname));



  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAllowedPath) {
      navigate('/not-authorized');
    }
  }, [isAuthenticated, isAllowedPath, navigate]);

  return isAuthenticated && isAllowedPath ? children : <Navigate to="/login" />;
}

export default PrivateRoute;



























// 14:21
/*import React, { useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from './../providers/AuthContextProvider';







const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth(); // Añadimos logout
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ubicación actual
  
  const userRole = user?.user?.rol?.nombre; // Acceso correcto al rol

  console.log('Authenticated:', isAuthenticated);
  console.log('User:', user);
  console.log('User Role:', userRole);

  // Definir las rutas permitidas para cada rol
  const gerentePaths = ['/dashboard', '/expedientes/ReporteExpediente', '/combustible/reporteCombustible', '/home'];
  const tecnicoArchivoPaths = [
    '/notificaciones', 
    '/dashboard', 
    '/departamentos/nuevo', 
    '/municipios/nuevo', 
    '/expedientes/nuevo', 
    '/expedientes/:buscarId', 
    '/estadoExpedientes/nuevo', 
    '/expedientes/ReporteExpediente', 
    '/home'
  ];
  const gerentePaths = ['/dashboard', '/expedientes/ReporteExpediente', '/combustible/reporteCombustible', '/home'];
  const asistenteAdminPaths = ['/vehiculos/nuevo', '/combustible/nuevo', '/combustible/reporteCombustible', '/dashboard', '/home'];
  const administradorPaths = ['/roles/nuevo', '/editarUsuario', '/home'];

  // Verificar si la ruta es permitida según el rol del usuario
  const isAllowedPath =
    (userRole === 'GERENTE' && gerentePaths.includes(location.pathname)) ||
    (userRole === 'TECNICO-ARCHIVO' && tecnicoArchivoPaths.includes(location.pathname)) ||
    (userRole === 'ASISTENTE-ADMINISTRATIVO' && asistenteAdminPaths.includes(location.pathname)) ||
    (userRole === 'ADMINISTRADOR' && administradorPaths.includes(location.pathname)) ||
    (location.pathname === '/home' && 
      ['GERENTE', 'ADMINISTRADOR', 'TECNICO-ARCHIVO', 'ASISTENTE-ADMINISTRATIVO'].includes(userRole));

  console.log('Current Path:', location.pathname);
  console.log('Allowed Paths:', isAllowedPath);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("No autenticado, redirigiendo a /login");
      navigate('/login'); // Redirigir a login si no está autenticado
    } else if (!isAllowedPath) {
      console.log("Ruta no permitida, redirigiendo a /home");
      navigate('/home'); // Redirigir a home si la ruta no está permitida
    }
  }, [isAuthenticated, isAllowedPath, navigate]);

  // Si está autenticado y tiene el rol correcto, renderizamos el contenido
  return isAuthenticated && isAllowedPath ? children : <Navigate to="/login" />; // Redirige a login si no está autenticado
};

export default PrivateRoute;

*/
































































/*
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './../providers/AuthContextProvider';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth(); // Obtener el estado de autenticación
 
  const navigate = useNavigate();
  // Verificar si el usuario está autenticado
  

  // Obtener el rol del usuario
  const userRole = user?.rol?.nombre;

  // Definir las rutas permitidas para cada rol
  const gerentePaths = ['/dashboard', '/expediente/reporteExpediente', '/combustible/reporteCombustible', '/home'];
  const tecnicoArchivoPaths = [
    '/notificaciones',
    '/dashboard',
    '/departamentos/nuevo',
    '/municipios/nuevo',
    '/expedientes/nuevo',
    '/expedientes/:buscarId',
    '/estadoExpedientes/nuevo',
    '/expedientes/reporteExpediente',
    '/home'
  ];
  const asistenteAdminPaths = [
    '/vehiculos/nuevo',
    '/combustible/nuevo',
    '/combustible/reporteCombustible',
    '/dashboard',
    '/home',
    '/expedientes/reporteExpediente' // Línea agregada
  ];
  const administradorPaths = [
    '/roles/nuevo',
    '/editarUsuario',
    '/home'
  ];

  // Verificar si la ruta es permitida según el rol del usuario
  const isAllowedPath =
    (userRole === 'GERENTE' && gerentePaths.includes(location.pathname)) ||
    (userRole === 'TECNICO-ARCHIVO' && tecnicoArchivoPaths.includes(location.pathname)) ||
    (userRole === 'ASISTENTE-ADMINISTRATIVO' && asistenteAdminPaths.includes(location.pathname)) ||
    (userRole === 'ADMINISTRADOR' && administradorPaths.includes(location.pathname)) ||
    (location.pathname === '/home' && 
      ['GERENTE', 'ADMINISTRADOR', 'TECNICO-ARCHIVO', 'ASISTENTE-ADMINISTRATIVO'].includes(userRole));

  // Si el usuario no tiene acceso a la ruta
  if (!isAllowedPath) {
    console.log("Ruta no permitida, redirigiendo a /not-authorized");
    navigate('/home');
  }

  // Si está autenticado y tiene el rol correcto, renderizamos el contenido
  return children;
};

export default PrivateRoute;
*/



/*
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './../providers/AuthContextProvider';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth(); // Obtener el estado de autenticación
  const location = useLocation(); // Obtener la ruta actual

  // Verificar si el usuario está autenticado
  

  // Obtener el rol del usuario
  const userRole = user?.rol?.nombre;

  // Definir las rutas permitidas para cada rol
  const gerentePaths = ['/dashboard', '/expediente/reporteExpediente', '/combustible/reporteCombustible', '/home'];
  const tecnicoArchivoPaths = [
    '/notificaciones',
    '/dashboard',
    '/departamentos/nuevo',
    '/municipios/nuevo',
    '/expedientes/nuevo',
    '/expedientes/:buscarId',
    '/estadoExpedientes/nuevo',
    '/expedientes/reporteExpediente',
    '/home'
  ];
  const asistenteAdminPaths = [
    '/vehiculos/nuevo',
    '/combustible/nuevo',
    '/combustible/reporteCombustible',
    '/dashboard',
    '/home',
    '/expedientes/reporteExpediente' // Línea agregada
  ];
  const administradorPaths = [
    '/roles/nuevo',
    '/editarUsuario',
    '/home'
  ];

  // Verificar si la ruta es permitida según el rol del usuario
  const isAllowedPath =
    (userRole === 'GERENTE' && gerentePaths.includes(location.pathname)) ||
    (userRole === 'TECNICO-ARCHIVO' && tecnicoArchivoPaths.includes(location.pathname)) ||
    (userRole === 'ASISTENTE-ADMINISTRATIVO' && asistenteAdminPaths.includes(location.pathname)) ||
    (userRole === 'ADMINISTRADOR' && administradorPaths.includes(location.pathname)) ||
    (location.pathname === '/home' && 
      ['GERENTE', 'ADMINISTRADOR', 'TECNICO-ARCHIVO', 'ASISTENTE-ADMINISTRATIVO'].includes(userRole));

  // Si el usuario no tiene acceso a la ruta
  if (!isAllowedPath) {
    console.log("Ruta no permitida, redirigiendo a /not-authorized");
    return <Navigate to="/not-authorized" />;
  }

  // Si está autenticado y tiene el rol correcto, renderizamos el contenido
  return children;
};

export default PrivateRoute;
*/





/*
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './../providers/AuthContextProvider';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth(); // Obtenemos la información de autenticación
  const location = useLocation(); // Obtenemos la ruta actual

  // Verificamos si el rol del usuario es 'GERENTE'
  const isGerente = user?.user?.rol?.nombre === 'GERENTE';
  
  // Definimos las rutas a las que el usuario 'GERENTE' puede acceder
  const allowedPaths = ['/dashboard', '/expediente/reporteExpediente', '/combustible/reporteCombustible'];
  const isAllowedPath = allowedPaths.includes(location.pathname);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado pero no tiene el rol 'GERENTE' o está intentando acceder a una ruta no permitida
  if (!isGerente || !isAllowedPath) {
    return <Navigate to="/not-authorized" />; // Redirigir a una página de no autorizado
  }

  // Si está autenticado, tiene el rol correcto y la ruta es permitida, renderizamos el contenido
  return children;
};

export default PrivateRoute;
*/





/*
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './../providers/AuthContextProvider';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
*/



