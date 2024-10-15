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
      setLoadingUsers(false);
      //console.log(error.response.status);
    }
  }

 

  
  const save = async () => {
    setMensaje("");
    setError("");
    if (!propietario) {
      setError("Ingrese el propietario");
      return;
    } else if (!placa) {
      setError("Ingrese la placa");
      return;
    } else if (!modelo) {
      setError("Ingrese el modelo");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/vehiculos`,
        {
          usuario_id: user?.user?.id,
          propietario,
          placa,
          modelo,
          chofer,
          comentarios,
          foto:archivo
        }
      );
      

      if (response.status === 201) {
        toast.success("Vehículo creado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        window.location.reload()
        //navigate('/vehiculos/nuevo');
      }
      setLoading(false);
      setError();
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };

  const update = async () => {
    setMensaje("");
    setError("");
    if (!propietario) {
      setError("Ingrese el propietario");
      return;
    } else if (!placa) {
      setError("Ingrese la placa");
      return;
    } else if (!modelo) {
      setError("Ingrese el modelo");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/vehiculos/${placa}`,
        {
          usuario_id: user?.user?.id,
          propietario,
          modelo,
          chofer,
          comentarios,
          foto:archivo
        }
      );
      

      if (response.status === 200) {
        toast.success("Vehículo actualizado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        setEditing(false)
        //navigate('/home');
        window.location.reload()
      }
      setLoading(false);
      setError();
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);

  
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };

  const findByPlaca = async () => {
    setMensaje("");
    setError("");
    if (!placa) {
      setError("Ingrese la placa");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/vehiculosByPlaca/${placa}`);
      

      if (response.status === 200) {
        await getCombustible()
        toast.success("Vehículo encontrado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setPropietario(response.data.propietario)
        setArchivo(response.data.foto)
        setPlaca(response.data.placa)
        setModelo(response.data.modelo)
        setChofer(response.data.chofer)
        setComentarios(response.data.comentarios)
        setVehiculo(response.data)
        setEditing(true);
      }
      setLoading(false);
      setError();
      
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setPropietario('')
        setArchivo('')
        setPlaca('')
        setModelo('')
        setChofer('')
        setComentarios('')
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };

  const getCombustible = async () => {
    setMensaje("");
    setError("");
    if (!placa) {
      setError("Ingrese la placa");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/combustibles?placa=${placa}`);
      

      if (response.status === 200) {
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setCombustibleList(response.data)
        setEditing(true);
      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setPropietario('')
        setArchivo('')
        setPlaca('')
        setModelo('')
        setChofer('')
        setComentarios('')
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };

  const getVehiculos = async () => {
    setMensaje("");
    setError("");
    setLoadingVehiculos(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/vehiculos`);
      

      if (response.status === 200) {
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setVehiculoList(response.data)
       setLoadingVehiculos(false)
      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setPropietario('')
        setArchivo('')
        setPlaca('')
        setModelo('')
        setChofer('')
        setComentarios('')
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };

  const deleteVehiculo = async (vehiculo) => {
    setMensaje("");
    setError("");

    setLoading(true);

    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/vehiculos/${vehiculo.id}`);
      
      if (response.status === 200) {
        toast.success("Vehículo eliminado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        getVehiculos()
       
      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setPropietario('')
        setArchivo('')
        setPlaca('')
        setModelo('')
        setChofer('')
        setComentarios('')
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };

  const deleteCombustible = async (combustib) => {
    setMensaje("");
    setError("");

    setLoading(true);

    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/combustibles/${combustib.id}`);
      
      if (response.status === 200) {
        toast.success("Item eliminado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        getVehiculos()
       
      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setPropietario('')
        setArchivo('')
        setPlaca('')
        setModelo('')
        setChofer('')
        setComentarios('')
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };

  useEffect(() =>{
    getVehiculos()
    if (editing) {
      setPropietario(vehiculo?.propietario)
      setPlaca(vehiculo?.placa)
      setModelo(vehiculo?.modelo)
      setChofer(vehiculo?.chofer)
      setComentarios(vehiculo?.comentarios)
      setArchivo(vehiculo?.foto)
    }
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
                      {user.user.rol.nombre == "ADMINISTRADOR" && (
                        <div className="col-12">
                            {!loadingVehiculos ? <NotificacionesList
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
