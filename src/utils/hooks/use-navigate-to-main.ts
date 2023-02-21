import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigateToMain = () => {
  const navigate = useNavigate();

  const handleNavigateToMainClick = useCallback(() => navigate('/'), [navigate]);

  return { handleNavigateToMainClick };
};
