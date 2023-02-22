import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './item-characteristics.module.scss';
import { IItemCharacteristicsProps } from './types';

import { Button, CharacteristicsPhotoBox, CostBox, ETitleLevel, Paragraph, Title } from '../ui';

export const ItemCharacteristics: FC<IItemCharacteristicsProps> = memo(
  ({ className = '', characteristics, currentCharacteristic, description, onClick, ...rest }) => {
    const { t } = useTranslation();

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Title className={styles.title}>{currentCharacteristic.name}</Title>
        <div className={styles.subdata}>
          <Paragraph className={styles.subdata_text}>{t('item.article')}: 123123</Paragraph>
          <Paragraph className={styles.subdata_text}>
            {t('item.weight', { amount: currentCharacteristic.weight })}
          </Paragraph>
        </div>
        <CostBox price={currentCharacteristic.price} discount={currentCharacteristic.discount} />
        <CharacteristicsPhotoBox
          className={styles.photos_box}
          characteristics={characteristics}
          currentCharacteristic={currentCharacteristic}
          onClick={onClick}
        />
        <Title level={ETitleLevel.h4} className={styles.description_title}>
          {t('item.description')}
        </Title>
        {description && (
          <ul className={styles.description_list}>
            {description.map((item, i) => (
              <li className={styles.description_list_item} key={i}>
                {item}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.btn_box}>
          <Button text={t('item.btn')} />
          <Paragraph className={styles.stock_text}>
            {t('item.stock', { amount: currentCharacteristic.stock })}
          </Paragraph>
        </div>
      </div>
    );
  },
);
