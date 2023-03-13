import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import { IDiscountWithPercentPageProps } from './types';

import { ItemsWithoutFilters } from '../../components';

import { PageWrapperWithCommonBlocks } from 'src/components';
import { getDiscountItems } from '~utils';

export const DiscountWithPercentPage: FC<IDiscountWithPercentPageProps> = ({
  className = '',
  ...rest
}) => {
  const { t } = useTranslation();
  const { percent } = useParams();
  console.log('q');

  return (
    <PageWrapperWithCommonBlocks className={className} {...rest}>
      <ItemsWithoutFilters
        title={t('items.discount-with-percent-title', { percent })}
        fetchFn={getDiscountItems}
        additionalQuery={`percent=${percent}`}
      />
    </PageWrapperWithCommonBlocks>
  );
};
