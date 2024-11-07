import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MenuLateral from "../components/MenuLateral";
import axios from "axios";
import { useAuth } from "../providers/AuthContextProvider";
import { redirect, useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import MovimientoList from "../components/MovimientoList";


const BuscarExpediente = () => {
  const { login } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { buscarId } = useParams();

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
  const [expediente, setExpediente] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editar, setEditar] = useState(false);
  const [archivo, setArchivo] = useState();
  const [eliminar, setEliminar] = useState(false);

  const [idExpediente, setIdExpediente] = useState();
  const [nivel, setNivel] = useState();
  const [estanteria, setEstanteria] = useState();
  const [cantidadHojas, setCantidadHojas] = useState();
  const [comentarios, setComentarios] = useState();
  const [idEstadoExpediente, setIdEstadoExpediente] = useState();
  const [hasShownError, setHasShownError] = useState(false);
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [idMunicipio, setIdMunicipio] = useState(0);
  const [poligono, setPoligono] = useState();
  const [predio, setPredio] = useState();
  const [titular, setTitular] = useState();
  const [leitz, setLeitz] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuarioDestino, setIdUsuarioDestino] = useState();
  const [fechaEntrega, setFechaEntrega] = useState('PENDIENTE');
  const [fechaLimiteEntrega, setFechaLimiteEntrega] = useState();
  const [fechaSalida, setFechaSalida] = useState();




  const formatearFecha = (fecha) => {
    if (!fecha) {
      return null;  // Si la fecha es null, devolver null sin formatear
    }

    return new Date(fecha).toLocaleString('es-GT', {
      timeZone: 'America/Guatemala',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Formato de 24 horas
    }).replace(',', ''); // Eliminar la coma innecesaria
  };


  /*
  const formatearFecha = (fecha) => {
    const opciones = {
      timeZone: 'America/Guatemala', // Zona horaria
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    
    return new Date(fecha).toLocaleDateString('es-GT', opciones);

    
  };
  */




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

  const getUsuarios = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/usuarios`,
        {
          headers: {
            Authorization: `${user.type} ${user.token}`,
          },
        }
      );
      setUsuarios(response.data);

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


  const saveChanges = async () => {
    setMensaje("");
    setError("");
    if (!titular || titular.trim() === "") {
      setError("Ingrese un nombre válido");
      return;
    } else if (idDepartamento <= 0) {
      setError("Seleccione el departamento");
      setMensaje("");
      return;
    } else if (idMunicipio <= 0) {
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
    } else if (!predio) {
      setError("Seleccione el polígono");
      return;
    } else if (!leitz) {
      setError("Ingrese el Leitz");
      return;
    } else if (!idEstadoExpediente) {
      setError("Seleccione un estado");
      return;
    }
    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/expedientes/${buscarId}`,
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
          municipio_id: idMunicipio,
          departamento_id: idDepartamento,
          archivo
        }
      );


      if (response.status === 200) {
        toast.success("Expediente actualizado con éxito!!");
        navigate('/home')
      }
      setLoading(false);
      setError();
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Ya existe el expediente");
      } else if (error.status >= 400 && error.response.status < 500) {
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

  const sacarExpediente = async () => {
    setMensaje("");
    setError("");
    if (!idUsuarioDestino) {
      setError("Seleccione el responsable");
      return;
    } else if (!fechaSalida) {
      setError("Seleccione fecha de salida");
      setMensaje("");
      return;
    } else if (!fechaLimiteEntrega) {
      setError("Seleccione fecha de entrega");
      setMensaje("");
      return;
    }
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/movimientos`,
        {
          usuario_id: user?.user?.id,
          usuario_destino_id: parseInt(idUsuarioDestino),
          expediente_id: buscarId,
          fecha_salida: formatearFecha(fechaSalida),
          fecha_limite: formatearFecha(fechaLimiteEntrega),
          fecha_entrega: formatearFecha(new Date()),
          created_at: formatearFecha(new Date()),
          updated_at: formatearFecha(new Date()),
        }
      );





      if (response.status === 201) {
        toast.success("Salida de Expediente con éxito!!");
        navigate('/home')
      } else {
        toast.error("Revise sus datos");
      }
      setLoading(false);
      setError();
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("No se pudo");
      } else if (error.status >= 400 && error.response.status < 500) {
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

  const eliminarExpediente = async () => {

    setLoading(true);

    try {
      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/expedientes/${buscarId}`
      );


      if (response.status === 200) {
        toast.success("Expediente eliminado con éxito!!");
        navigate('/home')
      } else {
        toast.error("Expediente no eliminado!!");
      }
      setLoading(false);
      setError();
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Ya existe el expediente");
      } else if (error.status >= 400 && error.response.status < 500) {
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
    getEstadosExpedientes();

    const getExpediente = async () => {

      setLoading(true);
      setEditar(false)

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/expedientes/${buscarId}`,
          {
            headers: {
              Authorization: `${user.type} ${user.token}`,
            },
          }
        );
        const data = response.data;
        setCantidadHojas(data.hojas)


        setEstanteria(data.estanteria)
        setArchivo(data.archivo)
        setPredio(data.predio)
        setPoligono(data.poligono)
        setNivel(data.nivel)
        setLeitz(data.leitz)
        setIdDepartamento(data.departamentoId)
        setIdMunicipio(data.municipioId)
        setTitular(data.titular)
        setComentarios(data.comentarios)
        setIdEstadoExpediente(data.expedienteEstadoId)
        setMensaje(`CCC: ${data.departamentoId < 100 ? '0' + data.departamentoId : data.departamentoId}-${data.municipioId < 100 ? '0' + data.municipioId : data.municipioId}-${data.poligono}-${data.predio}`);
        setError()
        setExpediente(data.id)

        setHasShownError(false);

        setLoading(false);
      } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 404) {
          if (!hasShownError) {
            toast.error("No se encontró el expediente con CCC: " + buscarccc);
            setHasShownError(true); // Actualizar el estado para evitar múltiples toasts
          }
          navigate('/expedientes/nuevo');
        } else if (error.response.status === 400) {
          if (!hasShownError) {
            toast.error("No se encontró el expediente con CCC: " + buscarccc);
            setHasShownError(true); // Actualizar el estado para evitar múltiples toasts
          }
          navigate('/expedientes/nuevo');
        } else {
          console.error(error);
        }
      }
    };
    getExpediente();
  }, [buscarId, hasShownError, navigate]);

  useEffect(() => {
    getDepartamentos();
    getUsuarios();
  }, []);

  useEffect(() => {
    if (idDepartamento > 0) {
      getMunicipiosPorDepartamento();
    }
  }, [idDepartamento]);


  const descargar = async () => {
    if (!archivo) {
      console.error('No hay datos base64 disponibles.');
      return;
    }

    // Convertir base64 a binario
    const byteCharacters = atob(archivo); // Decodifica base64 a texto
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Crear un blob con los datos binarios
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace temporal y hacer clic en él para descargar
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Expediente_' + `${idDepartamento < 100 ? '0' + idDepartamento : idDepartamento}-${idMunicipio < 100 ? '0' + idMunicipio : idMunicipio}-${poligono}-${predio}` + ".pdf"; // Nombre del archivo
    document.body.appendChild(a);
    a.click();

    // Limpieza
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
                        {!editar ? 'Buscar' : 'Editando'} expediente
                      </h5>{" "}
                      <small className="text-muted float-end">
                        Ubicación del expediente
                      </small>
                    </div>
                    <div className="card-body">
                      {mensaje && (
                        <div className="alert alert-success" role="alert">
                          {mensaje}
                        </div>
                      )}
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}!
                        </div>
                      )}
                      {expediente && <form>


                        {/* APARTADO PARA TITULAR */}
                        <div className="form-floating form-floating-outline mb-4">
                          <input
                            type="text"
                            className="form-control"
                            id="titular"
                            placeholder="Juan Pablo Ramirez"
                            value={titular}
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

                                setTitular(input);
                              }
                            }}
                          />
                          <label htmlFor="titular">Titular</label>
                        </div>



                        <div class="input-group">

                          {/* APARTADO PARA DEPARTAMENTO */}
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-floating form-floating-outline mb-4">
                              <select
                                disabled={!editar}
                                id="departamento"
                                maxLength={2}
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

                          </div>


                          {/* APARTADO PARA MUNICIPIO */}
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-floating form-floating-outline mb-4">
                              <select
                                disabled={!editar}
                                id="municipio"
                                maxLength={2}
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

                          </div>


                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-floating form-floating-outline mb-4">
                              <input
                                disabled={!editar}
                                type="text"
                                maxLength={2}
                                className="form-control"
                                id="poligono"
                                placeholder="01"
                                value={poligono}
                                onChange={(e) => {
                                  const value = e.target.value;

                                  // Expresión regular para validar que sea un número entre 01 y 99
                                  const regex = /^(0[1-9]|[1-9][0-9]|[0-9]{1,2})?$/; // Permite 0-99 y vacío

                                  // Permite que el campo esté vacío o que cumpla con la expresión regular
                                  if (value === "" || regex.test(value)) {
                                    setPoligono(value); // Actualiza el estado si es válido o si se borra
                                  }
                                }}
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
                          </div>

                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-floating form-floating-outline mb-4">
                              <input
                                disabled={!editar}
                                type="text"
                                maxLength={5}
                                className="form-control"
                                id="predio"
                                placeholder="00001"
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
                          </div>



                        </div>



                        <div class="input-group">



                          <div className="form-floating form-floating-outline mb-4">
                            <input
                              disabled={!editar}
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
                              disabled={!editar}
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
                              disabled={!editar}
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
                              disabled={!editar}
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


                        <div class="form-floating form-floating-outline mb-4">
                          <input disabled={!editar} class="form-control" type="file" id="formFile" accept="application/pdf"
                            onChange={handleFileChange}
                          />
                          <label for="exampleFormControlSelect1">
                            Expediente escaneado
                          </label>
                        </div>
                        <div className="form-floating form-floating-outline mb-4">
                          <textarea
                            disabled={!editar}
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
                          <select
                            disabled={!editar}
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
                          className="btn btn-primary waves-effect waves-light" onClick={(e) => {
                            if (!editar) {
                              setEditar(!editar)
                            }
                            else {
                              saveChanges();
                            }
                          }}
                        >
                          <i class="menu-icon tf-icons mdi mdi-sync"></i>
                          {editar ? 'Guardar Cambios' : 'Editar'}
                        </button>

                        {archivo && <button
                          type="button"
                          className="btn btn-warning waves-effect waves-light mx-3" onClick={descargar}
                        >
                          <i class="menu-icon tf-icons mdi mdi-download"></i>
                          Descargar Copia Física
                        </button>}

                        <button
                          type="button"
                          className="btn btn-secondary waves-effect waves-light mx-3" onClick={(e) => navigate('/home')}
                        >
                          <i class="menu-icon tf-icons mdi mdi-close"></i>
                          Cancelar
                        </button>


                        {user.user.rol.nombre == "TECNICO-ARCHIVO" && <button
                          type="button"
                          className="btn btn-danger waves-effect waves-light text-end" onClick={(e) => {
                            if (!eliminar) {
                              setEliminar(true)
                            }
                            else {
                              eliminarExpediente()
                            }
                          }}
                        >
                          <i class="menu-icon tf-icons mdi mdi-minus-circle"></i>
                          {eliminar ? 'CONFIRMAR ELIMINACIÓN' : 'Eliminar'}
                        </button>}


                        {mensaje && (
                          <div className="alert alert-success mt-4" role="alert">
                            {mensaje}!
                          </div>
                        )}

                        {error && (
                          <div className="alert alert-danger mt-4" role="alert">
                            {error}!
                          </div>
                        )}
                      </form>}
                      <div class="card-header d-flex justify-content-between align-items-center"><h5 class="mb-0"><span class="text-muted fw-light">Salida de Expediente {mensaje}</span></h5></div>

                      <div class="form-floating form-floating-outline mb-4">
                        <select
                          className="form-select"
                          id="exampleFormControlSelect1"
                          aria-label="Default select example"
                          value={idUsuarioDestino}
                          onChange={(e) =>
                            setIdUsuarioDestino(e.target.value)
                          }
                        >
                          <option value={"0"}>
                            --- Recibe ---
                          </option>
                          {usuarios.map((item) => {
                            return (
                              <option disabled={user.user.id == item.id} key={item.id} value={item.id}>
                                {item.nombre} - {item.rol?.nombre} {user.user.id == item.id ? ' - (Usuario actual)' : ''}
                              </option>
                            );
                          })}
                        </select>
                        <label for="exampleFormControlSelect1">
                          Recibe
                        </label>
                      </div>



                      <div class="input-group">

                        <div className="form-floating form-floating-outline mb-4">
                          <input
                            min={`${String(new Date().getDate()).padStart(2, '0')}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${new Date().getFullYear()}T${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`}
                            type="datetime-local"
                            className="form-control"
                            id="entrega"
                            placeholder="00"
                            value={fechaSalida}
                            onChange={(e) => setFechaSalida(e.target.value)}
                          />
                          <label htmlFor="entrega">Fecha de SALIDA</label>
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
                            min={fechaSalida}
                            disabled={!fechaSalida}
                            type="datetime-local"
                            className="form-control"
                            id="entrega"
                            placeholder="00"
                            value={fechaLimiteEntrega}
                            onChange={(e) => setFechaLimiteEntrega(e.target.value)}
                          />
                          <label htmlFor="entrega">Fecha límite para devolución</label>
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

                      <button
                        type="button"
                        className="btn btn-warning" onClick={sacarExpediente}
                      >
                        <i class="menu-icon tf-icons mdi mdi-share"></i>
                        Dar salida a expediente
                      </button>

                    </div>


                    <MovimientoList mensaje={mensaje} setMensaje={setMensaje} error={error} setError={setError} />




                  </div>
                </div>
              </div>
            </div>
            {/* / Content */}

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

export default BuscarExpediente;