import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../providers/AuthContextProvider";
import axios from "axios";
import { API_URL_AUTH } from "./../services/auth/authConstants";
import "./Home.css";
import UserList from "../components/UserList";
const EditarUsuario = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  //console.log(user.role.nombreRol);

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getUsers = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL_AUTH}/usuarios`);
      setUserList(response.data);
      //console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response.status >= 400 && error.response.status < 500) {
        setError("Usuario o contraseña incorrectos.");
      }
      //setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
  };
  const saveUser = async (user) => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL_AUTH}/usuarios`, {
        correo: user.correo,
        id_rol: user.id_rol,
        id_persona: user.id_persona,
        contrasena: user.contrasena,
      });
      getUsers();
      setLoading(false);
      setError();
    } catch (error) {
      console.error("Login failed:", error);
      if (error.status >= 400 && error.response.status < 500) {
        setError("Error inesperado");
      }
      if (error.status >= 500) {
        setError("Ya existe");
      }
      //setError(error.message);
      setLoading(false);
      console.log(error);
    }
  };

  const savePersona = async (user) => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL_AUTH}/personas`, {
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        dpi: user.dpi,
        direccion: user.direccion,
        genero: user.genero,
        estado: user.estado,
      });

      // Handle successful login
      //console.log("Login successful!", response.data);
      user.id_persona = await response.data.id;
      await saveUser(user);
    } catch (error) {
      //console.error("Login failed:", error);
      if (error.response.status >= 400 && error.response.status < 500) {
        setError("Error guardando la persona.");
      }
      //setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);

    try {
      const response = await axios.delete(`${API_URL_AUTH}/usuarios/${id}`);
      getUsers();
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response.status >= 400 && error.response.status < 500) {
        setError("No se logró eliminar.");
      }
      //setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          {/* Menu */}
          <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
            data-bg-class="bg-menu-theme"
          >
            
            <div className="menu-inner-shadow" />
            <ul className="menu-inner py-1 ps ps--active-y">
              {/* Dashboards */}
              <li className="menu-item active open">
                <a href="#" className="menu-link menu-toggle waves-effect">
                  <i className="menu-icon tf-icons mdi mdi-home-outline" />
                  <div data-i18n="Dashboards">Dashboards</div>
                  <div className="badge bg-danger rounded-pill ms-auto">5</div>
                </a>
               
              </li>
              {/* Layouts */}
             
              {/* Front Pages */}
              <li className="menu-item">
                <a href="#" className="menu-link menu-toggle waves-effect">
                  <i className="menu-icon tf-icons mdi mdi-flip-to-front" />
                  <div data-i18n="Front Pages">Front Pages</div>
                  <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">
                    Pro
                  </div>
                </a>
                <ul className="menu-sub">
                  <li className="menu-item">
                    <a
                      href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/html/front-pages/landing-page.html"
                      className="menu-link"
                      target="_blank"
                    >
                      <div data-i18n="Landing">Landing</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/html/front-pages/pricing-page.html"
                      className="menu-link"
                      target="_blank"
                    >
                      <div data-i18n="Pricing">Pricing</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/html/front-pages/payment-page.html"
                      className="menu-link"
                      target="_blank"
                    >
                      <div data-i18n="Payment">Payment</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/html/front-pages/checkout-page.html"
                      className="menu-link"
                      target="_blank"
                    >
                      <div data-i18n="Checkout">Checkout</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/html/front-pages/help-center-landing.html"
                      className="menu-link"
                      target="_blank"
                    >
                      <div data-i18n="Help Center">Help Center</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-header fw-medium mt-4">
                <span className="menu-header-text">ARCHIVO</span>
              </li>
              {/* ARCHIVO */}
              <li className="menu-item">
                <Link
                  to="/home"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons mdi mdi-email-outline" />
                  <div data-i18n="Email">INGRESAR ARCHIVO</div>
                  
                </Link>
              </li>
              <li className="menu-item">
                <a
                  href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/html/vertical-menu-template/app-chat.html"
                  target="_blank"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons mdi mdi-message-outline" />
                  <div data-i18n="Chat">Chat</div>
                  <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">
                    Pro
                  </div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/html/vertical-menu-template/app-calendar.html"
                  target="_blank"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons mdi mdi-calendar-blank-outline" />
                  <div data-i18n="Calendar">Calendar</div>
                  <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">
                    Pro
                  </div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/html/vertical-menu-template/app-kanban.html"
                  target="_blank"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons mdi mdi-view-grid-outline" />
                  <div data-i18n="Kanban">Kanban</div>
                  <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">
                    Pro
                  </div>
                </a>
              </li>
              {/* Pages */}
              <li className="menu-item">
                <a href="#" className="menu-link menu-toggle waves-effect">
                  <i className="menu-icon tf-icons mdi mdi-account-outline" />
                  <div data-i18n="Account Settings">Account Settings</div>
                </a>
                <ul className="menu-sub">
                  <li className="menu-item">
                    <a
                      href="pages-account-settings-account.html"
                      className="menu-link"
                    >
                      <div data-i18n="Account">Account</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="pages-account-settings-notifications.html"
                      className="menu-link"
                    >
                      <div data-i18n="Notifications">Notifications</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="pages-account-settings-connections.html"
                      className="menu-link"
                    >
                      <div data-i18n="Connections">Connections</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link menu-toggle waves-effect">
                  <i className="menu-icon tf-icons mdi mdi-lock-open-outline" />
                  <div data-i18n="Authentications">Authentications</div>
                </a>
                <ul className="menu-sub">
                  <li className="menu-item">
                    <a
                      href="auth-login-basic.html"
                      className="menu-link"
                      target="_blank"
                    >
                      <div data-i18n="Basic">Login</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="auth-register-basic.html"
                      className="menu-link"
                      target="_blank"
                    >
                      <div data-i18n="Basic">Register</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="auth-forgot-password-basic.html"
                      className="menu-link"
                      target="_blank"
                    >
                      <div data-i18n="Basic">Forgot Password</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link menu-toggle waves-effect">
                  <i className="menu-icon tf-icons mdi mdi-cube-outline" />
                  <div data-i18n="Misc">Misc</div>
                </a>
                <ul className="menu-sub">
                  <li className="menu-item">
                    <a href="pages-misc-error.html" className="menu-link">
                      <div data-i18n="Error">Error</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="pages-misc-under-maintenance.html"
                      className="menu-link"
                    >
                      <div data-i18n="Under Maintenance">Under Maintenance</div>
                    </a>
                  </li>
                </ul>
              </li>
              {/* Components */}
              <li className="menu-header fw-medium mt-4">
                <span className="menu-header-text">Components</span>
              </li>
              {/* Cards */}
              <li className="menu-item">
                <a href="cards-basic.html" className="menu-link">
                  <i className="menu-icon tf-icons mdi mdi-credit-card-outline" />
                  <div data-i18n="Basic">Cards</div>
                </a>
              </li>
              {/* User interface */}
              <li className="menu-item">
                <a href="#" className="menu-link menu-toggle waves-effect">
                  <i className="menu-icon tf-icons mdi mdi-archive-outline" />
                  <div data-i18n="User interface">User interface</div>
                </a>
                <ul className="menu-sub">
                  <li className="menu-item">
                    <a href="ui-accordion.html" className="menu-link">
                      <div data-i18n="Accordion">Accordion</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-alerts.html" className="menu-link">
                      <div data-i18n="Alerts">Alerts</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-badges.html" className="menu-link">
                      <div data-i18n="Badges">Badges</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-buttons.html" className="menu-link">
                      <div data-i18n="Buttons">Buttons</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-carousel.html" className="menu-link">
                      <div data-i18n="Carousel">Carousel</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-collapse.html" className="menu-link">
                      <div data-i18n="Collapse">Collapse</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-dropdowns.html" className="menu-link">
                      <div data-i18n="Dropdowns">Dropdowns</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-footer.html" className="menu-link">
                      <div data-i18n="Footer">Footer</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-list-groups.html" className="menu-link">
                      <div data-i18n="List Groups">List groups</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-modals.html" className="menu-link">
                      <div data-i18n="Modals">Modals</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-navbar.html" className="menu-link">
                      <div data-i18n="Navbar">Navbar</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-offcanvas.html" className="menu-link">
                      <div data-i18n="Offcanvas">Offcanvas</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="ui-pagination-breadcrumbs.html"
                      className="menu-link"
                    >
                      <div data-i18n="Pagination & Breadcrumbs">
                        Pagination &amp; Breadcrumbs
                      </div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-progress.html" className="menu-link">
                      <div data-i18n="Progress">Progress</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-spinners.html" className="menu-link">
                      <div data-i18n="Spinners">Spinners</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-tabs-pills.html" className="menu-link">
                      <div data-i18n="Tabs & Pills">Tabs &amp; Pills</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-toasts.html" className="menu-link">
                      <div data-i18n="Toasts">Toasts</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-tooltips-popovers.html" className="menu-link">
                      <div data-i18n="Tooltips & Popovers">
                        Tooltips &amp; popovers
                      </div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="ui-typography.html" className="menu-link">
                      <div data-i18n="Typography">Typography</div>
                    </a>
                  </li>
                </ul>
              </li>
              {/* Extended components */}
              <li className="menu-item">
                <a href="#" className="menu-link menu-toggle waves-effect">
                  <i className="menu-icon tf-icons mdi mdi-star-outline" />
                  <div data-i18n="Extended UI">Extended UI</div>
                </a>
                <ul className="menu-sub">
                  <li className="menu-item">
                    <a
                      href="extended-ui-perfect-scrollbar.html"
                      className="menu-link"
                    >
                      <div data-i18n="Perfect Scrollbar">Perfect scrollbar</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="extended-ui-text-divider.html"
                      className="menu-link"
                    >
                      <div data-i18n="Text Divider">Text Divider</div>
                    </a>
                  </li>
                </ul>
              </li>
              {/* Icons */}
              <li className="menu-item">
                <a href="icons-mdi.html" className="menu-link">
                  <i className="menu-icon tf-icons mdi mdi-google-circles-extended" />
                  <div data-i18n="Icons">Icons</div>
                </a>
              </li>
              {/* Forms & Tables */}
              <li className="menu-header fw-medium mt-4">
                <span className="menu-header-text">Forms &amp; Tables</span>
              </li>
              {/* Forms */}
              <li className="menu-item">
                <a href="#" className="menu-link menu-toggle waves-effect">
                  <i className="menu-icon tf-icons mdi mdi-form-select" />
                  <div data-i18n="Form Elements">Form Elements</div>
                </a>
                <ul className="menu-sub">
                  <li className="menu-item">
                    <a href="forms-basic-inputs.html" className="menu-link">
                      <div data-i18n="Basic Inputs">Basic Inputs</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="forms-input-groups.html" className="menu-link">
                      <div data-i18n="Input groups">Input groups</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link menu-toggle waves-effect">
                  <i className="menu-icon tf-icons mdi mdi-cube-outline" />
                  <div data-i18n="Form Layouts">Form Layouts</div>
                </a>
                <ul className="menu-sub">
                  <li className="menu-item">
                    <a href="form-layouts-vertical.html" className="menu-link">
                      <div data-i18n="Vertical Form">Vertical Form</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="form-layouts-horizontal.html"
                      className="menu-link"
                    >
                      <div data-i18n="Horizontal Form">Horizontal Form</div>
                    </a>
                  </li>
                </ul>
              </li>
              {/* Form Validation */}
              <li className="menu-item">
                <a
                  href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/html/vertical-menu-template/form-validation.html"
                  target="_blank"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons mdi mdi-checkbox-marked-circle-outline" />
                  <div data-i18n="Form Validation">Form Validation</div>
                  <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">
                    Pro
                  </div>
                </a>
              </li>
              {/* Tables */}
              <li className="menu-item">
                <a href="tables-basic.html" className="menu-link">
                  <i className="menu-icon tf-icons mdi mdi-table" />
                  <div data-i18n="Tables">Tables</div>
                </a>
              </li>
              {/* Data Tables */}
              <li className="menu-item">
                <a
                  href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/html/vertical-menu-template/tables-datatables-basic.html"
                  target="_blank"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons mdi mdi-grid" />
                  <div data-i18n="Datatables">Datatables</div>
                  <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">
                    Pro
                  </div>
                </a>
              </li>
              {/* Misc */}
              <li className="menu-header fw-medium mt-4">
                <span className="menu-header-text">Misc</span>
              </li>
              <li className="menu-item">
                <a
                  href="https://github.com/themeselection/materio-bootstrap-html-admin-template-free/issues"
                  target="_blank"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons mdi mdi-lifebuoy" />
                  <div data-i18n="Support">Support</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/documentation/"
                  target="_blank"
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons mdi mdi-file-document-multiple-outline" />
                  <div data-i18n="Documentation">Documentation</div>
                </a>
              </li>
              <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                <div
                  className="ps__thumb-x"
                  tabIndex={0}
                  style={{ left: 0, width: 0 }}
                />
              </div>
              <div
                className="ps__rail-y"
                style={{ top: 0, height: 193, right: 4 }}
              >
                <div
                  className="ps__thumb-y"
                  tabIndex={0}
                  style={{ top: 0, height: 25 }}
                />
              </div>
            </ul>
          </aside>
          {/* / Menu */}
          {/* Layout container */}
          <div className="layout-page">
            {/* Navbar */}
            <nav
              className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
              id="layout-navbar"
            >
              <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" href="#">
                  <i className="mdi mdi-menu mdi-24px" />
                </a>
              </div>
              <div
                className="navbar-nav-right d-flex align-items-center"
                id="navbar-collapse"
              >
                {/* Search */}
                <div className="navbar-nav align-items-center">
                  <div className="nav-item d-flex align-items-center">
                    <i className="mdi mdi-magnify mdi-24px lh-0" />
                    <input
                      type="text"
                      className="form-control border-0 shadow-none bg-body"
                      placeholder="Search..."
                      aria-label="Search..."
                    />
                  </div>
                </div>
                {/* /Search */}
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  {/* Place this tag where you want the button to render. */}
                  <li className="nav-item lh-1 me-3">
                    <span />
                  </li>
                  {/* User */}
                  <li className="nav-item navbar-dropdown dropdown-user dropdown">
                    <a
                      className="nav-link dropdown-toggle hide-arrow p-0"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <div className="avatar avatar-online">
                        <img
                          src="/img/ric.jpeg"
                          alt
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end mt-3 py-2">
                      <li>
                        <a
                          className="dropdown-item pb-2 mb-1 waves-effect"
                          href="#"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-2 pe-1">
                              <div className="avatar avatar-online">
                                <img
                                  src="/img/ric.jpeg"
                                  alt
                                  className="w-px-40 h-auto rounded-circle"
                                />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-0">{user.persona.nombre}</h6>
                              <small className="text-muted">
                                {user.role.nombreRol}
                              </small>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider my-1" />
                      </li>
                      <li>
                        <a className="dropdown-item waves-effect" href="#">
                          <i className="mdi mdi-account-outline me-1 mdi-20px" />
                          <span className="align-middle">My Profile</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item waves-effect" href="#">
                          <i className="mdi mdi-cog-outline me-1 mdi-20px" />
                          <span className="align-middle">Config</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item waves-effect" href="#">
                          <span className="d-flex align-items-center align-middle">
                            <i className="flex-shrink-0 mdi mdi-credit-card-outline me-1 mdi-20px" />
                            <span className="flex-grow-1 align-middle ms-1">
                              Billing
                            </span>
                            <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                              4
                            </span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider my-1" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item waves-effect"
                          href="#"
                          onClick={logout}
                        >
                          <i className="mdi mdi-power me-1 mdi-20px" />
                          <span className="align-middle">Cerrar sesión</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/*/ User */}
                </ul>
              </div>
            </nav>
            {/* / Navbar */}
            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}

              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row my-4">
                  {/* Deposit / Withdraw */}
                  {/* Data Tables */}
                  {user.role.nombreRol == "ADMINISTRADOR" && (
                    <div className="col-12">
                      <UserList
                        user={user}
                        getUsers={getUsers}
                        userList={userList}
                        savePersona={savePersona}
                        error={error}
                        setError={setError}
                        loading={loading}
                        setLoading={setLoading}
                        deleteUser={deleteUser}
                      />
                    </div>
                  )}

                  {/*/ Data Tables */}
                </div>
                {user.role.nombreRol == "ADMINISTRADOR" && (
                  <div className="row gy-4">
                    {/* Congratulations card */}
                    <div className="col-md-12 col-lg-4">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title mb-1">
                            Congratulations John! 🎉
                          </h4>
                          <p className="pb-0">Best seller of the month</p>
                          <h4 className="text-primary mb-1">$42.8k</h4>
                          <p className="mb-2 pb-1">78% of target 🚀</p>
                          <a
                            href="#"
                            className="btn btn-sm btn-primary waves-effect waves-light"
                          >
                            View Sales
                          </a>
                        </div>
                        <img
                          src="/img/icons/misc/triangle-light.png"
                          className="scaleX-n1-rtl position-absolute bottom-0 end-0"
                          width={166}
                          alt="triangle background"
                          data-app-light-img="icons/misc/triangle-light.png"
                          data-app-dark-img="icons/misc/triangle-dark.png"
                        />
                        <img
                          src="/img/illustrations/trophy.png"
                          className="scaleX-n1-rtl position-absolute bottom-0 end-0 me-4 mb-4 pb-2"
                          width={83}
                          alt="view sales"
                        />
                      </div>
                    </div>
                    {/*/ Congratulations card */}
                    {/* Transactions */}
                    <div className="col-lg-8">
                      <div className="card">
                        <div className="card-header">
                          <div className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title m-0 me-2">
                              Transactions
                            </h5>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="transactionID"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="mdi mdi-dots-vertical mdi-24px" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="transactionID"
                                style={{}}
                              >
                                <a
                                  className="dropdown-item waves-effect"
                                  href="#"
                                >
                                  Refresh
                                </a>
                                <a
                                  className="dropdown-item waves-effect"
                                  href="#"
                                >
                                  Share
                                </a>
                                <a
                                  className="dropdown-item waves-effect"
                                  href="#"
                                >
                                  Update
                                </a>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3">
                            <span className="fw-medium">
                              Total 48.5% growth
                            </span>{" "}
                            😎 this month
                          </p>
                        </div>
                        <div className="card-body">
                          <div className="row g-3">
                            <div className="col-md-3 col-6">
                              <div className="d-flex align-items-center">
                                <div className="avatar">
                                  <div className="avatar-initial bg-primary rounded shadow">
                                    <i className="mdi mdi-trending-up mdi-24px" />
                                  </div>
                                </div>
                                <div className="ms-3">
                                  <div className="small mb-1">Sales</div>
                                  <h5 className="mb-0">245k</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-6">
                              <div className="d-flex align-items-center">
                                <div className="avatar">
                                  <div className="avatar-initial bg-success rounded shadow">
                                    <i className="mdi mdi-account-outline mdi-24px" />
                                  </div>
                                </div>
                                <div className="ms-3">
                                  <div className="small mb-1">Customers</div>
                                  <h5 className="mb-0">12.5k</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-6">
                              <div className="d-flex align-items-center">
                                <div className="avatar">
                                  <div className="avatar-initial bg-warning rounded shadow">
                                    <i className="mdi mdi-cellphone-link mdi-24px" />
                                  </div>
                                </div>
                                <div className="ms-3">
                                  <div className="small mb-1">Product</div>
                                  <h5 className="mb-0">1.54k</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-6">
                              <div className="d-flex align-items-center">
                                <div className="avatar">
                                  <div className="avatar-initial bg-info rounded shadow">
                                    <i className="mdi mdi-currency-usd mdi-24px" />
                                  </div>
                                </div>
                                <div className="ms-3">
                                  <div className="small mb-1">Revenue</div>
                                  <h5 className="mb-0">$88k</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*/ Transactions */}
                    {/* Weekly Overview Chart */}
                    <div className="col-xl-4 col-md-6">
                      <div className="card">
                        <div className="card-header">
                          <div className="d-flex justify-content-between">
                            <h5 className="mb-1">Weekly Overview</h5>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="weeklyOverviewDropdown"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="mdi mdi-dots-vertical mdi-24px" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="weeklyOverviewDropdown"
                              >
                                <a
                                  className="dropdown-item waves-effect"
                                  href="#"
                                >
                                  Refresh
                                </a>
                                <a
                                  className="dropdown-item waves-effect"
                                  href="#"
                                >
                                  Share
                                </a>
                                <a
                                  className="dropdown-item waves-effect"
                                  href="#"
                                >
                                  Update
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="card-body"
                          style={{ position: "relative" }}
                        >
                          <div
                            id="weeklyOverviewChart"
                            style={{ minHeight: 200 }}
                          >
                            <div
                              id="apexchartsvxcq40roj"
                              className="apexcharts-canvas apexchartsvxcq40roj apexcharts-theme-light"
                              style={{ width: 408, height: 200 }}
                            >
                              <svg
                                id="SvgjsSvg2113"
                                width={408}
                                height={200}
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                xmlns:svgjs="http://svgjs.dev"
                                className="apexcharts-svg apexcharts-zoomable"
                                xmlns:data="ApexChartsNS"
                                transform="translate(-16, -9)"
                                style={{ background: "transparent" }}
                              >
                                <g
                                  id="SvgjsG2115"
                                  className="apexcharts-inner apexcharts-graphical"
                                  transform="translate(70.87352701822917, 30)"
                                >
                                  <defs id="SvgjsDefs2114">
                                    <linearGradient
                                      id="SvgjsLinearGradient2119"
                                      x1={0}
                                      y1={0}
                                      x2={0}
                                      y2={1}
                                    >
                                      <stop
                                        id="SvgjsStop2120"
                                        stopOpacity="0.4"
                                        stopColor="rgba(216,227,240,0.4)"
                                        offset={0}
                                      />
                                      <stop
                                        id="SvgjsStop2121"
                                        stopOpacity="0.5"
                                        stopColor="rgba(190,209,230,0.5)"
                                        offset={1}
                                      />
                                      <stop
                                        id="SvgjsStop2122"
                                        stopOpacity="0.5"
                                        stopColor="rgba(190,209,230,0.5)"
                                        offset={1}
                                      />
                                    </linearGradient>
                                    <clipPath id="gridRectMaskvxcq40roj">
                                      <rect
                                        id="SvgjsRect2124"
                                        width="351.717041015625"
                                        height={165}
                                        x="-18.59056803385417"
                                        y={0}
                                        rx={0}
                                        ry={0}
                                        opacity={1}
                                        strokeWidth={0}
                                        stroke="none"
                                        strokeDasharray={0}
                                        fill="#fff"
                                      />
                                    </clipPath>
                                    <clipPath id="forecastMaskvxcq40roj" />
                                    <clipPath id="nonForecastMaskvxcq40roj" />
                                    <clipPath id="gridRectMarkerMaskvxcq40roj">
                                      <rect
                                        id="SvgjsRect2125"
                                        width="318.53590494791666"
                                        height={169}
                                        x={-2}
                                        y={-2}
                                        rx={0}
                                        ry={0}
                                        opacity={1}
                                        strokeWidth={0}
                                        stroke="none"
                                        strokeDasharray={0}
                                        fill="#fff"
                                      />
                                    </clipPath>
                                  </defs>
                                  <rect
                                    id="SvgjsRect2123"
                                    width="15.726795247395833"
                                    height={165}
                                    x={0}
                                    y={0}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    strokeDasharray={3}
                                    fill="url(#SvgjsLinearGradient2119)"
                                    className="apexcharts-xcrosshairs"
                                    y2={165}
                                    filter="none"
                                    fillOpacity="0.9"
                                  />
                                  <g
                                    id="SvgjsG2144"
                                    className="apexcharts-xaxis"
                                    transform="translate(0, 0)"
                                  >
                                    <g
                                      id="SvgjsG2145"
                                      className="apexcharts-xaxis-texts-g"
                                      transform="translate(0, -4)"
                                    />
                                  </g>
                                  <g
                                    id="SvgjsG2163"
                                    className="apexcharts-grid"
                                  >
                                    <g
                                      id="SvgjsG2164"
                                      className="apexcharts-gridlines-horizontal"
                                    >
                                      <line
                                        id="SvgjsLine2166"
                                        x1="-16.59056803385417"
                                        y1={0}
                                        x2="331.1264729817708"
                                        y2={0}
                                        stroke="#e7e7e8"
                                        strokeDasharray={8}
                                        strokeLinecap="butt"
                                        className="apexcharts-gridline"
                                      />
                                      <line
                                        id="SvgjsLine2167"
                                        x1="-16.59056803385417"
                                        y1={55}
                                        x2="331.1264729817708"
                                        y2={55}
                                        stroke="#e7e7e8"
                                        strokeDasharray={8}
                                        strokeLinecap="butt"
                                        className="apexcharts-gridline"
                                      />
                                      <line
                                        id="SvgjsLine2168"
                                        x1="-16.59056803385417"
                                        y1={110}
                                        x2="331.1264729817708"
                                        y2={110}
                                        stroke="#e7e7e8"
                                        strokeDasharray={8}
                                        strokeLinecap="butt"
                                        className="apexcharts-gridline"
                                      />
                                      <line
                                        id="SvgjsLine2169"
                                        x1="-16.59056803385417"
                                        y1={165}
                                        x2="331.1264729817708"
                                        y2={165}
                                        stroke="#e7e7e8"
                                        strokeDasharray={8}
                                        strokeLinecap="butt"
                                        className="apexcharts-gridline"
                                      />
                                    </g>
                                    <g
                                      id="SvgjsG2165"
                                      className="apexcharts-gridlines-vertical"
                                    />
                                    <line
                                      id="SvgjsLine2171"
                                      x1={0}
                                      y1={165}
                                      x2="314.53590494791666"
                                      y2={165}
                                      stroke="transparent"
                                      strokeDasharray={0}
                                      strokeLinecap="butt"
                                    />
                                    <line
                                      id="SvgjsLine2170"
                                      x1={0}
                                      y1={1}
                                      x2={0}
                                      y2={165}
                                      stroke="transparent"
                                      strokeDasharray={0}
                                      strokeLinecap="butt"
                                    />
                                  </g>
                                  <g
                                    id="SvgjsG2126"
                                    className="apexcharts-bar-series apexcharts-plot-series"
                                  >
                                    <g
                                      id="SvgjsG2127"
                                      className="apexcharts-series"
                                      rel={1}
                                      seriesname="Sales"
                                      data:realindex={0}
                                    >
                                      <path
                                        id="SvgjsPath2131"
                                        d="M -7.863397623697916 157L -7.863397623697916 114.33333333333333Q -7.863397623697916 106.33333333333333 0.1366023763020836 106.33333333333333L -0.1366023763020836 106.33333333333333Q 7.863397623697916 106.33333333333333 7.863397623697916 114.33333333333333L 7.863397623697916 114.33333333333333L 7.863397623697916 157Q 7.863397623697916 165 -0.1366023763020836 165L 0.1366023763020836 165Q -7.863397623697916 165 -7.863397623697916 157z"
                                        fill="rgba(240,242,248,0.85)"
                                        fillOpacity={1}
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={0}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMaskvxcq40roj)"
                                        pathto="M -7.863397623697916 157L -7.863397623697916 114.33333333333333Q -7.863397623697916 106.33333333333333 0.1366023763020836 106.33333333333333L -0.1366023763020836 106.33333333333333Q 7.863397623697916 106.33333333333333 7.863397623697916 114.33333333333333L 7.863397623697916 114.33333333333333L 7.863397623697916 157Q 7.863397623697916 165 -0.1366023763020836 165L 0.1366023763020836 165Q -7.863397623697916 165 -7.863397623697916 157z"
                                        pathfrom="M -7.863397623697916 157L -7.863397623697916 157L 7.863397623697916 157L 7.863397623697916 157L 7.863397623697916 157L 7.863397623697916 157L 7.863397623697916 157L -7.863397623697916 157"
                                        cy="106.33333333333333"
                                        cx="7.863397623697916"
                                        j={0}
                                        val={32}
                                        barheight="58.66666666666667"
                                        barwidth="15.726795247395833"
                                      />
                                      <path
                                        id="SvgjsPath2133"
                                        d="M 44.55925320095486 157L 44.55925320095486 72.16666666666666Q 44.55925320095486 64.16666666666666 52.55925320095486 64.16666666666666L 52.2860484483507 64.16666666666666Q 60.2860484483507 64.16666666666666 60.2860484483507 72.16666666666666L 60.2860484483507 72.16666666666666L 60.2860484483507 157Q 60.2860484483507 165 52.2860484483507 165L 52.55925320095486 165Q 44.55925320095486 165 44.55925320095486 157z"
                                        fill="rgba(240,242,248,0.85)"
                                        fillOpacity={1}
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={0}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMaskvxcq40roj)"
                                        pathto="M 44.55925320095486 157L 44.55925320095486 72.16666666666666Q 44.55925320095486 64.16666666666666 52.55925320095486 64.16666666666666L 52.2860484483507 64.16666666666666Q 60.2860484483507 64.16666666666666 60.2860484483507 72.16666666666666L 60.2860484483507 72.16666666666666L 60.2860484483507 157Q 60.2860484483507 165 52.2860484483507 165L 52.55925320095486 165Q 44.55925320095486 165 44.55925320095486 157z"
                                        pathfrom="M 44.55925320095486 157L 44.55925320095486 157L 60.2860484483507 157L 60.2860484483507 157L 60.2860484483507 157L 60.2860484483507 157L 60.2860484483507 157L 44.55925320095486 157"
                                        cy="64.16666666666666"
                                        cx="60.2860484483507"
                                        j={1}
                                        val={55}
                                        barheight="100.83333333333334"
                                        barwidth="15.726795247395833"
                                      />
                                      <path
                                        id="SvgjsPath2135"
                                        d="M 96.98190402560763 157L 96.98190402560763 90.5Q 96.98190402560763 82.5 104.98190402560763 82.5L 104.70869927300346 82.5Q 112.70869927300346 82.5 112.70869927300346 90.5L 112.70869927300346 90.5L 112.70869927300346 157Q 112.70869927300346 165 104.70869927300346 165L 104.98190402560763 165Q 96.98190402560763 165 96.98190402560763 157z"
                                        fill="rgba(240,242,248,0.85)"
                                        fillOpacity={1}
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={0}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMaskvxcq40roj)"
                                        pathto="M 96.98190402560763 157L 96.98190402560763 90.5Q 96.98190402560763 82.5 104.98190402560763 82.5L 104.70869927300346 82.5Q 112.70869927300346 82.5 112.70869927300346 90.5L 112.70869927300346 90.5L 112.70869927300346 157Q 112.70869927300346 165 104.70869927300346 165L 104.98190402560763 165Q 96.98190402560763 165 96.98190402560763 157z"
                                        pathfrom="M 96.98190402560763 157L 96.98190402560763 157L 112.70869927300346 157L 112.70869927300346 157L 112.70869927300346 157L 112.70869927300346 157L 112.70869927300346 157L 96.98190402560763 157"
                                        cy="82.5"
                                        cx="112.70869927300346"
                                        j={2}
                                        val={45}
                                        barheight="82.5"
                                        barwidth="15.726795247395833"
                                      />
                                      <path
                                        id="SvgjsPath2137"
                                        d="M 149.4045548502604 157L 149.4045548502604 35.5Q 149.4045548502604 27.5 157.4045548502604 27.5L 157.13135009765625 27.5Q 165.13135009765625 27.5 165.13135009765625 35.5L 165.13135009765625 35.5L 165.13135009765625 157Q 165.13135009765625 165 157.13135009765625 165L 157.4045548502604 165Q 149.4045548502604 165 149.4045548502604 157z"
                                        fill="rgba(144,85,253,0.85)"
                                        fillOpacity={1}
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={0}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMaskvxcq40roj)"
                                        pathto="M 149.4045548502604 157L 149.4045548502604 35.5Q 149.4045548502604 27.5 157.4045548502604 27.5L 157.13135009765625 27.5Q 165.13135009765625 27.5 165.13135009765625 35.5L 165.13135009765625 35.5L 165.13135009765625 157Q 165.13135009765625 165 157.13135009765625 165L 157.4045548502604 165Q 149.4045548502604 165 149.4045548502604 157z"
                                        pathfrom="M 149.4045548502604 157L 149.4045548502604 157L 165.13135009765625 157L 165.13135009765625 157L 165.13135009765625 157L 165.13135009765625 157L 165.13135009765625 157L 149.4045548502604 157"
                                        cy="27.5"
                                        cx="165.13135009765625"
                                        j={3}
                                        val={75}
                                        barheight="137.5"
                                        barwidth="15.726795247395833"
                                      />
                                      <path
                                        id="SvgjsPath2139"
                                        d="M 201.8272056749132 157L 201.8272056749132 72.16666666666666Q 201.8272056749132 64.16666666666666 209.8272056749132 64.16666666666666L 209.55400092230903 64.16666666666666Q 217.55400092230903 64.16666666666666 217.55400092230903 72.16666666666666L 217.55400092230903 72.16666666666666L 217.55400092230903 157Q 217.55400092230903 165 209.55400092230903 165L 209.8272056749132 165Q 201.8272056749132 165 201.8272056749132 157z"
                                        fill="rgba(240,242,248,0.85)"
                                        fillOpacity={1}
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={0}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMaskvxcq40roj)"
                                        pathto="M 201.8272056749132 157L 201.8272056749132 72.16666666666666Q 201.8272056749132 64.16666666666666 209.8272056749132 64.16666666666666L 209.55400092230903 64.16666666666666Q 217.55400092230903 64.16666666666666 217.55400092230903 72.16666666666666L 217.55400092230903 72.16666666666666L 217.55400092230903 157Q 217.55400092230903 165 209.55400092230903 165L 209.8272056749132 165Q 201.8272056749132 165 201.8272056749132 157z"
                                        pathfrom="M 201.8272056749132 157L 201.8272056749132 157L 217.55400092230903 157L 217.55400092230903 157L 217.55400092230903 157L 217.55400092230903 157L 217.55400092230903 157L 201.8272056749132 157"
                                        cy="64.16666666666666"
                                        cx="217.55400092230903"
                                        j={4}
                                        val={55}
                                        barheight="100.83333333333334"
                                        barwidth="15.726795247395833"
                                      />
                                      <path
                                        id="SvgjsPath2141"
                                        d="M 254.24985649956594 157L 254.24985649956594 108.83333333333333Q 254.24985649956594 100.83333333333333 262.2498564995659 100.83333333333333L 261.97665174696175 100.83333333333333Q 269.97665174696175 100.83333333333333 269.97665174696175 108.83333333333333L 269.97665174696175 108.83333333333333L 269.97665174696175 157Q 269.97665174696175 165 261.97665174696175 165L 262.2498564995659 165Q 254.24985649956594 165 254.24985649956594 157z"
                                        fill="rgba(240,242,248,0.85)"
                                        fillOpacity={1}
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={0}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMaskvxcq40roj)"
                                        pathto="M 254.24985649956594 157L 254.24985649956594 108.83333333333333Q 254.24985649956594 100.83333333333333 262.2498564995659 100.83333333333333L 261.97665174696175 100.83333333333333Q 269.97665174696175 100.83333333333333 269.97665174696175 108.83333333333333L 269.97665174696175 108.83333333333333L 269.97665174696175 157Q 269.97665174696175 165 261.97665174696175 165L 262.2498564995659 165Q 254.24985649956594 165 254.24985649956594 157z"
                                        pathfrom="M 254.24985649956594 157L 254.24985649956594 157L 269.97665174696175 157L 269.97665174696175 157L 269.97665174696175 157L 269.97665174696175 157L 269.97665174696175 157L 254.24985649956594 157"
                                        cy="100.83333333333333"
                                        cx="269.97665174696175"
                                        j={5}
                                        val={35}
                                        barheight="64.16666666666667"
                                        barwidth="15.726795247395833"
                                      />
                                      <path
                                        id="SvgjsPath2143"
                                        d="M 306.67250732421877 157L 306.67250732421877 44.66666666666666Q 306.67250732421877 36.66666666666666 314.67250732421877 36.66666666666666L 314.3993025716146 36.66666666666666Q 322.3993025716146 36.66666666666666 322.3993025716146 44.66666666666666L 322.3993025716146 44.66666666666666L 322.3993025716146 157Q 322.3993025716146 165 314.3993025716146 165L 314.67250732421877 165Q 306.67250732421877 165 306.67250732421877 157z"
                                        fill="rgba(240,242,248,0.85)"
                                        fillOpacity={1}
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={0}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMaskvxcq40roj)"
                                        pathto="M 306.67250732421877 157L 306.67250732421877 44.66666666666666Q 306.67250732421877 36.66666666666666 314.67250732421877 36.66666666666666L 314.3993025716146 36.66666666666666Q 322.3993025716146 36.66666666666666 322.3993025716146 44.66666666666666L 322.3993025716146 44.66666666666666L 322.3993025716146 157Q 322.3993025716146 165 314.3993025716146 165L 314.67250732421877 165Q 306.67250732421877 165 306.67250732421877 157z"
                                        pathfrom="M 306.67250732421877 157L 306.67250732421877 157L 322.3993025716146 157L 322.3993025716146 157L 322.3993025716146 157L 322.3993025716146 157L 322.3993025716146 157L 306.67250732421877 157"
                                        cy="36.66666666666666"
                                        cx="322.3993025716146"
                                        j={6}
                                        val={70}
                                        barheight="128.33333333333334"
                                        barwidth="15.726795247395833"
                                      />
                                      <g
                                        id="SvgjsG2129"
                                        className="apexcharts-bar-goals-markers"
                                        style={{ pointerEvents: "none" }}
                                      >
                                        <g
                                          id="SvgjsG2130"
                                          className="apexcharts-bar-goals-groups"
                                        />
                                        <g
                                          id="SvgjsG2132"
                                          className="apexcharts-bar-goals-groups"
                                        />
                                        <g
                                          id="SvgjsG2134"
                                          className="apexcharts-bar-goals-groups"
                                        />
                                        <g
                                          id="SvgjsG2136"
                                          className="apexcharts-bar-goals-groups"
                                        />
                                        <g
                                          id="SvgjsG2138"
                                          className="apexcharts-bar-goals-groups"
                                        />
                                        <g
                                          id="SvgjsG2140"
                                          className="apexcharts-bar-goals-groups"
                                        />
                                        <g
                                          id="SvgjsG2142"
                                          className="apexcharts-bar-goals-groups"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="SvgjsG2128"
                                      className="apexcharts-datalabels"
                                      data:realindex={0}
                                    />
                                  </g>
                                  <line
                                    id="SvgjsLine2172"
                                    x1="-16.59056803385417"
                                    y1={0}
                                    x2="331.1264729817708"
                                    y2={0}
                                    stroke="#b6b6b6"
                                    strokeDasharray={0}
                                    strokeWidth={1}
                                    strokeLinecap="butt"
                                    className="apexcharts-ycrosshairs"
                                  />
                                  <line
                                    id="SvgjsLine2173"
                                    x1="-16.59056803385417"
                                    y1={0}
                                    x2="331.1264729817708"
                                    y2={0}
                                    strokeDasharray={0}
                                    strokeWidth={0}
                                    strokeLinecap="butt"
                                    className="apexcharts-ycrosshairs-hidden"
                                  />
                                  <g
                                    id="SvgjsG2174"
                                    className="apexcharts-yaxis-annotations"
                                  />
                                  <g
                                    id="SvgjsG2175"
                                    className="apexcharts-xaxis-annotations"
                                  />
                                  <g
                                    id="SvgjsG2176"
                                    className="apexcharts-point-annotations"
                                  />
                                  <rect
                                    id="SvgjsRect2177"
                                    width={0}
                                    height={0}
                                    x={0}
                                    y={0}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    stroke="none"
                                    strokeDasharray={0}
                                    fill="#fefefe"
                                    className="apexcharts-zoom-rect"
                                  />
                                  <rect
                                    id="SvgjsRect2178"
                                    width={0}
                                    height={0}
                                    x={0}
                                    y={0}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    stroke="none"
                                    strokeDasharray={0}
                                    fill="#fefefe"
                                    className="apexcharts-selection-rect"
                                  />
                                </g>
                                <g
                                  id="SvgjsG2153"
                                  className="apexcharts-yaxis"
                                  rel={0}
                                  transform="translate(20.282958984375, 0)"
                                >
                                  <g
                                    id="SvgjsG2154"
                                    className="apexcharts-yaxis-texts-g"
                                  >
                                    <text
                                      id="SvgjsText2155"
                                      fontFamily="Inter"
                                      x={20}
                                      y="31.3"
                                      textAnchor="end"
                                      dominantBaseline="auto"
                                      fontSize="0.75rem"
                                      fontWeight={400}
                                      fill="#b4b2b7"
                                      className="apexcharts-text apexcharts-yaxis-label "
                                      style={{ fontFamily: "Inter" }}
                                    >
                                      <tspan id="SvgjsTspan2156">90K</tspan>
                                      <title>90K</title>
                                    </text>
                                    <text
                                      id="SvgjsText2157"
                                      fontFamily="Inter"
                                      x={20}
                                      y="86.3"
                                      textAnchor="end"
                                      dominantBaseline="auto"
                                      fontSize="0.75rem"
                                      fontWeight={400}
                                      fill="#b4b2b7"
                                      className="apexcharts-text apexcharts-yaxis-label "
                                      style={{ fontFamily: "Inter" }}
                                    >
                                      <tspan id="SvgjsTspan2158">60K</tspan>
                                      <title>60K</title>
                                    </text>
                                    <text
                                      id="SvgjsText2159"
                                      fontFamily="Inter"
                                      x={20}
                                      y="141.3"
                                      textAnchor="end"
                                      dominantBaseline="auto"
                                      fontSize="0.75rem"
                                      fontWeight={400}
                                      fill="#b4b2b7"
                                      className="apexcharts-text apexcharts-yaxis-label "
                                      style={{ fontFamily: "Inter" }}
                                    >
                                      <tspan id="SvgjsTspan2160">30K</tspan>
                                      <title>30K</title>
                                    </text>
                                    <text
                                      id="SvgjsText2161"
                                      fontFamily="Inter"
                                      x={20}
                                      y="196.3"
                                      textAnchor="end"
                                      dominantBaseline="auto"
                                      fontSize="0.75rem"
                                      fontWeight={400}
                                      fill="#b4b2b7"
                                      className="apexcharts-text apexcharts-yaxis-label "
                                      style={{ fontFamily: "Inter" }}
                                    >
                                      <tspan id="SvgjsTspan2162">0K</tspan>
                                      <title>0K</title>
                                    </text>
                                  </g>
                                </g>
                                <g
                                  id="SvgjsG2116"
                                  className="apexcharts-annotations"
                                />
                              </svg>
                              <div
                                className="apexcharts-legend"
                                style={{ maxHeight: 100 }}
                              />
                              <div className="apexcharts-tooltip apexcharts-theme-light">
                                <div
                                  className="apexcharts-tooltip-title"
                                  style={{
                                    fontFamily: "Helvetica, Arial, sans-serif",
                                    fontSize: 12,
                                  }}
                                />
                                <div
                                  className="apexcharts-tooltip-series-group"
                                  style={{ order: 1 }}
                                >
                                  <span
                                    className="apexcharts-tooltip-marker"
                                    style={{
                                      backgroundColor: "rgb(240, 242, 248)",
                                    }}
                                  />
                                  <div
                                    className="apexcharts-tooltip-text"
                                    style={{
                                      fontFamily:
                                        "Helvetica, Arial, sans-serif",
                                      fontSize: 12,
                                    }}
                                  >
                                    <div className="apexcharts-tooltip-y-group">
                                      <span className="apexcharts-tooltip-text-y-label" />
                                      <span className="apexcharts-tooltip-text-y-value" />
                                    </div>
                                    <div className="apexcharts-tooltip-goals-group">
                                      <span className="apexcharts-tooltip-text-goals-label" />
                                      <span className="apexcharts-tooltip-text-goals-value" />
                                    </div>
                                    <div className="apexcharts-tooltip-z-group">
                                      <span className="apexcharts-tooltip-text-z-label" />
                                      <span className="apexcharts-tooltip-text-z-value" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                <div className="apexcharts-yaxistooltip-text" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-1 mt-md-3">
                            <div className="d-flex align-items-center gap-3">
                              <h3 className="mb-0">45%</h3>
                              <p className="mb-0">
                                Your sales performance is 45% 😎 better compared
                                to last month
                              </p>
                            </div>
                            <div className="d-grid mt-3 mt-md-4">
                              <button
                                className="btn btn-primary waves-effect waves-light"
                                type="button"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                          <div className="resize-triggers">
                            <div className="expand-trigger">
                              <div style={{ width: 449, height: 351 }} />
                            </div>
                            <div className="contract-trigger" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*/ Weekly Overview Chart */}
                    {/* Total Earnings */}
                    <div className="col-xl-4 col-md-6">
                      <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between">
                          <h5 className="card-title m-0 me-2">Total Earning</h5>
                          <div className="dropdown">
                            <button
                              className="btn p-0"
                              type="button"
                              id="totalEarnings"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="mdi mdi-dots-vertical mdi-24px" />
                            </button>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="totalEarnings"
                            >
                              <a
                                className="dropdown-item waves-effect"
                                href="#"
                              >
                                Last 28 Days
                              </a>
                              <a
                                className="dropdown-item waves-effect"
                                href="#"
                              >
                                Last Month
                              </a>
                              <a
                                className="dropdown-item waves-effect"
                                href="#"
                              >
                                Last Year
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="mb-3 mt-md-3 mb-md-5">
                            <div className="d-flex align-items-center">
                              <h2 className="mb-0">$24,895</h2>
                              <span className="text-success ms-2 fw-medium">
                                <i className="mdi mdi-menu-up mdi-24px" />
                                <small>10%</small>
                              </span>
                            </div>
                            <small className="mt-1">
                              Compared to $84,325 last year
                            </small>
                          </div>
                          <ul className="p-0 m-0">
                            <li className="d-flex mb-4 pb-md-2">
                              <div className="avatar flex-shrink-0 me-3">
                                <img
                                  src="/img/icons/misc/zipcar.png"
                                  alt="zipcar"
                                  className="rounded"
                                />
                              </div>
                              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                  <h6 className="mb-0">Zipcar</h6>
                                  <small>Vuejs, React &amp; HTML</small>
                                </div>
                                <div>
                                  <h6 className="mb-2">$24,895.65</h6>
                                  <div
                                    className="progress bg-label-primary"
                                    style={{ height: 4 }}
                                  >
                                    <div
                                      className="progress-bar bg-primary"
                                      style={{ width: "75%" }}
                                      role="progressbar"
                                      aria-valuenow={75}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="d-flex mb-4 pb-md-2">
                              <div className="avatar flex-shrink-0 me-3">
                                <img
                                  src="/img/icons/misc/bitbank.png"
                                  alt="bitbank"
                                  className="rounded"
                                />
                              </div>
                              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                  <h6 className="mb-0">Bitbank</h6>
                                  <small>Sketch, Figma &amp; XD</small>
                                </div>
                                <div>
                                  <h6 className="mb-2">$8,6500.20</h6>
                                  <div
                                    className="progress bg-label-info"
                                    style={{ height: 4 }}
                                  >
                                    <div
                                      className="progress-bar bg-info"
                                      style={{ width: "75%" }}
                                      role="progressbar"
                                      aria-valuenow={75}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="d-flex mb-md-3">
                              <div className="avatar flex-shrink-0 me-3">
                                <img
                                  src="/img/icons/misc/aviato.png"
                                  alt="aviato"
                                  className="rounded"
                                />
                              </div>
                              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                <div className="me-2">
                                  <h6 className="mb-0">Aviato</h6>
                                  <small>HTML &amp; Angular</small>
                                </div>
                                <div>
                                  <h6 className="mb-2">$1,2450.80</h6>
                                  <div
                                    className="progress bg-label-secondary"
                                    style={{ height: 4 }}
                                  >
                                    <div
                                      className="progress-bar bg-secondary"
                                      style={{ width: "75%" }}
                                      role="progressbar"
                                      aria-valuenow={75}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/*/ Total Earnings */}
                    {/* Four Cards */}
                    <div className="col-xl-4 col-md-6">
                      <div className="row gy-4">
                        {/* Total Profit line chart */}
                        <div className="col-sm-6">
                          <div className="card h-100">
                            <div className="card-header pb-0">
                              <h4 className="mb-0">$86.4k</h4>
                            </div>
                            <div
                              className="card-body"
                              style={{ position: "relative" }}
                            >
                              <div
                                id="totalProfitLineChart"
                                className="mb-3"
                                style={{ minHeight: 90 }}
                              >
                                <div
                                  id="apexcharts190nw53v"
                                  className="apexcharts-canvas apexcharts190nw53v apexcharts-theme-light"
                                  style={{ width: 172, height: 90 }}
                                >
                                  <svg
                                    id="SvgjsSvg2179"
                                    width={172}
                                    height={90}
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    xmlns:svgjs="http://svgjs.dev"
                                    className="apexcharts-svg apexcharts-zoomable"
                                    xmlns:data="ApexChartsNS"
                                    transform="translate(0, 0)"
                                    style={{ background: "transparent" }}
                                  >
                                    <g
                                      id="SvgjsG2181"
                                      className="apexcharts-inner apexcharts-graphical"
                                      transform="translate(3, 15)"
                                    >
                                      <defs id="SvgjsDefs2180">
                                        <clipPath id="gridRectMask190nw53v">
                                          <rect
                                            id="SvgjsRect2186"
                                            width={167}
                                            height={78}
                                            x="-3.5"
                                            y="-1.5"
                                            rx={0}
                                            ry={0}
                                            opacity={1}
                                            strokeWidth={0}
                                            stroke="none"
                                            strokeDasharray={0}
                                            fill="#fff"
                                          />
                                        </clipPath>
                                        <clipPath id="forecastMask190nw53v" />
                                        <clipPath id="nonForecastMask190nw53v" />
                                        <clipPath id="gridRectMarkerMask190nw53v">
                                          <rect
                                            id="SvgjsRect2187"
                                            width={188}
                                            height={103}
                                            x={-14}
                                            y={-14}
                                            rx={0}
                                            ry={0}
                                            opacity={1}
                                            strokeWidth={0}
                                            stroke="none"
                                            strokeDasharray={0}
                                            fill="#fff"
                                          />
                                        </clipPath>
                                      </defs>
                                      <line
                                        id="SvgjsLine2185"
                                        x1={0}
                                        y1={0}
                                        x2={0}
                                        y2={75}
                                        stroke="#b6b6b6"
                                        strokeDasharray={3}
                                        strokeLinecap="butt"
                                        className="apexcharts-xcrosshairs"
                                        x={0}
                                        y={0}
                                        width={1}
                                        height={75}
                                        fill="#b1b9c4"
                                        filter="none"
                                        fillOpacity="0.9"
                                        strokeWidth={1}
                                      />
                                      <g
                                        id="SvgjsG2204"
                                        className="apexcharts-xaxis"
                                        transform="translate(0, 0)"
                                      >
                                        <g
                                          id="SvgjsG2205"
                                          className="apexcharts-xaxis-texts-g"
                                          transform="translate(0, -4)"
                                        />
                                      </g>
                                      <g
                                        id="SvgjsG2214"
                                        className="apexcharts-grid"
                                      >
                                        <g
                                          id="SvgjsG2215"
                                          className="apexcharts-gridlines-horizontal"
                                        />
                                        <g
                                          id="SvgjsG2216"
                                          className="apexcharts-gridlines-vertical"
                                        >
                                          <line
                                            id="SvgjsLine2217"
                                            x1={0}
                                            y1={0}
                                            x2={0}
                                            y2={75}
                                            stroke="#b4b2b7"
                                            strokeDasharray={6}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine2218"
                                            x1={32}
                                            y1={0}
                                            x2={32}
                                            y2={75}
                                            stroke="#b4b2b7"
                                            strokeDasharray={6}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine2219"
                                            x1={64}
                                            y1={0}
                                            x2={64}
                                            y2={75}
                                            stroke="#b4b2b7"
                                            strokeDasharray={6}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine2220"
                                            x1={96}
                                            y1={0}
                                            x2={96}
                                            y2={75}
                                            stroke="#b4b2b7"
                                            strokeDasharray={6}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine2221"
                                            x1={128}
                                            y1={0}
                                            x2={128}
                                            y2={75}
                                            stroke="#b4b2b7"
                                            strokeDasharray={6}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine2222"
                                            x1={160}
                                            y1={0}
                                            x2={160}
                                            y2={75}
                                            stroke="#b4b2b7"
                                            strokeDasharray={6}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                        </g>
                                        <line
                                          id="SvgjsLine2224"
                                          x1={0}
                                          y1={75}
                                          x2={160}
                                          y2={75}
                                          stroke="transparent"
                                          strokeDasharray={0}
                                          strokeLinecap="butt"
                                        />
                                        <line
                                          id="SvgjsLine2223"
                                          x1={0}
                                          y1={1}
                                          x2={0}
                                          y2={75}
                                          stroke="transparent"
                                          strokeDasharray={0}
                                          strokeLinecap="butt"
                                        />
                                      </g>
                                      <g
                                        id="SvgjsG2188"
                                        className="apexcharts-line-series apexcharts-plot-series"
                                      >
                                        <g
                                          id="SvgjsG2189"
                                          className="apexcharts-series"
                                          seriesname="seriesx1"
                                          data:longestseries="true"
                                          rel={1}
                                          data:realindex={0}
                                        >
                                          <path
                                            id="SvgjsPath2203"
                                            d="M 0 75L 32 45L 64 67.5L 96 30L 128 52.5L 160 7.5"
                                            fill="none"
                                            fillOpacity={1}
                                            stroke="rgba(144,85,253,0.85)"
                                            strokeOpacity={1}
                                            strokeLinecap="butt"
                                            strokeWidth={3}
                                            strokeDasharray={0}
                                            className="apexcharts-line"
                                            index={0}
                                            clipPath="url(#gridRectMask190nw53v)"
                                            pathto="M 0 75L 32 45L 64 67.5L 96 30L 128 52.5L 160 7.5"
                                            pathfrom="M -1 75L -1 75L 32 75L 64 75L 96 75L 128 75L 160 75"
                                          />
                                          <g
                                            id="SvgjsG2190"
                                            className="apexcharts-series-markers-wrap"
                                            data:realindex={0}
                                          >
                                            <g
                                              id="SvgjsG2192"
                                              className="apexcharts-series-markers"
                                              clipPath="url(#gridRectMarkerMask190nw53v)"
                                            >
                                              <circle
                                                id="SvgjsCircle2193"
                                                r={6}
                                                cx={0}
                                                cy={75}
                                                className="apexcharts-marker no-pointer-events w4drxvh58"
                                                stroke="transparent"
                                                fill="transparent"
                                                fillOpacity={1}
                                                strokeWidth={3}
                                                strokeOpacity="0.9"
                                                rel={0}
                                                j={0}
                                                index={0}
                                                default-marker-size={6}
                                              />
                                              <circle
                                                id="SvgjsCircle2194"
                                                r={6}
                                                cx={32}
                                                cy={45}
                                                className="apexcharts-marker no-pointer-events w5i8ykzuf"
                                                stroke="transparent"
                                                fill="transparent"
                                                fillOpacity={1}
                                                strokeWidth={3}
                                                strokeOpacity="0.9"
                                                rel={1}
                                                j={1}
                                                index={0}
                                                default-marker-size={6}
                                              />
                                            </g>
                                            <g
                                              id="SvgjsG2195"
                                              className="apexcharts-series-markers"
                                              clipPath="url(#gridRectMarkerMask190nw53v)"
                                            >
                                              <circle
                                                id="SvgjsCircle2196"
                                                r={6}
                                                cx={64}
                                                cy="67.5"
                                                className="apexcharts-marker no-pointer-events wdscva2dhi"
                                                stroke="transparent"
                                                fill="transparent"
                                                fillOpacity={1}
                                                strokeWidth={3}
                                                strokeOpacity="0.9"
                                                rel={2}
                                                j={2}
                                                index={0}
                                                default-marker-size={6}
                                              />
                                            </g>
                                            <g
                                              id="SvgjsG2197"
                                              className="apexcharts-series-markers"
                                              clipPath="url(#gridRectMarkerMask190nw53v)"
                                            >
                                              <circle
                                                id="SvgjsCircle2198"
                                                r={6}
                                                cx={96}
                                                cy={30}
                                                className="apexcharts-marker no-pointer-events wyn4ihjj9"
                                                stroke="transparent"
                                                fill="transparent"
                                                fillOpacity={1}
                                                strokeWidth={3}
                                                strokeOpacity="0.9"
                                                rel={3}
                                                j={3}
                                                index={0}
                                                default-marker-size={6}
                                              />
                                            </g>
                                            <g
                                              id="SvgjsG2199"
                                              className="apexcharts-series-markers"
                                              clipPath="url(#gridRectMarkerMask190nw53v)"
                                            >
                                              <circle
                                                id="SvgjsCircle2200"
                                                r={6}
                                                cx={128}
                                                cy="52.5"
                                                className="apexcharts-marker no-pointer-events w5nvmqwv5h"
                                                stroke="transparent"
                                                fill="transparent"
                                                fillOpacity={1}
                                                strokeWidth={3}
                                                strokeOpacity="0.9"
                                                rel={4}
                                                j={4}
                                                index={0}
                                                default-marker-size={6}
                                              />
                                            </g>
                                            <g
                                              id="SvgjsG2201"
                                              className="apexcharts-series-markers"
                                              clipPath="url(#gridRectMarkerMask190nw53v)"
                                            >
                                              <circle
                                                id="SvgjsCircle2202"
                                                r={6}
                                                cx={160}
                                                cy="7.5"
                                                className="apexcharts-marker no-pointer-events w9uzbhgxy"
                                                stroke="#9055fd"
                                                fill="#ffffff"
                                                fillOpacity={1}
                                                strokeWidth={3}
                                                strokeOpacity="0.9"
                                                rel={5}
                                                j={5}
                                                index={0}
                                                default-marker-size={6}
                                              />
                                            </g>
                                          </g>
                                        </g>
                                        <g
                                          id="SvgjsG2191"
                                          className="apexcharts-datalabels"
                                          data:realindex={0}
                                        />
                                      </g>
                                      <line
                                        id="SvgjsLine2225"
                                        x1={0}
                                        y1={0}
                                        x2={160}
                                        y2={0}
                                        stroke="#b6b6b6"
                                        strokeDasharray={0}
                                        strokeWidth={1}
                                        strokeLinecap="butt"
                                        className="apexcharts-ycrosshairs"
                                      />
                                      <line
                                        id="SvgjsLine2226"
                                        x1={0}
                                        y1={0}
                                        x2={160}
                                        y2={0}
                                        strokeDasharray={0}
                                        strokeWidth={0}
                                        strokeLinecap="butt"
                                        className="apexcharts-ycrosshairs-hidden"
                                      />
                                      <g
                                        id="SvgjsG2227"
                                        className="apexcharts-yaxis-annotations"
                                      />
                                      <g
                                        id="SvgjsG2228"
                                        className="apexcharts-xaxis-annotations"
                                      />
                                      <g
                                        id="SvgjsG2229"
                                        className="apexcharts-point-annotations"
                                      />
                                      <rect
                                        id="SvgjsRect2230"
                                        width={0}
                                        height={0}
                                        x={0}
                                        y={0}
                                        rx={0}
                                        ry={0}
                                        opacity={1}
                                        strokeWidth={0}
                                        stroke="none"
                                        strokeDasharray={0}
                                        fill="#fefefe"
                                        className="apexcharts-zoom-rect"
                                      />
                                      <rect
                                        id="SvgjsRect2231"
                                        width={0}
                                        height={0}
                                        x={0}
                                        y={0}
                                        rx={0}
                                        ry={0}
                                        opacity={1}
                                        strokeWidth={0}
                                        stroke="none"
                                        strokeDasharray={0}
                                        fill="#fefefe"
                                        className="apexcharts-selection-rect"
                                      />
                                    </g>
                                    <rect
                                      id="SvgjsRect2184"
                                      width={0}
                                      height={0}
                                      x={0}
                                      y={0}
                                      rx={0}
                                      ry={0}
                                      opacity={1}
                                      strokeWidth={0}
                                      stroke="none"
                                      strokeDasharray={0}
                                      fill="#fefefe"
                                    />
                                    <g
                                      id="SvgjsG2212"
                                      className="apexcharts-yaxis"
                                      rel={0}
                                      transform="translate(-8, 0)"
                                    >
                                      <g
                                        id="SvgjsG2213"
                                        className="apexcharts-yaxis-texts-g"
                                      />
                                    </g>
                                    <g
                                      id="SvgjsG2182"
                                      className="apexcharts-annotations"
                                    />
                                  </svg>
                                  <div
                                    className="apexcharts-legend"
                                    style={{ maxHeight: 45 }}
                                  />
                                </div>
                              </div>
                              <h6 className="text-center mb-0">Total Profit</h6>
                              <div className="resize-triggers">
                                <div className="expand-trigger">
                                  <div style={{ width: 213, height: 152 }} />
                                </div>
                                <div className="contract-trigger" />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*/ Total Profit line chart */}
                        {/* Total Profit Weekly Project */}
                        <div className="col-sm-6">
                          <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-between">
                              <div className="avatar">
                                <div className="avatar-initial bg-secondary rounded-circle shadow">
                                  <i className="mdi mdi-poll mdi-24px" />
                                </div>
                              </div>
                              <div className="dropdown">
                                <button
                                  className="btn p-0"
                                  type="button"
                                  id="totalProfitID"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="mdi mdi-dots-vertical mdi-24px" />
                                </button>
                                <div
                                  className="dropdown-menu dropdown-menu-end"
                                  aria-labelledby="totalProfitID"
                                >
                                  <a
                                    className="dropdown-item waves-effect"
                                    href="#"
                                  >
                                    Refresh
                                  </a>
                                  <a
                                    className="dropdown-item waves-effect"
                                    href="#"
                                  >
                                    Share
                                  </a>
                                  <a
                                    className="dropdown-item waves-effect"
                                    href="#"
                                  >
                                    Update
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="card-body mt-mg-1">
                              <h6 className="mb-2">Total Profit</h6>
                              <div className="d-flex flex-wrap align-items-center mb-2 pb-1">
                                <h4 className="mb-0 me-2">$25.6k</h4>
                                <small className="text-success mt-1">
                                  +42%
                                </small>
                              </div>
                              <small>Weekly Project</small>
                            </div>
                          </div>
                        </div>
                        {/*/ Total Profit Weekly Project */}
                        {/* New Yearly Project */}
                        <div className="col-sm-6">
                          <div className="card h-100">
                            <div className="card-header d-flex align-items-center justify-content-between">
                              <div className="avatar">
                                <div className="avatar-initial bg-primary rounded-circle shadow-sm">
                                  <i className="mdi mdi-wallet-travel mdi-24px" />
                                </div>
                              </div>
                              <div className="dropdown">
                                <button
                                  className="btn p-0"
                                  type="button"
                                  id="newProjectID"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="mdi mdi-dots-vertical mdi-24px" />
                                </button>
                                <div
                                  className="dropdown-menu dropdown-menu-end"
                                  aria-labelledby="newProjectID"
                                >
                                  <a
                                    className="dropdown-item waves-effect"
                                    href="#"
                                  >
                                    Refresh
                                  </a>
                                  <a
                                    className="dropdown-item waves-effect"
                                    href="#"
                                  >
                                    Share
                                  </a>
                                  <a
                                    className="dropdown-item waves-effect"
                                    href="#"
                                  >
                                    Update
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="card-body mt-mg-1">
                              <h6 className="mb-2">New Project</h6>
                              <div className="d-flex flex-wrap align-items-center mb-2 pb-1">
                                <h4 className="mb-0 me-2">862</h4>
                                <small className="text-danger mt-1">-18%</small>
                              </div>
                              <small>Yearly Project</small>
                            </div>
                          </div>
                        </div>
                        {/*/ New Yearly Project */}
                        {/* Sessions chart */}
                        <div className="col-sm-6">
                          <div className="card h-100">
                            <div className="card-header pb-0">
                              <h4 className="mb-0">2,856</h4>
                            </div>
                            <div
                              className="card-body"
                              style={{ position: "relative" }}
                            >
                              <div
                                id="sessionsColumnChart"
                                className="mb-3"
                                style={{ minHeight: 90 }}
                              >
                                <div
                                  id="apexchartsgg3cah0o"
                                  className="apexcharts-canvas apexchartsgg3cah0o apexcharts-theme-light"
                                  style={{ width: 172, height: 90 }}
                                >
                                  <svg
                                    id="SvgjsSvg2232"
                                    width={172}
                                    height={90}
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    xmlns:svgjs="http://svgjs.dev"
                                    className="apexcharts-svg apexcharts-zoomable"
                                    xmlns:data="ApexChartsNS"
                                    transform="translate(0, 0)"
                                    style={{ background: "transparent" }}
                                  >
                                    <g
                                      id="SvgjsG2234"
                                      className="apexcharts-inner apexcharts-graphical"
                                      transform="translate(14.399999999999999, 20)"
                                    >
                                      <defs id="SvgjsDefs2233">
                                        <linearGradient
                                          id="SvgjsLinearGradient2237"
                                          x1={0}
                                          y1={0}
                                          x2={0}
                                          y2={1}
                                        >
                                          <stop
                                            id="SvgjsStop2238"
                                            stopOpacity="0.4"
                                            stopColor="rgba(216,227,240,0.4)"
                                            offset={0}
                                          />
                                          <stop
                                            id="SvgjsStop2239"
                                            stopOpacity="0.5"
                                            stopColor="rgba(190,209,230,0.5)"
                                            offset={1}
                                          />
                                          <stop
                                            id="SvgjsStop2240"
                                            stopOpacity="0.5"
                                            stopColor="rgba(190,209,230,0.5)"
                                            offset={1}
                                          />
                                        </linearGradient>
                                        <clipPath id="gridRectMaskgg3cah0o">
                                          <rect
                                            id="SvgjsRect2242"
                                            width={166}
                                            height={70}
                                            x="-12.399999999999999"
                                            y={0}
                                            rx={0}
                                            ry={0}
                                            opacity={1}
                                            strokeWidth={0}
                                            stroke="none"
                                            strokeDasharray={0}
                                            fill="#fff"
                                          />
                                        </clipPath>
                                        <clipPath id="forecastMaskgg3cah0o" />
                                        <clipPath id="nonForecastMaskgg3cah0o" />
                                        <clipPath id="gridRectMarkerMaskgg3cah0o">
                                          <rect
                                            id="SvgjsRect2243"
                                            width="145.2"
                                            height={74}
                                            x={-2}
                                            y={-2}
                                            rx={0}
                                            ry={0}
                                            opacity={1}
                                            strokeWidth={0}
                                            stroke="none"
                                            strokeDasharray={0}
                                            fill="#fff"
                                          />
                                        </clipPath>
                                      </defs>
                                      <rect
                                        id="SvgjsRect2241"
                                        width={0}
                                        height={70}
                                        x={0}
                                        y={0}
                                        rx={0}
                                        ry={0}
                                        opacity={1}
                                        strokeWidth={0}
                                        strokeDasharray={3}
                                        fill="url(#SvgjsLinearGradient2237)"
                                        className="apexcharts-xcrosshairs"
                                        y2={70}
                                        filter="none"
                                        fillOpacity="0.9"
                                      />
                                      <g
                                        id="SvgjsG2263"
                                        className="apexcharts-xaxis"
                                        transform="translate(0, 0)"
                                      >
                                        <g
                                          id="SvgjsG2264"
                                          className="apexcharts-xaxis-texts-g"
                                          transform="translate(0, -4)"
                                        />
                                      </g>
                                      <g
                                        id="SvgjsG2273"
                                        className="apexcharts-grid"
                                      >
                                        <g
                                          id="SvgjsG2274"
                                          className="apexcharts-gridlines-horizontal"
                                          style={{ display: "none" }}
                                        >
                                          <line
                                            id="SvgjsLine2276"
                                            x1="-10.399999999999999"
                                            y1={0}
                                            x2="151.6"
                                            y2={0}
                                            stroke="#e0e0e0"
                                            strokeDasharray={0}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine2277"
                                            x1="-10.399999999999999"
                                            y1="17.5"
                                            x2="151.6"
                                            y2="17.5"
                                            stroke="#e0e0e0"
                                            strokeDasharray={0}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine2278"
                                            x1="-10.399999999999999"
                                            y1={35}
                                            x2="151.6"
                                            y2={35}
                                            stroke="#e0e0e0"
                                            strokeDasharray={0}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine2279"
                                            x1="-10.399999999999999"
                                            y1="52.5"
                                            x2="151.6"
                                            y2="52.5"
                                            stroke="#e0e0e0"
                                            strokeDasharray={0}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine2280"
                                            x1="-10.399999999999999"
                                            y1={70}
                                            x2="151.6"
                                            y2={70}
                                            stroke="#e0e0e0"
                                            strokeDasharray={0}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                        </g>
                                        <g
                                          id="SvgjsG2275"
                                          className="apexcharts-gridlines-vertical"
                                          style={{ display: "none" }}
                                        />
                                        <line
                                          id="SvgjsLine2282"
                                          x1={0}
                                          y1={70}
                                          x2="141.2"
                                          y2={70}
                                          stroke="transparent"
                                          strokeDasharray={0}
                                          strokeLinecap="butt"
                                        />
                                        <line
                                          id="SvgjsLine2281"
                                          x1={0}
                                          y1={1}
                                          x2={0}
                                          y2={70}
                                          stroke="transparent"
                                          strokeDasharray={0}
                                          strokeLinecap="butt"
                                        />
                                      </g>
                                      <g
                                        id="SvgjsG2244"
                                        className="apexcharts-bar-series apexcharts-plot-series"
                                      >
                                        <g
                                          id="SvgjsG2245"
                                          className="apexcharts-series"
                                          rel={1}
                                          seriesname="seriesx1"
                                          data:realindex={0}
                                        >
                                          <rect
                                            id="SvgjsRect2248"
                                            width="7.06"
                                            height={70}
                                            x="-3.53"
                                            y={0}
                                            rx={4}
                                            ry={4}
                                            opacity={1}
                                            strokeWidth={0}
                                            stroke="none"
                                            strokeDasharray={0}
                                            fill="#F0F2F8"
                                            className="apexcharts-backgroundBar"
                                          />
                                          <path
                                            id="SvgjsPath2250"
                                            d="M -3.53 66L -3.53 47.75Q -3.53 43.75 0.4700000000000002 43.75L -0.4700000000000002 43.75Q 3.53 43.75 3.53 47.75L 3.53 47.75L 3.53 66Q 3.53 70 -0.4700000000000002 70L 0.4700000000000002 70Q -3.53 70 -3.53 66z"
                                            fill="rgba(255,76,81,0.85)"
                                            fillOpacity={1}
                                            strokeOpacity={1}
                                            strokeLinecap="round"
                                            strokeWidth={0}
                                            strokeDasharray={0}
                                            className="apexcharts-bar-area"
                                            index={0}
                                            clipPath="url(#gridRectMaskgg3cah0o)"
                                            pathto="M -3.53 66L -3.53 47.75Q -3.53 43.75 0.4700000000000002 43.75L -0.4700000000000002 43.75Q 3.53 43.75 3.53 47.75L 3.53 47.75L 3.53 66Q 3.53 70 -0.4700000000000002 70L 0.4700000000000002 70Q -3.53 70 -3.53 66z"
                                            pathfrom="M -3.53 66L -3.53 66L 3.53 66L 3.53 66L 3.53 66L 3.53 66L 3.53 66L -3.53 66"
                                            cy="43.75"
                                            cx="3.53"
                                            j={0}
                                            val={30}
                                            barheight="26.25"
                                            barwidth="7.06"
                                          />
                                          <rect
                                            id="SvgjsRect2251"
                                            width="7.06"
                                            height={70}
                                            x="31.769999999999996"
                                            y={0}
                                            rx={4}
                                            ry={4}
                                            opacity={1}
                                            strokeWidth={0}
                                            stroke="none"
                                            strokeDasharray={0}
                                            fill="#F0F2F8"
                                            className="apexcharts-backgroundBar"
                                          />
                                          <path
                                            id="SvgjsPath2253"
                                            d="M 31.769999999999996 66L 31.769999999999996 12.75Q 31.769999999999996 8.75 35.769999999999996 8.75L 34.83 8.75Q 38.83 8.75 38.83 12.75L 38.83 12.75L 38.83 66Q 38.83 70 34.83 70L 35.769999999999996 70Q 31.769999999999996 70 31.769999999999996 66z"
                                            fill="rgba(144,85,253,0.85)"
                                            fillOpacity={1}
                                            strokeOpacity={1}
                                            strokeLinecap="round"
                                            strokeWidth={0}
                                            strokeDasharray={0}
                                            className="apexcharts-bar-area"
                                            index={0}
                                            clipPath="url(#gridRectMaskgg3cah0o)"
                                            pathto="M 31.769999999999996 66L 31.769999999999996 12.75Q 31.769999999999996 8.75 35.769999999999996 8.75L 34.83 8.75Q 38.83 8.75 38.83 12.75L 38.83 12.75L 38.83 66Q 38.83 70 34.83 70L 35.769999999999996 70Q 31.769999999999996 70 31.769999999999996 66z"
                                            pathfrom="M 31.769999999999996 66L 31.769999999999996 66L 38.83 66L 38.83 66L 38.83 66L 38.83 66L 38.83 66L 31.769999999999996 66"
                                            cy="8.75"
                                            cx="38.83"
                                            j={1}
                                            val={70}
                                            barheight="61.25"
                                            barwidth="7.06"
                                          />
                                          <rect
                                            id="SvgjsRect2254"
                                            width="7.06"
                                            height={70}
                                            x="67.07"
                                            y={0}
                                            rx={4}
                                            ry={4}
                                            opacity={1}
                                            strokeWidth={0}
                                            stroke="none"
                                            strokeDasharray={0}
                                            fill="#F0F2F8"
                                            className="apexcharts-backgroundBar"
                                          />
                                          <path
                                            id="SvgjsPath2256"
                                            d="M 67.07 66L 67.07 30.25Q 67.07 26.25 71.07 26.25L 70.13 26.25Q 74.13 26.25 74.13 30.25L 74.13 30.25L 74.13 66Q 74.13 70 70.13 70L 71.07 70Q 67.07 70 67.07 66z"
                                            fill="rgba(255,76,81,0.85)"
                                            fillOpacity={1}
                                            strokeOpacity={1}
                                            strokeLinecap="round"
                                            strokeWidth={0}
                                            strokeDasharray={0}
                                            className="apexcharts-bar-area"
                                            index={0}
                                            clipPath="url(#gridRectMaskgg3cah0o)"
                                            pathto="M 67.07 66L 67.07 30.25Q 67.07 26.25 71.07 26.25L 70.13 26.25Q 74.13 26.25 74.13 30.25L 74.13 30.25L 74.13 66Q 74.13 70 70.13 70L 71.07 70Q 67.07 70 67.07 66z"
                                            pathfrom="M 67.07 66L 67.07 66L 74.13 66L 74.13 66L 74.13 66L 74.13 66L 74.13 66L 67.07 66"
                                            cy="26.25"
                                            cx="74.13"
                                            j={2}
                                            val={50}
                                            barheight="43.75"
                                            barwidth="7.06"
                                          />
                                          <rect
                                            id="SvgjsRect2257"
                                            width="7.06"
                                            height={70}
                                            x="102.36999999999999"
                                            y={0}
                                            rx={4}
                                            ry={4}
                                            opacity={1}
                                            strokeWidth={0}
                                            stroke="none"
                                            strokeDasharray={0}
                                            fill="#F0F2F8"
                                            className="apexcharts-backgroundBar"
                                          />
                                          <path
                                            id="SvgjsPath2259"
                                            d="M 102.36999999999999 66L 102.36999999999999 39Q 102.36999999999999 35 106.36999999999999 35L 105.42999999999999 35Q 109.42999999999999 35 109.42999999999999 39L 109.42999999999999 39L 109.42999999999999 66Q 109.42999999999999 70 105.42999999999999 70L 106.36999999999999 70Q 102.36999999999999 70 102.36999999999999 66z"
                                            fill="rgba(144,85,253,0.85)"
                                            fillOpacity={1}
                                            strokeOpacity={1}
                                            strokeLinecap="round"
                                            strokeWidth={0}
                                            strokeDasharray={0}
                                            className="apexcharts-bar-area"
                                            index={0}
                                            clipPath="url(#gridRectMaskgg3cah0o)"
                                            pathto="M 102.36999999999999 66L 102.36999999999999 39Q 102.36999999999999 35 106.36999999999999 35L 105.42999999999999 35Q 109.42999999999999 35 109.42999999999999 39L 109.42999999999999 39L 109.42999999999999 66Q 109.42999999999999 70 105.42999999999999 70L 106.36999999999999 70Q 102.36999999999999 70 102.36999999999999 66z"
                                            pathfrom="M 102.36999999999999 66L 102.36999999999999 66L 109.42999999999999 66L 109.42999999999999 66L 109.42999999999999 66L 109.42999999999999 66L 109.42999999999999 66L 102.36999999999999 66"
                                            cy={35}
                                            cx="109.42999999999999"
                                            j={3}
                                            val={40}
                                            barheight={35}
                                            barwidth="7.06"
                                          />
                                          <rect
                                            id="SvgjsRect2260"
                                            width="7.06"
                                            height={70}
                                            x="137.67"
                                            y={0}
                                            rx={4}
                                            ry={4}
                                            opacity={1}
                                            strokeWidth={0}
                                            stroke="none"
                                            strokeDasharray={0}
                                            fill="#F0F2F8"
                                            className="apexcharts-backgroundBar"
                                          />
                                          <path
                                            id="SvgjsPath2262"
                                            d="M 137.67 66L 137.67 21.5Q 137.67 17.5 141.67 17.5L 140.73 17.5Q 144.73 17.5 144.73 21.5L 144.73 21.5L 144.73 66Q 144.73 70 140.73 70L 141.67 70Q 137.67 70 137.67 66z"
                                            fill="rgba(144,85,253,0.85)"
                                            fillOpacity={1}
                                            strokeOpacity={1}
                                            strokeLinecap="round"
                                            strokeWidth={0}
                                            strokeDasharray={0}
                                            className="apexcharts-bar-area"
                                            index={0}
                                            clipPath="url(#gridRectMaskgg3cah0o)"
                                            pathto="M 137.67 66L 137.67 21.5Q 137.67 17.5 141.67 17.5L 140.73 17.5Q 144.73 17.5 144.73 21.5L 144.73 21.5L 144.73 66Q 144.73 70 140.73 70L 141.67 70Q 137.67 70 137.67 66z"
                                            pathfrom="M 137.67 66L 137.67 66L 144.73 66L 144.73 66L 144.73 66L 144.73 66L 144.73 66L 137.67 66"
                                            cy="17.5"
                                            cx="144.73"
                                            j={4}
                                            val={60}
                                            barheight="52.5"
                                            barwidth="7.06"
                                          />
                                          <g
                                            id="SvgjsG2247"
                                            className="apexcharts-bar-goals-markers"
                                            style={{ pointerEvents: "none" }}
                                          >
                                            <g
                                              id="SvgjsG2249"
                                              className="apexcharts-bar-goals-groups"
                                            />
                                            <g
                                              id="SvgjsG2252"
                                              className="apexcharts-bar-goals-groups"
                                            />
                                            <g
                                              id="SvgjsG2255"
                                              className="apexcharts-bar-goals-groups"
                                            />
                                            <g
                                              id="SvgjsG2258"
                                              className="apexcharts-bar-goals-groups"
                                            />
                                            <g
                                              id="SvgjsG2261"
                                              className="apexcharts-bar-goals-groups"
                                            />
                                          </g>
                                        </g>
                                        <g
                                          id="SvgjsG2246"
                                          className="apexcharts-datalabels"
                                          data:realindex={0}
                                        />
                                      </g>
                                      <line
                                        id="SvgjsLine2283"
                                        x1="-10.399999999999999"
                                        y1={0}
                                        x2="151.6"
                                        y2={0}
                                        stroke="#b6b6b6"
                                        strokeDasharray={0}
                                        strokeWidth={1}
                                        strokeLinecap="butt"
                                        className="apexcharts-ycrosshairs"
                                      />
                                      <line
                                        id="SvgjsLine2284"
                                        x1="-10.399999999999999"
                                        y1={0}
                                        x2="151.6"
                                        y2={0}
                                        strokeDasharray={0}
                                        strokeWidth={0}
                                        strokeLinecap="butt"
                                        className="apexcharts-ycrosshairs-hidden"
                                      />
                                      <g
                                        id="SvgjsG2285"
                                        className="apexcharts-yaxis-annotations"
                                      />
                                      <g
                                        id="SvgjsG2286"
                                        className="apexcharts-xaxis-annotations"
                                      />
                                      <g
                                        id="SvgjsG2287"
                                        className="apexcharts-point-annotations"
                                      />
                                      <rect
                                        id="SvgjsRect2288"
                                        width={0}
                                        height={0}
                                        x={0}
                                        y={0}
                                        rx={0}
                                        ry={0}
                                        opacity={1}
                                        strokeWidth={0}
                                        stroke="none"
                                        strokeDasharray={0}
                                        fill="#fefefe"
                                        className="apexcharts-zoom-rect"
                                      />
                                      <rect
                                        id="SvgjsRect2289"
                                        width={0}
                                        height={0}
                                        x={0}
                                        y={0}
                                        rx={0}
                                        ry={0}
                                        opacity={1}
                                        strokeWidth={0}
                                        stroke="none"
                                        strokeDasharray={0}
                                        fill="#fefefe"
                                        className="apexcharts-selection-rect"
                                      />
                                    </g>
                                    <g
                                      id="SvgjsG2271"
                                      className="apexcharts-yaxis"
                                      rel={0}
                                      transform="translate(-8, 0)"
                                    >
                                      <g
                                        id="SvgjsG2272"
                                        className="apexcharts-yaxis-texts-g"
                                      />
                                    </g>
                                    <g
                                      id="SvgjsG2235"
                                      className="apexcharts-annotations"
                                    />
                                  </svg>
                                  <div
                                    className="apexcharts-legend"
                                    style={{ maxHeight: 45 }}
                                  />
                                </div>
                              </div>
                              <h6 className="text-center mb-0">Sessions</h6>
                              <div className="resize-triggers">
                                <div className="expand-trigger">
                                  <div style={{ width: 213, height: 152 }} />
                                </div>
                                <div className="contract-trigger" />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*/ Sessions chart */}
                      </div>
                    </div>
                    {/*/ Total Earning */}
                    {/* Sales by Countries */}
                    <div className="col-xl-4 col-md-6">
                      <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between">
                          <h5 className="card-title m-0 me-2">
                            Sales by Countries
                          </h5>
                          <div className="dropdown">
                            <button
                              className="btn p-0"
                              type="button"
                              id="saleStatus"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="mdi mdi-dots-vertical mdi-24px" />
                            </button>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="saleStatus"
                            >
                              <a
                                className="dropdown-item waves-effect"
                                href="#"
                              >
                                Last 28 Days
                              </a>
                              <a
                                className="dropdown-item waves-effect"
                                href="#"
                              >
                                Last Month
                              </a>
                              <a
                                className="dropdown-item waves-effect"
                                href="#"
                              >
                                Last Year
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3">
                                <div className="avatar-initial bg-label-success rounded-circle">
                                  US
                                </div>
                              </div>
                              <div>
                                <div className="d-flex align-items-center gap-1">
                                  <h6 className="mb-0">$8,656k</h6>
                                  <i className="mdi mdi-chevron-up mdi-24px text-success" />
                                  <small className="text-success">25.8%</small>
                                </div>
                                <small>United states of america</small>
                              </div>
                            </div>
                            <div className="text-end">
                              <h6 className="mb-0">894k</h6>
                              <small>Sales</small>
                            </div>
                          </div>
                          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3">
                                <span className="avatar-initial bg-label-danger rounded-circle">
                                  UK
                                </span>
                              </div>
                              <div>
                                <div className="d-flex align-items-center gap-1">
                                  <h6 className="mb-0">$2,415k</h6>
                                  <i className="mdi mdi-chevron-down mdi-24px text-danger" />
                                  <small className="text-danger">6.2%</small>
                                </div>
                                <small>United Kingdom</small>
                              </div>
                            </div>
                            <div className="text-end">
                              <h6 className="mb-0">645k</h6>
                              <small>Sales</small>
                            </div>
                          </div>
                          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3">
                                <span className="avatar-initial bg-label-warning rounded-circle">
                                  IN
                                </span>
                              </div>
                              <div>
                                <div className="d-flex align-items-center gap-1">
                                  <h6 className="mb-0">865k</h6>
                                  <i className="mdi mdi-chevron-up mdi-24px text-success" />
                                  <small className="text-success"> 12.4%</small>
                                </div>
                                <small>India</small>
                              </div>
                            </div>
                            <div className="text-end">
                              <h6 className="mb-0">148k</h6>
                              <small>Sales</small>
                            </div>
                          </div>
                          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3">
                                <span className="avatar-initial bg-label-secondary rounded-circle">
                                  JA
                                </span>
                              </div>
                              <div>
                                <div className="d-flex align-items-center gap-1">
                                  <h6 className="mb-0">$745k</h6>
                                  <i className="mdi mdi-chevron-down mdi-24px text-danger" />
                                  <small className="text-danger">11.9%</small>
                                </div>
                                <small>Japan</small>
                              </div>
                            </div>
                            <div className="text-end">
                              <h6 className="mb-0">86k</h6>
                              <small>Sales</small>
                            </div>
                          </div>
                          <div className="d-flex flex-wrap justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="avatar me-3">
                                <span className="avatar-initial bg-label-danger rounded-circle">
                                  KO
                                </span>
                              </div>
                              <div>
                                <div className="d-flex align-items-center gap-1">
                                  <h6 className="mb-0">$45k</h6>
                                  <i className="mdi mdi-chevron-up mdi-24px text-success" />
                                  <small className="text-success">16.2%</small>
                                </div>
                                <small>Korea</small>
                              </div>
                            </div>
                            <div className="text-end">
                              <h6 className="mb-0">42k</h6>
                              <small>Sales</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*/ Sales by Countries */}
                    {/* Deposit / Withdraw */}
                    <div className="col-xl-8">
                      <div className="card h-100">
                        <div className="card-body row g-2">
                          <div className="col-12 col-md-6 card-separator pe-0 pe-md-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                              <h5 className="m-0 me-2">Deposit</h5>
                              <a className="fw-medium" href="#">
                                View all
                              </a>
                            </div>
                            <div className="pt-2">
                              <ul className="p-0 m-0">
                                <li className="d-flex mb-4 align-items-center pb-2">
                                  <div className="flex-shrink-0 me-3">
                                    <img
                                      src="/img/icons/payments/gumroad.png"
                                      className="img-fluid"
                                      alt="gumroad"
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                      <h6 className="mb-0">Gumroad Account</h6>
                                      <small>Sell UI Kit</small>
                                    </div>
                                    <h6 className="text-success mb-0">
                                      +$4,650
                                    </h6>
                                  </div>
                                </li>
                                <li className="d-flex mb-4 align-items-center pb-2">
                                  <div className="flex-shrink-0 me-3">
                                    <img
                                      src="/img/icons/payments/mastercard-2.png"
                                      className="img-fluid"
                                      alt="mastercard"
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                      <h6 className="mb-0">Mastercard</h6>
                                      <small>Wallet deposit</small>
                                    </div>
                                    <h6 className="text-success mb-0">
                                      +$92,705
                                    </h6>
                                  </div>
                                </li>
                                <li className="d-flex mb-4 align-items-center pb-2">
                                  <div className="flex-shrink-0 me-3">
                                    <img
                                      src="/img/icons/payments/stripes.png"
                                      className="img-fluid"
                                      alt="stripes"
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                      <h6 className="mb-0">Stripe Account</h6>
                                      <small>iOS Application</small>
                                    </div>
                                    <h6 className="text-success mb-0">+$957</h6>
                                  </div>
                                </li>
                                <li className="d-flex mb-4 align-items-center pb-2">
                                  <div className="flex-shrink-0 me-3">
                                    <img
                                      src="/img/icons/payments/american-bank.png"
                                      className="img-fluid"
                                      alt="american"
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                      <h6 className="mb-0">American Bank</h6>
                                      <small>Bank Transfer</small>
                                    </div>
                                    <h6 className="text-success mb-0">
                                      +$6,837
                                    </h6>
                                  </div>
                                </li>
                                <li className="d-flex align-items-center">
                                  <div className="flex-shrink-0 me-3">
                                    <img
                                      src="/img/icons/payments/citi.png"
                                      className="img-fluid"
                                      alt="citi"
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                      <h6 className="mb-0">Bank Account</h6>
                                      <small>Wallet deposit</small>
                                    </div>
                                    <h6 className="text-success mb-0">+$446</h6>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 ps-0 ps-md-3 mt-3 mt-md-2">
                            <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                              <h5 className="m-0 me-2">Withdraw</h5>
                              <a className="fw-medium" href="#">
                                View all
                              </a>
                            </div>
                            <div className="pt-2">
                              <ul className="p-0 m-0">
                                <li className="d-flex mb-4 align-items-center pb-2">
                                  <div className="flex-shrink-0 me-3">
                                    <img
                                      src="/img/icons/brands/google.png"
                                      className="img-fluid"
                                      alt="google"
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                      <h6 className="mb-0">Google Adsense</h6>
                                      <small>Paypal deposit</small>
                                    </div>
                                    <h6 className="text-danger mb-0">-$145</h6>
                                  </div>
                                </li>
                                <li className="d-flex mb-4 align-items-center pb-2">
                                  <div className="flex-shrink-0 me-3">
                                    <img
                                      src="/img/icons/brands/github.png"
                                      className="img-fluid"
                                      alt="github"
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                      <h6 className="mb-0">
                                        Github Enterprise
                                      </h6>
                                      <small>Security &amp; compliance</small>
                                    </div>
                                    <h6 className="text-danger mb-0">-$1870</h6>
                                  </div>
                                </li>
                                <li className="d-flex mb-4 align-items-center pb-2">
                                  <div className="flex-shrink-0 me-3">
                                    <img
                                      src="/img/icons/brands/slack.png"
                                      className="img-fluid"
                                      alt="slack"
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                      <h6 className="mb-0">
                                        Upgrade Slack Plan
                                      </h6>
                                      <small>Debit card deposit</small>
                                    </div>
                                    <h6 className="text-danger mb-0">$450</h6>
                                  </div>
                                </li>
                                <li className="d-flex mb-4 align-items-center pb-2">
                                  <div className="flex-shrink-0 me-3">
                                    <img
                                      src="/img/icons/payments/digital-ocean.png"
                                      className="img-fluid"
                                      alt="digital"
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                      <h6 className="mb-0">Digital Ocean</h6>
                                      <small>Cloud Hosting</small>
                                    </div>
                                    <h6 className="text-danger mb-0">-$540</h6>
                                  </div>
                                </li>
                                <li className="d-flex align-items-center">
                                  <div className="flex-shrink-0 me-3">
                                    <img
                                      src="/img/icons/brands/aws.png"
                                      className="img-fluid"
                                      alt="aws"
                                      height={30}
                                      width={30}
                                    />
                                  </div>
                                  <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                    <div className="me-2">
                                      <h6 className="mb-0">AWS Account</h6>
                                      <small>Choosing a Cloud Platform</small>
                                    </div>
                                    <h6 className="text-danger mb-0">-$21</h6>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {user.role.nombreRol == "ADMINISTRACION" && (
                  <div className="row gy-4">administracion</div>
                )}

                {user.role.nombreRol == "ARCHIVO" && (
                  <div className="row gy-4">ARCHIVO</div>
                )}
              </div>
              {/* / Content */}
              {/* Footer */}
              <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl">
                  <div className="footer-container d-flex align-items-center justify-content-between py-3 flex-md-row flex-column">
                    <div className="text-body mb-2 mb-md-0">
                      © 2024 , made with{" "}
                      <span className="text-danger">
                        <i className="tf-icons mdi mdi-heart" />
                      </span>{" "}
                      by
                      <a
                        href="https://themeselection.com"
                        target="_blank"
                        className="footer-link fw-medium"
                      >
                        ThemeSelection
                      </a>
                    </div>
                    <div className="d-none d-lg-inline-block">
                      <a
                        href="https://themeselection.com/license/"
                        className="footer-link me-3"
                        target="_blank"
                      >
                        License
                      </a>
                      <a
                        href="https://themeselection.com/"
                        target="_blank"
                        className="footer-link me-3"
                      >
                        More Themes
                      </a>
                      <a
                        href="https://demos.themeselection.com/materio-bootstrap-html-admin-template/documentation/"
                        target="_blank"
                        className="footer-link me-3"
                      >
                        Documentation
                      </a>
                      <a
                        href="https://github.com/themeselection/materio-bootstrap-html-admin-template-free/issues"
                        target="_blank"
                        className="footer-link"
                      >
                        Support
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
              {/* / Footer */}
              <div className="content-backdrop fade" />
            </div>
            {/* Content wrapper */}
          </div>
          {/* / Layout page */}
        </div>
        {/* Overlay */}
        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </>
  );
};

export default EditarUsuario;
