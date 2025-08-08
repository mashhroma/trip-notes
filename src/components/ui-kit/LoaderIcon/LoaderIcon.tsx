import styles from './LoaderIcon.module.scss';

const LoaderIcon = ({
  size = 20,
  type = 'default',
  color,
  marginLeft = 0,
  marginRight = 0,
}: {
  size?: number;
  type?: 'default' | 'button';
  color?: string;
  marginLeft?: number;
  marginRight?: number;
}) => {
  return (
    <div
      className={type === 'default' ? styles.spin : styles.spinButton}
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} ${color}`,
        marginLeft,
        marginRight,
      }}
    ></div>
  );
};

export default LoaderIcon;
