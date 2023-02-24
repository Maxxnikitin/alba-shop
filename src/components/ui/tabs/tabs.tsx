import clsx from 'clsx';
import { FC, MouseEventHandler } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './tabs.module.scss';

import { ITabsProps, ETypes } from './types';

import { Tab } from '../tab/tab';

export const Tabs: FC<ITabsProps> = ({ className = '', activeTab, setActiveTab, ...rest }) => {
  const { t } = useTranslation();

  const handleTabClick: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
    const id = currentTarget.id as ETypes;

    if (id === activeTab) return;

    setActiveTab(id);
  };

  return (
    <div className={clsx(styles.tabs, { [className]: className })} {...rest}>
      <Tab
        text={t('tabs.phone')}
        isActive={activeTab === ETypes.phone}
        id='phone'
        onClick={handleTabClick}
      />
      <Tab
        text={t('tabs.email')}
        isActive={activeTab === ETypes.email}
        id='email'
        onClick={handleTabClick}
      />
    </div>
  );
};
