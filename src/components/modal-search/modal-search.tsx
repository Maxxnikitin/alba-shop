import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './modal-search.module.scss';

import { IModalSearchProps } from './types';

import {
  CloseButton,
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
  ({ isOpen, onClose, onChange, data, className = '', searchStatus, searchReqString, ...rest }) => {
    const { t } = useTranslation();
    console.log(searchReqString);

    return (
      <Modal
        className={clsx(styles.container, className)}
        isOpen={isOpen}
        onClose={onClose}
        modalSize={EModalSize.SMALL}
        {...rest}
      >
        <CloseButton icon={CrossWhiteIcon} className={styles.close} onClick={onClose} />
        <SearchInput
          formClassName={styles.search}
          className={styles.input}
          placeholder={t('inputs.search') || ''}
          onChange={onChange}
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
                  searchReqString={searchReqString}
                  isMobile
                  onCloseModal={onClose}
                />
              )}
            </>
          )}
          {searchStatus === ERequestStatus.LOADING && <Loader />}
          {searchStatus === ERequestStatus.ERROR && (
            <Title level={ETitleLevel.h4}>{t('request.error')}</Title>
          )}
        </ul>
      </Modal>
    );
  },
);
