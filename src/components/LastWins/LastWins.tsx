import React from 'react';
import styles from './LastWins.module.css';

interface LastWinsProps {
  history: { multiplier: number }[];
}

const LastWins: React.FC<LastWinsProps> = ({ history }) => {
  return (
    <div className={styles.lastWins}>
      {!history?.length ? (
        <h2>Game result will be displayed</h2>
      ) : (
        <div className={styles.lastWins__content}>
          {history.map((item: { multiplier: number }, index) => (
            <div
              key={item.multiplier + index + Math.random()}
              className={`${styles.lastWin} ${item.multiplier > 1 ? styles.won : styles.lost}`}
              // style={{
              //   right: `${(history.length - index - 1) * 83}px`,
              // }}
            >
              {Number(item.multiplier.toFixed(2))}x
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LastWins;
