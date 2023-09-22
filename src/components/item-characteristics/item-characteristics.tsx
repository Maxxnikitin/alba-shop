import clsx from 'clsx';
import { FC, MouseEventHandler, memo, useCallback, useState } from 'react';
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

import {
  TCharacteristic,
  createCartPosition,
  deleteCartPosition,
  updateCartPosition,
} from '~utils';

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
    const [stateData, setStateData] = useState<TCharacteristic>(currentCharacteristic);
    const { description, weight } = dataObj;
    const {
      id,
      name,
      discount,
      price,
      photo,
      stock,
      discounted_price: discountedPrice,
    } = stateData;

    const { t } = useTranslation();

    const handleAddToCart: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
      createCartPosition({ characteristic_id: id, quantity: 1 }).then(() =>
        setStateData(prev => ({ ...prev, in_cart: 1 })),
      );
    }, [id]);

    const handleUpdateInCart: (quantity: number) => void = useCallback(
      quantity => {
        updateCartPosition({ characteristic_id: id, quantity }).then(() =>
          setStateData(prev => ({ ...prev, in_cart: quantity })),
        );
      },
      [id],
    );

    const handleDeleteFromCart: () => void = useCallback(() => {
      deleteCartPosition(id).then(() => setStateData(prev => ({ ...prev, in_cart: 0 })));
    }, [id]);

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
                currentCharacteristic={stateData}
                dataObj={dataObj}
                onLikeClick={onLikeClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <CharacteristicsPhotoBox
          className={styles.photos_box}
          characteristics={characteristics}
          currentCharacteristic={stateData}
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
          <CartButton
            handleAddToCart={handleAddToCart}
            handleUpdateInCart={handleUpdateInCart}
            handleDeleteFromCart={handleDeleteFromCart}
            max={stock}
            amount={stateData.in_cart}
          />
          {!!stock && (
            <Paragraph className={styles.stock_text}>
              {t('item.stock', { amount: stock })}
            </Paragraph>
          )}
        </div>
      </div>
    );
  },
);
