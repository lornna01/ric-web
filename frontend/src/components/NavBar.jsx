import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MenuLateral from './MenuLateral'; // Asegúrate de importar el componente
import toast from "react-hot-toast";




const NavBar = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  const [notificacionesList, setNotificacionesList] = useState([]);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const navigate = useNavigate();
  const [mensajeError, setMensajeError] = useState('');

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.type} ${user.token}`,
    },
  });

  /*
  useEffect(() => {
    const getNotificaciones = async () => {
      try {
        const response = await axiosInstance.get(`/notificaciones?usuario_id=${user.user.id}`);
        setNotificacionesList(response.data);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    getNotificaciones();
  }, [axiosInstance, user.user.id]);
  */

  useEffect(() => {
    const getNotificaciones = async () => {
      try {
        const response = await axiosInstance.get(`/notificaciones?usuario_id=${user.user.id}`);
        setNotificacionesList(response.data);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    getNotificaciones();
  }, [axiosInstance, user.user.id]);


  const toggleMenu = () => {
    setIsMenuCollapsed(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuCollapsed(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme ${isMenuCollapsed ? 'd-none' : ''}`} id="layout-navbar">


        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-4" onClick={toggleMenu}>
            <i className="mdi mdi-menu mdi-24px" />
          </a>
        </div>
        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          {/* Search */}
          <div className="navbar-nav align-items-center">
                  <div className="nav-item d-flex align-items-center">
                  <i className="bx bx-box text-success me-1" />{" "}
                    {user.user.rol.nombre}
                  </div>
                </div>
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item lh-1 me-3">
              <span />
            </li>
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a className="nav-link dropdown-toggle hide-arrow p-0" href="#" data-bs-toggle="dropdown">
                <div className="avatar avatar-online">
                  {user.user.foto ? (
                    <img src={`data:image/png;base64,${user.user.foto}`} width="100%" />
                  ) : (
                    <img src="/img/ric.jpeg" alt={`${user.nombre}`} className="rounded-circle" />
                  )}
                </div>
              </a>
              
              <ul className="dropdown-menu dropdown-menu-end mt-3 py-2">
  <div className="navbar-nav align-items-center">
    <div className="nav-item d-flex align-items-center">{" ---> "}
      <i className="mdi mdi-human text-success me-1" />{"   Hola: "}
      {user.user.nombre}
    </div>
  </div>
  {/* Condición para mostrar notificaciones solo si el rol es TECNICO-ARCHIVO */}
  {user.user.rol.nombre === 'TECNICO-ARCHIVO' && (
    <li>
      <Link className="dropdown-item waves-effect" to={'/notificaciones'}>
        <i className="mdi mdi-power me-1 mdi-20px" />
        <span className="align-middle">Notificaciones <span className="badge bg-label-warning rounded-pill">{notificacionesList.length}</span></span>
      </Link>
    </li>
  )}
  
  <li>
    <a className="dropdown-item waves-effect" href="#" onClick={logout}>
      <i className="mdi mdi-power me-1 mdi-20px" />
      <span className="align-middle">Cerrar sesión</span>
    </a>
  </li>
</ul>

            </li>
          </ul>
        </div>
      </nav>

      {/* Menú lateral */}
      <MenuLateral isCollapsed={isMenuCollapsed} onClose={closeMenu} />
    </>
  );
};

export default NavBar;