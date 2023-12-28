import clsx from 'clsx';
import {
  ChangeEventHandler,
  FC,
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import styles from './sms-input.module.scss';
import { TSmsInputProps } from './types';

import { Input, Paragraph } from '..';

export const SmsInput: FC<TSmsInputProps> = memo(
  ({
    handleRequest,
    setInputsData,
    inputsData,
    fieldClassName = '',
    errorText = '',
    isError,
    input0Ref,
    handleRemoveError,
    ...rest
  }) => {
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);

    const refsData = useMemo(() => [input0Ref, input1Ref, input2Ref, input3Ref], [input0Ref]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      e => {
        const { id } = e.target;
        let { value } = e.target;

        if (value !== '' && isNaN(+value)) return;

        if (value.length > 1) {
          value = value.substring(value.length - 1);
        }

        setInputsData(prevState => ({
          ...prevState,
          [id]: value,
        }));

        if (value) {
          const nextInput: MutableRefObject<HTMLInputElement | null> = refsData[+id + 1];
          if (nextInput) {
            nextInput.current?.focus();
          } else {
            const currInput: MutableRefObject<HTMLInputElement | null> = refsData[+id];
            currInput.current?.blur();
            handleRequest(+(Object.values(inputsData).join('') + value));
          }
        }
      },
      [refsData, inputsData, setInputsData, handleRequest],
    );

    useEffect(() => {
      if (input0Ref.current) {
        (input0Ref.current as HTMLInputElement).focus();
      }
    }, [input0Ref]);

    return (
      <div className={clsx(styles.container, fieldClassName)} {...rest}>
        {errorText && <Paragraph className={styles.error}>{errorText}</Paragraph>}
        <div className={styles.inputs_box}>
          {Object.entries(inputsData).map(([key, value]) => (
            <Input
              key={key}
              id={key}
              type='text'
              ref={refsData[Number(key)]}
              className={clsx(styles.input, {
                [styles.fill]: value,
                [styles.error_input]: isError,
              })}
              fieldClassName={styles.field}
              value={value}
              onChange={handleChange}
              onFocus={() => {
                if (isError) {
                  handleRemoveError();
                  (input0Ref as MutableRefObject<HTMLInputElement | null>)?.current?.focus();
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  },
);
