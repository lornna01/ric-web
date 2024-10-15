import React from 'react'

const Footer = () => {
  return (
      <>
       {/* Footer */}
       <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl">
                  <div className="footer-container d-flex align-items-center justify-content-between py-3 flex-md-row flex-column">
                    <div className="text-body mb-2 mb-md-0">
                      © 2024 , hecho con{" "}
                      <span className="text-danger">
                        <i className="tf-icons mdi mdi-heart" />
                      </span>{" "}
                      por{" "}
                      <a
                        href="#"
                        className="footer-link fw-medium"
                      >
                        Lornaa Yeraldy Juarez
                      </a>
                    </div>
                    <div className="d-none d-lg-inline-block">
                      
                      <a
                        href="#"
                        className="footer-link"
                      >
                        Contacto
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
              {/* / Footer */}
              <div className="content-backdrop fade" />
      </>
  )
}

export default Footer