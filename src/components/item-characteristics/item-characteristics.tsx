import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './item-characteristics.module.scss';
import { IItemCharacteristicsProps } from './types';

import {
  CartButton,
  CharacteristicsPhotoBox,
  CostBox,
  ETitleLevel,
  ItemFullPhoto,
  Paragraph,
  Title,
} from '../ui';

export const ItemCharacteristics: FC<IItemCharacteristicsProps> = memo(
  ({
    className = '',
    characteristics,
    currentCharacteristic,
    dataObj,
    onClick,
    onLikeClick,
    ...rest
  }) => {
    const { description, weight } = dataObj;
    const {
      name,
      discount,
      price,
      photo,
      stock,
      discounted_price: discountedPrice,
    } = currentCharacteristic;

    const { t } = useTranslation();

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Title className={styles.title}>{name}</Title>
        <div className={styles.subdata}>
          <Paragraph className={styles.subdata_text}>{t('item.article')}: 123123</Paragraph>
          <Paragraph className={styles.subdata_text}>
            {t('item.weight', { amount: weight })}
          </Paragraph>
        </div>
        <CostBox price={price} discount={discount} discountedPrice={discountedPrice} size='large' />
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop
          // onUpdate={swiper => console.log(swiper)}
          pagination={{
            clickable: true,
          }}
          navigation
          modules={[Navigation, Pagination]}
          className={styles.swiper}
        >
          {Object.values(photo).map((item, i) => (
            <SwiperSlide key={i}>
              <ItemFullPhoto
                photo={item}
                currentCharacteristic={currentCharacteristic}
                dataObj={dataObj}
                onLikeClick={onLikeClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
          <CartButton max={10} amount={currentCharacteristic.in_cart} />
          {stock ? (
            <Paragraph className={styles.stock_text}>
              {t('item.stock', { amount: stock })}
            </Paragraph>
          ) : null}
        </div>
      </div>
    );
  },
);
