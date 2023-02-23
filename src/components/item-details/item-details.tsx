import clsx from 'clsx';
import { FC, memo, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './item-details.module.scss';
import { IItemDetailsProps } from './types';

import { ItemGallery } from '..';

import { ItemCharacteristics } from '../item-characteristics';

import { getProduct, TCharacteristics, TGetProductRes } from '~utils';

const mockData = {
  type: 'products',
  id: 'string',
  name: 'Чехол Luxo original',
  is_hit: true,
  is_new: true,
  has_discount: true,
  description: ['Плотный силикон', 'Глянец', 'В защитной пленке'],
  photo: 'https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg',
  category_id: 2,
  min_price: '300.00',
  in_stock: true,
  characteristics: [
    {
      type: 'characteristics',
      id: 'rrewecdsc',
      name: 'Чехол Luxo original green',
      product_id: 'string44',
      weight: 10,
      stock: 0,
      in_cart: 0,
      price: '510.00',
      discount: '10.00',
      color: 'Black',
      in_favourite: false,
      photo: [
        'https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg',
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        'https://img.mvideo.ru/Pdb/50129627b.jpg',
        'https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg',
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        'https://img.mvideo.ru/Pdb/50129627b.jpg',
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
      ],
    },
    {
      type: 'characteristics',
      id: 'rrewecdscs',
      name: 'Чехол Luxo original gray',
      product_id: 'string44',
      weight: 10,
      stock: 0,
      in_cart: 0,
      price: '487.00',
      discount: '0.00',
      color: 'Black',
      in_favourite: false,
      photo: [
        'https://mykapitan.ru/wp-content/uploads/2022/11/01-12.jpg',
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        'https://img.mvideo.ru/Pdb/50129627b.jpg',
      ],
    },
    {
      type: 'characteristics',
      id: 'rrewecdscd',
      name: 'Чехол Luxo original yellow',
      product_id: 'string44',
      weight: 10,
      stock: 200,
      in_cart: 0,
      price: '460.00',
      discount: '13.00',
      color: 'Black',
      in_favourite: false,
      photo: [
        'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        'https://img.mvideo.ru/Pdb/50129627b.jpg',
      ],
    },
    {
      type: 'characteristics',
      id: 'rrewecdscf',
      name: 'Чехол Luxo original black',
      product_id: 'string44',
      weight: 10,
      stock: 200,
      in_cart: 0,
      price: '410.00',
      discount: '21.00',
      color: 'Black',
      in_favourite: false,
      photo: [
        'https://белоеяблоко.рф/upload/resize_cache/iblock/e98/800_800_1a1fde8d5e7dcaa11be442336c9d37f5e/y3xladtiypp4q4asb15458430j8h59wv.jpeg',
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        'https://img.mvideo.ru/Pdb/50129627b.jpg',
      ],
    },
    {
      type: 'characteristics',
      id: 'rrewecdscdt',
      name: 'Чехол Luxo original yellow',
      product_id: 'string44',
      weight: 10,
      stock: 200,
      in_cart: 0,
      price: '460.00',
      discount: '13.00',
      color: 'Black',
      in_favourite: false,
      photo: [
        'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        'https://img.mvideo.ru/Pdb/50129627b.jpg',
      ],
    },
    {
      type: 'characteristics',
      id: 'rrewecdscfr',
      name: 'Чехол Luxo original black',
      product_id: 'string44',
      weight: 10,
      stock: 200,
      in_cart: 0,
      price: '410.00',
      discount: '21.00',
      color: 'Black',
      in_favourite: false,
      photo: [
        'https://белоеяблоко.рф/upload/resize_cache/iblock/e98/800_800_1a1fde8d5e7dcaa11be442336c9d37f5e/y3xladtiypp4q4asb15458430j8h59wv.jpeg',
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        'https://img.mvideo.ru/Pdb/50129627b.jpg',
      ],
    },
  ],
};

export const ItemDetails: FC<IItemDetailsProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TGetProductRes | null>(null);
  const [characteristics, setCharacteristics] = useState<TCharacteristics[] | null>(null);
  const [currentCharacteristic, setCurrentCharacteristic] = useState<TCharacteristics | null>(null);
  const { id } = useParams();

  const characteristicsMap: Record<string, TCharacteristics> | undefined = useMemo(
    () => characteristics?.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
    [characteristics],
  );

  const handleChangecurrentCharacteristic: MouseEventHandler<HTMLImageElement> = useCallback(
    ({ target }) => {
      const { id } = target as HTMLImageElement;
      if (characteristicsMap) setCurrentCharacteristic(characteristicsMap[id]);
    },
    [characteristicsMap],
  );

  const handleLikeToggle: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (characteristics && currentCharacteristic) {
      setCharacteristics(
        characteristics.map(item => {
          if (item.id === currentCharacteristic.id) {
            const updatedObj = {
              ...currentCharacteristic,
              in_favourite: !currentCharacteristic.in_favourite,
            };
            setCurrentCharacteristic(updatedObj);
            return updatedObj;
          } else {
            return item;
          }
        }),
      );
    }
  }, [characteristics, currentCharacteristic]);

  useEffect(() => {
    // getProduct(id!).then(res => setData(res))
    setData(mockData);
    setCharacteristics(mockData.characteristics);

    for (let item of mockData.characteristics) {
      if (item.stock > 0) {
        setCurrentCharacteristic(item);
        return;
      }
    }
    setCurrentCharacteristic(mockData.characteristics[0]);
  }, [id]);

  if (!currentCharacteristic || !data || !characteristics) {
    return <p>loader</p>;
  }

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <ItemGallery
        className={styles.gallery}
        photos={currentCharacteristic.photo}
        inFavourite={currentCharacteristic.in_favourite}
        isNew={data?.is_new}
        isHit={data?.is_hit}
        onLikeClick={handleLikeToggle}
      />
      <ItemCharacteristics
        characteristics={characteristics}
        currentCharacteristic={currentCharacteristic}
        description={data.description}
        isNew={data.is_new}
        isHit={data.is_hit}
        inFavourite={currentCharacteristic.in_favourite}
        onClick={handleChangecurrentCharacteristic}
        onLikeClick={handleLikeToggle}
      />
    </div>
  );
});
