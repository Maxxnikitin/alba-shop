import clsx from 'clsx';
import { FC, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './sign-in.module.scss';

import { ISignInProps } from './types';

import { SignInSms, SignInEmail } from '../';
import { ETypes, Tabs } from '../ui';

export const SignIn: FC<ISignInProps> = ({ className = '', ...rest }) => {
  const [activeTab, setActiveTab] = useState<ETypes>(ETypes.phone);

  const { t } = useTranslation();

  return (
    <section className={clsx(styles.signin, { [className]: className })} {...rest}>
      <div className={styles.logo} />
      <Tabs className={styles.tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === ETypes.phone ? <SignInSms /> : <SignInEmail />}
    </section>
  );
};
