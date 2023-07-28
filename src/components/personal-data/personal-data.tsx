import clsx from 'clsx';
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInputWithCountrySelect from 'react-phone-number-input/input';

import styles from './personal-data.module.scss';
import 'react-phone-number-input/style.css';
import { EMode, IPersonalDataProps, TStatusData } from './types';

import { Button, EButtonKinds, ETitleLevel, Input, Paragraph, PhoneInput, Title } from '../ui';

import { getUser, getUserLoyalties, TEditData, TLoyalties, TUser, updateUserData } from '~utils';

export const PersonalData: FC<IPersonalDataProps> = memo(({ className = '', ...rest }) => {
  const [userData, setUserData] = useState<TUser | null>(null);
  const [loyalties, setLoyalties] = useState<TLoyalties[] | null>(null);
  const [statusData, setStatusData] = useState<TStatusData | null>(null);
  const [mode, setMode] = useState<EMode>(EMode.READ);
  const [editData, setEditData] = useState<TEditData>({
    email: '',
    first_name: '',
    last_name: '',
    surname: '',
    phone_number: '',
    city: '',
    password: '',
    password2: '',
  });
  const [isPasswordRepeatError, setIsPasswordRepeatError] = useState(false);
  const [isPasswordLengthError, setIsPasswordLengthError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);

  const { t } = useTranslation();

  const handleEditClick = useCallback(() => setMode(EMode.EDIT), []);

  const handleEditCancelClick = useCallback(() => {
    setMode(EMode.READ);
    setIsPasswordRepeatError(false);
    setIsPasswordLengthError(false);
    setEditData(prev => ({
      email: prev?.email || '',
      first_name: prev?.first_name || '',
      last_name: prev?.last_name || '',
      surname: prev?.surname || '',
      company_name: '',
      phone_number: prev?.phone_number || '',
      city: prev?.city || '',
      password: '',
      password2: '',
    }));
  }, []);

  const handleChangeInputs: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setIsPasswordRepeatError(false);
    setIsPasswordLengthError(false);

    setEditData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }, []);

  const handleChangePhone = (v: string | undefined) => {
    setIsPhoneError(false);
    setEditData(prev => ({
      ...prev,
      phone_number: v ?? '',
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (editData.phone_number.length !== 12) {
      setIsPhoneError(true);
      return;
    }

    if (editData.password && editData.password.length < 8) {
      setIsPasswordLengthError(true);
      return;
    }

    if (editData.password !== editData.password2) {
      setIsPasswordRepeatError(true);
      return;
    }

    updateUserData(editData)
      .then(({ data }) => {
        setUserData(data);
        setMode(EMode.READ);
        setEditData({
          email: data.email || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          surname: data.surname || '',
          phone_number: data.phone_number || '',
          city: data.city || '',
          password: '',
          password2: '',
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    Promise.all([getUser(), getUserLoyalties()])
      .then(([user, loyalty]) => {
        setUserData(user.data);
        setLoyalties(loyalty.data);
        setEditData({
          email: user.data.email,
          first_name: user.data.first_name,
          last_name: user.data.last_name,
          surname: user.data.surname || '',
          phone_number: user.data.phone_number,
          city: user.data.city ?? '',
          password: '',
          password2: '',
        });

        const myAmount = Math.floor(+user.data.order_amount);
        const endSum = loyalty.data[loyalty.data.length - 1].order_amount;

        const linePercent = myAmount === 0 ? 0 : (myAmount / endSum) * 100;

        let myStatus = { name: '', otherSum: 0 };

        for (let i = 0; i < loyalty.data.length; i++) {
          if (myAmount >= loyalty.data[i].order_amount) {
            myStatus.name = loyalty.data[i].name;
          } else {
            myStatus.otherSum = loyalty.data[i].order_amount - myAmount;
            break;
          }
        }

        setStatusData({ linePercent, myStatus });
      })
      .catch(err => console.log(err));
  }, []);

  if (!userData) return <p>loader</p>;

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <div className={styles.data_box}>
        {mode === EMode.READ && (
          <>
            <Title level={ETitleLevel.h4} className={styles.title}>
              {`${userData.first_name} ${userData.surname ? userData.surname + ' ' : ''}${
                userData.last_name
              }`}
            </Title>
            <div className={styles.data_list}>
              <Paragraph className={styles.fieldname}>{t('personal-account.data.email')}</Paragraph>
              <Paragraph className={styles.fieldvalue}>{userData.email}</Paragraph>
              <Paragraph className={styles.fieldname}>{t('personal-account.data.phone')}</Paragraph>
              <Paragraph className={styles.fieldvalue}>{userData.phone_number}</Paragraph>
              <Paragraph className={styles.fieldname}>{t('personal-account.data.city')}</Paragraph>
              <Paragraph className={styles.fieldvalue}>{userData.city}</Paragraph>
              <Paragraph className={styles.fieldname}>
                {t('personal-account.data.password')}
              </Paragraph>
              <Paragraph className={styles.fieldvalue}>*************</Paragraph>
            </div>
            <Button
              kind={EButtonKinds.addition}
              className={styles.btn_edit}
              text={t('personal-account.data.btn-edit')}
              onClick={handleEditClick}
            />
          </>
        )}
        {mode === EMode.EDIT && (
          <form onSubmit={handleSubmit}>
            <div className={styles.edit_main_box}>
              <Input
                placeholder={t('personal-account.data.first-name')!}
                value={editData.first_name}
                id='first_name'
                onChange={handleChangeInputs}
              />
              <Input
                placeholder={t('personal-account.data.last-name')!}
                value={editData.last_name}
                id='last_name'
                onChange={handleChangeInputs}
              />
              <Input
                placeholder={t('personal-account.data.surname')!}
                value={editData.surname}
                id='surname'
                onChange={handleChangeInputs}
              />
              <div className={styles.edit_phone_box}>
                <PhoneInputWithCountrySelect
                  className={clsx(styles.input, { [styles.input_error]: isPhoneError })}
                  defaultCountry='RU'
                  inputComponent={PhoneInput}
                  value={editData.phone_number}
                  id='phone_number'
                  onChange={handleChangePhone}
                />
                {isPhoneError && (
                  <Paragraph className={styles.edit_phone_error} isError>
                    {t('personal-account.data.phone-error')}
                  </Paragraph>
                )}
              </div>

              <Input
                placeholder={t('personal-account.data.city')!}
                value={editData.city}
                id='city'
                onChange={handleChangeInputs}
              />
              <Input
                type='email'
                placeholder={t('personal-account.data.email-placeholder')!}
                value={editData.email}
                id='email'
                onChange={handleChangeInputs}
              />
            </div>
            <div className={styles.edit_password_box}>
              <Input
                placeholder={t('personal-account.data.old-password')!}
                value={editData.password}
                id='password'
                type='password'
                onChange={handleChangeInputs}
                isError={isPasswordRepeatError || isPasswordLengthError}
                errorText={
                  isPasswordLengthError ? t('personal-account.data.password-length-error')! : ''
                }
              />
              <Input
                placeholder={t('personal-account.data.new-password')!}
                value={editData.password2}
                id='password2'
                type='password'
                onChange={handleChangeInputs}
                isError={isPasswordRepeatError}
                errorText={isPasswordRepeatError ? t('personal-account.data.password-error')! : ''}
              />
            </div>
            <div className={styles.edit_btns_box}>
              <Button
                className={styles.btn_submit}
                text={t('personal-account.data.btn-submit')}
                type='submit'
              />
              <Button
                kind={EButtonKinds.addition}
                className={styles.btn_cancel}
                text={t('personal-account.data.btn-cancel')}
                onClick={handleEditCancelClick}
              />
            </div>
          </form>
        )}
      </div>
      <div className={styles.status_box}>
        <Title level={ETitleLevel.h4} className={styles.title}>{`${t(
          'personal-account.status.title',
        )} - ${statusData?.myStatus.name}`}</Title>
        <Paragraph className={styles.subtitle}>
          {t('personal-account.status.subtitle', { amount: statusData?.myStatus.otherSum })}
        </Paragraph>
        <div className={styles.status_line}>
          {loyalties?.map((item, i) => (
            <div className={styles.status_line_box} key={item.id}>
              <Title
                level={ETitleLevel.h5}
                className={clsx(styles.status_line_box_title, {
                  [styles.status_line_box_title_first]: item.percent === 0,
                  [styles.status_line_box_title_last]: loyalties.length === i + 1,
                  [styles.status_line_box_title_middle]:
                    item.percent !== 0 && loyalties.length !== i + 1,
                  [styles.status_line_box_title_active]:
                    Math.floor(+userData.order_amount) >= item.order_amount,
                })}
              >
                {item.name}
              </Title>
              <Paragraph
                className={clsx(styles.status_line_box_text, {
                  [styles.status_line_box_text_first]: item.percent === 0,
                  [styles.status_line_box_text_last]: loyalties.length === i + 1,
                })}
              >
                {item.percent
                  ? t('personal-account.status.steps.discount', { percent: item.percent })
                  : t('personal-account.status.steps.without-discount')}
              </Paragraph>
            </div>
          ))}
        </div>
        <div className={styles.progressbar}>
          <div className={styles.current} style={{ width: `${statusData?.linePercent}%` }} />
        </div>
      </div>
    </div>
  );
});
