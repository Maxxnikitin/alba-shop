import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { TMainWrapperProps } from './type';

import { updateCartFx, updateFavoritesFx } from 'src/models';
import { DataContext, useContextData } from '~utils';

export const MainWrapperPage: FC<TMainWrapperProps> = () => {
  const { contextData } = useContextData();

  useEffect(() => {
    updateCartFx();
    updateFavoritesFx();
  }, []);

  return (
    <DataContext.Provider value={contextData}>
      <Outlet />
    </DataContext.Provider>
  );
};
