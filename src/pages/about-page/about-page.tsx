import clsx from 'clsx';
import { FC, useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './about-page.module.scss';
import { IAboutPageProps } from './types';

import { Contacts, SocialIcons } from '../../components';
import { Title, Paragraph } from '../../components/ui';
import img from '../../images/about.jpg';

import { DataContext, getAboutInfo } from '~utils';

export const AboutPage: FC<IAboutPageProps> = ({ className = '', ...rest }) => {
  const [aboutText, setAboutText] = useState('');
  const { contacts } = useContext(DataContext);
  console.log(contacts);

  const { t } = useTranslation();

  useEffect(() => {
    getAboutInfo().then(res => setAboutText(res.text));
  }, []);

  if (!contacts) return <div>loader</div>;

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <div className={styles.main_content}>
        <div className={styles.column}>
          <Title className={styles.title}>{t('about.about-title')}</Title>
          <img className={styles.mobile_img} src={img} alt={t('alts.about') || ''} />
          <Paragraph className={styles.text}>{aboutText}</Paragraph>
          <Title className={styles.title}>{t('about.contacts-title')}</Title>
          <Contacts data={contacts} className={styles.contacts} />
          <Title className={styles.title}>{t('about.social-title')}</Title>
          <SocialIcons className={styles.socials} contactsData={contacts} isDark />
        </div>
        <div className={styles.img_box}>
          <img className={styles.img} src={img} alt={t('alts.about') || ''} />
        </div>
      </div>
      <iframe
        src={contacts.map_link}
        title='address'
        width='100%'
        height='375'
        style={{ border: 'none', maxWidth: 1366 }}
        loading='lazy'
      />
    </section>
  );
};
