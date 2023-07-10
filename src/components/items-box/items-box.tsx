import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './items-box.module.scss';
import { EBrands, IItemsBoxProps } from './types';

import { Item } from '..';
import { ArrowLinkIcon, BrandItem, Button, EButtonKinds, Paragraph, Title } from '../ui';

import { TBrand, TCharacteristic } from '~utils';

export const ItemsBox: FC<IItemsBoxProps> = memo(({ type, data, className = '', ...rest }) => {
  const { t } = useTranslation();

  const isBrands = useMemo(() => type === EBrands.BRANDS, [type]);

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <Title className={styles.title}>{t(`items.${type}-title`)}</Title>
      {!isBrands && (
        <Link to={`/${type}`} className={styles.link}>
          <Paragraph className={styles.text}>
            {t(`items.${type}-action`)} <ArrowLinkIcon className={styles.icon} />
          </Paragraph>
        </Link>
      )}
      <Swiper
        slidesPerView='auto'
        spaceBetween={isBrands ? 24 : 20}
        loop
        navigation
        modules={[Navigation]}
        className={styles.swiper}
      >
        {data.map(item => (
          <SwiperSlide className={styles.slide} key={item.id}>
            {type === EBrands.BRANDS ? (
              <BrandItem data={item as TBrand} />
            ) : (
              <Item data={item as TCharacteristic} onLikeClick={() => console.log('like')} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <ul className={styles.list_mobile}>
        {data.map(item =>
          isBrands ? (
            <BrandItem key={item.id} data={item as TBrand} />
          ) : (
            <Item
              key={item.id}
              data={item as TCharacteristic}
              onLikeClick={() => console.log('like')}
            />
          ),
        )}
      </ul>
      {!isBrands && (
        <Button
          className={styles.btn_mobile}
          kind={EButtonKinds.load}
          text={t(`items.${type}-btn`)}
        />
      )}
    </section>
  );
});
