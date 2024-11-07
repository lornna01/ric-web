import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import toast from "react-hot-toast";

const CombustibleList = ({
  user,
  combustibleList,
  setMensaje,
  vehiculo,
  getCombustible,
  combustible,
  setCombustible,
  editing,
  setEditing,
  updateCombustible,
  loading,
  setLoading,
  error,
  setError,
  deleteCombustible }) => {

  const [roles, setRoles] = useState([]);
  const [nombre, setNombre] = useState();
  const [idRol, setIdRol] = useState();
  const [contrasena, setContrasena] = useState();
  const [contrasena2, setContrasena2] = useState();
  const [estado, setEstado] = useState();
  const [correo, setCorreo] = useState();


  const [kilometrajeInicial, setKilometrajeInicial] = useState();
  const [kilometrajeFinal, setKilometrajeFinal] = useState();
  const [denominacion, setDenominacion] = useState();
  const [cuponDesde, setCuponDesde] = useState();
  const [cuponHasta, setCuponHasta] = useState();
  const [estadoCupon, setEstadoCupon] = useState('NUEVO');
  const [observacionCupon, setObservacionCupon] = useState();
  const [pdf, setPdf] = useState();
  const [choferActual, setChoferActual] = useState(vehiculo?.chofer);
  const [chofer, setChofer] = useState();
  const [fechaAsignacion, setFechaAsignacion] = useState();
  const [saldoInicio, setSaldoInicio] = useState();
  const [saldoFinal, setSaldoFinal] = useState();
  const [unidad, setUnidad] = useState();
  const [galones, setGalones] = useState();
  const [consumo, setConsumo] = useState();
  const [rendimiento, setRendimiento] = useState();

  const [unidades, setUnidades] = useState([]);

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfs, setPdfs] = useState({});


  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.type} ${user.token}`, // Token de autorización
    },
  });



  const verPDF = (pdfBase64) => {
    // Decodificar Base64 y convertir a un Blob
    const pdfBlob = new Blob([new Uint8Array(atob(pdfBase64.pdf).split('').map(c => c.charCodeAt(0)))], { type: 'application/pdf' });
    
    // Crear una URL temporal para el Blob
    const url = URL.createObjectURL(pdfBlob);
    
    // Abrir el PDF en una nueva pestaña
    window.open(url, '_blank');
    
    // Liberar la URL cuando ya no sea necesaria
    URL.revokeObjectURL(url);
  };


  
  const deleteConfirm = async (vehi) => {
    if (confirm("Realmente quiere eliminar a " + vehi.placa + "??")) {
      await deleteVehiculo(vehi);
      //getUsers();
    }

  }

  const deleteConfirmComb = async (comb) => {
    if (confirm("Realmente quiere eliminar la asignacion de " + comb.placa + " - " + new Date(comb.fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) + "??")) {
      await deleteCombustible(comb);
      getCombustible();
    }

  }




  const save = async () => {
    setMensaje("");
    setError("");

    // Validaciones
    if (!choferActual) {
      toast.error("Ingrese el chofer actual");
      return;
    } else if (!cuponDesde) {
      toast.error("Ingrese los cupones desde");
      return;
    } else if (!cuponHasta) {
      toast.error("Ingrese los cupones hasta");
      return;
    } else if (!kilometrajeInicial) {
      toast.error("Ingrese kilometraje inicial");
      return;
    } else if (!denominacion) {
      toast.error("Ingrese el denominacion");
      return;
    } else if (!fechaAsignacion) {
      toast.error("Ingrese fecha de asignación");
      return;
    }
 
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/combustible`,
        {
          usuario_id: user?.user?.id,
          fecha: fechaAsignacion,
          placa: vehiculo?.placa,
          kilometraje_inicial: kilometrajeInicial,
          kilometraje_final: kilometrajeFinal,
          chofer: choferActual,
          cupon_desde: cuponDesde,
          cupon_hasta: cuponHasta,
          denominacion,
          saldo_inicio: saldoInicio,
          saldo_final: saldoFinal,
          unidad,
          galones,
          consumo,
          rendimiento,
          estado_cupon: estadoCupon,
          observacion_cupon: observacionCupon,
          pdf
        }
      );

      if (response.status === 201) {
        toast.success("Asignación creada con éxito!!");
        window.location.reload();
      }
      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);

      // Manejo de errores
      if (error.response) {
        if (error.response.status === 400) {
          setError(error.response.data.message);
        } else if (error.response.status === 409) {
          // Maneja el conflicto aquí (por ejemplo, registro ya existente)
          setError("Este registro ya existe. Verifica los datos.");
          toast.error("Este registro ya existe. Verifica los datos.");
        } else if (error.response.status >= 500) {
          setError("Error en el servidor.");
        } else {
          setError("Error inesperado.");
        }
      } else {
        setError("Error de red.");
      }

      console.log(error);
    }

    // Cierra el modal si no hay errores
    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
      setLoading(false);
    }
  };



const update = async (id) => {

  // Validaciones
  if (!cuponDesde) {
    toast.error("Ingrese los cupones desde");
    return;
  } else if (!cuponHasta) {
    toast.error("Ingrese los cupones hasta");
    return;
  } else if (!kilometrajeInicial) {
    toast.error("Ingrese kilometraje inicial");
    return;
  } else if (!denominacion) {
    toast.error("Ingrese el denominacion");
    return;
  } else if (!fechaAsignacion) {
    toast.error("Ingrese fecha de asignación");
    return;
  }
  
  setLoading(true);

  try {
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_API_URL}/combustible/${id}`,
      {
        usuario_id: user?.user?.id,
        fecha: fechaAsignacion,
        placa: vehiculo?.placa,
        kilometraje_inicial: kilometrajeInicial,
        kilometraje_final: kilometrajeFinal,
        chofer: choferActual,
        cupon_desde: cuponDesde,
        cupon_hasta: cuponHasta,
        denominacion,
        saldo_inicio: saldoInicio,
        saldo_final: saldoFinal,
        unidad,
        galones,
        consumo,
        rendimiento,
        estado_cupon: estadoCupon,
        observacion_cupon: observacionCupon,
        pdf
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





  const saveKilo = async (id, kilo) => {
    setMensaje("");
    setError("");
    if (!kilometrajeFinal) {
      toast.error("Ingrese kilometraje final");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/combustible/${id}`,
        {
          usuario_id: user?.user?.id,
          kilometraje_final: kilo,
        }
      );


      if (response.status === 200) {
        toast.success("Actualizado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        setTimeout(() => {
          window.location.reload()
        }, 2500);

        //navigate('/vehiculos/nuevo');
      }
      setLoading(false);
      setError();
    } catch (error) {
      if (error.response?.status === 400) {
        setError(error.response?.data?.message);
      }
      if (error?.status >= 400 && error.response?.status < 500) {
        setError("Error inesperado");
      }
      if (error?.status >= 500) {
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
      setLoading(false);
    }
  };




























  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPdf(reader.result.split(',')[1]); // Eliminar el prefijo "data:application/pdf;base64,"
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  

  const handleFile = (event, id) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPdfs((prevPdfs) => ({
        ...prevPdfs,
        [id]: reader.result.split(',')[1] // Guardar el PDF en base64 por ID
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };



  const getUnidades = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/unidades`,
        {
          headers: {
            Authorization: `${user.type} ${user.token}`
          }
        }
      );
      // Handle successful login
      console.log("successful!", response.data);
      setUnidades(response.data);

      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.status >= 400 && error.status < 500) {
        setError("No se puede.");
      }
      //setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
  };

  useEffect(() => {
    getUnidades();
  }, []);


  return (
    <div className="card">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}!
        </div>
      )}

      <div className="table-responsive">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th className="text-truncate">ID</th>
              <th className="text-truncate">Fecha</th>
              <th className="text-truncate">Chofer</th>
              <th className="text-truncate">Unidad</th>
              <th className="text-truncate">Km inicial</th>
              <th className="text-truncate">Km Final</th>
              <th className="text-truncate">Km Recorridos</th>
              <th className="text-truncate">Cupones</th>
              <th className="text-truncate">Denominación (Q.)</th>
              <th className="text-truncate">Saldo Inicio</th>
              <th className="text-truncate">Saldo Final</th>
              <th className="text-truncate">Galones</th>
              <th className="text-truncate">Consumo</th>
              <th className="text-truncate">Rendimiento</th>

              <th className="text-truncate">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {combustibleList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    {item.id}
                  </td>

                  <td>
                    {new Date(item.fecha).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </td>

                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0 text-truncate">{item.chofer}</h6>
                        <small className="text-truncate">Placa:{item.placa}</small>
                      </div>
                    </div>
                  </td>
                  <td className="text-truncate">{item.unidad}</td>
                  <td className="text-truncate">{item.kilometrajeInicial}</td>
                  <td className="text-truncate">{
                    item.kilometrajeFinal ??
                    <span>
                      <input type="number" min={item.kilometrajeInicial} name="" id="" placeholder="KM final" style={{ width: '83px' }}
                        onChange={(e) => setKilometrajeFinal(e.target.value)}
                      />
                      <button
                        onClick={() => saveKilo(item.id, kilometrajeFinal)}
                        className="btn rounded-pill btn-warning m-1"
                      >
                        <i className="bx bx-save"></i>
                      </button>
                    </span>
                  }</td>
                  <td className="text-truncate">{item.kilometrajeFinal > 0 ? (item.kilometrajeFinal - item.kilometrajeInicial) : '?'}</td>
                  <td className="text-truncate">
                    <i className="mdi mdi-ticket mdi-24px text-danger me-1" />{" "}
                    {item.cuponDesde} - {item.cuponHasta} ({(item.cuponHasta - item.cuponDesde) + 1})
                  </td>

                  <td>
                    {item.denominacion.toLocaleString('es-ES', { style: 'currency', currency: 'Q' })}
                  </td>
                  <td className="text-truncate">{item.saldoInicio}</td>
                  <td className="text-truncate">{item.saldoFinal}</td>
                  <td className="text-truncate">{item.galones}</td>
                  <td className="text-truncate">{item.consumo}</td>
                  <td className="text-truncate">{item.rendimiento}</td>



                  <td>

                  {item.pdf && <button 
                      onClick={() => {
                        verPDF(item)
                      }}
                              className="btn rounded-pill btn-success m-1"
                            >
                      <i className="mdi mdi-download"></i>
                    </button>}

             

                    

                    <button
                      onClick={() => {
                        deleteConfirmComb(item)

                      }}
                      disabled={item.rol?.nombre == "ASISTENTE-ADMINISTRATIVO"}
                      type="button"
                      className="btn rounded-pill btn-danger m-1"
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL PARA AGREGAR COMBUSTIBLE */}
      <div
        className="modal fade"
        id="modalEditar"
        aria-labelledby="modalToggleLabel"
        tabIndex={-1}
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <form id="nuevoCombustible" action="">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel1">
                  Asignar Combustible al vehículo de placa: <strong>{vehiculo?.placa}</strong>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row g-2">
                  <div className="col mb-0">
                    <label htmlFor="nombre" className="form-label">
                      Chofer
                    </label>
                    <input
                      value={choferActual}
                      onChange={(e) => setChoferActual(e.target.value)}
                      type="text"
                      id="nombre"
                      className="form-control"
                      placeholder="Ingrese el chofer"
                    />
                  </div>
                  <div className="col mb-0">
                    <label htmlFor="correo" className="form-label">
                      Fecha
                    </label>
                    <input
                      type="date"
                      id="correo"
                      className="form-control"
                      value={fechaAsignacion}
                      onChange={(e) => setFechaAsignacion(e.target.value)}
                      placeholder="Ingrese fecha"
                    />

                  </div>
                </div>
                <div className="row g-2">
                  <div className="col mb-2">
                    <label htmlFor="rol" className="form-label">
                      Kilometraje inicial
                    </label>
                    <input
                      type="number"
                      id="correo"
                      className="form-control"
                      value={kilometrajeInicial}
                      min={0}
                      onChange={(e) => setKilometrajeInicial(e.target.value)}
                      placeholder="Kilometraje"
                    />
                  </div>
                  <div className="col mb-2">
                    <label htmlFor="estado" className="form-label">
                      Kilometraje Final
                    </label>
                    <input
                      type="number"
                      id="correo"
                      className="form-control"
                      value={kilometrajeFinal}
                      min={0}
                      onChange={(e) => setKilometrajeFinal(e.target.value)}
                      placeholder="Kilometraje"
                    />
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col mb-2">
                    <label htmlFor="rol" className="form-label">
                      Cupón desde
                    </label>
                    <input
                      type="number"
                      id="correo"
                      className="form-control"
                      value={cuponDesde}
                      min={0}
                      onChange={(e) => setCuponDesde(e.target.value)}
                      placeholder="# cupon hasta"
                    />
                  </div>
                  <div className="col mb-2">
                    <label htmlFor="estado" className="form-label">
                      Cupón hasta
                    </label>
                    <input
                      type="number"
                      id="correo"
                      className="form-control"
                      value={cuponHasta}
                      min={0}
                      onChange={(e) => setCuponHasta(e.target.value)}
                      placeholder="# cupon hasta"
                    />
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col mb-0">
                    <label htmlFor="denominacion" className="form-label">
                      Denominación
                    </label>
                    <input
                      value={denominacion}
                      onChange={(e) => setDenominacion(e.target.value)}
                      type="number"
                      id="denominacion"
                      className="form-control"
                      placeholder="Ingrese la cantidad Q."
                    />
                  </div>
                  <div className="col mb-0">
                    <label htmlFor="contrasena2" className="form-label">
                      Estado
                    </label>
                    <select id="rol" className="form-select"
                      value={estadoCupon}
                      onChange={(e) => setEstadoCupon(e.target.value)}
                    >
                      <option>NUEVO</option>
                      <option>CONTABILIZADO</option>
                      <option>ANULADO</option>

                    </select>
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col mb-0">
                    <label htmlFor="saldoinicio" className="form-label">
                      Saldo Inicio
                    </label>
                    <input
                      value={saldoInicio}
                      onChange={(e) => setSaldoInicio(e.target.value)}
                      type="number"
                      id="saldoinicio"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                  <div className="col mb-0">
                    <label htmlFor="saldofinal" className="form-label">
                      Saldo Final
                    </label>
                    <input
                      value={saldoFinal}
                      onChange={(e) => setSaldoFinal(e.target.value)}
                      type="number"
                      id="saldofinal"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                </div>


                <div className="row g-2">
                  <div className="col mb-0">
                    <label htmlFor="galones" className="form-label">
                      Galones
                    </label>
                    <input
                      value={galones}
                      onChange={(e) => setGalones(e.target.value)}
                      type="number"
                      id="galones"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                  <div className="col mb-0">
                    <label htmlFor="consumo" className="form-label">
                      Consumo
                    </label>
                    <input
                      value={consumo}
                      onChange={(e) => setConsumo(e.target.value)}
                      type="number"
                      id="consumo"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                </div>


                <div className="row g-2">
                  <div className="col mb-0">
                    <label htmlFor="rendimiento" className="form-label">
                      Rendimiento
                    </label>
                    <input
                      value={rendimiento}
                      onChange={(e) => setRendimiento(e.target.value)}
                      type="number"
                      id="rendimiento"
                      className="form-control"
                      placeholder=""
                    />
                  </div>  

                  <div className="col mb-0">
                    <label htmlFor="unidad" className="form-label">
                      Unidad
                    </label>
                    <input
                      value={unidad}
                      onChange={(e) => setUnidad(e.target.value)}
                      type="text"
                      id="unidad"
                      className="form-control"
                      placeholder="Ingrese la unidad"
                    />
                  </div>           
                </div>



                <div className="form-floating form-floating-outline mb-4 mt-3">
                  <textarea
                    id="basic-default-message"
                    className="form-control"
                    placeholder="Detalles adicionales"
                    style={{ height: 100 }}
                    defaultValue={""}
                    value={observacionCupon}
                    maxLength={255}
                    onChange={(e) => setObservacionCupon(e.target.value)}
                  />
                  <label htmlFor="basic-default-message">
                    Observaciones
                  </label>
                </div>
                <div class="form-floating form-floating-outline mb-4">
                          <input class="form-control" type="file" id="formFile" accept="application/pdf"
                          onChange={handleFileChange}
                          />
                          <label for="exampleFormControlSelect1">
                            PDF
                          </label>
                          {pdf && <embed className="mt-3" src={`data:application/pdf;base64,${pdf}`} width='100%'  />}
                        </div>

                
                <div className="row mt-3">
                  <div className="col mb-0">
                  <p className="text-center">
                      {error &&
                        <div className="alert alert-danger alert-dismissible" role="alert">
                          {error}
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                            onClick={() => {
                              setTimeout(() => {
                                window.location.reload();
                              }, 1500);
                            }}>
                          </button>
                        </div>
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  id="cerrarModal"
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button disabled={loading} onClick={save} type="button" className="btn btn-success">
                  {loading ?
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div> : "Guardar"}
                </button>




              </div>
            </div>
          </div>
        </form>
      </div>



      {/* MODAL PARA AGREGAR COMBUSTIBLE */}
      <div
        className="modal fade"
        id="modalCombustible"
        aria-labelledby="modalToggleLabel"
        tabIndex={-1}
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <form id="nuevoCombustible" action="">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel1">
                  Asignar Combustible al vehículo de placa: <strong>{vehiculo?.placa}</strong>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row g-2">
                  <div className="col mb-0">
                    <label htmlFor="nombre" className="form-label">
                      Chofer
                    </label>
                    <input
                      value={choferActual}
                      onChange={(e) => setChoferActual(e.target.value)}
                      type="text"
                      id="nombre"
                      className="form-control"
                      placeholder="Ingrese el chofer"
                    />
                  </div>
                  <div className="col mb-0">
                    <label htmlFor="correo" className="form-label">
                      Fecha
                    </label>
                    <input
                      type="date"
                      id="correo"
                      className="form-control"
                      value={fechaAsignacion}
                      onChange={(e) => setFechaAsignacion(e.target.value)}
                      placeholder="Ingrese fecha"
                    />

                  </div>
                </div>
                <div className="row g-2">
                  <div className="col mb-2">
                    <label htmlFor="rol" className="form-label">
                      Kilometraje inicial
                    </label>
                    <input
                      type="number"
                      id="correo"
                      className="form-control"
                      value={kilometrajeInicial}
                      min={0}
                      onChange={(e) => setKilometrajeInicial(e.target.value)}
                      placeholder="Kilometraje"
                    />
                  </div>
                  <div className="col mb-2">
                    <label htmlFor="estado" className="form-label">
                      Kilometraje Final
                    </label>
                    <input
                      type="number"
                      id="correo"
                      className="form-control"
                      value={kilometrajeFinal}
                      min={0}
                      onChange={(e) => setKilometrajeFinal(e.target.value)}
                      placeholder="Kilometraje"
                    />
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col mb-2">
                    <label htmlFor="rol" className="form-label">
                      Cupón desde
                    </label>
                    <input
                      type="number"
                      id="correo"
                      className="form-control"
                      value={cuponDesde}
                      min={0}
                      onChange={(e) => setCuponDesde(e.target.value)}
                      placeholder="# cupon hasta"
                    />
                  </div>
                  <div className="col mb-2">
                    <label htmlFor="estado" className="form-label">
                      Cupón hasta
                    </label>
                    <input
                      type="number"
                      id="correo"
                      className="form-control"
                      value={cuponHasta}
                      min={0}
                      onChange={(e) => setCuponHasta(e.target.value)}
                      placeholder="# cupon hasta"
                    />
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col mb-0">
                    <label htmlFor="denominacion" className="form-label">
                      Denominación
                    </label>
                    <input
                      value={denominacion}
                      onChange={(e) => setDenominacion(e.target.value)}
                      type="number"
                      id="denominacion"
                      className="form-control"
                      placeholder="Ingrese la cantidad Q."
                    />
                  </div>
                  <div className="col mb-0">
                    <label htmlFor="contrasena2" className="form-label">
                      Estado
                    </label>
                    <select id="rol" className="form-select"
                      value={estadoCupon}
                      onChange={(e) => setEstadoCupon(e.target.value)}
                    >
                      <option>NUEVO</option>
                      <option>CONTABILIZADO</option>
                      <option>ANULADO</option>

                    </select>
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col mb-0">
                    <label htmlFor="saldoinicio" className="form-label">
                      Saldo Inicio
                    </label>
                    <input
                      value={saldoInicio}
                      onChange={(e) => setSaldoInicio(e.target.value)}
                      type="number"
                      id="saldoinicio"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                  <div className="col mb-0">
                    <label htmlFor="saldofinal" className="form-label">
                      Saldo Final
                    </label>
                    <input
                      value={saldoFinal}
                      onChange={(e) => setSaldoFinal(e.target.value)}
                      type="number"
                      id="saldofinal"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                </div>


                <div className="row g-2">
                  <div className="col mb-0">
                    <label htmlFor="galones" className="form-label">
                      Galones
                    </label>
                    <input
                      value={galones}
                      onChange={(e) => setGalones(e.target.value)}
                      type="number"
                      id="galones"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                  <div className="col mb-0">
                    <label htmlFor="consumo" className="form-label">
                      Consumo
                    </label>
                    <input
                      value={consumo}
                      onChange={(e) => setConsumo(e.target.value)}
                      type="number"
                      id="consumo"
                      className="form-control"
                      placeholder=""
                    />
                  </div>
                </div>


                <div className="row g-2">
                  <div className="col mb-0">
                    <label htmlFor="rendimiento" className="form-label">
                      Rendimiento
                    </label>
                    <input
                      value={rendimiento}
                      onChange={(e) => setRendimiento(e.target.value)}
                      type="number"
                      id="rendimiento"
                      className="form-control"
                      placeholder=""
                    />
                  </div>  

                  <div className="col mb-0">
                    <label htmlFor="unidad" className="form-label">
                      Unidad
                    </label>
                    <input
                      value={unidad}
                      onChange={(e) => setUnidad(e.target.value)}
                      type="text"
                      id="unidad"
                      className="form-control"
                      placeholder="Ingrese la unidad"
                    />
                  </div>   
                </div>



                <div className="form-floating form-floating-outline mb-4 mt-3">
                  <textarea
                    id="basic-default-message"
                    className="form-control"
                    placeholder="Detalles adicionales"
                    style={{ height: 100 }}
                    defaultValue={""}
                    value={observacionCupon}
                    maxLength={255}
                    onChange={(e) => setObservacionCupon(e.target.value)}
                  />
                  <label htmlFor="basic-default-message">
                    Observaciones
                  </label>
                </div>
                <div class="form-floating form-floating-outline mb-4">
                  <input class="form-control" type="file" id="formFile" accept="application/pdf"
                    onChange={handleFileChange}
                  />
                  <label for="exampleFormControlSelect1">
                    PDF
                  </label>
                  {pdf && <embed className="mt-3" src={`data:application/pdf;base64,${pdf}`} width='100%' />}
                </div>
                <div className="row mt-3">
                  <div className="col mb-0">
                    <p className="text-center">
                      
                      {error &&
                        <div className="alert alert-danger alert-dismissible" role="alert">
                          {error}

                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                      }

                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
              <button
                  id="cerrarModal"
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setTimeout(() => {
                      window.location.reload()
                    }, 1500);
                  }}

                >
                  Cerrar
                </button>
                <button disabled={loading} onClick={update} type="button" className="btn btn-success">
                  {loading ?
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div> : "Guardar cambios"}
                </button>





              </div>
            </div>
          </div>
        </form>
      </div>




    </div>
  );
};

export default CombustibleList;