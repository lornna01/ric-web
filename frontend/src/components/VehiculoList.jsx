import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import toast from "react-hot-toast";

const VehiculoList = ({ user,vehiculoList,setMensaje, getVehiculos,vehiculo,setVehiculo,setEditing, loading,setLoading,error,setError,deleteVehiculo }) => {
  const [roles, setRoles] = useState([]);
  const [nombre, setNombre] = useState();
  const [idRol, setIdRol] = useState();
  const [contrasena, setContrasena] = useState();
  const [contrasena2, setContrasena2] = useState();
  const [estado, setEstado] = useState();
  const [correo, setCorreo] = useState();

  
  const [kilometrajeInicial, setKilometrajeInicial] = useState();
  const [kilometrajeFinal, setKilometrajeFinal] = useState();
  const [saldo, setSaldo] = useState();
  const [cuponDesde, setCuponDesde] = useState();
  const [cuponHasta, setCuponHasta] = useState();
  const [estadoCupon, setEstadoCupon] = useState('NUEVO');
  const [observacionCupon, setObservacionCupon] = useState();
  const [pdf, setPdf] = useState();
  const [choferActual, setChoferActual] = useState(vehiculo?.chofer);
  const [fechaAsignacion, setFechaAsignacion] = useState();
  
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.type} ${user.token}`, // Token de autorización
    },
  });
  
   
  const save = async () => {
    setMensaje("");
    setError("");
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
    } else if (!pdf) {
      toast.error("Falta el pdf");
      return;
    } else if (!saldo) {
      toast.error("Ingrese el saldo");
      return;
    } else if (!fechaAsignacion) {
      toast.error("Ingrese efecha de asignación");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/combustibles`,
        {
          usuario_id: user?.user?.id,
          fecha:fechaAsignacion,
          placa:vehiculo?.placa,
          kilometraje_inicial:kilometrajeInicial,
          kilometraje_final:kilometrajeFinal,
          chofer: choferActual,
          cupon_desde:cuponDesde,
          cupon_hasta:cuponHasta,
          saldo,
          estado_cupon: estadoCupon,
          observacion_cupon:observacionCupon,
          pdf
        }
      );
      

      if (response.status === 201) {
        toast.success("Asignación creada con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        window.location.reload()
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

  const deleteConfirm = async (vehi) => {
    if (confirm("Realmente quiere eliminar a "+vehi.placa+"??")) {
      await deleteVehiculo(vehi);
      //getUsers();
    } 
    
  }
  




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
              <th className="text-truncate">Propietario</th>
              <th className="text-truncate">Placa</th>
              <th className="text-truncate">Modelo</th>
              <th className="text-truncate">Chofer</th>
              <th className="text-truncate">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {vehiculoList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0 text-truncate">{item.propietario}</h6>
                        <small className="text-truncate">{item.email}</small>
                      </div>
                    </div>
                  </td>
                  <td className="text-truncate">{item.placa}</td>
                  <td className="text-truncate">
                    <i className="mdi mdi-car mdi-24px text-danger me-1" />{" "}
                    {item.modelo}
                  </td>
                 
                  <td>
                      {item.chofer}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn rounded-pill btn-info m-1"
                      onClick={() => {
                        setVehiculo(item)
                        setEditing(true)
                      }}
                    >
                      <i className="bx bx-edit"></i>
                    </button>
                    
                    <button
                      onClick={() => {
                        deleteConfirm(item)
                      }}
                      disabled={item.rol?.nombre == "ADMINISTRADOR"}
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
      {/* Modal 1*/}
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
                    min={new Date().toISOString().split('T')[0]} 
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
                  <label htmlFor="contrasena" className="form-label">
                  Saldo
                  </label>
                  <input
                     value={saldo}
                     onChange={(e) => setSaldo(e.target.value)}
                    type="number"
                    id="contrasena"
                    className="form-control"
                    placeholder="Ingrese un saldo"
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
                    <button
                          type="button"
                          className="btn btn-primary waves-effect waves-light"
                          onClick={save}
                          disabled={loading}
                        >
                          <i class="menu-icon tf-icons mdi mdi-content-save"></i>
                          Guardar
                        </button>
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
              >
                Cerrar
              </button>
             

              
              
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default VehiculoList;
