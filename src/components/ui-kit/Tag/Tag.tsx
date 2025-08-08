import { IoMdClose } from 'react-icons/io';
import cn from 'classnames';
import styles from './Tag.module.scss';

interface TagProps {
  title: string;
  classTag?: 'default' | 'primary';
  size?: 'small' | 'medium' | 'large';
  width?: number | string;
  handleClear?: () => void;
}

export const Tag = ({
  title,
  classTag = 'default',
  size = 'medium',
  width,
  handleClear,
}: TagProps) => {
  const mainCn = cn(styles[classTag], styles[size]);

  return (
    <div className={mainCn} style={{ width }}>
      {title}
      {handleClear && (
        <div className={styles.closeIcon} onClick={handleClear}>
          <IoMdClose size={16} />
        </div>
      )}
    </div>
  );
};
