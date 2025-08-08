import styles from './InputRange.module.scss';

interface InputRangeProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step?: number;
  value: number;
  style?: 'basic' | 'opacity-range';
  disabled?: boolean;
}

const InputRange = ({
  handleChange,
  min,
  max,
  step = 1,
  value,
  style = 'basic',
  disabled,
}: InputRangeProps) => {
  return (
    <input
      type="range"
      onInput={handleChange}
      min={min}
      max={max}
      step={step}
      value={value}
      className={styles[style]}
      style={{
        backgroundSize: ((+value - min) * 100) / (max - min) + '% 100%',
      }}
      disabled={disabled}
    />
  );
};

export default InputRange;
