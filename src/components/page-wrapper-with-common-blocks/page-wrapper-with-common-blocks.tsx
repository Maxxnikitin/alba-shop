import clsx from 'clsx';
import { FC, memo, useContext } from 'react';

import { useLocation } from 'react-router-dom';

import styles from './page-wrapper-with-common-blocks.module.scss';
import { IPageWrapperWithCommonBlocksProps } from './types';

import { EBrands, ItemsBox } from '../items-box';

import { DataContext } from '~utils';

export const PageWrapperWithCommonBlocks: FC<IPageWrapperWithCommonBlocksProps> = memo(
  ({ children, className = '', ...rest }) => {
    const { latestSuggestedItems, bestsellersSuggestedItems } = useContext(DataContext);

    const { pathname } = useLocation();

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        {children}
        {pathname !== '/latest' && <ItemsBox type={EBrands.LATEST} data={latestSuggestedItems} />}
        {pathname !== '/bestsellers' && (
          <ItemsBox type={EBrands.BESTSELLERS} data={bestsellersSuggestedItems} />
        )}
      </div>
    );
  },
);
