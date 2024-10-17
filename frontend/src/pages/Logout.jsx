import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth(); // Supongamos que tienes un método logout en tu contexto
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login'); // Redirigir a la página de inicio de sesión
  }, [logout, navigate]);

  return null; // O un componente de carga
};
