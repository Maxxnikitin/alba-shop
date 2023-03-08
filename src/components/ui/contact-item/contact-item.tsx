import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './contact-item.module.scss';
import { IContactItemProps } from './types';

import { Paragraph } from '..';
import emailIcon from '../../../images/icons/email.svg';
import addressIcon from '../../../images/icons/location.svg';
import phoneIcon from '../../../images/icons/phone.svg';
import timeIcon from '../../../images/icons/time.svg';

export const ContactItem: FC<IContactItemProps> = memo(
  ({ text, icon, isPhone = false, isEmail = false, className = '', ...rest }) => {
    const { t } = useTranslation();

    const iconsMap = useMemo(
      () => ({
        address: addressIcon,
        time: timeIcon,
        phone: phoneIcon,
        email: emailIcon,
      }),
      [],
    );

    const prefix = useMemo(() => (isEmail ? 'mailto' : isPhone ? 'tel' : ''), [isEmail, isPhone]);

    return (
      <li className={clsx(styles.container, className)} {...rest}>
        <img className={styles.icon} src={iconsMap[icon]} alt={t(`alts.contacts.${icon}`) || ''} />
        {isPhone || isEmail ? (
          <a className={styles.link} href={`${prefix}:${isPhone || isEmail}`}>
            {text}
          </a>
        ) : (
          <Paragraph className={styles.text}>{text}</Paragraph>
        )}
      </li>
    );
  },
);
