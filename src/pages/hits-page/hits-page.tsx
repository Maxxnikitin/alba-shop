import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import { IHitsPageProps } from './types';

import { ItemsWithoutFilters } from '../../components';

import { PageWrapperWithCommonBlocks } from 'src/components';
import { getHitsItems } from '~utils';

export const HitsPage: FC<IHitsPageProps> = memo(({ className = '', ...rest }) => {
  const { t } = useTranslation();
  console.log('q');

  return (
    <PageWrapperWithCommonBlocks className={className} {...rest}>
      <ItemsWithoutFilters title={t('items.hits-title')} fetchFn={getHitsItems} />
    </PageWrapperWithCommonBlocks>
  );
});
