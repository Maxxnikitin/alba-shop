import clsx from 'clsx';
import { FC, memo, useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './modal-search.module.scss';

import { IModalSearchProps } from './types';

import {
  CrossWhiteIcon,
  EModalSize,
  ETitleLevel,
  Loader,
  Modal,
  SearchInput,
  SearchItem,
  Title,
} from '../ui';

import { ERequestStatus } from '~utils';

export const ModalSearch: FC<IModalSearchProps> = memo(
  ({
    isOpen,
    onClose,
    onChange,
    onRemoveValue,
    onFormSubmit,
    data,
    inputValue,
    className = '',
    searchStatus,
    ...rest
  }) => {
    const { t } = useTranslation();

    const ref = useRef<HTMLInputElement>(null);

    const handleRemove = () => {
      onRemoveValue();
      ref.current?.focus();
    };

    useEffect(() => {
      if (isOpen) {
        // Если делать фокус сразу, то модалка при открытии улетает вверх и потом возвращается на нужную высоту.
        // Делаю задержку, чтобы дождаться, пока анимация выезжания закончится.
        setTimeout(() => {
          ref.current?.focus();
        }, 500);
      } else {
        ref.current?.blur();
      }
    }, [isOpen]);

    return (
      <Modal
        className={clsx(styles.container, className)}
        isOpen={isOpen}
        onClose={onClose}
        withCloseBtn
        closeIcon={CrossWhiteIcon}
        closeBtnClassName={styles.close}
        modalSize={EModalSize.SMALL}
        {...rest}
      >
        <SearchInput
          formClassName={styles.search}
          className={styles.input}
          placeholder={t('inputs.search') || ''}
          onChange={onChange}
          value={inputValue}
          onRemoveValue={handleRemove}
          onFormSubmit={onFormSubmit}
          ref={ref}
          isMob
        />
        <ul className={styles.list}>
          {data && (
            <>
              {data.data.map(({ name, icon, id, type, slug }, i) => {
                if (i > 4) return null;
                return (
                  <SearchItem
                    name={name}
                    icon={icon}
                    key={id}
                    id={id}
                    slug={slug}
                    dataType={type}
                    isMobile
                    onCloseModal={onClose}
                  />
                );
              })}
              {data.data.length > 5 && (
                <SearchItem
                  id='11'
                  isBold
                  dataType='rest'
                  name={t('search-modal.rest', { count: data.data.length - 5 })}
                  searchReqString={inputValue}
                  isMobile
                  onCloseModal={onClose}
                />
              )}
            </>
          )}
          {searchStatus === ERequestStatus.LOADING && <Loader />}
          {searchStatus === ERequestStatus.ERROR && (
            <Title className={styles.search_error} level={ETitleLevel.h6}>
              {t('request.error')}
            </Title>
          )}
          {searchStatus === ERequestStatus.FAIL_LENGTH && (
            <Title className={styles.search_error} level={ETitleLevel.h6}>
              {t('request.length')}
            </Title>
          )}
        </ul>
      </Modal>
    );
  },
);
