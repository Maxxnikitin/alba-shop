import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './personal-data.module.scss';
import { IPersonalDataProps } from './types';

import { Button, EButtonKinds, ETitleLevel, Paragraph, Title } from '../ui';

export const PersonalData: FC<IPersonalDataProps> = memo(({ className = '', ...rest }) => {
  console.log('q');
  const { t } = useTranslation();

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <div className={styles.data_box}>
        <Title level={ETitleLevel.h4} className={styles.title}>
          Name
        </Title>
        <div className={styles.data_list}>
          <Paragraph className={styles.fieldname}>{t('personal-account.data.email')}</Paragraph>
          <Paragraph className={styles.fieldvalue}>{'ex@mail.ru'}</Paragraph>
          <Paragraph className={styles.fieldname}>{t('personal-account.data.phone')}</Paragraph>
          <Paragraph className={styles.fieldvalue}>{'89130000000'}</Paragraph>
          <Paragraph className={styles.fieldname}>{t('personal-account.data.city')}</Paragraph>
          <Paragraph className={styles.fieldvalue}>{'Novosib'}</Paragraph>
          <Paragraph className={styles.fieldname}>{t('personal-account.data.password')}</Paragraph>
          <Paragraph className={styles.fieldvalue}>{'******'}</Paragraph>
        </div>
        <Button
          kind={EButtonKinds.addition}
          className={styles.btn_edit}
          text={t('personal-account.data.btn-edit')}
        />
      </div>
      <div className={styles.status_box}>
        <Title level={ETitleLevel.h4} className={styles.title}>{`${t(
          'personal-account.status.title',
        )} - ${'Basic'}`}</Title>
        <Paragraph className={styles.subtitle}>
          {t('personal-account.status.subtitle', { amount: '500 000P' })}
        </Paragraph>
      </div>
    </div>
  );
});
