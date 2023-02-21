import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useReturn = () => {
  const navigate = useNavigate();

  const handleReturnClick = useCallback(() => navigate(-1), [navigate]);

  return { handleReturnClick };
};
