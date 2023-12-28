import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import styles from './items-box.module.scss';
import { EBrands, IItemsBoxProps } from './types';

import { Item } from '..';
import { ArrowLinkIcon, BrandItem, Button, EButtonKinds, Paragraph, Title } from '../ui';

import { TBrand, TCharacteristic } from '~utils';

export const ItemsBox: FC<IItemsBoxProps> = memo(({ type, data, className = '', ...rest }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isBrands = useMemo(() => type === EBrands.BRANDS, [type]);

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      accessibility: true,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 710,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    [],
  );

  const settingsMob = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      accessibility: true,
      rows: 2,
      slidesPerRow: 2,
    }),
    [],
  );

  const handleClickToRedirect = () => navigate(`/${type}`);

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
      <div className={styles.swiper_box}>
        <Slider {...settings}>
          {data.map(item => (
            <div className={styles.slide} key={item.id}>
              {type === EBrands.BRANDS ? (
                <BrandItem data={item as TBrand} />
              ) : (
                <Item data={item as TCharacteristic} />
              )}
            </div>
          ))}
        </Slider>
      </div>

      <ul className={styles.list_mobile}>
        {isBrands ? (
          <Slider {...settingsMob}>
            {data.map(item => (
              <div className={styles.slide} key={item.id}>
                <BrandItem data={item as TBrand} />
              </div>
            ))}
          </Slider>
        ) : (
          data.map((item, i) => {
            if (i > 6) return null;

            return <Item key={item.id} data={item as TCharacteristic} />;
          })
        )}
      </ul>
      {!isBrands && (
        <Button
          className={styles.btn_mobile}
          kind={EButtonKinds.load}
          text={t(`items.${type}-btn`)}
          onClick={handleClickToRedirect}
        />
      )}
    </section>
  );
});
