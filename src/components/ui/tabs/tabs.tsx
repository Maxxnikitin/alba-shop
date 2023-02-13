import clsx from 'clsx';
import { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './tabs.module.scss';

import { ETypes } from '../../../utils/common-types';
import { Tab } from '../tab/tab';

interface ITabs {
  activeTab: ETypes;
  setActiveTab: Dispatch<SetStateAction<ETypes>>;
  className?: string;
}

export const Tabs: FC<ITabs> = ({ className = '', activeTab, setActiveTab, ...rest }) => {
  const { t } = useTranslation();

  const handleTabClick: MouseEventHandler<HTMLButtonElement> = e => {
    const id = (e.target as HTMLButtonElement).id as ETypes;

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
