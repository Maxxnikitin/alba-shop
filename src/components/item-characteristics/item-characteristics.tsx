import clsx from 'clsx';
import { FC, MouseEventHandler, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

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

import { createCartItemsCatalogFx, updateCartItemsCatalogFx } from 'src/models';
import { TCharacteristic } from '~utils';

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
    const { description, weight, article } = dataObj;
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

    const settings = useMemo(
      () => ({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
        className: styles.swiper,
        arrows: false,
      }),
      [],
    );

    const handleAddToCart: MouseEventHandler<HTMLButtonElement> = useCallback(async () => {
      await createCartItemsCatalogFx({ characteristic_id: id });
      setStateData(prev => ({ ...prev, in_cart: 1 }));
    }, [id]);

    const handleUpdateInCart: (quantity: number) => void = useCallback(
      async quantity => {
        await updateCartItemsCatalogFx({ characteristic_id: id, quantity });
        setStateData(prev => ({ ...prev, in_cart: quantity }));
      },
      [id],
    );

    const handleDeleteFromCart: () => void = useCallback(async () => {
      await updateCartItemsCatalogFx({ characteristic_id: id, quantity: 0 });
      setStateData(prev => ({ ...prev, in_cart: 0 }));
    }, [id]);

    useEffect(() => {
      setStateData(currentCharacteristic);
    }, [currentCharacteristic]);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Title className={styles.title}>{name}</Title>
        <div className={styles.subdata}>
          <Paragraph className={styles.subdata_text}>{`${t(
            'item.article',
          )}: ${article}`}</Paragraph>
          <Paragraph className={styles.subdata_text}>
            {t('item.weight', { amount: weight })}
          </Paragraph>
        </div>
        <CostBox price={price} discount={discount} discountedPrice={discountedPrice} size='large' />
        <Slider {...settings}>
          {Object.values(photo).map((item, i) => (
            <div key={i}>
              <ItemFullPhoto
                photo={item}
                currentCharacteristic={stateData}
                dataObj={dataObj}
                onLikeClick={onLikeClick}
              />
            </div>
          ))}
        </Slider>
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
            disabled={!stock}
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
