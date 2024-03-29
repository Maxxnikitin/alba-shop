import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { IBestsellersPageProps } from './types';

import { ItemsWithoutFilters } from '../../components';

import { PageWrapperWithCommonBlocks } from 'src/components';
import { getBestsellersItems } from '~utils';

export const BestsellersPage: FC<IBestsellersPageProps> = ({ className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <PageWrapperWithCommonBlocks className={className} {...rest}>
      <ItemsWithoutFilters title={t('items.bestsellers-title')} fetchFn={getBestsellersItems} />
    </PageWrapperWithCommonBlocks>
  );
};
