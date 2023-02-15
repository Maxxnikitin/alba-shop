import clsx from 'clsx';
import { FC, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './category-item.module.scss';
import { EIconType, ICategoryItem } from './types';

import cableIcon from '../../../images/icons/cable.svg';
import carIcon from '../../../images/icons/car.svg';
import caseIcon from '../../../images/icons/case.svg';
import chargingIcon from '../../../images/icons/charging.svg';
import childIcon from '../../../images/icons/child.svg';
import gadgetIcon from '../../../images/icons/gadget.svg';
import glassIcon from '../../../images/icons/glass.svg';
import headphoneIcon from '../../../images/icons/headphone.svg';
import strapIcon from '../../../images/icons/strap.svg';
import { Paragraph } from '../paragraph';

export const CategoryItem: FC<ICategoryItem> = ({
  text,
  className = '',
  icon = EIconType.caseIcon,
  ...rest
}) => {
  const { t } = useTranslation();

  const iconsData = useMemo(
    () => ({
      cableIcon,
      carIcon,
      caseIcon,
      chargingIcon,
      childIcon,
      gadgetIcon,
      glassIcon,
      headphoneIcon,
      strapIcon,
    }),
    [],
  );

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <img src={iconsData[icon]} alt={t('alts.category-icon') || ''} />
      <Paragraph className={styles.text}>{text}</Paragraph>
    </div>
  );
};
