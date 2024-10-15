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

const NuevoVehiculo = () => {
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
  const [loadingVehiculos, setLoadingVehiculos] = useState(false);
  const [loadingCombustible, setLoadingCombustible] = useState(false);
  const [editing, setEditing] = useState(false);

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
                        <span class="text-muted fw-light">Vehículos/</span>{" "}
                        Nuevo vehículo  
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
                      <div class="form-floating form-floating-outline mb-4">
                      <input
                              type="text"
                              maxLength={60}
                              className="form-control"
                              id="titular"
                              placeholder="Juan Pablo Ramirez"
                              value={propietario}
                              onChange={(e) => setPropietario(e.target.value)}
                            />
                          <label for="exampleFormControlSelect1">
                            Propietario del vehículo
                          </label>
                      </div>
                        <div class="input-group">
                        <div class="form-floating form-floating-outline mb-4">
                      <input
                              type="text"
                              maxLength={60}
                              className="form-control"
                              id="titular"
                              placeholder="ABC123"
                              value={placa}
                              onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  if (placa.length>3) {
                                    findByPlaca()
                                  } else {
                                    toast.error('Ingrese una placa válida')
                                  }
                                }
                                
                              }}
                            />
                          <label for="exampleFormControlSelect1">
                            Placa del vehículo
                          </label>
                      </div>
                      <div class="form-floating form-floating-outline mb-4">
                      <input
                              type="number"
                              maxLength={4}
                              className="form-control"
                              id="titular"
                              placeholder="2024"
                              value={modelo}
                              onChange={(e) => setModelo(e.target.value)}
                            />
                          <label for="exampleFormControlSelect1">
                            Modelo del Vehículo
                          </label>
                      </div>
                      <div class="form-floating form-floating-outline mb-4">
                      <input
                              type="text"
                              maxLength={60}
                              className="form-control"
                              id="titular"
                              placeholder="Juan Pablo Ramirez"
                              value={chofer}
                              onChange={(e) => setChofer(e.target.value)}
                            />
                          <label for="exampleFormControlSelect1">
                            Chofer(usuario asignado)
                          </label>
                      </div>
                        </div>
                        <div className="form-floating form-floating-outline mb-4">
                          <textarea
                            id="basic-default-message"
                            className="form-control"
                            placeholder="Detalles adicionales acerca del expediente"
                            style={{ height: 100 }}
                            defaultValue={""}
                            value={comentarios}
                            maxLength={255}
                            onChange={(e) => setComentarios(e.target.value)}
                          />
                          <label htmlFor="basic-default-message">
                            Comentarios adicionales
                          </label>
                        </div>

                        <div class="form-floating form-floating-outline mb-4">
                          <input class="form-control" type="file" id="formFile" accept="image/*"
                          onChange={handleFileChange}
                          />
                          <label for="exampleFormControlSelect1">
                            Foto
                          </label>
                          {archivo && <img src={`data:image/png;base64,${archivo}`} width='100%' alt="" />}
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

                        {archivo && <button
                          type="button"
                          className="btn btn-danger waves-effect waves-light mx-3"
                          onClick={() => {
                            setArchivo(null)
                          }}
                          disabled={loading}
                        >
                          <i class="menu-icon tf-icons mdi mdi-close"></i>
                          Borrar imagen
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
                      {user.user.rol.nombre == "ADMINISTRADOR" && (
                        <div className="col-12">
                            {!loadingVehiculos ? <VehiculoList
                              deleteVehiculo ={deleteVehiculo}
                            vehiculoList={vehiculoList}
                            getVehiculos={getVehiculos}
                              error={error}
                              vehiculo={vehiculo}
                              setVehiculo={setVehiculo}
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

export default NuevoVehiculo;
