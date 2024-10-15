import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_AUTH } from "./../services/auth/authConstants";

const UserListCom = ({ userList, getUsers,savePersona,persona,editing,setEditing,setPersona,saveUser,updateUser, loading,setLoading,error,setError,deleteUser,user }) => {
  const [roles, setRoles] = useState([]);
  const [nombres, setNombres] = useState();
  const [idRol, setIdRol] = useState();
  const [idPersona, setIdPersona] = useState();
  const [contrasena, setContrasena] = useState();
  const [contrasena2, setContrasena2] = useState();
  const [estado, setEstado] = useState();
  const [foto, setFoto] = useState();
  const [correo, setCorreo] = useState();
  const [dpi, setDpi] = useState();
  const [id, setId] = useState();

  const [nombre, setNombre] = useState(); //para rol
  const [apellidos, setApellidos] = useState();
  const [telefono, setTelefono] = useState();

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`${user.type} ${user.token}` // Token de autorización
    }
  });

  
  const save = async () => {
    if (contrasena) {
      if (contrasena != contrasena2) {
        setError("Contraseñas no coinciden")
        return;
      } else if(contrasena.length < 6) {
        setError("Contraseña muy corta")
        return;
      }
    } else {
      setError("Contraseña vacía")
      return;
    }
    const data = {
      email:correo,
      id_rol: idRol,
      password:contrasena,
      nombres, //
      apellidos, //
      telefono, //
      estado,
      foto
    }
    await saveUser(data,dpi);
    setContrasena('')
    setContrasena2('')
    setCorreo('')
    setEstado('')
    setIdRol('')
    if (!error) {
      const closeButtonElement = document.getElementById('cerrarModal');
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
    
  }


  
  const update = async () => {
    if (contrasena != contrasena2) {
      setError("Contraseñas no coinciden")
      return;
    } else if(contrasena?.length < 6 && contrasena!="") {
      setError("Contraseña muy corta")
      return;
    }
  
  const data = {
    id,
    email:correo,
    id_rol: idRol,
    nombres,
    apellidos,
    telefono,
    estado,
    foto
  }
  if (contrasena) {
    data.password = contrasena
  }
  await updateUser(data);
  setTimeout(() => {
    window.location.reload()
  }, 1500);
  
}




  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFoto(reader.result.split(',')[1]); // Eliminar el prefijo "data:application/pdf;base64,"
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const deleteConfirm = async (user) => {
    if (confirm("Realmente quiere eliminar a "+user.nombres+"??")) {
      await deleteUser(user.id);
      getUsers();
    } 
    
  }
  

  const activarInactivar = async (user) => {
    setLoading(true);

    try {
      const nuevoEstado = user.estado === "INACTIVO" ? "ACTIVO" : "INACTIVO";
      const usuarioActualizado = { ...user, estado: nuevoEstado };
      const response = await axiosInstance.put(`${import.meta.env.VITE_API_URL}/usuarios/${user.id}`, 
        usuarioActualizado
      );

      // Handle successful login
      console.log(usuarioActualizado, response.data);
      
      setLoading(false);
      getUsers();
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

  const getRoles = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/roles`,
        {
          headers: {
            Authorization: `${user.type} ${user.token}`
          }
        }
      );
      // Handle successful login
      console.log("successful!", response.data);
      setRoles(response.data);

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
    getRoles();
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
              <th className="text-truncate">Usuario</th>
              <th className="text-truncate">Correo</th>
              <th className="text-truncate">Rol</th>        
              <th className="text-truncate">Estado</th>
              <th className="text-truncate">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#modalToggle"
                >
                  <i className="bx bx-plus"></i> Nuevo usuario
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-sm me-3">
                        {item.foto ? 
                        <img className="mt-3" src={`data:image/png;base64,${item.foto}`} width='100%' />:
                        <img
                          src="/img/avatars/1.png"
                          alt={`${item.nombres}`} // O item.username, dependiendo de tus datos
                          className="rounded-circle"
                        />}
                      </div>
                      <div>
                        <h6 className="mb-0 text-truncate">{item.nombres}</h6>
                        <small className="text-truncate">{item.email}</small>
                      </div>
                    </div>
                  </td>
                  <td className="text-truncate">{item.email}</td>
                  <td className="text-truncate">
                    <i className="mdi mdi-laptop mdi-24px text-danger me-1" />{" "}
                    {item.rol?.nombre}
                  </td>
                  

                  <td>
                    <span
                      className={`badge bg-label-${
                        item.estado === "ACTIVO" ? "success" : "secondary"
                      } rounded-pill`}
                    >
                      {item.estado}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn rounded-pill btn-info m-1"
                       data-bs-toggle="modal"
                  data-bs-target="#modalEditarUsuario"
                      onClick={() => {
                        setId(item.id)
                        setNombres(item.nombres)
                        setCorreo(item.email)
                        setIdRol(item.rolId)
                        setEstado(item.estado)
                      }}
                    >
                      <i className="bx bx-edit"></i>
                    </button>
                    <button
                      disabled={item.rol?.nombre == "ADMINISTRADOR" && item.id != user.id}
                      title={`${
                        item.rol?.nombre == "ADMINISTRADOR" && item.id == user.id ? "No puedes inactivarte" : ""
                      } usuario`}
                      type="button"
                      onClick={() => {
                        activarInactivar(item);
                      }}
                      className={`btn rounded-pill btn-${
                        item.estado === "ACTIVO" ? "warning" : "success"
                      } rounded-pill`}
                    >
                      <i
                        className={`bx bx-${
                          item.estado === "ACTIVO" ? "block" : "check"
                        } rounded-pill`}
                        title={`${
                          item.estado === "ACTIVO" ? "Desactivar" : "Activar"
                        } usuario`}
                      ></i>
                    </button>
                    <button
                      onClick={() => {
                        deleteConfirm(item)
                      }}
                      disabled={item.rol?.nombre == "ADMINISTRADOR"}
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
        id="modalToggle"
        aria-labelledby="modalToggleLabel"
        tabIndex={-1}
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <form id="nuevoUsuario" action="">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel1">
                Gestionar Usuario 
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
            <div className="row">
                <div className="col mb-0">
                  <label htmlFor="dpi" className="form-label">
                    dpi
                  </label>
                  <input
                     value={dpi}
                     onChange={(e) => setDpi(e.target.value)}
                    type="text"
                    id="dpi"
                    className="form-control"
                    placeholder="Ingrese su dpi"
                  />
                </div>
                </div>
                <div className="row g-2">
                <div className="col mb-0">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                     value={nombres}
                     onChange={(e) => setNombres(e.target.value)}
                    type="text"
                    id="nombre"
                    className="form-control"
                    placeholder="Ingrese su nombre"
                  />
                </div>
                <div className="col mb-0">
                  <label htmlFor="apellidos" className="form-label">
                    Apellidos
                  </label>
                  <input
                     value={apellidos}
                     onChange={(e) => setApellidos(e.target.value)}
                    type="text"
                    id="apellidos"
                    className="form-control"
                    placeholder="Ingrese sus apellidos"
                  />
                </div>
                <div className="row g-2">
                <div className="col mb-0">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input type="telefono" id="telefono" className="form-control"
                   value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    
                    placeholder="+502 XXXXXXXX"
                  />
                </div>
                <div className="col mb-0">
                  <label htmlFor="correo" className="form-label">
                    Correo electrónico
                  </label>
                  <input type="email" id="correo" className="form-control"
                   value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    
                    placeholder="Ingrese un correo"
                  />
                </div>
                </div>
              </div>
              <div className="row g-2">
              <div className="col mb-2">
                <label htmlFor="rol" className="form-label">
                Rol
                  </label>
                  <select id="rol" className="form-select"
                   value={idRol}
                   onChange={(e) => setIdRol(e.target.value)}
                  >
                    <option value={"0"}>--- ROL ---</option>
                    {
                      roles.map((item) => {
                        return <option key={item.id} value={item.id}>{item.nombre}</option>;
                      })
                    }
                  </select>
                </div>
                <div className="col mb-2">
                <label htmlFor="estado" className="form-label">
                ESTADO
                  </label>
                  <select id="estado" className="form-select"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value={"0"}>--- Estado ---</option>
                    <option>ACTIVO</option>
                    <option>INACTIVO</option>
                  </select>
                </div>
              </div>
              <div className="row g-2">
                <div className="col mb-0">
                  <label htmlFor="contrasena" className="form-label">
                  Contraseña
                  </label>
                  <input
                     value={contrasena}
                     onChange={(e) => setContrasena(e.target.value)}
                    type="password"
                    id="contrasena"
                    className="form-control"
                    placeholder="Ingrese una contraseña"
                  />
                </div>
                <div className="col mb-0">
                  <label htmlFor="contrasena2" className="form-label">
                    Confirmar
                  </label>
                  <input type="password" id="contrasena2" className="form-control"
                   value={contrasena2}
                    onChange={(e) => setContrasena2(e.target.value)}
                    
                    placeholder="Confirmar la contraseña"
                  />
                </div>
                </div>
                <div class="form-floating form-floating-outline mb-4 mt-3">
                          <input class="form-control" type="file" id="formFile" accept="image/*"
                          onChange={handleFileChange}
                          />
                          <label for="exampleFormControlSelect1">
                            Foto
                          </label>
                          {foto && <img className="mt-3" src={`data:image/png;base64,${foto}`} width='100%'  />}
                        </div>
              <div className="row mt-3">
                <div className="col mb-0">
                <p className="text-center">
                  {error &&
                  <div className="alert alert-danger alert-dismissible" role="alert">
                  {error}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                  }

              </p>
                </div>
                </div>
            </div>
            <div className="modal-footer">
              <button
                id="cerrarModal"
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button disabled={loading} onClick={save} type="button" className="btn btn-success">
              {loading ?
                        <div className="spinner-border text-success" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div> : "Guardar"}
              </button>

              
              
            </div>
          </div>
        </div>
        </form>

      </div>

      <div
        className="modal fade"
        id="modalEditarUsuario"
        aria-labelledby="modalToggleLabel"
        tabIndex={-1}
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <form id="nuevoUsuario" action="">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel1">
                Editar Usuario 
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            
            <div className="modal-body">
              
            <div className="row">
                <div className="col mb-0">
                  <label htmlFor="dpi" className="form-label">
                    dpi
                  </label>
                  <input
                     value={dpi}
                     onChange={(e) => setDpi(e.target.value)}
                    type="text"
                    id="dpi"
                    className="form-control"
                    placeholder="Ingrese su dpi"
                  />
                </div>
                </div>
                <div className="row g-2">
                <div className="col mb-0">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                     value={nombres}
                     onChange={(e) => setNombres(e.target.value)}
                    type="text"
                    id="nombre"
                    className="form-control"
                    placeholder="Ingrese su nombre"
                  />
                </div>
                <div className="col mb-0">
                  <label htmlFor="apellidos" className="form-label">
                    Apellidos
                  </label>
                  <input
                     value={apellidos}
                     onChange={(e) => setApellidos(e.target.value)}
                    type="text"
                    id="apellidos"
                    className="form-control"
                    placeholder="Ingrese sus apellidos"
                  />
                </div>
                <div className="row g-2">
                <div className="col mb-0">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input type="telefono" id="telefono" className="form-control"
                   value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    
                    placeholder="+502 XXXXXXXX"
                  />
                </div>
                <div className="col mb-0">
                  <label htmlFor="correo" className="form-label">
                    Correo electrónico
                  </label>
                  <input type="email" id="correo" className="form-control"
                   value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    
                    placeholder="Ingrese un correo"
                  />
                </div>
                </div>
              </div>
              <div className="row g-2">
              <div className="col mb-2">
                <label htmlFor="rol" className="form-label">
                Rol
                  </label>
                  <select id="rol" className="form-select"
                   value={idRol}
                   onChange={(e) => setIdRol(e.target.value)}
                  >
                    <option value={"0"}>--- ROL ---</option>
                    {
                      roles.map((item) => {
                        return <option key={item.id} value={item.id}>{item.nombre}</option>;
                      })
                    }
                  </select>
                </div>
                <div className="col mb-2">
                <label htmlFor="estado" className="form-label">
                ESTADO
                  </label>
                  <select id="estado" className="form-select"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value={"0"}>--- Estado ---</option>
                    <option>ACTIVO</option>
                    <option>INACTIVO</option>
                  </select>
                </div>
              </div>
              <div className="row g-2">
                <div className="col mb-0">
                  <label htmlFor="contrasena" className="form-label">
                  Contraseña
                  </label>
                  <input
                     value={contrasena}
                     onChange={(e) => setContrasena(e.target.value)}
                    type="password"
                    id="contrasena"
                    className="form-control"
                    placeholder="Ingrese una contraseña"
                  />
                </div>
                <div className="col mb-0">
                  <label htmlFor="contrasena2" className="form-label">
                    Confirmar
                  </label>
                  <input type="password" id="contrasena2" className="form-control"
                   value={contrasena2}
                    onChange={(e) => setContrasena2(e.target.value)}
                    
                    placeholder="Confirmar la contraseña"
                  />
                </div>
                </div>
                <div class="form-floating form-floating-outline mb-4 mt-3">
                          <input class="form-control" type="file" id="formFile" accept="image/*"
                          onChange={handleFileChange}
                          />
                          <label for="exampleFormControlSelect1">
                            Foto
                          </label>
                          {foto && <img className="mt-3" src={`data:image/png;base64,${foto}`} width='100%'  />}
                        </div>
              <div className="row mt-3">
                <div className="col mb-0">
                <p className="text-center">
                  {error &&
                  <div className="alert alert-danger alert-dismissible" role="alert">
                  {error}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                  }

              </p>
                </div>
                </div>
            </div>
            <div className="modal-footer">
              <button
                id="cerrarModal"
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button disabled={loading} onClick={update} type="button" className="btn btn-success">
              {loading ?
                        <div className="spinner-border text-success" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div> : "Guardar cambios"}
              </button>

              
              
            </div>
          </div>
        </div>
        </form>

      </div>
    </div>
  );
};

export default UserListCom;
