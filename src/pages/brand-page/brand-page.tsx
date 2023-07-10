import { FC } from 'react';

import { IBrandsPageProps } from './types';

import { PageWrapperWithCommonBlocks, BrandItems } from '../../components';

export const BrandsPage: FC<IBrandsPageProps> = ({ className = '', ...rest }) => {
  console.log('q');

  return (
    <PageWrapperWithCommonBlocks className={className} {...rest}>
      <BrandItems />
    </PageWrapperWithCommonBlocks>
  );
};
