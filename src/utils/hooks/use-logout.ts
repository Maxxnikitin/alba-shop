import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutToggleClick = () => {
    setIsLogoutModalOpen(prev => !prev);
  };

  const handleLogoutReq = () => {
    localStorage.removeItem('access');
    navigate('/sign-in');
  };

  return { isLogoutModalOpen, handleLogoutToggleClick, handleLogoutReq };
};
