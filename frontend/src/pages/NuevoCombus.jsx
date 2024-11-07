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

const NuevoCombustible = () => {
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




  const [fecha, setFecha] = useState();
  const [kilmetrajeInicial, setKilometrajeInicial] = useState();
  const [kilometrajeFinal, setKilometrajeFinal] = useState();
  const [cuponDesde, setCuponDesde] = useState();
  const [cuponHasta, setCuponHasta] = useState();
  const [denominacion, setDenominacion] = useState();
  const [estadoCupon, setEstadoCupon] = useState();
  const [pdf, setPdf] = useState();
  const [observacionCupon, setObservacionCupon] = useState();
  const [unidad, setUnidad] = useState();
  const [saldoInicio, setSaldoInicio] = useState();
  const [saldoFinal, setSaldoFinal] = useState();
  const [galones, setGalones] = useState();
  const [consumo, setConsumo] = useState();
  const [rendimiento, setRendimiento] = useState();


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
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/combustible?placa=${placa}`);


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
        setChofer('')
        setPlaca('')
        setFecha('')
        setKilometrajeInicial('')
        setKilometrajeFinal('')
        setCuponDesde('')
        setCuponHasta('')
        setDenominacion('')
        setEstadoCupon('')
        setPdf('')
        setObservacionCupon('')
        setUnidad('')
        setSaldoInicio('')
        setSaldoFinal('')
        setGalones('')
        setConsumo('')
        setRendimiento('')
        

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



  const updateCombustible = async (combustible) => {
    setLoading(true);

    let data = {
      fecha: combustible.fecha,
    placa: vehiculo?.placa,
    kilometraje_inicial: combustible.kilometraje_inicial,
    kilometraje_final: combustible.kilometraje_final,
    chofer: combustible.chofer,
    cupon_desde: combustible.cupon_desde,
    cupon_hasta: combustible.cupon_hasta,
    denominacion: combustible.denominacion,
    saldo_inicio: combustible.saldo_inicio,
    saldo_final: combustible.saldo_final,
    unidad: combustible.unidad,
    galones: combustible.galones,
    consumo: combustible.consumo,
    rendimiento: combustible.rendimiento,
    estado_cupon: combustible.estado_cupon,
    observacion_cupon: combustible.observacion_cupon,
    pdf: combustible.pdf,
    }

    if (user.password) {
      data.password = user.password
    }

    try {
      const response = await axiosInstance.put(`${import.meta.env.VITE_API_URL}/combustible/${id}`, data);
      console.log(response)

      setLoading(false);
      setError();
    } catch (error) {
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
  };





  useEffect(() => {
    getCombustible()
    if (editing) {
      setChofer(combustible?.choferActual)
      setPlaca(combustible?.placa)
      setFecha(combustible?.fechaAsignacion)
      setKilometrajeInicial(combustible?.kilometrajeInicial)
      setKilometrajeFinal(combustible?.kilometrajeFinal)
      setCuponDesde(combustible?.cuponDesde)
      setCuponHasta(combustible?.cuponHasta)
      setDenominacion(combustible?.denominacion)
      setEstadoCupon(combustible?.estadoCupon)
      setPdf(combustible?.pdf)
      setObservacionCupon(combustible?.observacionCupon)
      setUnidad(combustible?.unidad)
      setSaldoInicio(combustible?.saldoInicio)
      setSaldoFinal(combustible?.saldoFinal)
      setGalones(combustible?.galones)
      setConsumo(combustible?.consumo)
      setRendimiento(combustible?.rendimiento)

    }
  }, [editing])


  useEffect(() => {
    getVehiculos()
    
  }, [])


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
                        <span class="text-muted fw-light">Combustible/</span>{" "}
                        Asignación
                      </h5>
                      {editing ? (<span>

                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modalCombustible"
                          type="button"
                          className="btn btn-primary waves-effect waves-light mx-3"
                        >
                          <i class="menu-icon tf-icons mdi mdi-fire"></i>
                          Asignar combustible
                        </button>
                      </span>) : <button
                        type="button"
                        className="btn btn-primary waves-effect waves-light"
                        onClick={(e) => {

                          if (placa.length > 3) {
                            findByPlaca()
                          } else {
                            toast.error('Ingrese una placa válida')
                          }


                        }}
                        disabled={!placa}
                      >
                        <i class="menu-icon tf-icons mdi mdi-car"></i>
                        Buscar
                      </button>}
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
                        {false && <div class="form-floating form-floating-outline mb-4" >
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
                        </div>}
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
                                  if (placa.length > 3) {
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
                              disabled
                            />
                            <label for="exampleFormControlSelect1">
                              Modelo del Vehículo
                            </label>
                          </div>
                          <div class="form-floating form-floating-outline mb-4">
                            <input
                              disabled
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
                            disabled
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
                          {false && <input class="form-control" type="file" id="formFile" accept="image/*"
                            onChange={handleFileChange}
                          />}
                          {false && <label for="exampleFormControlSelect1">
                            Foto
                          </label>}
                          {archivo && <img src={`data:image/png;base64,${archivo}`} width='100%' alt="" />}
                        </div>





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
                        

                        {/*/ Data Tables */}
                      </div>

                      <div className="row my-4 text-center">
                        {/* Deposit / Withdraw  */}
                        {/* Data Tables */}
                        {(user.user.rol.nombre === "ASISTENTE-ADMINISTRATIVO" || user.user.rol.nombre === "ADMINISTRADOR" || user.user.rol.nombre === "TECNICO-BODEGA") && editing && (
                          <div className="col-12">
                            {!loadingCombustible ? <CombustibleList
                              
                              combustibleList={combustibleList}
                              vehiculo={vehiculo}
                              getCombustible={getCombustible}
                              error={error}
                              combustible={combustible}
                              updateCombustible={updateCombustible}
                              setCombustible={setCombustible}
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



export default NuevoCombustible;
