import clsx from 'clsx';
import { FC, memo, useEffect, useState } from 'react';
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
      stock: 200,
      in_cart: 0,
      price: '510.00',
      discount: '10.00',
      color: 'Black',
      in_favourite: false,
      photo: [
        'https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg',
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        'https://img.mvideo.ru/Pdb/50129627b.jpg',
      ],
    },
  ],
};

export const ItemDetails: FC<IItemDetailsProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TGetProductRes | null>(null);
  const [characteristics, setCharacteristics] = useState<TCharacteristics[] | null>(null);
  const [currentCharacteristics, setCurrentCharacteristics] = useState<TCharacteristics | null>(
    null,
  );
  const { id } = useParams();

  useEffect(() => {
    // getProduct(id!).then(res => setData(res))
    setData(mockData);
    setCharacteristics(mockData.characteristics);
  }, [id]);

  useEffect(() => {
    if (characteristics?.length) {
      for (let item of characteristics) {
        if (item.stock > 0) {
          setCurrentCharacteristics(item);
          return;
        }
      }
      setCurrentCharacteristics(characteristics[0]);
    }
  }, [characteristics]);

  if (!currentCharacteristics || !data || !characteristics) {
    return <p>loader</p>;
  }

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <ItemGallery
        photos={currentCharacteristics.photo}
        inFavourite={currentCharacteristics.in_favourite}
        isNew={data?.is_new}
        isHit={data?.is_hit}
      />
      <ItemCharacteristics
        characteristics={characteristics}
        currentCharacteristic={currentCharacteristics}
        description={data.description}
      />
    </div>
  );
});
