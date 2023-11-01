import { FC, useContext } from 'react';

import { useParams } from 'react-router-dom';

import styles from './brand-page.module.scss';
import { IBrandsPageProps } from './types';

import { PageWrapperWithCommonBlocks, BrandItems, ItemsBox, EBrands } from '../../components';

import { Breadcrumbs } from 'src/components/ui';
import { DataContext } from '~utils';

export const BrandsPage: FC<IBrandsPageProps> = ({ className = '', ...rest }) => {
  const { brands } = useContext(DataContext);
  const { brand } = useParams();

  return (
    <PageWrapperWithCommonBlocks className={className} {...rest}>
      <div className={styles.content}>
        <Breadcrumbs brandName={brand?.split('_')[1]} />
        {brand ? <BrandItems /> : <ItemsBox type={EBrands.BRANDS} data={brands} />}
      </div>
    </PageWrapperWithCommonBlocks>
  );
};
