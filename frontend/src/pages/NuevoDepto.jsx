import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MenuLateral from "../components/MenuLateral";
import axios from "axios";
import { useAuth } from "../providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

import DepartamentoList from "../components/DepartamentoList";

const NuevoDepartamento = () => {
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
  const [loadingDepartamentos, setLoadingDepartamentos] = useState(false);


  const [editing, setEditing] = useState(false);

  const [departamentoList, setDepartamentoList] = useState([]);
  const [departamento, setDepartamento] = useState();

  const [nombre, setNombre] = useState();
  const [estado, setEstado] = useState();



  const save = async () => {
    setMensaje("");
    setError("");
    if (!nombre) {
      setError("Ingrese el nombre");
      return;
    } else if (!estado) {
      setError("Seleccione el estado");
      setMensaje("");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/departamentos`,
        {
          usuario_id: user?.user?.id,
          nombre,
          estado
        }
      );

      if (response.status === 201) {
        toast.success("Departamento creado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        window.location.reload()
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
    if (!nombre) {
      setError("Ingrese el nombre");
      return;
    } else if (!estado) {
      setError("Seleccione el estado");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/departamentos/${departamento.id}`, // Usa el ID del rol para la URL
        {
          usuario_id: user?.user?.id,
          nombre,
          estado
        }
      );
      if (response.status === 200) {
        toast.success("Actualizado con éxito!!");
        setEditing(false);
        
          window.location.reload();
       
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

  const findByNombreDep = async () => {
    setMensaje("");
    setError("");
    if (!nombre) {
      setError("Ingrese el nombre");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/departamentosByNombre/${nombre}`);


      if (response.status === 200) {
        await getDepartamentos();
        toast.success("Encontrado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setDepartamento(response.data)
        setEditing(true);
      }
      setLoading(false);
      setError();

    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setNombre('')
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



  const getDepartamentos = async () => {
    setMensaje("");
    setError("");
    setLoadingDepartamentos(true);

    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/departamentos`);


      if (response.status === 200) {
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setDepartamentoList(response.data)
        setLoadingDepartamentos(false)
      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setNombre('')
        setEstado('')

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




  useEffect(() => {
    getDepartamentos()
    if (editing) {
      setNombre(departamento?.nombre)
      setEstado(departamento?.estado)


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
                        <span class="text-muted fw-light">Departamentos/</span>{" "}
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
                              placeholder="DEPARTAMENTO"
                              value={nombre}
                              onChange={(e) => setNombre(e.target.value)}

                            />
                            <label for="exampleFormControlSelect1">
                              NOMBRE DEL DEPTO.
                            </label>
                          </div>

                        </div>
                        <div class="input-group">

                          <div class="form-floating form-floating-outline mb-4">
                            <select
                              className="form-select"
                              onChange={(e) => setEstado(e.target.value)} value={estado}>
                              <option value="">-- Seleccionar --</option>
                              <option value="ACTIVO">ACTIVO</option>
                              <option value="INACTIVO">INACTIVO</option>

                            </select>
                            <label for="exampleFormControlSelect1">
                              ESTADO DEL DEPTO.
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
                        {user?.user?.rol?.nombre && ["ADMINISTRADOR", "TECNICO-ARCHIVO"].includes(user.user.rol.nombre) && (
                          <div className="col-12">
                            {!loadingDepartamentos ? <DepartamentoList

                              departamentoList={departamentoList}
                              getDepartamentos={getDepartamentos}
                              error={error}
                              departamento={departamento}
                              setDepartamento={setDepartamento}
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

export default NuevoDepartamento;


