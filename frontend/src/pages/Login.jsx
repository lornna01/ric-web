import React, { useEffect, useState } from 'react';
import { useAuth } from './../providers/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL_AUTH } from './../services/auth/authConstants'
import './Login.css'
import Home from './Home';
import toast from 'react-hot-toast';



const Login = () => {
  const { login } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [codigo, setCodigo] = useState();
  const [codigoIngresado, setCodigoIngresado] = useState();
  const [myUser, setMyUser] = useState();

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (codigo == codigoIngresado) {
      login(myUser)
      navigate('/home');
    } else {
      toast.error("Código no coincide")
      setCodigoIngresado('')
    }
  }
  const cancelOTP = async (e) => {
    e.preventDefault();
    setCodigoIngresado()
    setCodigo()
  }

  const handleLogin = async (e) =>  {
    e.preventDefault();
    setLoading(true);

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,
      {email,password}
    );

    //if (response.status == 200) {
    if (response.status == 200) {
      setCodigo(response.data.codigo)
      setMyUser(response.data)
      //login(response.data)
      //navigate('/home');
      toast.success("Ingrese su código OTP")
      setError('');
    } else {
      setError('Usuario no activo, consulta un administrador.');
    }
    // Handle successful login
      //console.log("Login successful!", response.data);
      
      setLoading(false);
    } catch (error) {
      //console.error("Login failed:", error);
      if (error.response.status >= 400 && error.response.status < 500) {
        setError("Usuario o contraseña incorrectos.");
      }
        //setError(error.message);
      setLoading(false);
      //console.log(error.response.status);
    }
      
  };
  
  
  

  return user?<Home/>:(
    <>
<div className="container-xxl">
  <div className="authentication-wrapper authentication-basic container-p-y">
    <div className="authentication-inner">
      {/* Register */}
      <div className="card">
        <div className="card-body">
          {/* Logo */}
          <div className="app-brand justify-content-center">
            <a href="index.html" className="app-brand-link gap-2">
              <span className="app-brand-logo demo">
              <img src="/img/ric.jpeg" alt="" width={'150'} />
              </span>
              Panel Administrativo RIC-Petén
            </a>
          </div>
          {/* /Logo */}
          <h4 className="mb-2">Bienvenid@ 👋</h4>
          <p className="mb-4">Inicie sesión.</p>
          {!codigo ?<form id="formAuthentication" className="mb-3" action="index.html">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input type="text" className="form-control" id="email" name="email"
                          value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingrese su correo electrónico" autoFocus />
            </div>
            <div className="mb-3 form-password-toggle">
              <div className="d-flex justify-content-between">
                <label className="form-label" htmlFor="password">Contraseña</label>
               
              </div>
              <div className="input-group input-group-merge">
                      <input type="password" id="password" className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="············" aria-describedby="password" />
                <span className="input-group-text cursor-pointer"><i className="" /></span>
              </div>
            </div>

                  <div className="mb-3">
                    <button
                     disabled={loading}
                     onClick={handleLogin} 
                      className="btn rounded-pill btn-primary d-grid w-100" type="button">
                      {loading ?
                        <div class="spinner-border text-success" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div> : "Iniciar sesión"}
                    </button>
            </div>
                </form> :
          <form id="formAuthentication" className="mb-3" action="index.html">
          
          <div className="mb-3 form-password-toggle">
            <div className="d-flex justify-content-between">
              <label className="form-label" htmlFor="password">Código de verificación OTP</label>
             
            </div>
            <div className="input">
                        <input type="text" id="password" className="form-control text-center"
                          maxLength={6}
                      value={codigoIngresado}
                      onChange={(e) => setCodigoIngresado(e.target.value)}
                      placeholder="Ingrese su código" aria-describedby="password" />
              
            </div>
          </div>

                <div className="mb-3">
                  <button
                   disabled={loading}
                   onClick={verifyOTP} 
                    className="btn rounded-pill btn-primary d-grid w-100" type="button">
                    {loading ?
                      <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div> : "Verificar"}
                      </button>
                      
                      <button
                   disabled={loading}
                   onClick={cancelOTP} 
                    className="btn rounded-pill btn-dark d-grid w-100 mt-2" type="button">
                    {loading ?
                      <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div> : "Cancelar"}
                  </button>
          </div>
        </form>
          }
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
      {/* /Register */}
    </div>
  </div>
</div>


    </>
  );
};

export default Login;
