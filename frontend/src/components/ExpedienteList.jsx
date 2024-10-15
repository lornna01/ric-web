import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import { useAuth } from "../providers/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const ExpedienteList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [listCopia, setListCopia] = useState([]);
  const [error, setError] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7); // Número de elementos por página
  const [totalPages, setTotalPages] = useState(1);
  const [buscar, setBuscar] = useState(1);

  const { user } = useAuth();
  const navigate = useNavigate();
  

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`${user.type} ${user.token}` // Token de autorización
    }
  });

  const buscarCCC = async() => {
    
      if (buscar) {
        const itemsFiltrados = list.filter(item => {
          const departamentoId = item.departamentoId < 100 ? '0' + item.departamentoId : item.departamentoId;
          const municipioId = item.municipioId < 100 ? '0' + item.municipioId : item.municipioId;
          const concatenacion = `${departamentoId}-${municipioId}-${item.poligono}-${item.predio}`;
          
          return concatenacion.includes(buscar);
        });
        setList(itemsFiltrados)
      } else {
        setList(listCopia)
        toast.error("Ingrese el CCC")
      }
    
  }

  
 

  

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
  
      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/expedientes`,
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
              <td colSpan={5}>
              <div className="nav-item d-flex align-items-center">
                    <i className="mdi mdi-magnify mdi-24px lh-0" />
                    <input
                    type="text"
                    className="form-control border-0 shadow-none bg-body"
                    placeholder="Buscar expediente..."
                    aria-label="Search..."
                    onChange={(e) => setBuscar(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        buscarCCC()
                      }
                    }}
                
                    />
                    <button type="submit" className="mdi mdi-magnify btn btn btn-primary mx-3" onClick={buscarCCC} >Buscar </button>
                  </div>
              </td>
            </tr>
            <tr>
              <th>CCC</th>
              <th className="text-truncate">Titular</th>
              <th className="text-truncate">Usuario</th>
              <th className="text-truncate">Área</th>
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
              return (
                <tr style={{ cursor:"pointer" }}  key={item.id} onClick={() => {
                  navigate(`/expedientes/${item.id}`)
              }}>
                  <td className="d-flex align-items-center">
                  <div>
                      <h6 className="mb-0 text-truncate">
                      {item.departamentoId < 100 ? '0' + item.departamentoId : item.departamentoId}-
                        {item.municipioId<100?'0'+item.municipioId:item.municipioId}-
                        {item.poligono}-
                        {item.predio}
                        </h6>
                        <small className="text-truncate">{item.municipio?.nombre} / {item.departamento?.nombre}</small>
                      </div>
                      
                  </td>
                  <td>{item.titular}</td>
                  <td className="text-truncate">
                  <span
                      className={`badge bg-label-success rounded-pill`}
                    >
                    <i className="bx bx-user text-danger me-1" />{" "}
                      {item.usuario.nombre}
                      </span>
                  </td>
                 
                  <td>
                    <span
                      className={`badge bg-label-${item.usuario.rol.nombre === "ADMINISTRADOR" 
                        ? "warning" 
                        : item.usuario.rol.nombre === "TECNICO-ARCHIVO" 
                          ? "info"
                          : "secondary"
                      } rounded-pill`}
                    >
                      {item.usuario.rol.nombre}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge bg-label-${item.estado.nombre === "COMPLETO"
                          ? "success"
                          : item.estado.nombre === "EN REVISIÓN"
                            ? "info"
                            : "secondary"
                        } rounded-pill`}
                    >
                      {item.estado.nombre}
                    </span>


                  </td>
                </tr>
              );
              })}
            <tr>
              <td colSpan={5}>
              <div>
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                        <button className={`btn badge bg-label-${
                          pageNumber === currentPage ? "warning" : "secondary"
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

export default ExpedienteList;
