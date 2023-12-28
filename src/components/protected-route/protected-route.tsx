import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { TProtectedRoute } from './type';

export const ProtectedRouteElement: FC<TProtectedRoute> = ({ element }) =>
  localStorage.getItem('access') ? element : <Navigate to='/sign-in' replace />;
