import clsx from 'clsx';
import { FC, memo, useState } from 'react';

import { Link } from 'react-router-dom';

import styles from './menu-children-item.module.scss';
import { IMenuChildrenItemProps } from './types';

import { Paragraph } from '..';
import { ArrowMenuIcon } from '../icons';

import { handleToggleState } from '~utils';

export const MenuChildrenItem: FC<IMenuChildrenItemProps> = memo(
  ({ className = '', dataObj, handleCloseAllModals, ...rest }) => {
    const { id, children, name } = dataObj;
    const [isOpenList, setIsOpenList] = useState(false);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        {children.length ? (
          <>
            <button
              className={styles.btn}
              id={id.toString()}
              onClick={handleToggleState(setIsOpenList)}
            >
              <Paragraph className={styles.title}>{name}</Paragraph>
              <ArrowMenuIcon className={clsx(styles.img, { [styles.img_open]: isOpenList })} />
            </button>
            <ul
              className={clsx(styles.list, { [styles.list_open]: isOpenList })}
              style={(isOpenList && { maxHeight: children.length * 65 }) || {}}
            >
              {children.map(item => (
                <li className={styles.list_item} key={item.id}>
                  <Link className={styles.link} to='#' onClick={handleCloseAllModals}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Link className={styles.link} to='#' onClick={handleCloseAllModals}>
            {name}
          </Link>
        )}
      </div>
    );
  },
);
