import clsx from 'clsx';
import { FC, useContext, useEffect, useState } from 'react';

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './main-page.module.scss';
import './main-extra-styles.scss';
import { IMainPageProps } from './types';

import { CatalogMain, DiscountsBox, EBrands, ItemsBox, MainSlide } from '../../components';

import { DataContext, getMainSlides, TMainSlide } from '~utils';

export const MainPage: FC<IMainPageProps> = ({ className = '', ...rest }) => {
  const [slides, setSlides] = useState<TMainSlide[]>([]);

  const { latestSuggestedItems, bestsellersSuggestedItems, brands } = useContext(DataContext);

  useEffect(() => {
    getMainSlides().then(({ data }) => setSlides(data));
  }, []);

  return (
    <section className={clsx(styles.container, className)} {...rest}>
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
        {slides.map(item => (
          <SwiperSlide key={item.id}>
            <MainSlide data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
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
