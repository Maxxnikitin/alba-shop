import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './breadcrumbs.module.scss';
import { IBreadcrumbsProps } from './types';

import { BreadcrumbsItem } from '..';

export const Breadcrumbs: FC<IBreadcrumbsProps> = memo(
  ({ className = '', brandName, isProduct, ...rest }) => {
    const { pathname } = useLocation();

    const itemsList = useMemo(() => {
      let link = '';
      const pathnameArr = pathname.split('/');
      const resArr = pathnameArr.map((item, i) => {
        link += link === '/' ? item : `/${item}`;
        /**
         * если item === '' и при этом это первый элемент, значит это главная страница и в text подставляем 'main',
         * а если это не первый элемент, значит подставляем пустую строку и в дальнейшем удалим этот элемент
         */
        return {
          text: item || (i > 0 ? '' : 'main'),
          link,
          isActive: pathnameArr.length === i + 1,
        };
      });

      /**
       * нужно удалить последний элемент из крошек в двух случаях:
       * 1. текст является числом (значит, это процент скидки, а не отдельная страница)
       * 2. последний элемент является пустым (значит, в конце урла поставили "/")
       */

      if (+resArr[resArr.length - 1].text || !resArr[resArr.length - 1].text) {
        resArr.pop();
        resArr[resArr.length - 1].isActive = true;
      }
      return resArr;
    }, [pathname]);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        {itemsList.map(({ text, link, isActive }) => (
          <BreadcrumbsItem
            key={text}
            text={text}
            link={link}
            isActive={isActive}
            brandName={brandName}
            isProduct={isProduct}
          />
        ))}
      </div>
    );
  },
);
