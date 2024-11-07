import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL_AUTH } from "./../services/auth/authConstants";

const UserList = ({ userList, getUsers, savePersona, persona, editing, setEditing, setPersona, saveUser, updateUser, loading, setLoading, deleteUser, user }) => {
  const [roles, setRoles] = useState([]);
  const [nombre, setNombre] = useState();
  const [idRol, setIdRol] = useState();
  const [contrasena, setContrasena] = useState();
  const [contrasena2, setContrasena2] = useState();
  const [estado, setEstado] = useState();
  const [foto, setFoto] = useState();
  const [correo, setCorreo] = useState();
  const [dpi, setDpi] = useState();
  const [id, setId] = useState();
  const [error, setError] = useState('');



























































  const [passwordStrength, setPasswordStrength] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const evaluatePasswordStrength = (password) => {
    let strength = '';

    if (password.length === 0) {
      setError(''); // Limpiar el error si se borra el contenido
      setPasswordStrength('');
      return;
    }

    if (password.length < 6) {
      strength = 'weak';
      //setError('La contraseña es demasiado corta');
    } else if (
      password.match(/[A-Z]/) &&
      password.match(/[a-z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[^a-zA-Z0-9]/)
    ) {
      strength = 'strong';
      setError(''); // Si la contraseña es fuerte, limpiar errores
    } else if (
      password.match(/[A-Z]/) ||
      password.match(/[a-z]/) ||
      password.match(/[0-9]/)
    ) {
      strength = 'medium';
      setError('');
    } else {
      strength = 'weak';
    }

    setPasswordStrength(strength);
  };





































  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${user.type} ${user.token}` // Token de autorización
    }
  });

  const save = async () => {
    if (!dpi || dpi.trim() === "") {
      setError("Ingrese un número correcto");
      return;
    } else if (!nombre || nombre.trim() === "") {
      setError("Ingrese un nombre válido");
      return;
    } else if (!correo || correo.trim() === "") {
      setError("Ingrese un correo válido válido");
      return;
    } else if (contrasena) {
      if (contrasena != contrasena2) {
        setError("Contraseñas no coinciden")
        return;
      } else if (contrasena.length < 6) {
        setError("Contraseña muy corta")
        return;
      }
    } else {
      setError("Contraseña vacía")
      return;
    }
    const data = {
      email: correo,
      id_rol: idRol,
      password: contrasena,
      nombre,
      estado,
      foto
    }
    await saveUser(data, dpi);
    setContrasena('')
    setContrasena2('')
    setCorreo('')
    setEstado('')
    setIdRol('')
    if (!error) {
      const closeButtonElement = document.getElementById('cerrarModal');
      if (closeButtonElement) {
        closeButtonElement.click();
        window.location.reload()
      }
    }

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



  const update = async () => {

    if (!nombre || nombre.trim() === "") {
      setError("Ingrese un nombre válido");
      return;
    } else if (!correo || correo.trim() === "") {
      setError("Ingrese un correo válido válido");
      return;
    } else if (contrasena) {
      if (contrasena != contrasena2) {
        setError("Contraseñas no coinciden")
        return;
      } else if (contrasena.length < 6) {
        setError("Contraseña muy corta")
        return;
      }
    } else {
      setError("Contraseña vacía")
      return;
    }

    const data = {
      id,
      dpi,
      email: correo,
      id_rol: idRol,
      nombre,
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

  const deleteConfirm = async (user) => {
    if (confirm("Realmente quiere eliminar a " + user.nombre + "??")) {
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
              <th className="text-truncate">EMAIL</th>
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
                          <img className="mt-3" src={`data:image/png;base64,${item.foto}`} width='100%' /> :
                          <img
                            src="/img/avatars/ricc.jpeg"
                            alt={`${item.nombre}`} // O item.username, dependiendo de tus datos
                            className="rounded-circle"
                          />}
                      </div>
                      <div>
                        <h6 className="mb-0 text-truncate">{item.nombre}</h6>
                        <small className="text-truncate">{item.email}</small>
                      </div>
                    </div>
                  </td>
                  <td className="text-truncate">
                    <i className="mdi mdi-email-box mdi-24px text-danger me-1" />{" "}
                    {item.email}
                  </td>
                  <td className="text-truncate">
                    <i className="mdi mdi-human mdi-24px text-warning me-1" />{" "}
                    {item.rol?.nombre}
                  </td>

                  <td>
                    <span
                      className={`badge bg-label-${item.estado === "ACTIVO" ? "success" : "secondary"
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
                        setDpi(item.dpi)
                        setNombre(item.nombre)
                        setCorreo(item.email)
                        setIdRol(item.rolId)
                        setEstado(item.estado)
                      }}
                    >
                      <i className="bx bx-edit"></i>
                    </button>
                    <button
                      disabled={item.rol?.nombre == "ADMINISTRADOR" && item.id != user.id}
                      title={`${item.rol?.nombre == "ADMINISTRADOR" && item.id == user.id ? "No puedes inactivarte" : ""
                        } usuario`}
                      type="button"
                      onClick={() => {
                        activarInactivar(item);
                      }}
                      className={`btn rounded-pill btn-${item.estado === "ACTIVO" ? "warning" : "success"
                        } rounded-pill`}
                    >
                      <i
                        className={`bx bx-${item.estado === "ACTIVO" ? "block" : "check"
                          } rounded-pill`}
                        title={`${item.estado === "ACTIVO" ? "Desactivar" : "Activar"
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




      {/* Modal PARA AGREGAR USUARIO */}
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


                  {/* APARTADO PARA DPI */}
                  <div className="col mb-0">
                    <label htmlFor="dpi" className="form-label">DPI</label>
                    <input
                      value={dpi}
                      onChange={(e) => {
                        const input = e.target.value;

                        // Aceptar solo hasta 13 dígitos numéricos
                        if (input.length <= 13 && /^\d*$/.test(input)) {
                          setDpi(input);
                        }
                      }}
                      onBlur={() => {
                        // Verificar si tiene menos de 13 dígitos
                        if (dpi.length < 13) {
                          setError("El DPI está incompleto, debe tener 13 dígitos.");
                        } else {
                          setError("");
                        }
                      }}
                      type="text"
                      id="dpi"
                      className="form-control"
                      placeholder="Ingrese su dpi"
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                  </div>


                </div>


                <div className="row g-2">


                  {/* APARTADO PARA NOMBRE */}
                  <div className="col mb-0">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      value={nombre}
                      onChange={(e) => {
                        let input = e.target.value;

                        // Expresión regular para permitir letras con tildes y espacios, no más de un espacio seguido
                        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

                        if (regex.test(input) && (input.length === 0 || input[0] !== ' ') && !/\s{2,}/.test(input)) {

                          // Capitalizar las primeras letras de cada palabra
                          input = input
                            .toLowerCase()
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');

                          setNombre(input);
                        }
                      }}
                      onBlur={() => {
                        // Validar al perder el foco que haya al menos dos palabras
                        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/.test(nombre)) {
                          toast.error('El nombre debe contener al menos dos palabras.');
                          setNombre(''); // Limpiar el campo si la validación falla
                        }
                      }}
                      type="text"
                      id="nombre"
                      className="form-control"
                      placeholder="Ingrese su nombre"
                    />
                  </div>


                  {/* APARTADO PARA CORREO */}
                  <div className="col mb-0">
                    <label htmlFor="correo" className="form-label">EMAIL</label>
                    <input
                      type="email"
                      id="correo"
                      className="form-control"
                      value={correo}
                      onChange={(e) => {
                        const input = e.target.value;

                        // Expresión regular para validar el formato de correo electrónico
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if (emailPattern.test(input)) {
                          setCorreo(input);
                          setError(""); // Si el correo es válido, limpiar errores
                        } else {
                          setCorreo(input);
                          setError("Por favor ingrese un correo válido");
                        }
                      }}
                      placeholder="Ingrese un correo"
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>} {/* Mostrar el error si el correo no es válido */}
                  </div>


                </div>



                <div className="row g-2">


                  {/* APARTADO PARA ROL */}
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


                  {/* APARTADO PARA ESTADO */}
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


                  {/* APARTADO PARA CONTRASEÑA */}
                  <div className="col mb-0">
                    <label htmlFor="contrasena" className="form-label">
                      Contraseña
                    </label>
                    <input
                      value={contrasena}
                      onChange={(e) => {
                        setContrasena(e.target.value);
                        evaluatePasswordStrength(e.target.value); // Evaluar fortaleza en cada cambio
                      }}
                      onFocus={() => setShowSuggestions(true)} // Mostrar sugerencias al hacer foco
                      onBlur={() => setShowSuggestions(false)} // Ocultar sugerencias al quitar el foco
                      type="password"
                      id="contrasena"
                      className="form-control"
                      placeholder="Ingrese una contraseña"
                    />

                    {/* Submenú de sugerencias */}
                    {showSuggestions && (
                      <div className="password-suggestions">
                        <ul>
                          <li>Debe tener al menos 8 caracteres</li>
                          <li>Incluir mayúsculas y minúsculas</li>
                          <li>Incluir números</li>
                          <li>Incluir símbolos (ej. @, #, !, etc.)</li>
                        </ul>
                      </div>
                    )}

                    {/* Indicador visual de fortaleza */}
                    {contrasena && (
                      <div className="password-strength">
                        <div
                          className={`strength-bar ${passwordStrength}`}
                          style={{
                            width: passwordStrength === 'strong' ? '100%' : passwordStrength === 'medium' ? '60%' : '30%',
                            backgroundColor:
                              passwordStrength === 'strong' ? 'green' : passwordStrength === 'medium' ? 'orange' : 'red',
                          }}
                        />
                        <p>
                          Seguridad de la contraseña: {passwordStrength === 'strong' ? 'Fuerte' : passwordStrength === 'medium' ? 'Media' : 'Débil'}
                        </p>
                      </div>
                    )}
                  </div>


                  {/* APARTADO PARA CONTRASEÑA2 */}
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

                {/* APARTADO PARA FOTO */}
                <div class="form-floating form-floating-outline mb-4 mt-3">
                  <input class="form-control" type="file" id="formFile" accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label for="exampleFormControlSelect1">
                    Foto
                  </label>
                  {foto && <img className="mt-3" src={`data:image/png;base64,${foto}`} width='100%' />}
                </div>


                {/* APARTADO PARA ERRORES */}
                <div className="row mt-3">
                  <div className="col mb-0">
                    <p className="text-center">
                      {error &&
                        <div className="alert alert-danger alert-dismissible" role="alert">
                          {error}
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                            onClick={() => {
                              setTimeout(() => {
                                window.location.reload();
                              }, 1500);
                            }}>
                          </button>
                        </div>
                      }
                    </p>
                  </div>
                </div>
              </div>



              {/* BOTONES */}
              <div className="modal-footer">
                <button
                  id="cerrarModal"
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setTimeout(() => {
                      window.location.reload()
                    }, 1500);
                  }}
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



      {/* MODAL EDITAR USUARIO */}
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



                  {/* APARTADO PARA DPI */}
                  <div className="col mb-0">
                    <label htmlFor="dpi" className="form-label">DPI</label>
                    <input
                      value={dpi}
                      onChange={(e) => {
                        const input = e.target.value;

                        // Aceptar solo hasta 13 dígitos numéricos
                        if (input.length <= 13 && /^\d*$/.test(input)) {
                          setDpi(input);
                        }
                      }}
                      onBlur={() => {
                        // Verificar si tiene menos de 13 dígitos
                        if (dpi.length < 13) {
                          setError("El DPI está incompleto, debe tener 13 dígitos.");
                        } else {
                          setError("");
                        }
                      }}
                      type="text"
                      id="dpi"
                      className="form-control"
                      placeholder="Ingrese su dpi"
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                  </div>
                </div>
                <div className="row g-2">





                  {/* APARTADO PARA NOMBRE */}
                  <div className="col mb-0">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      value={nombre}
                      onChange={(e) => {
                        let input = e.target.value;

                        // Expresión regular para permitir letras con tildes y espacios, no más de un espacio seguido
                        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

                        if (regex.test(input) && (input.length === 0 || input[0] !== ' ') && !/\s{2,}/.test(input)) {

                          // Capitalizar las primeras letras de cada palabra
                          input = input
                            .toLowerCase()
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');

                          setNombre(input);
                        }
                      }}
                      onBlur={() => {
                        // Validar al perder el foco que haya al menos dos palabras
                        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/.test(nombre)) {
                          toast.error('El nombre debe contener al menos dos palabras.');
                          setNombre(''); // Limpiar el campo si la validación falla
                        }
                      }}
                      type="text"
                      id="nombre"
                      className="form-control"
                      placeholder="Ingrese su nombre"
                    />
                  </div>





                  {/* APARTADO PARA CORREO */}
                  <div className="col mb-0">
                    <label htmlFor="correo" className="form-label">EMAIL</label>
                    <input
                      type="email"
                      id="correo"
                      className="form-control"
                      value={correo}
                      onChange={(e) => {
                        const input = e.target.value;

                        // Expresión regular para validar el formato de correo electrónico
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if (emailPattern.test(input)) {
                          setCorreo(input);
                          setError(""); // Si el correo es válido, limpiar errores
                        } else {
                          setCorreo(input);
                          setError("Por favor ingrese un correo válido");
                        }
                      }}
                      placeholder="Ingrese un correo"
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>} {/* Mostrar el error si el correo no es válido */}
                  </div>



                </div>
                <div className="row g-2">

                  {/* APARTADO PARA ROL */}
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


                  {/* APARTADO PARA ESTADO */}
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


                  {/* APARTADO PARA CONTRASEÑA */}
                  <div className="col mb-0">
                    <label htmlFor="contrasena" className="form-label">
                      Contraseña
                    </label>
                    <input
                      value={contrasena}
                      onChange={(e) => {
                        setContrasena(e.target.value);
                        evaluatePasswordStrength(e.target.value); // Evaluar fortaleza en cada cambio
                      }}
                      onFocus={() => setShowSuggestions(true)} // Mostrar sugerencias al hacer foco
                      onBlur={() => setShowSuggestions(false)} // Ocultar sugerencias al quitar el foco
                      type="password"
                      id="contrasena"
                      className="form-control"
                      placeholder="Ingrese una contraseña"
                    />

                    {/* Submenú de sugerencias */}
                    {showSuggestions && (
                      <div className="password-suggestions">
                        <ul>
                          <li>Debe tener al menos 8 caracteres</li>
                          <li>Incluir mayúsculas y minúsculas</li>
                          <li>Incluir números</li>
                          <li>Incluir símbolos (ej. @, #, !, etc.)</li>
                        </ul>
                      </div>
                    )}

                    {/* Indicador visual de fortaleza */}
                    {contrasena && (
                      <div className="password-strength">
                        <div
                          className={`strength-bar ${passwordStrength}`}
                          style={{
                            width: passwordStrength === 'strong' ? '100%' : passwordStrength === 'medium' ? '60%' : '30%',
                            backgroundColor:
                              passwordStrength === 'strong' ? 'green' : passwordStrength === 'medium' ? 'orange' : 'red',
                          }}
                        />
                        <p>
                          Seguridad de la contraseña: {passwordStrength === 'strong' ? 'Fuerte' : passwordStrength === 'medium' ? 'Media' : 'Débil'}
                        </p>
                      </div>
                    )}
                  </div>


                  {/* APARTADO PARA CONTRASEÑA2 */}
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


                {/* APARTADO PARA FOTO */}
                <div class="form-floating form-floating-outline mb-4 mt-3">
                  <input class="form-control" type="file" id="formFile" accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label for="exampleFormControlSelect1">
                    Foto
                  </label>
                  {foto && <img className="mt-3" src={`data:image/png;base64,${foto}`} width='100%' />}
                </div>



                <div className="row mt-3">

                  {/* APARTADO PARA ERRORES */}
                  <div className="col mb-0">
                    <p className="text-center">
                      {error &&
                        <div className="alert alert-danger alert-dismissible" role="alert">
                          {error}
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                            onClick={() => {
                              setTimeout(() => {
                                window.location.reload();
                              }, 1500);
                            }}>


                          </button>
                        </div>
                      }

                    </p>
                  </div>
                </div>

              </div>

              {/* BOTONES */}
              <div className="modal-footer">
                <button
                  id="cerrarModal"
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setTimeout(() => {
                      window.location.reload()
                    }, 1500);
                  }}

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

export default UserList;
