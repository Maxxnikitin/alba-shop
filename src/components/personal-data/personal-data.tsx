import clsx from 'clsx';
import { FC, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './personal-data.module.scss';
import { IPersonalDataProps, TStatusData } from './types';

import { Button, EButtonKinds, ETitleLevel, Paragraph, Title } from '../ui';

import { getUser, getUserLoyalties, TLoyalties, TUser } from '~utils';

export const PersonalData: FC<IPersonalDataProps> = memo(({ className = '', ...rest }) => {
  const [userData, setUserData] = useState<TUser | null>(null);
  const [loyalties, setLoyalties] = useState<TLoyalties[] | null>(null);
  const [statusData, setStatusData] = useState<TStatusData | null>(null);

  console.log(statusData);

  const { t } = useTranslation();

  useEffect(() => {
    Promise.all([getUser(), getUserLoyalties()])
      .then(([user, loyalty]) => {
        setUserData(user.data);
        setLoyalties(loyalty.data);

        const myAmount = Math.floor(+user.data.order_amount);
        const endSum = loyalty.data[loyalty.data.length - 1].order_amount;

        const linePercent = myAmount === 0 ? 0 : (myAmount / endSum) * 100;

        let myStatus = { name: '', otherSum: 0 };

        for (let i = 0; i < loyalty.data.length; i++) {
          if (myAmount >= loyalty.data[i].order_amount) {
            myStatus.name = loyalty.data[i].name;
          } else {
            myStatus.otherSum = loyalty.data[i].order_amount - myAmount;
            break;
          }
        }

        setStatusData({ linePercent, myStatus });
      })
      .catch(err => console.log(err));
  }, []);

  if (!userData) return <p>loader</p>;

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <div className={styles.data_box}>
        <Title level={ETitleLevel.h4} className={styles.title}>
          {`${userData.first_name} ${userData.last_name}`}
        </Title>
        <div className={styles.data_list}>
          <Paragraph className={styles.fieldname}>{t('personal-account.data.email')}</Paragraph>
          <Paragraph className={styles.fieldvalue}>{userData.email}</Paragraph>
          <Paragraph className={styles.fieldname}>{t('personal-account.data.phone')}</Paragraph>
          <Paragraph className={styles.fieldvalue}>{userData.phone_number}</Paragraph>
          <Paragraph className={styles.fieldname}>{t('personal-account.data.city')}</Paragraph>
          <Paragraph className={styles.fieldvalue}>{userData.city}</Paragraph>
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
        )} - ${statusData?.myStatus.name}`}</Title>
        <Paragraph className={styles.subtitle}>
          {t('personal-account.status.subtitle', { amount: statusData?.myStatus.otherSum })}
        </Paragraph>
        <div className={styles.status_line}>
          {loyalties?.map((item, i) => (
            <div className={styles.status_line_box} key={item.id}>
              <Title
                level={ETitleLevel.h5}
                className={clsx(styles.status_line_box_title, {
                  [styles.status_line_box_title_first]: item.percent === 0,
                  [styles.status_line_box_title_last]: loyalties.length === i + 1,
                  [styles.status_line_box_title_middle]:
                    item.percent !== 0 && loyalties.length !== i + 1,
                  [styles.status_line_box_title_active]:
                    Math.floor(+userData.order_amount) >= item.order_amount,
                })}
              >
                {item.name}
              </Title>
              <Paragraph
                className={clsx(styles.status_line_box_text, {
                  [styles.status_line_box_text_first]: item.percent === 0,
                  [styles.status_line_box_text_last]: loyalties.length === i + 1,
                })}
              >
                {item.percent
                  ? t('personal-account.status.steps.discount', { percent: item.percent })
                  : t('personal-account.status.steps.without-discount')}
              </Paragraph>
            </div>
          ))}
        </div>
        <div className={styles.progressbar}>
          <div className={styles.current} style={{ width: `${statusData?.linePercent}%` }} />
        </div>
      </div>
    </div>
  );
});
