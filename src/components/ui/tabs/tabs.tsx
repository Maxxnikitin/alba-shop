import clsx from 'clsx';
import { FC, MouseEventHandler, useState } from 'react';

import styles from './tabs.module.scss';

import { Tab } from '../tab/tab';

interface ITabs {
  className?: string;
}

enum ETypes {
  phone = 'phone',
  email = 'email',
}

export const Tabs: FC<ITabs> = ({ className = '', ...rest }) => {
  const [activeTab, setActiveTab] = useState<ETypes>(ETypes.phone);

  const handleTabClick: MouseEventHandler<HTMLButtonElement> = e => {
    const id = (e.target as HTMLButtonElement).id as ETypes;

    if (id === activeTab) return;

    setActiveTab(id);
  };

  return (
    <div className={clsx(styles.tabs, { [className]: className })} {...rest}>
      <Tab
        text='Телефон'
        isActive={activeTab === ETypes.phone}
        id='phone'
        onClick={handleTabClick}
      />
      <Tab text='Почта' isActive={activeTab === ETypes.email} id='email' onClick={handleTabClick} />
    </div>
  );
};
