import { useEffect, useRef, useState } from 'react';
import './App.css';
import GameOptionsTab from './ui/GameOptionsTab/GameOptionsTab';
import RangeSlider from './ui/RangeSlider/RangeSlider';
import Button from './ui/Button';
import Wins from './components/Wins/Wins';

enum GameStatus {
  WIN = 'WIN',
  LOSE = 'LOSE',
  PROGRESS = 'PROGRESS',
}

interface GameData {
  gameId: string;
  payoutMultiplier: number;
  gameStatus: GameStatus;
  grid: string[][];
}

const apiUrl = 'http://139.59.129.165:8080';

function App() {
  const isMounted = useRef(false);

  const [gameData, setGameData] = useState<GameData | null>(null);
  const [history, setHistory] = useState([]);

  const [amount, setAmount] = useState<string | number>(5);

  const [row, setRow] = useState(10);
  const [isAmountInputFocused, setIsAmountInputFocused] = useState(false);

  // FUNCTIONS
  const saveGameState = () => {
    const gameState = {
      amount,
      row,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  };

  const loadGameState = () => {
    const savedGameState = localStorage.getItem('gameState');
    if (savedGameState) {
      const { amount, row } =
        JSON.parse(savedGameState);
      setAmount(amount);
      // setRow(row);
    } else {
      setAmount('5');
      // setRow(5);
    }
  };

  const savesGameData = (gameData: GameData) => {
    localStorage.setItem('gameData', JSON.stringify(gameData));
    setGameData(gameData);
  };

  const loadGameData = () => {
    const savedGameStateData = localStorage.getItem('gameData');
    if (savedGameStateData) {
      const gameData = JSON.parse(savedGameStateData);
      setGameData(gameData);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Allow only numbers and a single decimal point
    value = value.replace(/[^0-9.]/g, ''); // Only digits and decimal point
    value = value.replace(/^0+(\d)/, '$1'); // Remove leading zeros if followed by digits
    value = value.replace(/(\..*)\./g, '$1'); // Allow only one decimal point

    setAmount(value); // Keep it as a string to handle cases like '5.'
  };

  const handleMinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Allow only numbers
    value = value.replace(/[^0-9]/g, ''); // Only digits
    value = value.replace(/^0+(\d)/, '$1'); // Remove leading zeros if followed by digits

    setRow(() => +value);
  };

  // HOOKS
  useEffect(() => {
    // loadGameState();
    // loadGameData();
    // fetchHistory();
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      saveGameState();
    }
  }, [row, amount]);

  // HTTP requests
  const fetchHistory = () => {
    fetch(`${apiUrl}/api/row/history?userId=123`)
      .then((response) => response.json())
      .then((data) => setHistory(data))
      .catch((error) => console.error('Error:', error));
  };

  const startGame = () => {
    fetch(`${apiUrl}/api/row/new?row=${row}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: '123',
        betAmount: amount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return savesGameData(data);
      })
      .catch((error) => console.error(error));
  };

  const cashOut = () => {
    fetch(`${apiUrl}/api/row/cashout?gameId=${gameData.gameId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((newData) => {
        savesGameData(newData);
        fetchHistory();
        localStorage.removeItem('gameData');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="game-frame">
      <div className="game-options">
        <GameOptionsTab />

        <div className="games-options__content">
          <div
            className={`games-options__amount ${isAmountInputFocused ? 'focused' : ''}`}
          >
            <input
              className="amount-input"
              value={amount}
              onChange={handleAmountChange}
              onFocus={() => setIsAmountInputFocused(true)}
              onBlur={() => setIsAmountInputFocused(false)}
              placeholder="Set amount"
            />

            <div className="amount-buttons">
              <button
                role="button"
                className="amount-btn"
                onClick={() => setAmount(+amount / 2)}
              >
                1/2
              </button>
              <button
                role="button"
                className="amount-btn"
                onClick={() => setAmount(+amount * 2)}
              >
                2x
              </button>
              <button
                role="button"
                className="amount-btn"
                onClick={() => setAmount(+amount * 3)}
              >
                3x
              </button>
            </div>
          </div>
          <div className="games-options__mines">
            <h2>Row {row}</h2>
            {row && (
              <>
                <RangeSlider
                  min={10}
                  max={50}
                  value={row}
                  disabled={gameData?.gameStatus === GameStatus.PROGRESS}
                  onChange={(e) => {
                    handleMinesChange(e);
                  }}
                  customClasses="your-slider-class-name"
                  secondaryBgColor="var( - secondary-color)"
                />
              </>
            )}
          </div>

          {gameData?.gameStatus === GameStatus.PROGRESS ? (
            <Button
              onClick={cashOut}
              amount={Number((gameData.payoutMultiplier * +amount).toFixed(2))}
              label="Cash Out"
            />
          ) : (
            <Button onClick={startGame} label="Start" />
          )}
        </div>
      </div>

      <div className="game-content">
        <Wins history={history} />

      </div>
    </div>
  );
}

export default App;
