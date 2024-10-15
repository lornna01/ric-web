import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import toast from "react-hot-toast";

const EstadoExpedienteList = ({ user,estadoExpedienteList,setMensaje,estadoExpediente,setEstadoExpediente,setEditing, loading,setLoading,error,setError }) => {
  
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
    if (!nombre) {
      toast.error("Ingrese el nombre");
      return;
    } 

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/estado_expedientes`,
        {
          usuario_id: user?.user?.id,
          nombre
        }
      );
      

      if (response.status === 201) {
        toast.success("Estado cread con éxito!!")
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

  
/*
  const deleteConfirm = async (vehi) => {
    if (confirm("Realmente quiere eliminar a "+vehi.placa+"??")) {
      await deleteVehiculo(vehi);
      //getUsers();
    } 
    
  }
*/






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
            {estadoExpedienteList.map((item) => {
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
                      className="btn rounded-pill btn-info m-1"
                      onClick={() => {
                        setEstadoExpediente(item)
                        setEditing(true)
                      }}
                    >
                      <i className="bx bx-edit"></i>
                    </button>
                    
                    
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

export default EstadoExpedienteList;
