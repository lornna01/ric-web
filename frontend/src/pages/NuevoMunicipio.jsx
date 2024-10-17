import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MenuLateral from "../components/MenuLateral";
import axios from "axios";
import { useAuth } from "../providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";


import MunicipioList from "../components/MunicipioList"
import DepartamentoList from "../components/DepartamentoList"

const NuevoMunicipio = () => {
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
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);

  const [editing, setEditing] = useState(false);
  
  const [municipioList, setMunicipioList] = useState([]);
  const [municipio, setMunicipio] = useState();
  const [departamentoList, setDepartamentoList] = useState([]);
  const [nombre, setNombre] = useState("");
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [departamento, setDepartamento] = useState();
  const [estado, setEstado] = useState();

 
  const save = async () => {
    setMensaje("");
    setError("");
    if (!nombre) {
      setError("Ingrese el nombre");
      return;
    }else if (idDepartamento<=0) {
      setError("Seleccione el departamento");
      setMensaje("");
      return;
    }else if (!estado) {
      setError("Ingrese el estado");
      return;
    }
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/municipios`,
        {
          usuario_id: user?.user?.id,
          nombre,
          departamento_id: idDepartamento,
          estado
        }
      );

      if (response.status === 201) {
        toast.success("Municipio creado con éxito!!");
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
    if (!nombre) {
      setError("Ingrese el nombre");
      return;
    }else if (idDepartamento<=0) {
      setError("Seleccione el departamento");
      setMensaje("");
      return;
    }else if (!estado) {
      setError("Ingrese el estado");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/municipios/${nombre}`,
        {
          usuario_id: user?.user?.id,
          nombre,
          departamento_id: idDepartamento,
          estado
        }
      );

      if (response.status === 200) {
        toast.success("Municipio actualizado con éxito!!")
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




  const findByNombreMun = async () => {
    setMensaje("");
    setError("");
    if (!nombre) {
      setError("Ingrese el nombre");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/municipiosByNombre/${nombre}`);
      

      if (response.status === 200) {
        await getMunicipios()
        toast.success("Munici encontrado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setNombre(response.data.nombre)
        setIdDepartamento(response.data.departamento_id)
        setEstado(response.data.estado)
        setMunicipio(response.data)
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
        setIdDepartamento('')
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
    setLoadingDepartamentos(true);
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/departamentos`
      );
      if (response.status === 200) {
        setDepartamentoList(response.data);
      }
      setLoadingDepartamentos(false);
    } catch (error) {
      console.log(error);
      setLoadingDepartamentos(false);
    }
  };


  const getMunicipios = async () => {
    setMensaje("");
    setError("");
    setLoadingMunicipios(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/municipios?departamento_id=${idDepartamento}`);
      

      if (response.status === 200) {
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setMunicipioList(response.data)
       setLoadingMunicipios(false)
      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setNombre('')
        setIdDepartamento('')
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
    getDepartamentos();
  }, []);

  useEffect(() =>{
    getMunicipios()
    if (editing) {
      setNombre(municipio?.nombre)
      setIdDepartamento(municipio?.departamento?.id)
      setEstado(municipio?.estado)
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
                        <span class="text-muted fw-light">Municipios/</span>{" "}
                        Nuevo Municipio  
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
                      <div className="form-floating form-floating-outline mb-4">
                          <input
                            type="text"
                            maxLength={60}
                            className="form-control"
                            id="nombre"
                            placeholder="Nombre del Municipio"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                          />
                          <label htmlFor="nombre">
                            Nombre del Municipio
                          </label>
                        </div>

                        <div className="form-floating form-floating-outline mb-4">
                          <select
                            className="form-control"
                            id="departamento"
                            value={idDepartamento}
                            onChange={(e) => setIdDepartamento(e.target.value)}
                          >
                            <option value="">Seleccione un Departamento</option>
                            {departamentoList.map((dep) => (
                              <option key={dep.id} value={dep.id}>
                                {dep.nombre}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="departamento">
                            Departamento
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
 

                        {error && (
                          <div className="alert alert-danger mt-4" role="alert">
                            {error}!
                          </div>
                        )}                        
                      </form>

                      <div className="row my-4 text-center">
                      {/* Deposit / Withdraw */}
                      {/* Data Tables */}
                      {user.user.rol.nombre == "TECNICO-ARCHIVO" && (
                        <div className="col-12">
                            {!loadingMunicipios ? <MunicipioList
                              
                            municipioList={municipioList}
                            getMunicipios={getMunicipios}
                              error={error}
                              municipio={municipio}
                              setMunicipio={setMunicipio}
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
            <Footer />
            <div className="content-backdrop fade" />
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle" />
    </div>
  );
};

export default NuevoMunicipio;
