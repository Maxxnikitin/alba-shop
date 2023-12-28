import clsx from 'clsx';
import { FC, useContext, useEffect, useMemo, useState } from 'react';

import Slider from 'react-slick';

import styles from './main-page.module.scss';
import './main-extra-styles.scss';
import { IMainPageProps } from './types';

import { CatalogMain, DiscountsBox, EBrands, ItemsBox, MainSlide } from '../../components';

import { DataContext, getMainSlides, TMainSlide } from '~utils';

export const MainPage: FC<IMainPageProps> = ({ className = '', ...rest }) => {
  const [slides, setSlides] = useState<TMainSlide[]>([]);

  const settings = useMemo(
    () => ({
      dots: true,
      arrows: false,
      infinite: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      accessibility: true,
      className: styles.swiper,
    }),
    [],
  );

  const { latestSuggestedItems, bestsellersSuggestedItems, brands } = useContext(DataContext);

  useEffect(() => {
    getMainSlides().then(({ data }) => setSlides(data));
  }, []);

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <Slider {...settings}>
        {slides.map(item => (
          <div key={item.id}>
            <MainSlide data={item} />
          </div>
        ))}
      </Slider>
      <div className={styles.main}>
        <CatalogMain />
        <ItemsBox type={EBrands.BRANDS} data={brands} />
        <ItemsBox type={EBrands.LATEST} data={latestSuggestedItems} />
        <ItemsBox type={EBrands.BESTSELLERS} data={bestsellersSuggestedItems} />
        <DiscountsBox />
      </div>
    </section>
  );
};
