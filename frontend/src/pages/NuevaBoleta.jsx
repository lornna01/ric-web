import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MenuLateral from "../components/MenuLateral";
import axios from "axios";
import { useAuth } from "../providers/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import BoletaList from "../components/BoletaList";
import CombustibleList from "../components/CombustibleList";

const NuevaBoleta = () => {
  const { login } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // URL base de tu API
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.type} ${user.token}`, // Token de autorización
    },
  });
  


  const [id, setId] = useState();
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingBoletas, setLoadingBoletas] = useState(false);
  const [loadingCombustible, setLoadingCombustible] = useState(false);
  const [editing, setEditing] = useState(false);

  const [boletaList, setBoletaList] = useState([]);
  const [combustibleList, setCombustibleList] = useState([]);
  const [propietario, setPropietario] = useState();
  const [placa, setPlaca] = useState();
  const [modelo, setModelo] = useState();
  const [chofer, setChofer] = useState();
  const [comentarios, setComentarios] = useState();
  const [boleta, setBoleta] = useState();
  const [combustible, setCombustible] = useState();
  const [archivo, setArchivo] = useState('');

  
  const [serie, setSerie] = useState();
  const [fecha, setFecha] = useState();
  const [pais, setPais] = useState();
  const [departamento, setDepartamento] = useState();
  const [genero, setGenero] = useState();
  const [edad, setEdad] = useState();
  const [checkedMotivo, setCheckedMotivo] = useState({
    naturaleza: false,
    recreacion: false,
    cultura: false,
    arqueologia: false,
    aventura: false,
    investigacion: false,
    otro: false,
  });
  const [checkedActividades, setCheckedActividades] = useState({
    caminata: false,
    canopy: false,
    observacion: false,
    historia: false,
    bicicleta: false,
    acampar: false,
    religiosas: false,
    otras: false,
  });
  const [checkedEntero, setCheckedEntero] = useState({
    recomendacion: false,
    agencia: false,
    guia: false,
    trifoliares: false,
    internet: false,
    radiotvprensa: false,
    otro: false,
  });
  const [checkedViaja, setCheckedViaja] = useState({
    solo: false,
    familia: false,
    amigos: false,
    escuela: false,
    universidad: false,
    agencia: false,
    otro: false,
  });

  const [correo, setCorreo] = useState();
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
    "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", 
    "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", 
    "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", 
    "Cambodia", "Cameroon", "Canada", "Central African Republic", 
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", 
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", 
    "Democratic Republic of the Congo", "Denmark", "Djibouti", 
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", 
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", 
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", 
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", 
    "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", 
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", 
    "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", 
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", 
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", 
    "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", 
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", 
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", 
    "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", 
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", 
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", 
    "Palau", "Palestine State", "Panama", "Papua New Guinea", 
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", 
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", 
    "Slovenia", "Solomon Islands", "Somalia", "South Africa", 
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", 
    "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", 
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", 
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
    "United Kingdom", "United States of America", "Uruguay", 
    "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", 
    "Zambia", "Zimbabwe"
  ];

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedMotivo(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleCheckboxChangeActividad = (event) => {
    const { name, checked } = event.target;
    setCheckedActividades(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleCheckboxChangeEntero = (event) => {
    const { name, checked } = event.target;
    setCheckedEntero(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleCheckboxChangeViaja = (event) => {
    const { name, checked } = event.target;
    setCheckedViaja(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };


  
  const save = async () => {
    setMensaje("");
    setError("");
    if (!serie) {
      setError("Ingrese el número de Serie");
      return;
    } else if (!fecha) {
      setError("Ingrese la fecha");
      return;
    } else if (!pais) {
      setError("Seleccione el pais");
      return;
    } else if (!genero) {
      setError("Seleccione el género");
      return;
    } else if (!edad) {
      setError("Seleccione el rango de edad");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/boletas`,
        {
          usuario_id: user?.user?.id,
          serie,
          fecha,
          pais,
          departamento,
          genero,
          edad,
          motivo:JSON.stringify(checkedMotivo),
          actividad:JSON.stringify(checkedActividades),
          entero:JSON.stringify(checkedEntero),
          viaja: JSON.stringify(checkedViaja),
          correo
        }
      );
      

      if (response.status === 201) {
        toast.success("Boleta creada con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        setTimeout(() => {
          window.location.reload()
        }, 1500);
        
        //navigate('/vehiculos/nuevo');
      }
      setLoading(false);
      setError();
    } catch (error) {
      if (error.response?.status === 400) {
        setError(error.response.data.message);
      }
      if (error.status >= 400 && error.response?.status < 500) {
        setError("Error inesperado");
      }
      if (error.status >= 500) {
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
    }
  };

  const update = async () => {
    setMensaje("");
    setError("");
    if (!serie) {
      setError("Ingrese el número de Serie");
      return;
    } else if (!fecha) {
      setError("Ingrese la fecha");
      return;
    } else if (!pais) {
      setError("Seleccione el pais");
      return;
    } else if (!genero) {
      setError("Seleccione el género");
      return;
    } else if (!edad) {
      setError("Seleccione el rango de edad");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/boletas/${id}`,
        {
          usuario_id: user?.user?.id,
          serie,
          fecha,
          pais,
          departamento,
          genero,
          edad,
          motivo:JSON.stringify(checkedMotivo),
          actividad:JSON.stringify(checkedActividades),
          entero:JSON.stringify(checkedEntero),
          viaja: JSON.stringify(checkedViaja),
          correo
        }
      );
      

      if (response.status === 200) {
        toast.success("Actualizado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        setEditing(false)
        //navigate('/home');
        setTimeout(() => {
          window.location.reload()
        }, 1500);
        
      }
      setLoading(false);
      setError();
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);

  
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };

  const findBySerie = async () => {
    setMensaje("");
    setError("");
    if (!serie) {
      setError("Ingrese la serie");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/boletaBySerie/${serie}`);
      

      if (response.status === 200) {
        await getCombustible()
        toast.success("Encontrado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setBoleta(response.data)
        setEditing(true);
      }
      setLoading(false);
      setError();
      
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setPropietario('')
        setArchivo('')
        setPlaca('')
        setModelo('')
        setChofer('')
        setComentarios('')
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };

  const getCombustible = async () => {
    setMensaje("");
    setError("");
    if (!placa) {
      setError("Ingrese la placa");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/combustibles?placa=${placa}`);
      

      if (response.status === 200) {
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setCombustibleList(response.data)
        setEditing(true);
      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setPropietario('')
        setArchivo('')
        setPlaca('')
        setModelo('')
        setChofer('')
        setComentarios('')
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };

  const getBoletas = async () => {
    setMensaje("");
    setError("");
    setLoadingBoletas(true);

    try {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/boletas`);
      

      if (response.status === 200) {
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        setBoletaList(response.data)
       setLoadingBoletas(false)
      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setSerie('')
        setFecha('')
        setPais('')
        setDepartamento('')
        setEdad('')
        setCorreo('')
        setCheckedActividades()
        setCheckedEntero()
        setCheckedMotivo()
        setCheckedViaja()
      }
      if (error.status >= 400 && error.response?.status < 500) {
        setError("Error inesperado");
      }
      if (error.status >= 500) {
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
    }
  };

  const deleteBoleta = async (model) => {
    setMensaje("");
    setError("");

    setLoading(true);

    try {
      const response = await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/boletas/${model.id}`);
      
      if (response.status === 200) {
        toast.success("Eliminado con éxito!!")
        //setMensaje("Vehículo creado con éxito!!");
        console.log(response.data)
        getBoletas()
       
      }
      setLoading(false);
      setError();
    } catch (error) {
      setEditing(false);
      if (error.response.status === 400) {
        setError(error.response.data.message);
        toast.error(error.response.data.message)
        setSerie('')
        setFecha('')
        setPais('')
        setDepartamento('')
        setEdad('')
        setCorreo('')
        setCheckedActividades()
        setCheckedEntero()
        setCheckedMotivo()
        setCheckedViaja()
      }
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

    if (!error) {
      const closeButtonElement = document.getElementById("cerrarModal");
      if (closeButtonElement) {
        closeButtonElement.click();
      }
    }
  };



  useEffect(() =>{
    getBoletas()
    if (editing) {
      setId(boleta.id)
      setSerie(boleta.serie)
      setFecha(boleta.fecha.substr(0,10))
      setDepartamento(boleta.departamento)
      setPais(boleta.pais)
      setGenero(boleta.genero)
      setEdad(boleta.edad)
      setCheckedMotivo(boleta.motivo)
      setCheckedActividades(boleta.actividad)
      setCheckedEntero(boleta.entero)
      setCheckedViaja(boleta.viaja)
      setCorreo(boleta.correo)
    }
    
 },[editing])

  return (
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
              <div className="row">
                <div className="col-xxl">
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <span class="text-muted fw-light">Boletas/</span>{" "}
                        Gestionar  
                      </h5>
                      <button
                          type="button"
                          className="btn btn-primary waves-effect waves-light mx-3"
                            onClick={() => findBySerie()}
                        >
                          <i class="menu-icon tf-icons mdi mdi-search"></i>
                          Buscar
                          </button>
                    </div>
                    <div className="card-body">
                      {mensaje && (
                        <div className="alert alert-success" role="alert">
                          {mensaje}!
                        </div>
                      )}
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}!
                        </div>
                      )}
                      <form>
                     
                        <div class="input-group">
                        <div class="form-floating form-floating-outline mb-4">
                      <input
                              type="number"
                              className="form-control"
                              id="titular"
                              placeholder="758716"
                              value={serie}
                              onChange={(e) => setSerie(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  if (serie) {
                                    findBySerie()
                                  } else {
                                    toast.error('Ingrese un número de serie')
                                  }
                                }
                                
                              }}
                            />
                          <label for="exampleFormControlSelect1">
                            # Serie "C"
                          </label>
                      </div>
                      <div class="form-floating form-floating-outline mb-4">
                      <input
                              type="date"
                              className="form-control"
                              value={fecha}
                              onChange={(e) => setFecha(e.target.value)}
                            />
                          <label for="exampleFormControlSelect1">
                            Fecha
                          </label>
                      </div>
                      <div class="form-floating form-floating-outline mb-4">
                            <select
                            className="form-select"
                              onChange={(e) => setPais(e.target.value)} value={pais}>
                            <option value="">Nacionalidad</option>
                            {countries.map((country, index) => (
                              <option key={index} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                          <label for="exampleFormControlSelect1">
                            País
                          </label>
                          </div>
                          <div class="form-floating form-floating-outline mb-4">
                          <input
                              type="text"
                              className="form-control"
                              id="titular"
                              placeholder="Nombre del departamento"
                              value={departamento}
                              onChange={(e) => setDepartamento(e.target.value)}
                              
                            />
                          <label for="exampleFormControlSelect1">
                            Departamento
                          </label>
                      </div>
                        </div>
                        <div class="input-group">
                        
                      <div class="form-floating form-floating-outline mb-4">
                      <select
                            className="form-select"
                              onChange={(e) => setGenero(e.target.value)} value={genero}>
                            <option value="">-- Selecciopnar --</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            
                          </select>
                          <label for="exampleFormControlSelect1">
                            Genero
                          </label>
                      </div>
                      <div class="form-floating form-floating-outline mb-4">
                      <select
                            className="form-select"
                              onChange={(e) => setEdad(e.target.value)} value={edad}>
                              
                            <option value="">-- Selecciopnar --</option>
                            <option value="0 - 11">0 - 11</option>
                            <option value="12 - 20">12 - 20</option>
                            <option value="21 - 30">21 - 30</option>
                            <option value="31 - 50">31 - 50</option>
                            <option value="51 +">51 +</option>
                            
                          </select>
                          <label for="exampleFormControlSelect1">
                            Edad
                          </label>
                        </div>

                        </div>
                        <div class="form-floating form-floating-outline">
                        
                        <div class="row">
                            <div class="col-md">
                            <small class="text-light fw-medium">Motivo de su Visita</small>
                            <div class="form-check mt-3">
                                <input class="form-check-input" type="checkbox"
                                  id="c1"
                               name="naturaleza"
                               checked={checkedMotivo.naturaleza}
                               onChange={handleCheckboxChange}
                                />
                              <label class="form-check-label" for="c1">
                                Naturaleza
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox"
                                    id="c2"
                                name="recreacion"
                                checked={checkedMotivo.recreacion}
                                onChange={handleCheckboxChange}
                                  />
                                <label class="form-check-label" for="c2">
                                  Recreacion
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="c3"
                                  name="cultura"
                                  checked={checkedMotivo.cultura}
                                  onChange={handleCheckboxChange}
                                    />
                                  <label class="form-check-label" for="c3">
                                    Cultura
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="c4"
                                  name="arqueologia"
                                  checked={checkedMotivo.arqueologia}
                                  onChange={handleCheckboxChange}
                                    />
                                  <label class="form-check-label" for="c4">
                                    Arqueología
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="c5"
                                  name="aventura"
                                  checked={checkedMotivo.aventura}
                                  onChange={handleCheckboxChange}
                                    />
                                  <label class="form-check-label" for="c5">
                                    Aventura
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="c6"
                                  name="investigacion"
                                  checked={checkedMotivo.investigacion}
                                  onChange={handleCheckboxChange}
                                    />
                                  <label class="form-check-label" for="c6">
                                    Investigacion
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="c7"
                                  name="otro"
                                  checked={checkedMotivo.otro}
                                  onChange={handleCheckboxChange}
                                    />
                                  <label class="form-check-label" for="c7">
                                    Otro
                                  </label>
                              </div>
                          </div>
                          <div class="col-md">
                            <small class="text-light fw-medium">Qué actividad planea realizar?</small>
                            <div class="form-check mt-3">
                                <input class="form-check-input" type="checkbox"
                                  id="a1"
                               name="caminata"
                               checked={checkedActividades.caminata}
                               onChange={handleCheckboxChangeActividad}
                                />
                              <label class="form-check-label" for="a1">
                                Caminata
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox"
                                    id="a2"
                                name="canopy"
                                checked={checkedActividades.canopy}
                                onChange={handleCheckboxChangeActividad}
                                  />
                                <label class="form-check-label" for="a2">
                                  Canopy
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="a3"
                                  name="observacion"
                                  checked={checkedActividades.observacion}
                                  onChange={handleCheckboxChangeActividad}
                                    />
                                  <label class="form-check-label" for="a3">
                                  Observacion de Aves
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="a4"
                                  name="historia"
                                  checked={checkedActividades.historia}
                                  onChange={handleCheckboxChangeActividad}
                                    />
                                  <label class="form-check-label" for="a4">
                                    Conocer la Historia del Lugar
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="a5"
                                  name="bicicleta"
                                  checked={checkedActividades.bicicleta}
                                  onChange={handleCheckboxChangeActividad}
                                    />
                                  <label class="form-check-label" for="a5">
                                    Bicicleta
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="a6"
                                  name="acampar"
                                  checked={checkedActividades.acampar}
                                  onChange={handleCheckboxChangeActividad}
                                    />
                                  <label class="form-check-label" for="a6">
                                    Acampar
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="a7"
                                  name="religiosas"
                                  checked={checkedActividades.religiosas}
                                  onChange={handleCheckboxChangeActividad}
                                    />
                                  <label class="form-check-label" for="a7">
                                    Actividades Religiosas
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="a8"
                                  name="otro"
                                  checked={checkedActividades.otro}
                                  onChange={handleCheckboxChangeActividad}
                                    />
                                  <label class="form-check-label" for="a8">
                                    Otro
                                  </label>
                              </div>
                            </div>
                            
                            <div class="col-md">
                            <small class="text-light fw-medium">Cómo se enteró del Área?</small>
                            <div class="form-check mt-3">
                                <input class="form-check-input" type="checkbox"
                                  id="en1"
                               name="recomendacion"
                               checked={checkedEntero.recomendacion}
                               onChange={handleCheckboxChangeEntero}
                                />
                              <label class="form-check-label" for="en1">
                                Recomendacion
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox"
                                    id="en2"
                                name="agencia"
                                checked={checkedEntero.agencia}
                                onChange={handleCheckboxChangeEntero}
                                  />
                                <label class="form-check-label" for="en2">
                                  Agencia de Viajes
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="en3"
                                  name="guia"
                                  checked={checkedEntero.guia}
                                  onChange={handleCheckboxChangeEntero}
                                    />
                                  <label class="form-check-label" for="en3">
                                  Guía Impresa
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="en4"
                                  name="trifoliares"
                                  checked={checkedEntero.trifoliares}
                                  onChange={handleCheckboxChangeEntero}
                                    />
                                  <label class="form-check-label" for="en4">
                                    Trifoliares
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="en5"
                                  name="internet"
                                  checked={checkedEntero.internet}
                                  onChange={handleCheckboxChangeEntero}
                                    />
                                  <label class="form-check-label" for="en5">
                                    Internet
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="en6"
                                  name="radiotvprensa"
                                  checked={checkedEntero.radiotvprensa}
                                  onChange={handleCheckboxChangeEntero}
                                    />
                                  <label class="form-check-label" for="en6">
                                    Tv, radio, prensa
                                  </label>
                              </div>
                              
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="en8"
                                  name="otro"
                                  checked={checkedEntero.otro}
                                  onChange={handleCheckboxChangeEntero}
                                    />
                                  <label class="form-check-label" for="en8">
                                    Otro
                                  </label>
                              </div>
                            </div>

                            <div class="col-md">
                            <small class="text-light fw-medium">Cómo Viaja Usted?</small>
                            <div class="form-check mt-3">
                                <input class="form-check-input" type="checkbox"
                                  id="vi1"
                               name="solo"
                               checked={checkedViaja.solo}
                               onChange={handleCheckboxChangeViaja}
                                />
                              <label class="form-check-label" for="vi1">
                                Solo
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox"
                                    id="vi2"
                                name="familia"
                                checked={checkedViaja.familia}
                                onChange={handleCheckboxChangeViaja}
                                  />
                                <label class="form-check-label" for="vi2">
                                  En familia
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="vi3"
                                  name="amigos"
                                  checked={checkedViaja.amigos}
                                  onChange={handleCheckboxChangeViaja}
                                    />
                                  <label class="form-check-label" for="vi3">
                                  Con Amigos
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="vi4"
                                  name="escuela"
                                  checked={checkedViaja.escuela}
                                  onChange={handleCheckboxChangeViaja}
                                    />
                                  <label class="form-check-label" for="vi4">
                                    Escuela/Colegio/Instituto
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="vi5"
                                  name="universidad"
                                  checked={checkedViaja.universidad}
                                  onChange={handleCheckboxChangeViaja}
                                    />
                                  <label class="form-check-label" for="vi5">
                                    Con la Universidad
                                  </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="vi6"
                                  name="agencia"
                                  checked={checkedViaja.agencia}
                                  onChange={handleCheckboxChangeViaja}
                                    />
                                  <label class="form-check-label" for="vi6">
                                    Con Agencia de Viajes
                                  </label>
                              </div>
                              
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                      id="vi8"
                                  name="otro"
                                  checked={checkedViaja.otro}
                                  onChange={handleCheckboxChangeViaja}
                                    />
                                  <label class="form-check-label" for="vi8">
                                    Otro
                                  </label>
                              </div>
                            </div>
                        </div>
                          
                      </div>
                        
                        <div class="form-floating form-floating-outline mb-4">
                      <input
                              type="text"
                              className="form-control"
                              id="correo"
                              placeholder="Correo electrónico"
                              value={correo}
                              onChange={(e) => setCorreo(e.target.value)}
                            />
                          <label for="exampleFormControlSelect1">
                            Recibir más información
                          </label>
                        </div>
                        
                       
                        
                        {editing ? (<span>
                          <button
                          type="button"
                          className="btn btn-warning waves-effect waves-light"
                          onClick={update}
                          disabled={loading}
                        >
                          <i class="menu-icon tf-icons mdi mdi-sync"></i>
                          Guardar cambios
                          </button> 
                          <button
                          type="button"
                          className="btn btn-dark waves-effect waves-light mx-3"
                            onClick={() => window.location.reload()}
                          disabled={loading}
                        >
                          <i class="menu-icon tf-icons mdi mdi-cancel"></i>
                          Cancelar
                          </button> 
                          
                        </span> ):<button
                          type="button"
                          className="btn btn-primary waves-effect waves-light"
                          onClick={save}
                          disabled={loading}
                        >
                          <i class="menu-icon tf-icons mdi mdi-content-save"></i>
                          Guardar
                        </button>}

                        
                        {mensaje && (
                          <div
                            className="alert alert-success mt-4"
                            role="alert"
                          >
                            {mensaje}!
                          </div>
                        )}

                       
                      </form>

                      <div className="row my-4 text-center">
                      {/* Deposit / Withdraw */}
                      {/* Data Tables */}
                      {user.user.rol.nombre == "ADMINISTRADOR" && (
                        <div className="col-12">
                            {!loadingBoletas ? <BoletaList
                              deleteBoleta ={deleteBoleta}
                            boletaList={boletaList}
                            getBoletas={getBoletas}
                              error={error}
                              boleta={boleta}
                              setBoleta={setBoleta}
                              setEditing={setEditing}
                              user={user}
                              setMensaje={setMensaje}
                            setError={setError}
                            loading={loading}
                            setLoading={setLoading}
                          />:(<div className="spinner-grow text-success" role="status">
                        </div>)}
                        </div>
                      )}

                      {/*/ Data Tables */}
                      </div>

                      <div className="row my-4 text-center">
                      {/* Deposit / Withdraw */}
                      {/* Data Tables */}
                      

                      {/*/ Data Tables */}
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* / Content */}
            {/* Footer */}
            <Footer />
            {/* / Footer */}
            <div className="content-backdrop fade" />
          </div>
          {/* Content wrapper */}
        </div>
        {/* / Layout page */}
      </div>
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
      
    </div>
  );
};

export default NuevaBoleta;
