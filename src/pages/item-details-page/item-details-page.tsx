import { FC } from 'react';

import { IItemDetailsPageProps } from './types';

import { ItemDetails, PageWrapperWithCommonBlocks } from '../../components';

export const ItemDetailsPage: FC<IItemDetailsPageProps> = ({ className = '', ...rest }) => (
  <PageWrapperWithCommonBlocks className={className} {...rest}>
    <ItemDetails />
  </PageWrapperWithCommonBlocks>
);
