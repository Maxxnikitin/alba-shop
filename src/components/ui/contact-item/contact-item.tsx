import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';

import styles from './contact-item.module.scss';
import { IContactItemProps } from './types';

import { Paragraph } from '..';
import { AddressIcon, EmailIcon, PhoneIcon, TimeIcon } from '../icons';

const iconsMap = {
  address: AddressIcon,
  time: TimeIcon,
  phone: PhoneIcon,
  email: EmailIcon,
};

export const ContactItem: FC<IContactItemProps> = memo(
  ({ text, icon, isPhone = false, isEmail = false, className = '', ...rest }) => {
    const CurrIcon = useMemo(() => iconsMap[icon], [icon]);

    const prefix = useMemo(() => (isEmail ? 'mailto' : isPhone ? 'tel' : ''), [isEmail, isPhone]);

    return (
      <li className={clsx(styles.container, className)} {...rest}>
        <CurrIcon />
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
