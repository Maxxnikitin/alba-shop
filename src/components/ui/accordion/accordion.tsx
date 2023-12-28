import clsx from 'clsx';
import { FC, memo, useEffect, useRef, useState } from 'react';

import styles from './accordion.module.scss';
import { IAccordionProps } from './types';

import { Paragraph, ETitleLevel, Title } from '..';
import { ArrowAccIcon } from '../icons';

export const Accordion: FC<IAccordionProps> = memo(
  ({ className = '', dataObj, isOpen, onBtnClick, ...rest }) => {
    const { id, header, description } = dataObj;

    const [contentHeight, setContentHeight] = useState(0);

    const contentRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, [description]);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <button className={styles.btn} id={id.toString()} onClick={onBtnClick}>
          <Title className={styles.title} level={ETitleLevel.h4}>
            {header}
          </Title>
          <ArrowAccIcon className={clsx(styles.img, { [styles.img_open]: isOpen })} />
        </button>
        <ul
          className={clsx(styles.list, { [styles.list_open]: isOpen })}
          style={{ maxHeight: isOpen ? contentHeight : 0 }}
          ref={contentRef}
        >
          {description.map((item, i) => (
            <li className={styles.list_item} key={i}>
              <Paragraph className={styles.text}>{item}</Paragraph>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
