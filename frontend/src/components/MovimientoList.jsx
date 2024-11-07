import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import { useAuth } from "../providers/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { jsPDF } from "jspdf";

const MovimientoList = ({ mensaje, setMensaje, error, setError }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [listCopia, setListCopia] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7); // Número de elementos por página
  const [totalPages, setTotalPages] = useState(1);
  const [buscar, setBuscar] = useState(1);
  const [fechaLimiteEntrega, setFechaLimiteEntrega] = useState();

  const { user } = useAuth();
  const navigate = useNavigate();

  const path = window.location.pathname.split('/');
  const idExpediente = path[path.length - 1];


  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${user.type} ${user.token}` // Token de autorización
    }
  });

  const descargarReporte = (info) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    //80: la posición en el eje X (horizontal) donde se colocará la imagen, en puntos (pt).
    //10: la posición en el eje Y (vertical) donde se colocará la imagen, en puntos.
    //100: el ancho de la imagen en el PDF, en puntos.
    //25: el alto de la imagen en el PDF, en puntos.
    //doc.addImage('/public/img/ric.jpeg', 'JPEG', 105, 10, 100, 25);
    doc.addImage('/public/img/ric.jpeg', 'JPEG', 80, 10, 50, 25);

    // SALIDA DE EXPEDIENTE
    doc.setFont('helvetica', 'bold');
    doc.text("SALIDA DE EXPEDIENTE: ", 10, 50);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor("#0000FF"); // Azul para datos generados por info
    doc.text(`CCC ${info.expediente.departamentoId < 100 ? '0' + info.expediente.departamentoId : info.expediente.departamentoId}-${info.expediente.municipioId < 100 ? '0' + info.expediente.municipioId : info.expediente.municipioId}-${info.expediente.poligono}-${info.expediente.predio}`, 97, 50);

    doc.setTextColor("#000"); // Negro para etiquetas
    doc.setFont('helvetica', 'bold');
    doc.text("Nombre de quién entrega:", 10, 70);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor("#0000FF"); // Azul para datos generados por info
    doc.text(info.usuario.nombre, 90, 70);

    doc.setTextColor("#000");
    doc.setFont('helvetica', 'bold');
    doc.text("Firma de quién entrega:", 10, 80);
    doc.setFont('helvetica', 'normal');
    doc.text("_______________________________", 84, 80);

    doc.setFont('helvetica', 'bold');
    doc.text("Nombre de quién recibe:", 10, 95);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor("#0000FF");
    doc.text(info.usuario_destino.nombre, 87, 95);

    doc.setTextColor("#000");
    doc.setFont('helvetica', 'bold');
    doc.text("Firma de quién recibe:", 10, 105);
    doc.setFont('helvetica', 'normal');
    doc.text("_______________________________", 84, 105);

    doc.setFont('helvetica', 'bold');
    doc.text("Fecha de Salida:", 10, 120);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor("#0000FF");
    doc.text(new Date(info.fechaSalida).toLocaleDateString("es-ES"), 65, 120);

    doc.setTextColor("#000");
    doc.setFont('helvetica', 'bold');
    doc.text("Fecha de límite de devolución: ", 10, 130);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor("#0000FF");
    doc.text(new Date(info.fechaLimite).toLocaleDateString("es-ES"), 103, 130);

    // DEVOLUCIÓN DE EXPEDIENTE
    doc.setTextColor("#000");
    doc.setFont('helvetica', 'bold');
    doc.text("DEVOLUCIÓN DE EXPEDIENTE: ", 10, 150);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor("#0000FF");
    doc.text(`CCC ${info.expediente.departamentoId < 100 ? '0' + info.expediente.departamentoId : info.expediente.departamentoId}-${info.expediente.municipioId < 100 ? '0' + info.expediente.municipioId : info.expediente.municipioId}-${info.expediente.poligono}-${info.expediente.predio}`, 107, 150);

    doc.setTextColor("#000");
    doc.setFont('helvetica', 'bold');
    doc.text("Nombre de quién devuelve: ", 10, 170);
    doc.setTextColor("#f9f9f9");
    doc.setFont('helvetica', 'normal');
    
    doc.setTextColor("#000");
    doc.text("_____________________________", 90, 170);

    doc.setFont('helvetica', 'bold');
    doc.text("Firma de quién devuelve: ", 10, 180);
    doc.setTextColor("#f9f9f9");
    doc.setFont('helvetica', 'normal');
    
    doc.setTextColor("#000");
    doc.text("_____________________________", 90, 180);

    doc.setFont('helvetica', 'bold');
    doc.text("Nombre de quién recibe:", 10, 200);
    doc.setTextColor("#f9f9f9");
    doc.setFont('helvetica', 'normal');

    doc.setTextColor("#000");
    doc.text("_____________________________", 90, 200);

    doc.setFont('helvetica', 'bold');
    doc.text("Firma de quién recibe:", 10, 210);
    doc.setTextColor("#f9f9f9");
    doc.setFont('helvetica', 'normal');
   
    doc.setTextColor("#000");
    doc.text("_____________________________", 90, 210);

    //FECHA DEVOLUCIÓN
    doc.setFont('helvetica', 'bold');
    doc.text("Fecha de Devolución:", 10, 230);
    doc.setFont('helvetica', 'normal');
    if (info.createdAt != info.updatedAt) {
        doc.setTextColor("#0000FF");
        doc.text(new Date(info.updatedAt).toLocaleDateString("es-ES"), 78, 230);
    } else {
        doc.setTextColor("#f9f9f9");
        doc.text(":::::: Pendiente ::::::", 88, 230);
        doc.setTextColor("#000");
        doc.text("__________________________", 78, 230);
    }

    // Fecha y hora de generación
    doc.setFontSize(9);
    doc.setTextColor("#ccc");
    doc.setFont('helvetica', 'normal');
    doc.text("Fecha y hora de generación:", 10, 260);

    // Convertir fecha a la zona horaria de Guatemala
    const fechaGeneracion = new Date().toLocaleString("es-ES", { timeZone: "America/Guatemala" });
    doc.text(fechaGeneracion.substring(0, 16), 51, 260);

    doc.text("Generado por el usuario:", 100, 260);
  
    doc.text(info.usuario.nombre, 136, 260);

    doc.save(`Salida_expediente_${info.id}_${info.expedienteId}_${new Date().getTime()}.pdf`);
}




  /*
  const entregar = async (expe) => {
    setMensaje("");
    setError("");

    setLoading(true);

    try {
      // Actualizar el registro de movimiento
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/movimientos/${expe.id}`,
        {
          updated_at: new Date().toISOString().replace("T", ' ').substring(0, 19),
        }
      );


      if (response.status === 200) {
        // Obtener información del expediente
        const expedienteResponse = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/expedientes/${expe.expedienteId}`);
        const expedienteInfo = expedienteResponse.data;

        //const mensaje = `El expediente con el CCC:  ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo.`;

        // Verificar la fecha de devolución
        const fechaDevolucion = new Date(expe.fecha_entrega);
        const fechaActual = new Date(expe.updated_at);

        let mensaje = '';

        if (fechaDevolucion > fechaActual) {
          mensaje = `El expediente con el CCC:  ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo. con atraso.`;
        } else {
          mensaje = `El expediente con el CCC:  ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo.`;
        }





        // Enviar notificación
        const response2 = await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/notificaciones`,
          {
            usuario_id: user.user.id,
            mensaje: mensaje
          }
        );



        if (response2.status === 201) {
          toast.success("Expediente devuelto con éxito!!");
          navigate('/home')
        }
      }
      setLoading(false);
      setError();
    } catch (error) {
      console.log(error)
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
  */


  /*
  const formatearFecha = (fecha) => {
    const fechaAjustada = new Date(fecha);
    fechaAjustada.setHours(fechaAjustada.getHours() - 6); // Sumar 6 horas
  
    return fechaAjustada.toLocaleString('es-GT', {
      timeZone: 'America/Guatemala',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Para formato de 24 horas
    }).replace(',', ''); // Eliminar la coma
  };
  */


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
   const entregar = async (expe) => {
     setMensaje("");
     setError("");
     setLoading(true);
   
     try {
       // Obtener información del expediente
       const expedienteResponse = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/expedientes/${expe.expedienteId}`);
       const expedienteInfo = expedienteResponse.data;
   
       // Obtener la fecha de devolución del expediente
       const fechaDevolucion = new Date(expe.fecha_entrega); // Fecha límite para la devolución
   
       // Actualizar el registro de movimiento
       const response = await axiosInstance.put(
         `${import.meta.env.VITE_API_URL}/movimientos/${expe.id}`,
         {          
           fecha_entrega: formatearFecha(new Date()),         
           updated_at: formatearFecha(new Date()),
         }
       );
   
       if (response.status === 200) {
         // Obtener la nueva fecha de actualización
         const nuevaFechaActualizacion = new Date();
   
         // Verificar la fecha de devolución
         let mensaje = '';
   
         if (fechaLimiteEntrega < nuevaFechaActualizacion) {
           mensaje = `El expediente con el CCC: ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo con atraso.`;
         } else {
           mensaje = `El expediente con el CCC: ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo.`;
         }
   
         // Enviar notificación
         const response2 = await axiosInstance.post(
           `${import.meta.env.VITE_API_URL}/notificaciones`,
           {
             usuario_id: user.user.id,
             mensaje: mensaje
           }
         );
   
         if (response2.status === 201) {
           toast.success("Expediente devuelto con éxito!!");
           navigate('/home');
         }
       }
       setLoading(false);
       setError();
     } catch (error) {
       console.log(error);
       if (error.response && error.response.status === 400) {
         toast.error("Ya existe el expediente");
       } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
         setError("Error inesperado");
       } else if (error.response && error.response.status >= 500) {
         setError("Error del servidor");
       }
       setLoading(false);
     }
   
     if (!error) {
       const closeButtonElement = document.getElementById("cerrarModal");
       if (closeButtonElement) {
         closeButtonElement.click();
       }
     }
   };
   */

  /*
    const entregar = async (expe) => {
      setMensaje("");
      setError("");
      setLoading(true);
    
      try {
        // Obtener información del expediente, incluyendo la fecha límite de entrega
        const expedienteResponse = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/expedientes/${expe.expedienteId}`);
        const expedienteInfo = expedienteResponse.data;
    
        // Convertir la fecha límite de entrega desde los datos del expediente
        const fechaLimiteEntrega = new Date(expedienteInfo.fecha_limite); // Asumiendo que expedienteInfo.fecha_limite contiene la fecha límite
        
        // Obtener la hora de entrega actual (fecha y hora de entrega real)
        const fechaEntregaReal = new Date();
    
        // Actualizar el registro de movimiento
        const response = await axiosInstance.put(
          `${import.meta.env.VITE_API_URL}/movimientos/${expe.id}`,
          {          
            fecha_entrega: formatearFecha(fechaEntregaReal),         
            updated_at: formatearFecha(fechaEntregaReal),
          }
        );
    
        if (response.status === 200) {
          // Verificar si la entrega fue a tiempo o con atraso
          let mensaje = '';
    
          if (fechaLimiteEntrega < fechaEntregaReal  ) {
            // Entrega con atraso
            mensaje = `El expediente con el CCC: ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo con atraso.`;
          } else {
            // Entrega a tiempo
            mensaje = `El expediente con el CCC: ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo a tiempo.`;
          }
    
          // Enviar notificación
          const response2 = await axiosInstance.post(
            `${import.meta.env.VITE_API_URL}/notificaciones`,
            {
              usuario_id: user.user.id,
              mensaje: mensaje
            }
          );
    
          if (response2.status === 201) {
            toast.success("Expediente devuelto con éxito!!");
            navigate('/home');
          }
        }
        setLoading(false);
        setError();
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          toast.error("Ya existe el expediente");
        } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
          setError("Error inesperado");
        } else if (error.response && error.response.status >= 500) {
          setError("Error del servidor");
        }
        setLoading(false);
      }
    
      if (!error) {
        const closeButtonElement = document.getElementById("cerrarModal");
        if (closeButtonElement) {
          closeButtonElement.click();
        }
      }
  };
  */

  /*
  const entregar = async (expe) => {
    setMensaje("");
    setError("");
    setLoading(true);
  
    try {
      // Obtener información del expediente, incluyendo la fecha límite de entrega
      const expedienteResponse = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/expedientes/${expe.expedienteId}`);
      const expedienteInfo = expedienteResponse.data;
  
      // Convertir la fecha límite de entrega desde los datos del expediente
      const fechaLimiteEntrega = new Date(expedienteInfo.fecha_limite); // Asumiendo que expedienteInfo.fecha_limite contiene la fecha límite
      
      // Obtener la hora de entrega actual (fecha y hora de entrega real)
      const fechaEntregaReal = new Date();
  
      // Actualizar el registro de movimiento
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/movimientos/${expe.id}`,
        {          
          fecha_entrega: formatearFecha(fechaEntregaReal),         
          updated_at: formatearFecha(fechaEntregaReal),
        }
      );
  
      if (response.status === 200) {
        // Verificar si la entrega fue a tiempo o con atraso
        let mensaje = '';
  
        // Comparar las fechas usando getTime() para comparar en milisegundos
        if (fechaEntregaReal.getTime() > fechaLimiteEntrega.getTime()) {
          // Entrega con atraso
          mensaje = `El expediente con el CCC: ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo con atraso.`;
        } else {
          // Entrega a tiempo
          mensaje = `El expediente con el CCC: ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo a tiempo.`;
        }
  
        // Enviar notificación
        const response2 = await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/notificaciones`,
          {
            usuario_id: user.user.id,
            mensaje: mensaje
          }
        );
  
        if (response2.status === 201) {
          toast.success("Expediente devuelto con éxito!!");
          navigate('/home');
        }
      }
      setLoading(false);
      setError();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        toast.error("Ya existe el expediente");
      } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setError("Error inesperado");
      } else if (error.response && error.response.status >= 500) {
        setError("Error del servidor");
      }
      setLoading(false);
    }
  
    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };
  */


  const entregar = async (expe) => {
    setMensaje("");
    setError("");
    setLoading(true);

    try {
      // Obtener información del expediente, incluyendo la fecha límite de entrega
      const expedienteResponse = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/expedientes/${expe.expedienteId}`);
      const expedienteInfo = expedienteResponse.data;

      // Convertir la fecha límite de entrega desde los datos del expediente
      const fechaLimiteEntrega = new Date(expedienteInfo.fecha_limite);

      // Obtener la hora de entrega actual (fecha y hora de entrega real)
      let fechaEntregaReal = new Date();

      // Ajustar la fecha de entrega real restando 6 horas (si el servidor tiene un desfase)
      //fechaEntregaReal.setHours(fechaEntregaReal.getHours());

      // Actualizar el registro de movimiento
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/movimientos/${expe.id}`,
        {
          fecha_entrega: formatearFecha(fechaEntregaReal),
          updated_at: formatearFecha(fechaEntregaReal),
        }
      );

      if (response.status === 200) {
        // Verificar si la entrega fue a tiempo o con atraso
        let mensaje = '';

        // Comparar las fechas
        if (fechaLimiteEntrega < fechaEntregaReal) {


          mensaje = `El expediente con el CCC: ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo at.`;
        } else {

          mensaje = `El expediente con el CCC: ${expedienteInfo.departamentoId}-${expedienteInfo.municipioId}-${expedienteInfo.poligono}-${expedienteInfo.predio} fue devuelto al Depto de Archivo.`;

        }

        // Enviar notificación
        const response2 = await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/notificaciones`,
          {
            usuario_id: user.user.id,
            mensaje: mensaje
          }
        );

        if (response2.status === 201) {
          toast.success("Expediente devuelto con éxito!!");
          navigate('/home');
        }
      }
      setLoading(false);
      setError();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        toast.error("Ya existe el expediente");
      } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
        setError("Error inesperado");
      } else if (error.response && error.response.status >= 500) {
        setError("Error del servidor");
      }
      setLoading(false);
    }

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };



  useEffect(() => {
    const getList = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/movimientos/${idExpediente}`,
          {
            headers: {
              Authorization: `${user.type} ${user.token}`
            }
          }
        );
        // Handle successful login
        console.log("successful!", response.data);
        setList(response.data);
        setListCopia(response.data);
        setTotalPages(Math.ceil(response.data.length / perPage));

        setLoading(false);
      } catch (error) {
        console.error("failed:", error);
        if (error.status >= 400 && error.status < 500) {
          setError("No se puede.");
        }
        //setError(error.message);
        setLoading(false);
        //console.log(error.response.status);
      }
    };

    getList();
  }, [perPage]);

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular el índice inicial y final de la página actual
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;


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
              <th className="text-truncate">Realizado por</th>
              <th className="text-truncate">Responsable</th>
              <th className="text-truncate">Salida</th>
              <th className="text-truncate">Límite</th>
              <th className="text-truncate">Entrega</th>
              <th className="text-truncate">Estado</th>
            </tr>

          </thead>
          <tbody>
            {loading ?
              <tr>
                <td colSpan="5" className="text-center">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
              : list.slice(startIndex, endIndex).map(item => {
                const fechaLimiteDate = new Date(item.fechaLimite);
                const fechaEntregaDate = new Date(item.fechaEntrega);
                const fechaActualizacionDate = new Date(item.updatedAt);
                const fechaCreacionDate = new Date(item.createdAt);
                const fechaActualDate = new Date();
                return (
                  <tr>
                    <td>

                      <h6 className="mb-0 text-truncate">
                        {item.usuario.nombre}
                      </h6>
                      <small className="text-truncate">{item.usuario?.rol.nombre}</small>


                    </td>
                    <td>
                      <div>
                        <h6 className="mb-0 text-truncate">
                          {item.usuario_destino.nombre}
                        </h6>
                        <small className="text-truncate">{item.usuario_destino?.rol.nombre}</small>
                      </div>

                    </td>
                    <td>{item.fechaSalida.replace("T", ' ').substring(0, 16)}</td>
                    <td className="text-truncate">

                      <span
                        className={`text-${item.updatedAt === item.createdAt && fechaLimiteDate.getTime() < fechaActualDate.getTime() ? "danger" : ""
                          }`}
                      >
                        {item.fechaLimite.replace("T", ' ').substring(0, 16)}

                      </span>


                    </td>


                    <td className="text-truncate">

                      {item.updatedAt != item.createdAt && item?.fechaEntrega?.replace("T", ' ').substring(0, 16)}

                      {item.updatedAt === item.createdAt && <button className={`btn btn-warning badge bg-label-warningrounded-pill p-3 m-1`} disabled={loading} onClick={() => entregar(item)}>
                        <i class="menu-icon tf-icons mdi mdi-arrow-left-bold-circle"></i> Devolver
                      </button>}

                    </td>

                    <td>
                      <a title="Descargar reporte/Acta" href="javascript:;" onClick={() => {
                        descargarReporte(item)
                      }}
                        className={`badge bg-label-${item.updatedAt === item.createdAt ? "warning" : "success"
                          } rounded-pill`}
                      >
                        {item.updatedAt === item.createdAt ? 'Pendiente' : 'En Archivo'} <i class="menu-icon tf-icons mdi mdi-download-outline"></i>

                      </a>

                    </td>

                  </tr>
                );
              })}
            <tr>
              <td colSpan={5}>
                <div>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                    <button className={`btn badge bg-label-${pageNumber === currentPage ? "warning" : "secondary"
                      } rounded-pill p-3 m-1`} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>

                      {pageNumber}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default MovimientoList;