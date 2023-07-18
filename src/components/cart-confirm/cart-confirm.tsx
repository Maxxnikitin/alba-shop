import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';

import PhoneInputWithCountrySelect from 'react-phone-number-input/input';

import styles from './cart-confirm.module.scss';
import { ICartConfirmProps } from './types';

import { Button, ETitleLevel, Input, Paragraph, PhoneInput, Radio, Title } from '../ui';

export const CartConfirm: FC<ICartConfirmProps> = memo(({ price, className = '', ...rest }) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <Title className={styles.title}>{t('cart.confirm.title')}</Title>
      <Title level={ETitleLevel.h5} className={styles.subtitle}>
        {t('cart.confirm.subtitle')}
      </Title>
      <form className={styles.form}>
        <Input
          className={styles.input}
          placeholder={t('personal-account.data.first-name')!}
          // value={editData.first_name}
          id='first_name'
          // onChange={handleChangeInputs}
        />
        <Input
          className={styles.input}
          placeholder={t('personal-account.data.last-name')!}
          // value={editData.last_name}
          id='last_name'
          // onChange={handleChangeInputs}
        />
        <Input
          className={styles.input}
          type='email'
          placeholder={t('personal-account.data.middle-name')!}
          // value={editData.email}
          id='email'
          // onChange={handleChangeInputs}
        />
        <Input
          className={styles.input}
          placeholder={t('personal-account.data.city')!}
          // value={editData.city}
          id='city'
          // onChange={handleChangeInputs}
        />
        <div className={styles.edit_phone_box}>
          <PhoneInputWithCountrySelect
            className={styles.input}
            defaultCountry='RU'
            inputComponent={PhoneInput}
            // value={editData.phone_number}
            id='phone_number'
            // onChange={handleChangePhone}
            onChange={() => console.log('rr')}
          />
          {/* {isPhoneError && (
                  <Paragraph className={styles.edit_phone_error} isError>
                    {t('personal-account.data.phone-error')}
                  </Paragraph>
                )} */}
        </div>
        <Input
          className={styles.input}
          type='email'
          placeholder={t('personal-account.data.email-placeholder')!}
          // value={editData.email}
          id='email'
          // onChange={handleChangeInputs}
        />
      </form>
      <div className={styles.delivery_box}>
        <Title level={ETitleLevel.h5} className={styles.delivery_title}>
          {t('cart.confirm.delivery.title')}
        </Title>
        <form className={styles.radios}>
          <Radio name='delivery' value='self' checked label={t('cart.confirm.delivery.self')} />
          <Radio name='delivery' value='delivery' label={t('cart.confirm.delivery.delivery')} />
        </form>
        <div className={styles.total_box}>
          <Paragraph className={styles.total}>
            {t('cart.confirm.total')} <span className={styles.total_num}>{`${price} ₽`}</span>
          </Paragraph>
          <Paragraph className={styles.addition}>{t('cart.confirm.addition')}</Paragraph>
        </div>
      </div>
      <Button className={styles.btn} text={t('cart.confirm.btn')} />
    </div>
  );
});
