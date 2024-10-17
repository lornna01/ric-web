import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MenuLateral from "../components/MenuLateral";
import axios from "axios";
import { useAuth } from "../providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import VehiculoList from "../components/VehiculoList";
import CombustibleList from "../components/CombustibleList";
import NotificacionesList from "../components/NotificacionesList";

const Notificaciones = () => {
  const { login } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingUsers, setLoadingUsers] = useState(false);


  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.type} ${user.token}`, // Token de autorización
    },
  });
  


  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingVehiculos, setLoadingVehiculos] = useState(false);
  const [loadingCombustible, setLoadingCombustible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [notificacionesList, setNotificacionesList] = useState([]);
  const [loadingNotificaciones, setLoadingNotificaciones] = useState(false);

  const [vehiculoList, setVehiculoList] = useState([]);
  const [combustibleList, setCombustibleList] = useState([]);
  const [propietario, setPropietario] = useState();
  const [placa, setPlaca] = useState();
  const [modelo, setModelo] = useState();
  const [chofer, setChofer] = useState();
  const [comentarios, setComentarios] = useState();
  const [vehiculo, setVehiculo] = useState();
  const [combustible, setCombustible] = useState();
  const [archivo, setArchivo] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setArchivo(reader.result.split(',')[1]); // Eliminar el prefijo "data:application/pdf;base64,"
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const getNotificaciones = async () => {

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/notificaciones?usuario_id=${user.user.id}`,
        {
          headers: {
            Authorization: `${user.type} ${user.token}`
          }
        }
      );
      setNotificacionesList(response.data);
      //
      console.log(notificacionesList)
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response.status >= 400 && error.response.status < 500) {
        setError("Usuario o contraseña incorrectos.");
      }
      //setError(error.message);
      setLoadingNotificaciones(false);
      //console.log(error.response.status);
    }
  }

 

 

 

  useEffect(() =>{
    
    getNotificaciones()
 },[editing])

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

           <di v className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-xxl">
                  <div className="card mb-4">
                    
                    <div className="card-body">
                      {mensaje && (
                        <div className="alert alert-success" role="alert">
                          {mensaje}!
                        </div>
                      )}
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}!
                        </div>
                      )}
                     

                      <div className="row my-4 text-center">
                      {/* Deposit / Withdraw */}
                      {/* Data Tables */}
                      {user.user.rol.nombre == "TECNICO-ARCHIVO" && (
                        <div className="col-12">
                            {!loadingNotificaciones ? <NotificacionesList
                              notificacionesList ={notificacionesList}
                              getNotificaciones={getNotificaciones}
                              setEditing={setEditing}
                              user={user}
                              setMensaje={setMensaje}
                            setError={setError}
                            loading={loading}
                            setLoading={setLoading}
                          />:(<div className="spinner-grow text-success" role="status">
                        </div>)}
                        </div>
                      )}

                      {/*/ Data Tables */}
                      </div>

                      <div className="row my-4 text-center">
                      {/* Deposit / Withdraw */}
                      {/* Data Tables */}
                      

                      {/*/ Data Tables */}
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </di>
            {/* / Content */}
            {/* Footer */}
            <Footer />
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
};

export default Notificaciones;
