import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthContextProvider";
import axios from "axios";
import { API_URL_AUTH } from "../services/auth/authConstants";
import "./Home.css";
import UserList from "../components/UserList";
import MenuLateral from "../components/MenuLateral";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ExpedienteList from "../components/ExpedienteList";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();




  const [userList, setUserList] = useState([]);

  const [expedienteList, setExpedienteList] = useState([]);
  const [borradorList, setBorradorList] = useState([]);
  const [enRevisionList, setEnRevisionList] = useState([]);
  const [completosList, setCompletosList] = useState([]);

  const [persona, setPersona] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState();

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${user.type} ${user.token}` // Token de autorización
    }
  });

  const getUsers = async () => {
    setLoadingUsers(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/usuarios`,
        {
          headers: {
            Authorization: `${user.type} ${user.token}`
          }
        }
      );
      setUserList(response.data);
      //
      setLoadingUsers(false);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response.status >= 400 && error.response.status < 500) {
        setError("Usuario o contraseña incorrectos.");
      }
      //setError(error.message);
      setLoadingUsers(false);
      //console.log(error.response.status);
    }
  };
  const getExpedientes = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/expedientes`,
        {
          headers: {
            Authorization: `${user.type} ${user.token}`
          }
        }
      );
      await setExpedienteList(response.data);
      const comple = await response.data.filter(ex => ex.estado.nombre === 'COMPLETO');
      const revi = await response.data.filter(ex => ex.estado.nombre === 'EN REVISIÓN');
      const borra = await response.data.filter(ex => ex.estado.nombre === 'BORRADOR');
      await setCompletosList(comple)
      await setEnRevisionList(revi)
      await setBorradorList(borra)

      //
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response.status >= 400 && error.response.status < 500) {
        setError("Verificar.");
      }
      //setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
  };
  const saveUser = async (user, dpi) => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/usuarios`, {
        nombre: user.nombre,
        email: user.email,
        rol_id: user.id_rol,
        password: user.password,
        estado: user.estado,
        foto: user.foto,
      });
      console.log(response)

      if (response.status === 201) {
        const responsePersona = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/personas`,
          { name: user.nombre, dpi }
        );
        if (responsePersona.status == 201) {

          toast.success("Persona registrada")
          setError('');
        } else {
          toast.success('Error al guardar persona');
        }
        getUsers();
      }
      setLoading(false);
      setError();
    } catch (error) {
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
  };

  /*const updateUser = async (user, dpi) => {
    setLoading(true);

    let data = {
      nombre: user.nombre,
      email: user.email,
      dpi: user.dpi,
      rol_id: user.id_rol,
      estado: user.estado,
      foto: user.foto,
    }

    if (user.password) {
      data.password = user.password
    }

    try {
      const response = await axiosInstance.put(`${import.meta.env.VITE_API_URL}/usuarios/${user.id}`, data);
      console.log(response)

      setLoading(false);
      setError();
    } catch (error) {
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
  };
  */


  const update = async () => {
    if (contrasena != contrasena2) {
      setError("Contraseñas no coinciden")
      return;
    } else if(contrasena?.length < 3 && contrasena!="") {
      setError("La contraseña no es suficientemente segura");
    return;
    }
  
  const data = {
    
    email:correo,
    id_rol: idRol,
    nombre,
    estado,
    foto
  }
  if (contrasena) {
    data.password = contrasena
  }
  await update(data,dpi);
  //setTimeout(() => {
   // window.location.reload()
  //}, 1500);
  
}

  const savePersona = async (user) => {
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL_AUTH}/personas`, {
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        dpi: user.dpi,
        direccion: user.direccion,
        genero: user.genero,
        estado: user.estado,
      });

      // Handle successful login
      //console.log("Login successful!", response.data);
      user.id_persona = await response.data.id;
      await saveUser(user);
    } catch (error) {
      //console.error("Login failed:", error);
      if (error.response.status >= 400 && error.response.status < 500) {
        setError("Error guardando la persona.");
      }
      //setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);

    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/usuarios/${id}`);
      getUsers();
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
  useEffect(() => {
    getUsers();
    getExpedientes();
    if (editing) {

    }
  }, []);


  useEffect(() => {
    if (user.user.rol.nombre === "GERENTE") {
      navigate("/dashboard");
    }
  }, [user, navigate]);


  useEffect(() => {
    if (user.user.rol.nombre === "ASISTENTE-ADMINISTRATIVO") {
      navigate("/dashboard");
    }
  }, [user, navigate]);






  return (
    <>
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
                {/* Mostrar el contenido basado en el rol */}
                <div className="row my-4 text-center">
                  {/* Deposit / Withdraw */}
                  {/* Data Tables */}
                  {user.user.rol.nombre == "ADMINISTRADOR" && (
                    <div className="col-12">
                      {!loadingUsers ? <UserList
                        persona={persona}
                        setPersona={setPersona}
                        user={user}
                        getUsers={getUsers}
                        userList={userList}
                        savePersona={savePersona}
                        saveUser={saveUser}
                        update={update}
                        error={error}
                        setError={setError}
                        loading={loading}
                        setLoading={setLoading}
                        deleteUser={deleteUser}
                        editing={editing}
                        setEditing={setEditing}
                      /> : (<div className="spinner-grow text-success" role="status">
                      </div>)}
                    </div>
                  )}

                  {/*/ Data Tables */}
                </div>

                <div className="row my-4 text-center">
                  {/* Deposit / Withdraw */}
                  {/* Data Tables */}
                  {user.user.rol.nombre == "TECNICO-ARCHIVO" && (
                    <div className="col-12">
                      <ExpedienteList />
                    </div>

                  )}

                  {/*/ Data Tables */}

                  {user.user.rol.nombre == "TECNICO-ARCHIVO" && (
                    
                    <div className="row gy-4">
                    {/* Congratulations card */}
                    <div className="col-md-12 col-lg-4">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title mb-1">
                            Total expedientes 🚀!
                          </h4>
                          <h4 className="text-primary mb-1">{(expedienteList.length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h4>
                          <Link
                            to="/expedientes/nuevo"
                            className="btn btn-sm btn-primary waves-effect waves-light"
                          >
                            Registrar uno nuevo
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/*/ Congratulations card */}
                    {/* Transactions */}
                    <div className="col-lg-8">
                      <div className="card">
                        <div className="card-header">
                          <div className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title m-0 me-2">
                              Registro por estado
                            </h5>

                          </div>

                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4 col-6">
                              <div className="d-flex align-items-center">
                                <div className="avatar">
                                  <div className="avatar-initial bg-secondary rounded shadow">
                                    <i className="mdi mdi-trash-can mdi-24px" />
                                  </div>
                                </div>
                                <div className="ms-3">
                                  <div className="small mb-1">BORRADORES</div>
                                  <h5 className="mb-0">{(borradorList.length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 col-6">
                              <div className="d-flex align-items-center">
                                <div className="avatar">
                                  <div className="avatar-initial bg-info rounded shadow">
                                    <i className="mdi mdi-eye-outline mdi-24px" />
                                  </div>
                                </div>
                                <div className="ms-3">
                                  <div className="small mb-1">En Revisión</div>
                                  <h5 className="mb-0">{(enRevisionList.length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 col-6">
                              <div className="d-flex align-items-center">
                                <div className="avatar">
                                  <div className="avatar-initial bg-success rounded shadow">
                                    <i className="mdi mdi-check-all mdi-24px" />
                                  </div>
                                </div>
                                <div className="ms-3">
                                  <div className="small mb-1">Completos</div>
                                  <h5 className="mb-0">{(completosList.length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*/ Transactions */}




                  </div>

                  )}
                  

                </div>










                <div className="row my-4 text-center">
                  {/* Deposit / Withdraw */}
                  {/* Data Tables */}
                  {user.user.rol.nombre == "ASITENTE-ADMINISTRATIVO" && (
                    <div className="row gy-4">ADMINISTRACION</div>
                  )}


                  {/*/ Data Tables */}
                </div>



                <div className="row my-4 text-center">
                  {/* Deposit / Withdraw */}
                  {/* Data Tables */}
                  {user.user.rol.nombre == "ASITENTE-ADMINISTRATIVO" && (
                    <div className="row gy-4">ADMINISTRACION</div>
                  )}


                  {/*/ Data Tables */}
                </div>












              </div>
              {/* / Content */}
              <Footer />
            </div>
            {/* Content wrapper */}
          </div>
          {/* / Layout page */}
        </div>
        {/* Overlay */}
        <div className="layout-overlay layout-menu-toggle" />
      </div>
    </>
  );
};

export default Home;
