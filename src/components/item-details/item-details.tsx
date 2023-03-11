import clsx from 'clsx';
import { FC, memo, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './item-details.module.scss';
import { IItemDetailsProps } from './types';

import { ItemGallery, PageWrapperWithCommonBlocks } from '..';

import { ItemCharacteristics } from '../item-characteristics';

import { TCharacteristic, TGetProductRes } from '~utils';

const mockData = {
  type: 'products',
  id: 'string',
  name: 'Чехол Luxo original',
  has_discount: true,
  description: ['Плотный силикон', 'Глянец', 'В защитной пленке'],
  photo: 'https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg',
  category_id: 2,
  min_price: '300.00',
  article: '00-00000333',
  weight: 20,
  in_stock: true,
  characteristics: [
    {
      type: 'characteristics',
      id: 'rrewecdsc',
      name: 'Чехол Luxo original green',
      product_id: 'string44',
      weight: 10,
      stock: 20,
      in_cart: 0,
      price: '510.00',
      discount: 0,
      discounted_price: '510.00',
      color: 'Black',
      is_new: true,
      is_hit: true,
      in_favorite: false,
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
      discount: 20,
      discounted_price: '310.00',
      color: 'Black',
      is_new: true,
      is_hit: true,
      in_favorite: false,
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
      discount: 13,
      discounted_price: '310.00',
      color: 'Black',
      is_new: true,
      is_hit: false,
      in_favorite: false,
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
      discount: 21,
      discounted_price: '290.00',
      color: 'Black',
      is_new: false,
      is_hit: true,
      in_favorite: false,
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
      discount: 15,
      discounted_price: '340.00',
      color: 'Black',
      is_new: true,
      is_hit: true,
      in_favorite: false,
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
      discount: 30,
      discounted_price: '280.00',
      color: 'Black',
      is_new: true,
      is_hit: true,
      in_favorite: false,
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
  const [characteristics, setCharacteristics] = useState<TCharacteristic[] | null>(null);
  const [currentCharacteristic, setCurrentCharacteristic] = useState<TCharacteristic | null>(null);
  const { id } = useParams();

  const characteristicsMap: Record<string, TCharacteristic> | undefined = useMemo(
    () => characteristics?.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
    [characteristics],
  );

  const handleChangeCurrentCharacteristic: MouseEventHandler<HTMLImageElement> = useCallback(
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
              in_favorite: !currentCharacteristic.in_favorite,
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
    <PageWrapperWithCommonBlocks className={className} {...rest}>
      <div className={styles.main_box}>
        <ItemGallery
          className={styles.gallery}
          dataObj={data}
          currentCharacteristic={currentCharacteristic}
          onLikeClick={handleLikeToggle}
        />
        <ItemCharacteristics
          characteristics={characteristics}
          currentCharacteristic={currentCharacteristic}
          dataObj={data}
          onClick={handleChangeCurrentCharacteristic}
          onLikeClick={handleLikeToggle}
        />
      </div>
    </PageWrapperWithCommonBlocks>
  );
});
