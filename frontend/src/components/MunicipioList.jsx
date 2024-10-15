import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import toast from "react-hot-toast";

const MunicipioList = ({ user,municipioList,setMensaje, getMunicipios,municipio,setMunicipio,setEditing, loading,setLoading,error,setError,deleteMunicipio }) => {
  const [departamentos, setDepartamentos] = useState([]);


  const [nombre, setNombre] = useState();

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
      await deleteMunicipio(info);
      //getUsers();
    } 
    
  }
 

  const getDepartamentos = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/departamentos`,
        {
          headers: {
            Authorization: `${user.type} ${user.token}`
          }
        }
      );
      // Handle successful login
      console.log("successful!", response.data);
      setDepartamentos(response.data.data);

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
    getDepartamentos();
  }, []);


  const activarInactivar = async (municipio) => {
    if (municipio.departamento?.nombre === "Petén") {  // Verificar el nombre del departamento
      console.warn("No se puede inactivar los municipios de Petén");
      return;  // Bloquear la acción si el departamento es Petén
    }
  
    setLoading(true);
  
    try {
      const nuevoEstado = municipio.estado === "INACTIVO" ? "ACTIVO" : "INACTIVO";
      const municipioActualizado = { ...municipio, estado: nuevoEstado };
  
      const response = await axiosInstance.put(`${import.meta.env.VITE_API_URL}/municipios/${municipio.id}`, municipioActualizado);
  
      console.log(municipioActualizado, response.data);
  
      setLoading(false);
      getMunicipios();  // Actualizar la lista de municipios
    } catch (error) {
      console.error("Error en la operación:", error);
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
              <th className="text-truncate">Departamento</th>
              
              <th className="text-truncate">Estado</th>
          
              <th className="text-truncate">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {municipioList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0 text-truncate">{item.nombre}</h6>
                      </div>
                    </div>
                  </td>
                  <td className="text-truncate">
                    <i className="mdi mdi-laptop mdi-24px text-danger me-1" />{" "}
                    {item.departamento?.nombre}
                  </td>
                   
                  <td>
                      {item.estado}
                  </td>

                  <td>
                    <button
                      type="button"
                      className={`btn rounded-pill m-1 ${item.departamento?.nombre === 'Petén' ? 'btn-secondary' : 'btn-info'}`}
                      onClick={() => {
                        if (item.departamento?.nombre !== 'Petén') {
                          setMunicipio(item);
                          setEditing(true);
                        }
                      }}
                      disabled={item.departamento?.nombre === 'Petén'}  // Desactiva el botón si el departamento es Petén
                      style={{ cursor: item.departamento?.nombre === 'Petén' ? 'not-allowed' : 'pointer' }}  // Cambia el cursor para indicar que está desactivado
                    >
                      <i className="bx bx-edit"></i>
                    </button>

                    <button
                      disabled={item.departamento?.nombre === "Petén"}  // Deshabilitar para municipios de Petén
                      title={`${item.departamento?.nombre === "Petén" ? "Los municipios de Petén no pueden ser inactivados" : (item.estado === "ACTIVO" ? "Desactivar Muni" : "Activar Muni")}`}
                      type="button"
                      onClick={() => activarInactivar(item)}
                      className={`btn rounded-pill btn-${item.estado === "ACTIVO" ? "warning" : "success"} ${item.departamento?.nombre === "Petén" ? "btn-secondary" : ""}`}
                      style={{ cursor: item.departamento?.nombre === 'Petén' ? 'not-allowed' : 'pointer' }}  // Cambia el cursor para indicar que está desactivado
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

export default MunicipioList;
