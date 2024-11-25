import React from 'react';
import styles from './MineBgBasic.module.css';

interface MineBgBasicProps {
  mineSize: string;
  cell: string;
  onClick: () => void;
}

const MineBgBasic: React.FC<MineBgBasicProps> = ({
  cell,
  mineSize,
  onClick,
}) => {
  const size = mineSize;
  return (
    <div
      className={`${styles.basicBg} ${cell === 'S' ? styles.won : cell === 'M' ? styles.lost : ''}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {cell === '?' ? '' : cell}
    </div>
  );
};

export default MineBgBasic;
