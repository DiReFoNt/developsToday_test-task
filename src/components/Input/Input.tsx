import styles from './Input.module.scss';

import { type InputHTMLAttributes, useId, useState } from 'react';

import EyeIcon from '@assets/icons/EyeIcon';
import EyeCloseIcon from '@assets/icons/EyeCloseIcon.tsx';
import CrossIcon from '@assets/icons/CrossIcon';

export interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'number' | 'password';
  clearable?: boolean;
}

const Input = (props: IInputProps) => {
  const id = useId();

  const { type = 'text', clearable = false, value, onChange, ...rest } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);

  const inputType =
    type === 'password' ? (passwordVisible ? 'text' : 'password') : type;

  const handleClear = () => {
    if (onChange) {
      const syntheticEvent = {
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        value={value ?? ''}
        onChange={onChange}
        id={id}
        type={inputType}
        className={styles.input}
        {...rest}
      />

      {clearable && type !== 'number' && value && String(value).length > 0 && (
        <div className={styles.iconContainer} onClick={handleClear}>
          <CrossIcon />
        </div>
      )}

      {type === 'password' && (
        <div
          className={styles.iconContainer}
          onClick={() => {
            setPasswordVisible((prev) => !prev);
          }}
        >
          {!passwordVisible ? <EyeIcon /> : <EyeCloseIcon />}
        </div>
      )}
    </div>
  );
};

export default Input;
