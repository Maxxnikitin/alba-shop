import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './modal-search.module.scss';

import { IModalSearchProps } from './types';

import { CloseButton, CrossWhiteIcon, EModalSize, Modal, SearchInput } from '../ui';

export const ModalSearch: FC<IModalSearchProps> = memo(
  ({ isOpen, onClose, onChange, data, className = '', ...rest }) => {
    const { t } = useTranslation();

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
          <p>ssdd</p>
        </ul>
      </Modal>
    );
  },
);
