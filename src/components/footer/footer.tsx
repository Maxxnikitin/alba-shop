import clsx from 'clsx';
import { FC, memo, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './footer.module.scss';
import { IFooterProps } from './types';

import { CategoryItem, Paragraph } from '../ui';

import { TCategory } from '~utils';

const mockData = [
  {
    type: 'categories',
    id: 1,
    name: 'Защитные чехлы',
    icon: '../../images/icons/case.svg',
    photo: 'photo/glass_photo.jpg',
    level: 0,
    slug: 'stekla-dlya-iphone',
    parend_id: null,
  },
  {
    type: 'categories',
    id: 2,
    name: 'Защитные стёкла',
    icon: '../../images/icons/case.svg',
    photo: 'photo/glass_photo.jpg',
    level: 0,
    slug: 'stekla-dlya-iphone',
    parend_id: null,
  },
  {
    type: 'categories',
    id: 3,
    name: 'Ремешки',
    icon: '../../images/icons/case.svg',
    photo: 'photo/glass_photo.jpg',
    level: 0,
    slug: 'stekla-dlya-iphone',
    parend_id: null,
  },
  {
    type: 'categories',
    id: 4,
    name: 'Зарядные устройства',
    icon: '../../images/icons/case.svg',
    photo: 'photo/glass_photo.jpg',
    level: 0,
    slug: 'stekla-dlya-iphone',
    parend_id: null,
  },

  {
    type: 'categories',
    id: 7,
    name: 'Кабели',
    icon: '../../images/icons/case.svg',
    photo: 'photo/glass_photo.jpg',
    level: 0,
    slug: 'stekla-dlya-iphone',
    parend_id: null,
  },
  {
    type: 'categories',
    id: 8,
    name: 'Колонки и наушники',
    icon: '../../images/icons/case.svg',
    photo: 'photo/glass_photo.jpg',
    level: 0,
    slug: 'stekla-dlya-iphone',
    parend_id: null,
  },
  {
    type: 'categories',
    id: 9,
    name: 'Детские товары',
    icon: '../../../images/icons/cable.svg',
    photo: 'photo/glass_photo.jpg',
    level: 0,
    slug: 'stekla-dlya-iphone',
    parend_id: null,
  },
  {
    type: 'categories',
    id: 5,
    name: 'Гаджеты',
    icon: '../../images/icons/case.svg',
    photo: 'photo/glass_photo.jpg',
    level: 0,
    slug: 'stekla-dlya-iphone',
    parend_id: null,
  },
  {
    type: 'categories',
    id: 6,
    name: 'Автотовары',
    icon: '../../images/icons/case.svg',
    photo: 'photo/glass_photo.jpg',
    level: 0,
    slug: 'stekla-dlya-iphone',
    parend_id: null,
  },
];

export const Footer: FC<IFooterProps> = memo(({ className = '', ...rest }) => {
  const [categories, setCategories] = useState<TCategory[] | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    // getCategories().then(res => setCategories(res))
    setCategories(mockData);
  }, [categories]);

  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <div className={styles.container}>
        <ul className={styles.main}>
          <Paragraph className={styles.title} isGradient>
            {t('footer.title-items')}
          </Paragraph>
          {categories?.map(item => (
            <CategoryItem text={item.name} key={item.id} icon={item.icon} />
          ))}
        </ul>
        <div className={styles.about}>
          <Paragraph className={styles.title} isGradient>
            {t('footer.title-about')}
          </Paragraph>
          <nav className={styles.about_box}>
            <Link className={clsx(styles.link, styles.text, styles.about_text)} to='/faq'>
              {t('footer.faq-link')}
            </Link>
            <Link className={clsx(styles.link, styles.text, styles.about_text)} to='/about'>
              {t('footer.about-link')}
            </Link>
          </nav>
          <div className={styles.about_box}>
            <a
              className={clsx(styles.text, styles.phone, styles.about_text)}
              href='tel:+74993423324'
            >
              +7 (499) 342-33-24
            </a>
            <a
              className={clsx(styles.text, styles.phone, styles.about_text)}
              href='tel:+74991103359'
            >
              +7 (499) 110-33-59
            </a>
            <a className={clsx(styles.text, styles.about_text)} href='mailto:alba.frolov@gmail.com'>
              alba.frolov@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className={clsx(styles.container, styles.container_copyright)}>
        <div className={styles.text_box}>
          <Paragraph className={styles.copyright_text}>{t('footer.privacy')}</Paragraph>
          <Paragraph className={styles.copyright_text}>{t('footer.copyright')}</Paragraph>
        </div>
        <ul className={styles.social_links}>
          <li className={styles.social_list_item}>
            <a
              className={clsx(styles.social_link, styles.social_link_tg)}
              target='_blank'
              href='https://vk.com'
              rel='noreferrer'
            >
              {' '}
            </a>
          </li>
          <li className={styles.social_list_item}>
            <a
              className={clsx(styles.social_link, styles.social_link_insta)}
              target='_blank'
              href='https://vk.com'
              rel='noreferrer'
            >
              {' '}
            </a>
          </li>
          <li className={styles.social_list_item}>
            <a
              className={clsx(styles.social_link, styles.social_link_vk)}
              target='_blank'
              href='https://vk.com'
              rel='noreferrer'
            >
              {' '}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
});
