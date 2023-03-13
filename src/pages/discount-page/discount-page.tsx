import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { IDiscountPageProps } from './types';

import { ItemsWithoutFilters } from '../../components';

import { PageWrapperWithCommonBlocks } from 'src/components';
import { getDiscountItems } from '~utils';

export const DiscountPage: FC<IDiscountPageProps> = ({ className = '', ...rest }) => {
  const { t } = useTranslation();
  console.log('q');

  return (
    <PageWrapperWithCommonBlocks className={className} {...rest}>
      <ItemsWithoutFilters title={t('items.discount-title')} fetchFn={getDiscountItems} />
    </PageWrapperWithCommonBlocks>
  );
};
