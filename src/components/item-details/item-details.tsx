import clsx from 'clsx';
import { FC, memo, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import styles from './item-details.module.scss';
import { IItemDetailsProps } from './types';

import { ItemGallery } from '..';

import { ItemCharacteristics } from '../item-characteristics';

import { deleteFavorite, getProduct, setFavorite, TCharacteristic, TGetProductRes } from '~utils';

export const ItemDetails: FC<IItemDetailsProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TGetProductRes | null>(null);
  const [characteristics, setCharacteristics] = useState<TCharacteristic[] | null>(null);
  const [currentCharacteristic, setCurrentCharacteristic] = useState<TCharacteristic | null>(null);
  const { id } = useParams();
  const { search } = useLocation();

  const [_, characteristicId] = useMemo(() => search.split('='), [search]);

  const characteristicsMap: Record<string, TCharacteristic> | undefined = useMemo(
    () => characteristics?.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
    [characteristics],
  );

  const handleChangeCurrentCharacteristic: MouseEventHandler<HTMLImageElement> = useCallback(
    ({ target }) => {
      const { id } = target as HTMLImageElement;
      console.log(characteristicsMap);
      if (characteristicsMap) setCurrentCharacteristic(characteristicsMap[id]);
    },
    [characteristicsMap],
  );

  const handleToggleLike = useCallback(() => {
    if (currentCharacteristic) {
      setCurrentCharacteristic({
        ...currentCharacteristic,
        in_favorite: !currentCharacteristic.in_favorite,
      });
    }
  }, [currentCharacteristic]);

  const handleLikeRequest: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (characteristics && currentCharacteristic) {
      if (currentCharacteristic.in_favorite) {
        deleteFavorite(currentCharacteristic.id).then(handleToggleLike);
      } else {
        setFavorite({ characteristic_id: currentCharacteristic.id }).then(handleToggleLike);
      }
    }
  }, [characteristics, currentCharacteristic, handleToggleLike]);

  useEffect(() => {
    getProduct(id!).then(({ data }) => {
      setData(data);
      setCharacteristics(data.characteristics);

      setCurrentCharacteristic(data.characteristics.find(item => item.id === characteristicId)!);
    });
  }, [id, characteristicId]);

  if (!currentCharacteristic || !data || !characteristics) {
    return <p>loader</p>;
  }

  return (
    <div className={clsx(styles.main_box, className)} {...rest}>
      <ItemGallery
        className={styles.gallery}
        dataObj={data}
        currentCharacteristic={currentCharacteristic}
        onLikeClick={handleLikeRequest}
      />
      <ItemCharacteristics
        characteristics={characteristics}
        currentCharacteristic={currentCharacteristic}
        dataObj={data}
        onClick={handleChangeCurrentCharacteristic}
        onLikeClick={handleLikeRequest}
      />
    </div>
  );
});
