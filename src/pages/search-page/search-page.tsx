import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { ISearchPageProps } from './types';

import { ItemsWithoutFilters } from '../../components';

import { PageWrapperWithCommonBlocks } from 'src/components';

export const SearchPage: FC<ISearchPageProps> = ({ className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <PageWrapperWithCommonBlocks className={className} {...rest}>
      <ItemsWithoutFilters title={t('items.search-title')} isSearchPage />
    </PageWrapperWithCommonBlocks>
  );
};
