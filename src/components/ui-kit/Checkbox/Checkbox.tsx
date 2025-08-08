import { ChangeEvent } from 'react';
import cn from 'classnames';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  label: string;
  id: string;
  checked: boolean;
  disabled?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  classBox?: 'checkbox';
  size?: 'small' | 'medium';
}

const Checkbox = ({
  label,
  id,
  checked,
  disabled,
  classBox = 'checkbox',
  size = 'medium',
  handleChange,
}: CheckboxProps) => {
  const mainCn = cn(styles[classBox], styles[size]);

  return (
    <div className={styles.checkboxBlock}>
      <input
        type="checkbox"
        id={id}
        className={mainCn}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
