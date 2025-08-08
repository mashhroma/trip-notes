import { ChangeEvent } from 'react';
import cn from 'classnames';
import styles from './Radiobox.module.scss';

interface RadioboxProps {
  label: string;
  id: string;
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  classBox?: 'radiobox';
  size?: 'small' | 'medium';
}

const Radiobox = ({
  label,
  id,
  name,
  checked,
  value,
  disabled,
  classBox = 'radiobox',
  size = 'medium',
  handleChange,
}: RadioboxProps) => {
  const mainCn = cn(styles[classBox], styles[size]);

  return (
    <div className={styles.radioboxBlock}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className={mainCn}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Radiobox;
