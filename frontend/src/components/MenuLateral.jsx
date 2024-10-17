import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthContextProvider";

const MenuLateral = ({ isCollapsed, onClose }) => {
  const location = useLocation();
  const [isReportesOpen, setIsReportesOpen] = useState(false);
  const [isArchivoOpen, setIsArchivoOpen] = useState(false);
  const { user } = useAuth();

  // Manejo de submenús para "Gestión de archivo" y "Reportes"
  const handleReportesClick = () => {
    setIsReportesOpen(!isReportesOpen);
    if (!isReportesOpen) setIsArchivoOpen(false); // Cierra "Gestión de archivo" si abres "Reportes"
  };

  const handleArchivoClick = () => {
    setIsArchivoOpen(!isArchivoOpen);
    if (!isArchivoOpen) setIsReportesOpen(false); // Cierra "Reportes" si abres "Gestión de archivo"
  };

  // Función para renderizar los ítems del menú
  const renderMenuItem = (path, label, icon) => (
    <li className={`menu-item ${location.pathname === path ? 'active' : ''}`}>
      <Link to={path} className="menu-link waves-effect">
        <i className={`menu-icon tf-icons ${icon}`} />
        <div data-i18n="Dashboards">{label}</div>
      </Link>
    </li>
  );

  return (
    <>
      {isCollapsed && <div className="overlay" onClick={onClose} />}

      <aside
        id="layout-menu"
        data-bg-class="bg-menu-theme"
        className={`layout-menu menu-vertical menu bg-menu-theme ${isCollapsed ? 'visible' : ''}`}
        style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }} // Evitar desbordamiento horizontal
      >

        <div className="app-brand demo">
          <a href="/" className="app-brand-link">
            <span className="app-brand-logo demo me-1">
              <img src="/img/ric.jpeg" alt="Logo" width={'180'} />
            </span>
          </a>
          <a
            href="#"
            className="layout-menu-toggle menu-link text-large ms-auto"
            onClick={onClose}
          >
            <i className="mdi menu-toggle-icon d-xl-block align-middle mdi-50px" />
          </a>
        </div>

        <div className="menu-inner-shadow" />

        <ul className="menu-inner py-1 ps ps--active-y">
          {/* Inicio */}
          <li className={`menu-item ${location.pathname === '/home' ? 'active' : ''}`}>
            <Link to="/home" className="menu-link waves-effect">
              <i className="menu-icon tf-icons mdi mdi-home-outline" />
              <div data-i18n="Dashboards">Inicio</div>
            </Link>
          </li>

          {/* Sección Admin */}
          {user.user.rol.nombre === "ADMINISTRADOR" && (
            <>
              <li className="menu-header fw-medium mt-4">
                <span className="menu-header-text">ADMIN</span>
              </li>
              {renderMenuItem('/roles/nuevo', 'Roles', 'mdi mdi-human-greeting')}
            </>
          )}

          {user.user.rol.nombre === "TECNICO-ARCHIVO" && (
            <>
              {/* Sección de Archivo */}
              <li className="menu-header fw-medium mt-4">
                <span className="menu-header-text">DEPTO. ARCHIVO</span>
              </li>
              <li className={`menu-item ${isArchivoOpen ? 'active' : ''}`}>
                <a href="#" className="menu-link waves-effect" onClick={handleArchivoClick}>
                  <i className="menu-icon tf-icons mdi mdi-folder-outline" />
                  <div data-i18n="Dashboards">Gestión de archivo</div>
                </a>
              </li>

              {isArchivoOpen && (
                <ul className="submenu" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {renderMenuItem('/departamentos/nuevo', 'Departamentos', 'mdi mdi-map-marker-circle')}
                  {renderMenuItem('/municipios/nuevo', 'Municipios', 'mdi mdi-ticket')}
                  {renderMenuItem('/expedientes/nuevo', 'Nuevo expediente', 'mdi mdi-file-outline')}
                </ul>
              )}

              {/* Notificaciones */}
              {renderMenuItem('/notificaciones', 'Notificaciones', 'mdi mdi-notification-clear-all')}
            </>
          )}


          {user.user.rol.nombre === "ASISTENTE-ADMINISTRATIVO" && (
            <>
              {/* Sección de Administración */}
              <li className="menu-header fw-medium mt-4">
                <span className="menu-header-text">DEPTO. ADMINISTRATIVO</span>
              </li>
              {renderMenuItem('/vehiculos/nuevo', 'Vehículos', 'mdi mdi-car-outline')}
              {renderMenuItem('/combustible/nuevo', 'Combustible', 'mdi mdi-fire')}
            </>
          )}



          
              {/* Reportes */}
              <li className="menu-header fw-medium mt-4">
                <span className="menu-header-text">REPORTES</span>
              </li>

              <li className={`menu-item ${isReportesOpen ? 'active' : ''}`}>
                <a href="#" className="menu-link waves-effect" onClick={handleReportesClick}>
                  <i className="menu-icon tf-icons mdi mdi-file-chart-outline" />
                  <div data-i18n="Dashboards">Reportes</div>
                </a>
              </li>
              

              {isReportesOpen && (
                <ul className="submenu" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {(user.user.rol.nombre === "GERENTE" || user.user.rol.nombre === "TECNICO-ARCHIVO" || user.user.rol.nombre === "ASISTENTE-ADMINISTRATIVO") && (
                    <>
                      {renderMenuItem('/dashboard', 'Dashboard', 'mdi mdi-navigation')}
                    </>
                  )}

                  {(user.user.rol.nombre === "GERENTE" || user.user.rol.nombre === "TECNICO-ARCHIVO") && (
                    <>
                      {renderMenuItem('/expedientes/ReporteExpediente', 'Reporte de expedientes', 'mdi mdi-file-document-multiple')}
                    </>
                  )}

                  {(user.user.rol.nombre === "GERENTE" || user.user.rol.nombre === "ASISTENTE-ADMINISTRATIVO") && (
                    <>
                      {renderMenuItem('/combustible/reporteCombustible', 'Reporte de Combustible-Rendimiento', 'mdi mdi-file-document-multiple-outline')}
                    </>
                  )}




                </ul>
              )}
           





































        </ul>
      </aside>
    </>
  );
};

export default MenuLateral;
