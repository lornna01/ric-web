import React from "react";
import MenuLateral from "../components/MenuLateral";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const NoFound = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <MenuLateral />
        <div className="layout-page">
          <NavBar />
          {/* Content wrapper */}
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
              <div className="row">
                <div className="col-12 text-center">
                  <div className="card mb-4" style={{ zIndex: 10, position: 'relative' }}>
                    <div className="card-body">
                      <h1 className="mb-4 mdi mdi-alert-circle-outline" style={{ color: '#721c24', fontSize: '5rem' }}>
                        403
                      </h1>
                      <h1 className="mb-4" style={{ color: '#721c24' }}>
                        ACCESO DENEGADO
                      </h1>
                      <p style={{ color: '#856404' }}>
                        ---No tienes permiso para acceder a esta sección.---
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="footer">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoFound;
