import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const MenuLateral = ({ isCollapsed, onClose }) => {
  const location = useLocation();
  const [isReportesOpen, setIsReportesOpen] = useState(false);
  const [isArchivoOpen, setIsArchivoOpen] = useState(false);

  const handleReportesClick = () => {
    setIsReportesOpen(!isReportesOpen);
    setIsArchivoOpen(false);
  };

  const handleArchivoClick = () => {
    setIsArchivoOpen(!isArchivoOpen);
    setIsReportesOpen(false);
  };

  // Función auxiliar para renderizar los elementos del menú
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
      {isCollapsed && (
        <div className="overlay" onClick={onClose} />
      )}

      <aside
        id="layout-menu"
        className={`layout-menu menu-vertical menu bg-menu-theme ${isCollapsed ? 'visible' : ''}`}
        style={{ maxHeight: '100vh', overflowY: 'auto', position: 'relative' }}
      >
        <div className="app-brand demo">
          <a href="index.html" className="app-brand-link">
            <span className="app-brand-logo demo me-1">
              <span style={{ color: "var(--bs-primary)" }}>
                <img src="/img/ric.jpeg" alt="" width={'150'} />
              </span>
            </span>
          </a>
          <a
            href="#"
            className="layout-menu-toggle menu-link text-large ms-auto"
            onClick={onClose}
          >
            <i className="mdi menu-toggle-icon d-xl-block align-middle mdi-20px" />
          </a>
        </div>
        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1 ps ps--active-y">
          {renderMenuItem('/home', 'Inicio', 'mdi-home-outline')}
          
          <li className={`menu-header fw-medium mt-4`}>
            <span className="menu-header-text">ADMIN</span>
          </li>
          {renderMenuItem('/roles/nuevo', 'Roles', 'mdi-human-greeting')}

          <li className={`menu-header fw-medium mt-4`}>
            <span className="menu-header-text">DEPTO. ARCHIVO</span>
          </li>
          <li className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
            <a
              href="#"
              className="menu-link waves-effect"
              onClick={handleArchivoClick}
            >
              <i className="menu-icon tf-icons mdi-replay" />
              <div data-i18n="Dashboards">Gestión de archivo</div>
            </a>
          </li>
          {isArchivoOpen && (
            <ul className="submenu" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {renderMenuItem('/departamentos/nuevo', 'Departamentos', 'mdi-map-marker-circle')}
              {renderMenuItem('/municipios/nuevo', 'Municipios', 'mdi-ticket')}
              {renderMenuItem('/expedientes/nuevo', 'Nuevo expediente', 'mdi-file-outline')}
            </ul>
          )}

          {renderMenuItem('/notificaciones', 'Notificaciones', 'mdi-notification-clear-all')}

          <li className={`menu-header fw-medium mt-4`}>
            <span className="menu-header-text">DEPTO. ADMINISTRACIÓN</span>
          </li>
          {renderMenuItem('/vehiculos/nuevo', 'Vehículos', 'mdi-car-outline')}
          {renderMenuItem('/combustible/nuevo', 'Combustible', 'mdi-fire')}

          <li className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}>
            <a
              href="#"
              className="menu-link waves-effect"
              onClick={handleReportesClick}
            >
              <i className="menu-icon tf-icons mdi-replay" />
              <div data-i18n="Dashboards">Reportes</div>
            </a>
          </li>
          {isReportesOpen && (
            <ul className="submenu" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {renderMenuItem('/dashboard', 'DASHBOARD', 'mdi-ticket')}
              {renderMenuItem('/expedientes/ReporteExpediente', 'Reporte de expedientes', 'mdi-file-document-multiple-outline')}
              {renderMenuItem('/expedientes/ReporteDocumentos', 'Reporte de documentos', 'mdi-file-document-multiple-outline')}
            </ul>
          )}
        </ul>
      </aside>
    </>
  );
};

export default MenuLateral;
