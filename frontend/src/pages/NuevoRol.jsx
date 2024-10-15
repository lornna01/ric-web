import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MenuLateral from "../components/MenuLateral";
import axios from "axios";
import { useAuth } from "../providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

import RolList from "../components/RolList";

const NuevoRol = () => {
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
  const [loadingRoles, setLoadingRoles] = useState(false);

  const [editing, setEditing] = useState(false);

  const [rolList, setRolList] = useState([]);
  const [rol, setRol] = useState();

  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [estado, setEstado] = useState();


  const [loadingCombustible, setLoadingCombustible] = useState(false);


 
  
  const save = async () => {
    setMensaje("");
    setError("");
    if (!nombre) {
      setError("Ingrese el nombre");
      return;
    } else if (!descripcion) {
      setError("Ingrese la descripcion del rol");
      return;
    } else if (!estado) {
      setError("Seleccione el estado");
      return;
    } 

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/roles`,
        {
          usuario_id: user?.user?.id,
          nombre,
          descripcion,
          estado
        }
      );
      

      if (response.status === 201) {
        toast.success("Rol creado con éxito!!")
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
    if (!nombre) {
      setError("Ingrese el nombre");
      return;
    } else if (!descripcion) {
      setError("Ingrese la descripción del rol");
      return;
    } else if (!estado) {
      setError("Seleccione el estado");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/roles/${rol.id}`, // Usa el ID del rol para la URL
        {
          usuario_id: user?.user?.id,
          nombre,
          descripcion,
          estado
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
  

  const findByNombreRol = async () => {
    setMensaje("");
    setError("");
    if (!nombre) {
      setError("Ingrese el nombre");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/rolesByNombre/${nombre}`);
      

      if (response.status === 200) {
        await getRoles()
        toast.success("Encontrado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setRol(response.data)
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

 

  const getRoles = async () => {
    setMensaje("");
    setError("");
    setLoadingRoles(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/roles`);
      

      if (response.status === 200) {
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setRolList(response.data)
       setLoadingRoles(false)
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

  const deleteRol = async (model) => {
    setMensaje("");
    setError("");

    setLoading(true);

    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/roles/${rol.id}`);
      
      if (response.status === 200) {
        toast.success("Eliminado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        getRoles()
       
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



  useEffect(() =>{
    getRoles()
    if (editing) {
      setNombre(rol?.nombre)
      setDescripcion(rol?.descripcion)
      setEstado(rol?.estado)
    }
    
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

            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-xxl">
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <span class="text-muted fw-light">Roles/</span>{" "}
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
                              id="titular"
                              placeholder="ROL"
                              value={nombre}
                              onChange={(e) => setNombre(e.target.value)}
                              
                            />
                          <label for="exampleFormControlSelect1">
                            NOMBRE DE ROL
                          </label>
                      </div>
                      
                        </div>
                        <div class="input-group">
                        <div class="form-floating form-floating-outline mb-4">
                      <input
                              type="text"
                              className="form-control"
                              id="correo"
                              placeholder="Correo electrónico"
                              value={descripcion}
                              onChange={(e) => setDescripcion(e.target.value)}
                            />
                          <label for="exampleFormControlSelect1">
                            Describa el rol
                          </label>
                        </div>
                        
                      <div class="form-floating form-floating-outline mb-4">
                      <select
                            className="form-select"
                              onChange={(e) => setEstado(e.target.value)} value={estado}>
                            <option value="">-- Seleccionar --</option>
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                            
                          </select>
                          <label for="exampleFormControlSelect1">
                            ESTADO DEL ROL
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
                          
                        </span> ):<button
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
                      {user.user.rol.nombre == "ADMINISTRADOR" && (
                        <div className="col-12">
                            {!loadingRoles ? <RolList
                              deleteRol ={deleteRol}
                            rolList={rolList}
                            getRoles={getRoles}
                              error={error}
                              rol={rol}
                              setRol={setRol}
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

export default NuevoRol;
