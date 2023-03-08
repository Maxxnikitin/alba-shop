import clsx from 'clsx';
import { FC, memo, useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './about-page.module.scss';
import { IAboutPageProps } from './types';

import { Contacts, SocialIcons } from '../../components';
import { Title, Paragraph } from '../../components/ui';
import img from '../../images/about.jpg';

import { DataContext } from '~utils';

export const AboutPage: FC<IAboutPageProps> = memo(({ className = '', ...rest }) => {
  const [aboutText, setAboutText] = useState('');
  const { contacts } = useContext(DataContext);

  const { t } = useTranslation();

  useEffect(() => {
    // getAboutInfo().then(res => setAboutText(res.text));
    setAboutText(
      'Повседневная практика показывает, что внедрение современных методик выявляет срочную потребность модели развития. Прежде всего, высокотехнологичная концепция общественного уклада требует определения и уточнения соответствующих условий активизации. Как принято считать, непосредственные участники технического прогресса являются только методом политического участия и ассоциативно распределены по отраслям. ',
    );
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
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2819.8111710142707!2d38.958102615451274!3d45.0287585704135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f04fa5fdab425f%3A0xd09e60dccfdc40f4!2z0YPQuy4g0KfQutCw0LvQvtCy0LAsIDEsINCa0YDQsNGB0L3QvtC00LDRgCwg0JrRgNCw0YHQvdC-0LTQsNGA0YHQutC40Lkg0LrRgNCw0LksIDM1MDAwMA!5e0!3m2!1sru!2sru!4v1678171046142!5m2!1sru!2sru'
        title='address'
        width='100%'
        height='375'
        style={{ border: 'none', maxWidth: 1366 }}
        loading='lazy'
      />
    </section>
  );
});
