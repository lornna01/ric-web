import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import toast from "react-hot-toast";

const NotificacionesList = ({ user, getNotificaciones, notificacionesList, setMensaje, getVehiculos, vehiculo, setVehiculo, setEditing, loading, setLoading, error, setError, deleteVehiculo }) => {



  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.type} ${user.token}`, // Token de autorización
    },
  });




  const visto = async (item) => {
    const response2 = await axiosInstance.put(
      `${import.meta.env.VITE_API_URL}/notificaciones/${item.id}`,
      {
        visto: true
      }
    );
    getNotificaciones()

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
              <th className="text-truncate">Notificación</th>

              <th className="text-truncate">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {notificacionesList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0 text-truncate">
                          {!item.visto ? <strong>{item.mensaje}</strong> : item.mensaje}
                        </h6>
                        <small className="text-truncate">{item.email}</small>
                      </div>
                    </div>
                  </td>

                  <td>


                    {item.visto ? <small className="text-truncate">Leído</small> : <button
                      title="Marcar como visto"
                      onClick={() => {
                        visto(item)
                      }}
                      disabled={item.visto}
                      type="button"
                      className="btn rounded-pill btn-success m-1"
                    >
                      <i className="bx bx-check"></i>
                    </button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Modal 1*/}

    </div>
  );
};

export default NotificacionesList;
