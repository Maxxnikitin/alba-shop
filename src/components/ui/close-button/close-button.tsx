import clsx from 'clsx';
import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './close-button.module.scss';

import { ICloseButton } from './types';

import { Paragraph } from '..';

import crossIcon from '../../../images/icons/cross.svg';

export const CloseButton: FC<ICloseButton> = ({
  className = '',
  textClassName = '',
  text,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <button className={clsx(styles.button, className)} {...rest}>
      {text && <Paragraph className={clsx(styles.text, textClassName)}>{text}</Paragraph>}
      <img src={crossIcon} alt={t('alts.close-btn') || ''} />
    </button>
  );
};
