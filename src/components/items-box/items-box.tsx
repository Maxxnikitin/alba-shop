import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './items-box.module.scss';
import { IItemsBoxProps } from './types';

import { Item } from '..';
import arrowIcon from '../../images/icons/arrow-link.svg';
import { Button, EButtonKinds, Paragraph, Title } from '../ui';

export const ItemsBox: FC<IItemsBoxProps> = memo(({ type, data, className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <Title className={styles.title}>{t(`items.${type}-title`)}</Title>
      <Link to={`/${type}`} className={styles.link}>
        <Paragraph className={styles.text}>
          {t(`items.${type}-action`)}{' '}
          <img className={styles.img} src={arrowIcon} alt={t('alts.arrow-icon') || ''} />
        </Paragraph>
      </Link>
      <Swiper
        slidesPerView='auto'
        spaceBetween={20}
        loop
        navigation
        modules={[Navigation]}
        className={styles.swiper}
      >
        {data.map(item => (
          <SwiperSlide className={styles.slide} key={item.id}>
            <Item data={item} onLikeClick={() => console.log('like')} />
          </SwiperSlide>
        ))}
      </Swiper>
      <ul className={styles.list_mobile}>
        {data.map(item => (
          <Item key={item.id} data={item} onLikeClick={() => console.log('like')} />
        ))}
      </ul>
      <Button
        className={styles.btn_mobile}
        kind={EButtonKinds.load}
        text={t(`items.${type}-btn`)}
      />
    </section>
  );
});
