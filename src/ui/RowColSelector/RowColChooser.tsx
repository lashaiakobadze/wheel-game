import React, { useState } from 'react';
import './RowColSelector.css';

enum Labels {
  ROWS = 'Rows',
  COLS = 'Columns',
}

interface RowColSelectorProps {
  onChange: (rows: number, cols: number) => void;
  disabled?: boolean;
  defaultRows?: number;
  defaultCols?: number;
  minRows?: number;
  minCols?: number;
  maxRows?: number;
  maxCols?: number;
}

interface NumberInputProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  disabled?: boolean;
  isXSMobile: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onValueChange,
  min,
  max,
  disabled = false,
  // isXSMobile,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Parse input value as number
    const newValue = parseInt(inputValue, 10);

    // Update only if newValue is within the range
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onValueChange(newValue);
    }

    if (newValue < min) {
      onValueChange(min);
    }

    if (newValue > max) {
      onValueChange(max);
    }
  };

  const figures = [];

  for (let i = 0; i < value; i++) {
    figures.push(<div key={i} className="figure"></div>);
  }

  return (
    <label>
      <div
        className="figures"
        style={label === Labels.COLS ? { display: 'flex' } : {}}
      >
        {figures}
      </div>
      <input
        type="number"
        defaultValue={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </label>
  );
};

const RowColSelector: React.FC<RowColSelectorProps> = ({
  onChange,
  // disabled = false,
  defaultRows,
  defaultCols,
  minRows = 1,
  minCols = 1,
  maxRows = 10,
  maxCols = 10,
}) => {
  const isXSMobile = window.innerWidth <= 375;

  const [rows, setRows] = useState<number>(defaultRows);
  const [cols, setCols] = useState<number>(defaultCols);

  const handleRowChange = (value: number) => {
    setRows(value);
    onChange(value, cols);
  };

  const handleColChange = (value: number) => {
    setCols(value);
    onChange(rows, value);
  };

  return (
    <div className="row-col-selector">
      <NumberInput
        label="Rows"
        value={rows}
        onValueChange={handleRowChange}
        min={minRows}
        max={maxRows}
        isXSMobile={isXSMobile}
      />
      <NumberInput
        label="Columns"
        value={cols}
        onValueChange={handleColChange}
        min={minCols}
        max={maxCols}
        isXSMobile={isXSMobile}
      />
    </div>
  );
};

export default RowColSelector;
