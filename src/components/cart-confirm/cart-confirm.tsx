import clsx from 'clsx';
import { FC, KeyboardEventHandler, memo } from 'react';

import { useTranslation } from 'react-i18next';

import PhoneInputWithCountrySelect from 'react-phone-number-input/input';

import styles from './cart-confirm.module.scss';
import { ICartConfirmProps } from './types';

import { BackButton, Button, ETitleLevel, Input, Paragraph, PhoneInput, Radio, Title } from '../ui';

import { EDeliveryType } from '~utils';

export const CartConfirm: FC<ICartConfirmProps> = memo(
  ({
    data,
    price,
    handleChangeInputs,
    handleChangePhone,
    handleBackClick,
    handleCreateOrder,
    isPhoneError,
    isEmailError,
    className = '',
    ...rest
  }) => {
    const { t } = useTranslation();

    const stopSubmitByEnter: KeyboardEventHandler<HTMLFormElement> = e => {
      if (e.code === 'Enter') {
        e.preventDefault();
      }
    };

    return (
      <form
        className={clsx(styles.container, className)}
        onSubmit={handleCreateOrder}
        onKeyDown={stopSubmitByEnter}
        {...rest}
      >
        <BackButton
          text={t('personal-account.order.back')!}
          className={styles.btn_back}
          onClick={handleBackClick}
        />
        <Title className={styles.title}>{t('cart.confirm.title')}</Title>
        <Title level={ETitleLevel.h5} className={styles.subtitle}>
          {t('cart.confirm.subtitle')}
        </Title>
        <div className={styles.form}>
          <Input
            className={styles.input}
            placeholder={t('personal-account.data.first-name')!}
            value={data.first_name}
            id='first_name'
            onChange={handleChangeInputs}
            required
          />
          <Input
            className={styles.input}
            placeholder={t('personal-account.data.last-name')!}
            value={data.last_name}
            id='last_name'
            onChange={handleChangeInputs}
            required
          />
          <Input
            className={styles.input}
            type='surname'
            placeholder={t('personal-account.data.middle-name')!}
            value={data.surname}
            id='surname'
            onChange={handleChangeInputs}
          />
          <Input
            className={styles.input}
            placeholder={t('personal-account.data.city')!}
            value={data.city}
            id='city'
            onChange={handleChangeInputs}
            required
          />
          <div className={styles.edit_phone_box}>
            <PhoneInputWithCountrySelect
              className={clsx(styles.input, { [styles.input_error]: isPhoneError })}
              defaultCountry='RU'
              inputComponent={PhoneInput}
              value={data.phone_number}
              id='phone_number'
              onChange={handleChangePhone}
            />
            {isPhoneError && (
              <Paragraph className={styles.edit_phone_error} isError>
                {t('personal-account.data.phone-error')}
              </Paragraph>
            )}
          </div>
          <div className={styles.edit_phone_box}>
            <Input
              className={styles.input}
              type='email'
              placeholder={t('personal-account.data.email-placeholder')!}
              value={data.email}
              id='email'
              isError={isEmailError}
              errorText={isEmailError ? t('personal-account.data.email-error')! : ''}
              onChange={handleChangeInputs}
            />
          </div>
        </div>
        <div className={styles.delivery_box}>
          <Title level={ETitleLevel.h5} className={styles.delivery_title}>
            {t('cart.confirm.delivery.title')}
          </Title>
          <div className={styles.radios}>
            <Radio
              name='delivery'
              value={EDeliveryType.PICKUP}
              checked={data.delivery === EDeliveryType.PICKUP}
              label={t('cart.confirm.delivery.pickup')}
              onChange={handleChangeInputs}
            />
            <Radio
              name='delivery'
              value={EDeliveryType.DELIVERY}
              checked={data.delivery === EDeliveryType.DELIVERY}
              label={t('cart.confirm.delivery.delivery')}
              labelClassName={styles.radios_label}
              onChange={handleChangeInputs}
              disabled
            />
          </div>
          <div className={styles.total_box}>
            <div className={styles.price_box}>
              <Paragraph className={styles.total}>{t('cart.confirm.total')}</Paragraph>
              <Paragraph className={styles.total_num}>{`${price} ₽`}</Paragraph>
            </div>

            <Paragraph className={styles.addition}>{t('cart.confirm.addition')}</Paragraph>
            <Button type='submit' className={styles.btn} text={t('cart.confirm.btn')} />
          </div>
        </div>
      </form>
    );
  },
);
