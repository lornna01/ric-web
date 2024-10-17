import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './providers/AuthContextProvider';
import PrivateRoute from './routes/privateRoute';
import Home from './pages/Home';
import Login from './pages/Login';




import EditarUsuario from './pages/EditarUsuario';
import NuevoExpediente from './pages/NuevoExpediente';
import BuscarExpediente from './pages/BuscarExpediente';
import NuevoVehiculo from './pages/NuevoVehiculo';
import NuevoCombustible from './pages/NuevoCombustible';
import NuevaBoleta from './pages/NuevaBoleta';
import Notificaciones from './pages/Notificaciones';
import NuevoRol from './pages/NuevoRol';
import NuevoDepartamento from './pages/NuevoDepartamento';
import NuevoMunicipio from './pages/NuevoMunicipio';
import NuevoEstadoExpediente from './pages/NuevoEstadoExpediente';
import Dashboard from './pages/Dashboard';
import MenuLateral from './components/MenuLateral';
import ReporteExpediente from './pages/ReporteExpediente';
import ReporteCombustible from './pages/ReporteCombustible';
import NoFound from './pages/NoFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/menu-lateral" element={<PrivateRoute><MenuLateral /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          
          <Route path="/editarUsuario" element={<PrivateRoute><EditarUsuario /></PrivateRoute>} />
          <Route path="/roles/nuevo" element={<PrivateRoute><NuevoRol /></PrivateRoute>} />
                    
          <Route path="/departamentos/nuevo" element={<PrivateRoute><NuevoDepartamento /></PrivateRoute>} />
          <Route path="/municipios/nuevo" element={<PrivateRoute><NuevoMunicipio /></PrivateRoute>} />         
          <Route path="/expedientes/nuevo" element={<PrivateRoute><NuevoExpediente /></PrivateRoute>} />
          <Route path="/expedientes/:buscarId" element={<PrivateRoute><BuscarExpediente /></PrivateRoute>} />
          <Route path="/estadoExpedientes/nuevo" element={<PrivateRoute><NuevoEstadoExpediente /></PrivateRoute>} />
          <Route path="/notificaciones" element={<PrivateRoute><Notificaciones /></PrivateRoute>} />

          <Route path="/vehiculos/nuevo" element={<PrivateRoute><NuevoVehiculo /></PrivateRoute>} />          
          <Route path="/combustible/nuevo" element={<PrivateRoute><NuevoCombustible /></PrivateRoute>} />
          <Route path="/boleta/nueva" element={<PrivateRoute><NuevaBoleta /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />




          <Route path="/expedientes/reporteExpediente" element={<PrivateRoute><ReporteExpediente /></PrivateRoute>} />
          <Route path="/combustible/reporteCombustible" element={<PrivateRoute><ReporteCombustible /></PrivateRoute>} />


          <Route path="/noFound" element={<PrivateRoute><NoFound /></PrivateRoute>} />
          
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
