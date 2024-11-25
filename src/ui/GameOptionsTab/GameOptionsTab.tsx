import { useState } from 'react';
import styles from './GameOptionsTab.module.css';

enum GameOptions {
  MANUAL = 'MANUAL',
  AUTO = 'AUTO',
}

const GameOptionsTab = () => {
  const [selectedOption, setSelectedOption] = useState(GameOptions.MANUAL);

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={styles.tabList}
    >
      <button
        role="tab"
        aria-selected={selectedOption === GameOptions.MANUAL}
        onClick={() => setSelectedOption(GameOptions.MANUAL)}
        className={`${styles.tab} ${selectedOption === GameOptions.MANUAL ? `${styles.selected}` : ``}`}
      >
        Manual
      </button>
      <button
        role="tab"
        aria-selected={selectedOption === GameOptions.AUTO}
        onClick={() => setSelectedOption(GameOptions.AUTO)}
        className={`${styles.tab} ${selectedOption === GameOptions.AUTO ? `${styles.selected}` : ``}`}
      >
        Auto
      </button>
    </div>
  );
};

export default GameOptionsTab;
