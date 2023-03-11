import clsx from 'clsx';
import { FC, memo, useContext } from 'react';

import styles from './page-wrapper-with-common-blocks.module.scss';
import { IPageWrapperWithCommonBlocksProps } from './types';

import { ItemsBox } from '../items-box';

import { DataContext } from '~utils';

export const PageWrapperWithCommonBlocks: FC<IPageWrapperWithCommonBlocksProps> = memo(
  ({ children, className = '', ...rest }) => {
    const { latestSuggestedItems, hitsSuggestedItems } = useContext(DataContext);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        {children}
        <ItemsBox type='latest' data={latestSuggestedItems} />
        <ItemsBox type='hits' data={hitsSuggestedItems} />
      </div>
    );
  },
);
