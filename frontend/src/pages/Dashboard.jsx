import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MenuLateral from "../components/MenuLateral";
import axios from "axios";
import { useAuth } from "../providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const Dashboard = () => {

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <MenuLateral />
        {/* Layout container */}
        <div className="layout-page">
          {/* / Navbar */}
          <NavBar />
          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}

            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-xxl">
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <span className="text-muted fw-light">DASHBOARD/</span>{" "}
                      </h5>
                    </div>
                    <div className="card-body d-flex justify-content-between align-items-center">

                      <div className="d-flex align-items-center" style={{ width: "100%", height: "100vh" }}>      
                       
                        <iframe 
                          title="ricreportes" 
                          width="100%"
                          height="100%"
                          src="https://app.powerbi.com/view?r=eyJrIjoiNDAwMTg2MDEtZGE0OC00NWY0LTgyYjAtMTUyMTYxZWU5MDkwIiwidCI6IjVmNTNiNGNlLTYzZDQtNGVlOC04OGQyLTIyZjBiMmQ0YjI3YSIsImMiOjR9" frameborder="0" allowFullScreen="true">
                        </iframe>
                        
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* / Content */}
            {/* Footer */}

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
  );
}

export default Dashboard;
