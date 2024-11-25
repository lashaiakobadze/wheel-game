import React from 'react';
import MineBgBasic from '../../ui/MineBgBasic/MineBgBasic';
import './CustomGameGrid.css';

interface GameData {
  gameId: string;
  payoutMultiplier: number;
  gameStatus: string;
  grid: string[][];
}

const GameGrid: React.FC<{
  data: GameData;
  rows: number;
  cols: number;
  handleCellClick: (rowIndex: number, colIndex: number) => void;
}> = ({ rows, cols, data, handleCellClick }) => {
  let heightOfGameGrid = 350;
  const isMobile = window.innerWidth <= 768;
  const isXSMobile = window.innerWidth <= 375;

  if (isXSMobile) {
    heightOfGameGrid = 200;
  } else if (isMobile) {
    heightOfGameGrid = 300;
  }

  const size: string = `${heightOfGameGrid / (cols > rows ? cols : rows)}px`;

  const cellClick = (rowIndex: number, colIndex: number) => {
    if (data.gameStatus !== 'PROGRESS') return;

    handleCellClick(rowIndex, colIndex);
  };

  return (
    <div className="game-grid-wrapper">
      <div className="game-grid-content">
        <div className="game-grid">
          {!data?.grid && (
            <>
              {Array(rows)
                .fill(null)
                .map((_, rowIndex) => (
                  <div key={rowIndex} className="game-grid-row">
                    {Array(cols)
                      .fill(null)
                      .map((_, colIndex) => (
                        <MineBgBasic
                          key={colIndex}
                          mineSize={size}
                          cell="?"
                          onClick={() => {}}
                        />
                      ))}
                  </div>
                ))}
            </>
          )}

          {data?.grid.map((row, rowIndex) => (
            <div key={rowIndex} className="game-grid-row">
              {row.map((cell, colIndex) => (
                <MineBgBasic
                  key={colIndex}
                  mineSize={size}
                  cell={cell}
                  onClick={() => cellClick(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
