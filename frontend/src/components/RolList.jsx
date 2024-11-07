import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import toast from "react-hot-toast";

const RolList = ({ user, rolList, setMensaje, getRoles, rol, setRol, setEditing, loading, setLoading, error, setError }) => {
  const [roles, setRoles] = useState([]);


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







  //Última modificacion 04/10/2024 10:30 am
  /*  
  const activarInactivar = async (rol) => {
      if (rol?.nombre === "ADMINISTRADOR") {
        console.warn("No se puede inactivar el rol ADMINISTRADOR");
        toast.error("El rol ADMINISTRADOR no puede ser inactivado.");
        return;
      }
  
      setLoading(true);
  
      try {
        const nuevoEstado = rol.estado === "INACTIVO" ? "ACTIVO" : "INACTIVO";
        const rolActualizado = { ...rol, estado: nuevoEstado };
  
        const response = await axiosInstance.put(`/roles/${rol.nombre}`, rolActualizado);
  
        console.log(rolActualizado, response.data);
  
        setLoading(false);
        getRoles();  // Actualizar la lista de roles
      } catch (error) {
        // Mostrar información detallada del error
        console.error("Error en la operación:", error);
        toast.error(`Error: ${error.response?.data?.message || 'Error inesperado'}`);
        setLoading(false);
      }
    };
  */

  const activarInactivar = async (rol) => {
    if (rol?.nombre === "ADMINISTRADOR") {
      console.warn("No se puede inactivar el rol ADMINISTRADOR");
      toast.error("El rol ADMINISTRADOR no puede ser inactivado.");
      return;
    }

    setLoading(true);

    try {
      const nuevoEstado = rol.estado === "INACTIVO" ? "ACTIVO" : "INACTIVO";
      const rolActualizado = { ...rol, estado: nuevoEstado };

      const response = await axiosInstance.put(`/roles/${rol.id}`, rolActualizado);

      if (response.status === 200) {
        toast.success(`Rol ${nuevoEstado.toLowerCase()} con éxito!!`);
        getRoles();  // Actualizar la lista de roles
      } else {
        toast.error("No se pudo actualizar el rol. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error en la operación:", error);
      toast.error(`Error: ${error.response?.data?.message || 'Error inesperado'}`);
    } finally {
      setLoading(false);
    }
  };





  const deleteRol = async (id) => {
    setLoading(true);

    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/roles/${id}`);
      getRoles();
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response.status >= 400 && error.response.status < 500) {
        setError("No se logró eliminar.");
      }
      setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
  };





  const deleteConfirm = async (rol) => {
    if (confirm("Realmente quiere eliminar a " + rol.nombre + "??")) {
      await deleteRol(rol.id);
      toast.success("Registro Eliminado!!")
      setTimeout(() => {
        window.location.reload()
      }, 1500);
      getRoles();
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
              <th className="text-truncate">Nombre</th>
              <th className="text-truncate">Descripcion</th>

              <th className="text-truncate">Estado</th>

              <th className="text-truncate">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {rolList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0 text-truncate">{item.nombre}</h6>
                      </div>
                    </div>
                  </td>
                  <td className="text-truncate">{item.descripcion}</td>

                  <td>
                    {item.estado}
                  </td>

                  <td>
                    <button
                      type="button"
                      className={`btn rounded-pill m-1 ${item.nombre === 'ADMINISTRADOR' ? 'btn-secondary' : 'btn-info'}`}
                      onClick={() => {
                        if (item.nombre !== 'ADMINISTRADOR') {
                          setRol(item);
                          setEditing(true);
                        }
                      }}
                      disabled={item.nombre === 'ADMINISTRADOR'} // Desactiva el botón si el rol es ADMINISTRADOR
                      style={{ cursor: item.nombre === 'ADMINISTRADOR' ? 'not-allowed' : 'pointer' }} // Cambia el cursor para indicar que está desactivado
                    >
                      <i className="bx bx-edit"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => activarInactivar(item)}  // Llamada a la función activarInactivar
                      className={`btn rounded-pill btn-${item.estado === "ACTIVO" ? "warning" : "success"}`}
                      disabled={item.nombre === "ADMINISTRADOR"}  // Desactivar el botón para el rol ADMINISTRADOR
                      title={item.nombre === "ADMINISTRADOR" ? "El rol ADMINISTRADOR no puede ser inactivado" : (item.estado === "ACTIVO" ? "Inactivar rol" : "Activar rol")}
                      style={{ cursor: item.nombre === 'ADMINISTRADOR' ? 'not-allowed' : 'pointer' }}  // Cambiar el cursor cuando está desactivado
                    >
                      <i className={`bx bx-${item.estado === "ACTIVO" ? "block" : "check"}`} />
                    </button>


                    <button
                      onClick={() => {
                        deleteConfirm(item)
                      }}
                      disabled={item.nombre === 'Petén'}
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

          </div>
        </form>
      </div>
    </div>
  );
};

export default RolList;
