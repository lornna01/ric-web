import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MenuLateral from "../components/MenuLateral";
import axios from "axios";
import { useAuth } from "../providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

import EstadoExpedienteList from "../components/EstadoExpedienteList";

const NuevoEstadoExpediente = () => {
  const { login } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

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
  const [loadingEstadoExpedientes, setLoadingEstadoExpedientes] = useState(false);

  const [editing, setEditing] = useState(false);

  const [estadoExpedienteList, setEstadoExpedienteList] = useState([]);
  const [estadoExpediente, setEstadoExpediente] = useState();

  const [nombre, setNombre] = useState();



  const save = async () => {
    setMensaje("");
    setError("");
    if (!nombre || nombre.trim() === "") {
      setError("Ingrese un nombre válido");
      return;
    } 
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/estadoExpedientes`,
        {
          usuario_id: user?.user?.id,
          nombre
        }
      );


      if (response.status === 201) {
        toast.success("Estado creado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        setTimeout(() => {
          window.location.reload()
        }, 1500);

        //navigate('/vehiculos/nuevo');
      }
      setLoading(false);
      setError();
    } catch (error) {
      if (error.response?.status === 400) {
        setError(error.response.data.message);
      }
      if (error.status >= 400 && error.response?.status < 500) {
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
    if (!nombre || nombre.trim() === "") {
      setError("Ingrese un nombre válido");
      return;
    } 

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/estadoExpedientes/${estadoExpediente.id}`, 
        {
          usuario_id: user?.user?.id,
          nombre
        }
      );
      if (response.status === 200) {
        toast.success("Actualizado con éxito!!");
        setEditing(false);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError(error.response.data.message);
        } else if (error.response.status >= 400 && error.response.status < 500) {
          setError("Error inesperado");
        } else if (error.response.status >= 500) {
          setError("Error en el servidor");
        }
      } else {
        setError("Error de conexión");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };


  



  const getEstadoExpedientes = async () => {
    setMensaje("");
    setError("");
    setLoadingEstadoExpedientes(true);

    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/estadoExpedientes`);


      if (response.status === 200) {
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setEstadoExpedienteList(response.data)
        setLoadingEstadoExpedientes(false)
       
      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setNombre('')
    
      }
      if (error.status >= 400 && error.response?.status < 500) {
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

  const deleteEstadoExpediente = async (estadoExpediente) => {
    setMensaje("");
    setError("");

    setLoading(true);

    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/estadoExpedientes/${estadoExpediente.id}`);

      if (response.status === 200) {
        toast.success("Eliminado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        getEstadoExpedientes()

      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setNombre('')
        setDescripcion('')
        setEstado('')
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



  useEffect(() => {
    getEstadoExpedientes()
    if (editing) {
      setNombre(estadoExpediente?.nombre)
      
    }

  }, [editing])

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
                        <span class="text-muted fw-light">Estado de Expedientes/</span>{" "}
                        Gestionar
                      </h5>

                    </div>
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
                      <form>

                        <div class="input-group">
                          <div class="form-floating form-floating-outline mb-4">
                            <input
                              type="text"
                              className="form-control"
                              id="nombre"
                              placeholder="STATUS"
                              value={nombre}
                              onChange={(e) => {

                                let input = e.target.value;

                                // Expresión regular para permitir letras con tildes y espacios, no más de un espacio seguido
                                const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

                                if (regex.test(input) && (input.length === 0 || input[0] !== ' ') && !/\s{2,}/.test(input)) {

                                  // Capitalizar las primeras letras de cada palabra
                                  input = input
                                    .toLowerCase()
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ');

                                  setNombre(input);
                                }
                              }}
                            />
                            <label for="exampleFormControlSelect1">
                              NOMBRE DEL ESTADO
                            </label>
                          </div>

                        </div>
                        




                        {editing ? (<span>
                          <button
                            type="button"
                            className="btn btn-warning waves-effect waves-light"
                            onClick={update}
                            disabled={loading}
                          >
                            <i class="menu-icon tf-icons mdi mdi-sync"></i>
                            Guardar cambios
                          </button>
                          <button
                            type="button"
                            className="btn btn-dark waves-effect waves-light mx-3"
                            onClick={() => window.location.reload()}
                            disabled={loading}
                          >
                            <i class="menu-icon tf-icons mdi mdi-cancel"></i>
                            Cancelar
                          </button>

                        </span>) : <button
                          type="button"
                          className="btn btn-primary waves-effect waves-light"
                          onClick={save}
                          disabled={loading}
                        >
                          <i class="menu-icon tf-icons mdi mdi-content-save"></i>
                          Guardar
                        </button>}


                        {mensaje && (
                          <div
                            className="alert alert-success mt-4"
                            role="alert"
                          >
                            {mensaje}!
                          </div>
                        )}


                      </form>

                      <div className="row my-4 text-center">
                        {/* Deposit / Withdraw */}
                        {/* Data Tables */}
                        {user.user.rol.nombre == "TECNICO-ARCHIVO" && (
                          <div className="col-12">
                            {!loadingEstadoExpedientes ? <EstadoExpedienteList
                              deleteEstadoExpediente={deleteEstadoExpediente}
                              estadoExpedienteList={estadoExpedienteList}
                              getEstadoExpedientes={getEstadoExpedientes}
                              error={error}
                              estadoExpediente={estadoExpediente}
                              setEstadoExpediente={setEstadoExpediente}
                              setEditing={setEditing}
                              user={user}
                              setMensaje={setMensaje}
                              setError={setError}
                              loading={loading}
                              setLoading={setLoading}
                            /> : (<div className="spinner-grow text-success" role="status">
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
            </div>
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

export default NuevoEstadoExpediente;
