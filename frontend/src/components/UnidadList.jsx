import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import toast from "react-hot-toast";

const UnidadList = ({ user, unidadList, setMensaje, getUnidades, deoartamento, setUnidad, setEditing, loading, setLoading, error, setError }) => {
  const [unidades, setUnidades] = useState([]);



  const [nombre, setNombre] = useState();


  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.type} ${user.token}`, // Token de autorización
    },
  });


  const deleteUnidad = async (id) => {
    setLoading(true);

    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/unidades/${id}`);
      getUnidades();
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





  const deleteConfirm = async (unidad) => {
    if (confirm("Realmente quiere eliminar a " + unidad.nombre + "??")) {
      await deleteUnidad(unidad.id);
      toast.success("Registro Eliminado!!")
      setTimeout(() => {
        window.location.reload()
      }, 1500);
      getUnidades();
    }
  }










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
              <th className="text-truncate">Nombre</th>

              <th className="text-truncate">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {unidadList.map((item) => {
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
                    <button
                      type="button"
                      className={`btn rounded-pill m-1 ${item.nombre === 'Petén' ? 'btn-secondary' : 'btn-info'}`}
                      onClick={() => {
                        if (item.nombre !== 'Petén') {
                          setUnidad(item);
                          setEditing(true);
                        }
                      }}
                      disabled={item.nombre === 'Petén'} // Desactiva el botón si el depto es PETÉN
                      style={{ cursor: item.nombre === 'Petén' ? 'not-allowed' : 'pointer' }} // Cambia el cursor para indicar que está desactivado
                    >
                      <i className="bx bx-edit"></i>
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

export default UnidadList;
