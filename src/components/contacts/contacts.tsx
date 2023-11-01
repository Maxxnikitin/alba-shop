import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './contacts.module.scss';
import { IContactsProps } from './types';

import { ContactItem, EIcons } from '../ui';

export const Contacts: FC<IContactsProps> = memo(({ data, className = '', ...rest }) => (
  <ul className={clsx(styles.container, className)} {...rest}>
    <ContactItem text={data.address} icon={EIcons.ADDRESS} />
    <ContactItem text={data.opening_hours} icon={EIcons.TIME} />
    <ContactItem text={data.phone} icon={EIcons.PHONE} isPhone />
    <ContactItem text={data.email} icon={EIcons.EMAIL} isEmail />
  </ul>
));
