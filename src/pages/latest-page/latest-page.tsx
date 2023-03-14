import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { ILatestPageProps } from './types';

import { ItemsWithoutFilters, PageWrapperWithCommonBlocks } from '../../components';

import { getLatestItems } from '~utils';

export const LatestPage: FC<ILatestPageProps> = ({ className = '', ...rest }) => {
  const { t } = useTranslation();
  console.log('q');

  return (
    <PageWrapperWithCommonBlocks className={className} {...rest}>
      <ItemsWithoutFilters title={t('items.latest-title')} fetchFn={getLatestItems} />
    </PageWrapperWithCommonBlocks>
  );
};
