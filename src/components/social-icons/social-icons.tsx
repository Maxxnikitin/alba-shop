import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './social-icons.module.scss';
import { ISocialIconsProps } from './types';

export const SocialIcons: FC<ISocialIconsProps> = memo(
  ({ contactsData, className = '', isDark = false, ...rest }) => {
    console.log('q');

    return (
      <ul className={clsx(styles.social_links, className)} {...rest}>
        <li className={styles.social_list_item}>
          <a
            className={clsx(
              styles.social_link,
              isDark ? styles.social_link_tg_dark : styles.social_link_tg,
            )}
            target='_blank'
            href={contactsData.telegram}
            rel='noreferrer'
          >
            {' '}
          </a>
        </li>
        <li className={styles.social_list_item}>
          <a
            className={clsx(
              styles.social_link,
              isDark ? styles.social_link_insta_dark : styles.social_link_insta,
            )}
            target='_blank'
            href={contactsData.instagram}
            rel='noreferrer'
          >
            {' '}
          </a>
        </li>
        <li className={styles.social_list_item}>
          <a
            className={clsx(
              styles.social_link,
              isDark ? styles.social_link_vk_dark : styles.social_link_vk,
            )}
            target='_blank'
            href={contactsData.vk}
            rel='noreferrer'
          >
            {' '}
          </a>
        </li>
      </ul>
    );
  },
);
