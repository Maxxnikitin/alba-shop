import clsx from 'clsx';
import { FC, memo, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import styles from './item-details.module.scss';
import { IItemDetailsProps } from './types';

import { ItemGallery } from '..';

import { ItemCharacteristics } from '../item-characteristics';

import { Loader } from '../ui';

import { updateFavoritesCount } from 'src/models';
import {
  deleteFavorite,
  getProduct,
  ResWithData,
  setFavorite,
  TCharacteristic,
  TGetProductRes,
  TTotalItems,
} from '~utils';

export const ItemDetails: FC<IItemDetailsProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TGetProductRes | null>(null);
  const [characteristics, setCharacteristics] = useState<TCharacteristic[] | null>(null);
  const [currentCharacteristic, setCurrentCharacteristic] = useState<TCharacteristic | null>(null);
  const { id } = useParams();
  const { search } = useLocation();

  const [, characteristicId] = useMemo(() => search.split('='), [search]);

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

  const handleToggleLike = useCallback(
    (reqData: ResWithData<TTotalItems>) => {
      if (currentCharacteristic) {
        setCurrentCharacteristic({
          ...currentCharacteristic,
          in_favorite: !currentCharacteristic.in_favorite,
        });
        updateFavoritesCount(reqData.data.total_items);
      }
    },
    [currentCharacteristic],
  );

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

      if (characteristicId) {
        setCurrentCharacteristic(data.characteristics.find(item => item.id === characteristicId)!);
      } else {
        setCurrentCharacteristic(data.characteristics[0]);
      }
    });
  }, [id, characteristicId]);

  if (!currentCharacteristic || !data || !characteristics) {
    return <Loader />;
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
