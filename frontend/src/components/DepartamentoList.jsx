import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import toast from "react-hot-toast";

const DepartamentoList = ({ user,departamentoList,setMensaje, getDepartamentos,deoartamento,setDepartamento,setEditing, loading,setLoading,error,setError,deleteDepartamento }) => {
  const [departamentos, setDepartamentos] = useState([]);

 

  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [estado, setEstado] = useState();
  
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.type} ${user.token}`, // Token de autorización
    },
  });
  
  
 
 

  const deleteConfirm = async (info) => {
    if (confirm("Realmente quiere eliminar a "+info.id+"??")) {
      await deleteDepartamento(info);
      //getUsers();
    } 
    
  }



//Última modificacion 04/10/2024 10:30 am
const activarInactivar = async (departamento) => {
  if (departamento?.nombre === "Petén") {
    console.warn("No se puede inactivar el depto.");
    toast.error("El depto. no puede ser inactivado.");
    return;
  }

  setLoading(true);

  try {
    const nuevoEstado = departamento.estado === "INACTIVO" ? "ACTIVO" : "INACTIVO";
    const departamentoActualizado = { ...departamento, estado: nuevoEstado };

    const response = await axiosInstance.put(`/departamentos/${departamento.id}`, departamentoActualizado);

    if (response.status === 200) {
      console.log(departamentoActualizado, response.data);
      toast.success(`Departamento ${nuevoEstado.toLowerCase()} con éxito!!`);
      getDepartamentos();  // Actualizar la lista de departamentos
    } else {
      toast.error("No se pudo actualizar el departamento. Intenta nuevamente.");
    }
  } catch (error) {
    console.error("Error en la operación:", error);
    toast.error(`Error: ${error.response?.data?.message || 'Error inesperado'}`);
  } finally {
    setLoading(false);
  }
};


  
  



  




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
              <th className="text-truncate">Nombre</th>
              
              <th className="text-truncate">Estado</th>
          
              <th className="text-truncate">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {departamentoList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0 text-truncate">{item.nombre}</h6>
                      </div>
                    </div>
                  </td>
                                    
                  <td>
                      {item.estado}
                  </td>
                 
                  <td>
                    <button
                      type="button"
                      className={`btn rounded-pill m-1 ${item.nombre === 'Petén' ? 'btn-secondary' : 'btn-info'}`}
                      onClick={() => {
                        if (item.nombre !== 'Petén') {
                          setDepartamento(item);
                          setEditing(true);
                        }
                      }}
                      disabled={item.nombre === 'Petén'} // Desactiva el botón si el depto es PETÉN
                      style={{ cursor: item.nombre === 'Petén' ? 'not-allowed' : 'pointer' }} // Cambia el cursor para indicar que está desactivado
                    >
                      <i className="bx bx-edit"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => activarInactivar(item)}  // Llamada a la función activarInactivar
                      className={`btn rounded-pill btn-${item.estado === "ACTIVO" ? "warning" : "success"}`}
                      disabled={item.nombre === "Petén"}  // Desactivar el botón para el Petén 
                      title={item.nombre === "Petén" ? "El depto. no puede ser inactivado" : (item.estado === "ACTIVO" ? "Inactivar" : "Activar")}
                      style={{ cursor: item.nombre === 'Petén' ? 'not-allowed' : 'pointer' }}  // Cambiar el cursor cuando está desactivado
                    >
                      <i className={`bx bx-${item.estado === "ACTIVO" ? "block" : "check"}`} />
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
          
        </div>
        </form>
      </div>
    </div>
  );
};

export default DepartamentoList;
