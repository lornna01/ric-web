import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MenuLateral from "../components/MenuLateral";
import axios from "axios";
import { useAuth } from "../providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const NuevoExpediente = () => {
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

  const [estadoExpedientes, setEstadoExpedientes] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const [idDepartamento, setIdDepartamento] = useState(0);
  const [idMunicipio, setIdMunicipio] = useState(0);
  const [poligono, setPoligono] = useState();
  const [predio, setPredio] = useState();
  const [titular, setTitular] = useState();
  const [leitz, setLeitz] = useState();
  const [nivel, setNivel] = useState();
  const [estanteria, setEstanteria] = useState();
  const [cantidadHojas, setCantidadHojas] = useState();
  const [comentarios, setComentarios] = useState();
  const [idEstadoExpediente, setIdEstadoExpediente] = useState();
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

  const getEstadosExpedientes = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/estadoExpedientes`,
        {
          headers: {
            Authorization: `${user.type} ${user.token}`,
          },
        }
      );
      setEstadoExpedientes(response.data);

      setLoading(false);
    } catch (error) {
      console.error(" failed:", error);
      if (error.status >= 400 && error.status < 500) {
        setError("No se puede.");
      }
      //setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
  };

  const getDepartamentos = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/departamentos`,
        {
          headers: {
            Authorization: `${user.type} ${user.token}`,
          },
        }
      );
      setDepartamentos(response.data);

      setLoading(false);
    } catch (error) {
      console.error(" failed:", error);
      if (error.status >= 400 && error.status < 500) {
        setError("No se puede.");
      }
      //setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
  };

  const getMunicipiosPorDepartamento = async () => {
    setLoading(true);
    setIdMunicipio(0)
    setMunicipios([])
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/municipios?departamento_id=${idDepartamento}`,
        {
          headers: {
            Authorization: `${user.type} ${user.token}`,
          },
        }
      );
      setMunicipios(response.data);

      setLoading(false);
    } catch (error) {
      console.error(" failed:", error);
      if (error.status >= 400 && error.status < 500) {
        setError("No se puede.");
      }
      //setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
  };

  const save = async () => {
    setMensaje("");
    setError("");
    if (!titular) {
      setError("Ingrese el titular");
      return;
    }else if (idDepartamento<=0) {
      setError("Seleccione el departamento");
      setMensaje("");
      return;
    } else if (idMunicipio<=0) {
      setError("Seleccione el municipio");
      setMensaje("");
      return;
    } else if (!estanteria) {
      setError("Ingrese la estantaría");
      return;
    } else if (!nivel) {
      setError("Ingrese el nivel");
      return;
    } else if (cantidadHojas < 1) {
      setError("Ingrese la cantidad de hojas");
      return;
    } else if (idEstadoExpediente < 1) {
      setError("Seleccione el estado");
      return;
    } else if (!poligono) {
      setError("Seleccione el polígono");
      return;
    }else if (!predio) {
      setError("Seleccione el polígono");
      return;
    }else if (!leitz) {
      setError("Ingrese el Leitz");
      return;
    }else if (!idEstadoExpediente) {
      setError("Seleccione un estado");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/expedientes`,
        {
          usuario_id: user?.user?.id,
          titular,
          leitz,
          estanteria,
          nivel,
          hojas: cantidadHojas,
          expediente_estado_id: idEstadoExpediente,
          comentarios,
          predio,
          poligono,
          municipio_id:idMunicipio,
          departamento_id:idDepartamento,
          archivo
        }
      );
      

      if (response.status === 201) {
        setMensaje("Expediente creado con éxito!!");

        navigate('/home');
      }
      setLoading(false);
      setError();
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message+" el CCC");

  
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
    getEstadosExpedientes();
    getDepartamentos();
  }, []);

  useEffect(() => {
    if (idDepartamento > 0) {
      getMunicipiosPorDepartamento();
    }
  }, [idDepartamento]);

  
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
                        <span class="text-muted fw-light">Expedientes/</span>{" "}
                        Nuevo expediente  
                      </h5>{" "}
                      <small className="text-muted float-end">
                        Ubicación del expediente
                      </small>
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
                              value={titular}
                              onChange={(e) => setTitular(e.target.value)}
                            />
                          <label for="exampleFormControlSelect1">
                            Titular
                          </label>
                      </div>
                        <div class="input-group">
                          <div className="form-floating form-floating-outline mb-4">
                            <select
                              disabled={departamentos<=0}
                              id="departamento"
                              class="form-select form-select-lg"
                              value={idDepartamento}
                              onChange={(e) => setIdDepartamento(e.target.value)}
                            >
                            <option value={0}>
                              --- SELECCIONE ---
                            </option>
                            {departamentos.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.nombre}
                                </option>
                              );
                            })}
                            </select>
                            <label htmlFor="departamento">Departamento</label>
                            <div
                              data-lastpass-icon-root=""
                              style={{
                                position: "relative !important",
                                height: "0px !important",
                                width: "0px !important",
                                float: "left !important",
                              }}
                            />
                          </div>
                          <div className="form-floating form-floating-outline mb-4">
                            <select
                              disabled={idDepartamento<=0}
                              id="municipio"
                              class="form-select form-select-lg"
                              value={idMunicipio}
                              onChange={(e) => setIdMunicipio(e.target.value)}
                            >
                              <option value={0}>
                              --- SELECCIONE ---
                            </option>
                            {idDepartamento > 0 && municipios.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.nombre}
                                </option>
                              );
                            })}
                            </select>
                            <label htmlFor="municipio">Municipio</label>
                            <div
                              data-lastpass-icon-root=""
                              style={{
                                position: "relative !important",
                                height: "0px !important",
                                width: "0px !important",
                                float: "left !important",
                              }}
                            />
                          </div>

                          <div className="form-floating form-floating-outline mb-4">
                            <input
                              type="text"
                              maxLength={10}
                              className="form-control"
                              id="poligono"
                              placeholder="00"
                              value={poligono}
                              onChange={(e) => setPoligono(e.target.value)}
                            />
                            <label htmlFor="poligono">Polígono</label>
                            <div
                              data-lastpass-icon-root=""
                              style={{
                                position: "relative !important",
                                height: "0px !important",
                                width: "0px !important",
                                float: "left !important",
                              }}
                            />
                          </div>
                          <div className="form-floating form-floating-outline mb-4">
                            <input
                              type="text"
                              maxLength={5}
                              className="form-control"
                              id="predio"
                              placeholder="00000"
                              value={predio}
                              onChange={(e) => setPredio(e.target.value)}
                            />
                            <label htmlFor="predio">Predio</label>
                            <div
                              data-lastpass-icon-root=""
                              style={{
                                position: "relative !important",
                                height: "0px !important",
                                width: "0px !important",
                                float: "left !important",
                              }}
                            />
                          </div>
                          <div className="form-floating form-floating-outline mb-4">
                            <input
                              type="text"
                              maxLength={5}
                              className="form-control"
                              id="estanteria"
                              placeholder="M-1"
                              value={estanteria}
                              onChange={(e) => setEstanteria(e.target.value)}
                            />
                            <label htmlFor="estanteria">Estantería</label>
                            <div
                              data-lastpass-icon-root=""
                              style={{
                                position: "relative !important",
                                height: "0px !important",
                                width: "0px !important",
                                float: "left !important",
                              }}
                            />
                          </div>

                          <div className="form-floating form-floating-outline mb-4">
                            <input
                              type="number"
                              min={0}
                              className="form-control"
                              id="nivel"
                              placeholder="1"
                              value={nivel}
                              onChange={(e) => setNivel(e.target.value)}
                            />
                            <label htmlFor="nivel">Nivel</label>
                            <div
                              data-lastpass-icon-root=""
                              style={{
                                position: "relative !important",
                                height: "0px !important",
                                width: "0px !important",
                                float: "left !important",
                              }}
                            />
                          </div>

                          <div className="form-floating form-floating-outline mb-4">
                            <input
                              type="text"
                              maxLength={5}
                              className="form-control"
                              id="leitz"
                              placeholder="1"
                              value={leitz}
                              onChange={(e) => setLeitz(e.target.value)}
                            />
                            <label htmlFor="leitz">
                              Leitz
                            </label>
                            <div
                              data-lastpass-icon-root=""
                              style={{
                                position: "relative !important",
                                height: "0px !important",
                                width: "0px !important",
                                float: "left !important",
                              }}
                            />
                          </div>

                          <div className="form-floating form-floating-outline mb-4">
                            <input
                              type="number"
                              min={1}
                              maxLength={4}
                              className="form-control"
                              id="hojas"
                              placeholder="1"
                              value={cantidadHojas}
                              onChange={(e) => setCantidadHojas(e.target.value)}
                            />
                            <label htmlFor="hojas">
                              # Hojas
                            </label>
                            <div
                              data-lastpass-icon-root=""
                              style={{
                                position: "relative !important",
                                height: "0px !important",
                                width: "0px !important",
                                float: "left !important",
                              }}
                            />
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
                          <input class="form-control" type="file" id="formFile" accept="application/pdf"
                          onChange={handleFileChange}
                          />
                          <label for="exampleFormControlSelect1">
                            Expediente escaneado
                          </label>
                        </div>

                        <div class="form-floating form-floating-outline mb-4">
                          <select
                            className="form-select"
                            id="exampleFormControlSelect1"
                            aria-label="Default select example"
                            value={idEstadoExpediente}
                            onChange={(e) =>
                              setIdEstadoExpediente(e.target.value)
                            }
                          >
                            <option value={"0"}>
                              --- SELECCIONE EL ESTADO ACTUAL ---
                            </option>
                            {estadoExpedientes.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.nombre}
                                </option>
                              );
                            })}
                          </select>
                          <label for="exampleFormControlSelect1">
                            Estado del expediente
                          </label>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary waves-effect waves-light"
                          onClick={save}
                          disabled={loading}
                        >
                          <i class="menu-icon tf-icons mdi mdi-content-save"></i>
                          Guardar
                        </button>
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

export default NuevoExpediente;
