import { ChangeEvent } from 'react';
import cn from 'classnames';
import styles from './Toggle.module.scss';

interface ToggleProps {
  checked: boolean;
  label: string;
  id?: string;
  disabled?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  classBox?: 'toggle';
  size?: 'small' | 'medium';
}

const Toggle = ({
  checked,
  label,
  id,
  disabled,
  classBox = 'toggle',
  size = 'medium',
  handleChange,
}: ToggleProps) => {
  const mainCn = cn(styles[classBox], styles[size]);

  return (
    <div className={mainCn}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        id={id ?? label}
      />
      <label htmlFor={id ?? label}>
        <span className={styles.slider}></span>
        <span className={styles.label}>{label}</span>
      </label>
    </div>
  );
};

export default Toggle;
