import clsx from 'clsx';
import { FC, memo, useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './footer.module.scss';
import { IFooterProps } from './types';

import { SocialIcons } from '..';
import { CategoryItem, Paragraph } from '../ui';

import { DataContext } from '~utils';

export const Footer: FC<IFooterProps> = memo(({ className = '', ...rest }) => {
  const { contacts, categories } = useContext(DataContext);

  const { t } = useTranslation();

  if (!contacts) return <div>loader</div>;

  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <div className={styles.container}>
        <ul className={styles.main}>
          <Paragraph className={styles.title} isGradient>
            {t('footer.title-items')}
          </Paragraph>
          {categories.map(item => (
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
              className={clsx(styles.link, styles.text, styles.phone, styles.about_text)}
              href={`tel:${contacts.phone}`}
            >
              {contacts.phone}
            </a>
            <a
              className={clsx(styles.link, styles.text, styles.about_text)}
              href={`mailto:${contacts.email}`}
            >
              {contacts.email}
            </a>
          </div>
        </div>
      </div>
      <div className={clsx(styles.container, styles.container_copyright)}>
        <div className={styles.text_box}>
          <Paragraph className={styles.copyright_text}>{t('footer.privacy')}</Paragraph>
          <Paragraph className={styles.copyright_text}>{t('footer.copyright')}</Paragraph>
        </div>
        <SocialIcons className={styles.social_links} contactsData={contacts} />
      </div>
    </footer>
  );
});
