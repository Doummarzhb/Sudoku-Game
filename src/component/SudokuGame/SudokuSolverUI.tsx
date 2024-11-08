import React, { useState } from 'react';
import { processImage } from './OCRProcessor';
import { Board } from './SudokuGenerator';

const SudokuSolverUI: React.FC = () => {
  const [board, setBoard] = useState<Board | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const newBoard = await processImage(event.target.files[0]);
      setBoard(newBoard);
    }
  };

  return (
    <div>
      <h1>حل سودوكو من صورة</h1>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      {board ? <SudokuBoardDisplay board={board} /> : <p>يرجى تحميل صورة تحتوي على شبكة سودوكو</p>}
    </div>
  );
};

const SudokuBoardDisplay: React.FC<{ board: Board }> = ({ board }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '5px', marginTop: '20px' }}>
    {board.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: 'flex' }}>
        {row.map((cell, colIndex) => (
          <span
            key={colIndex}
            style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #000',
              fontSize: '18px',
            }}
          >
            {cell || "."}
          </span>
        ))}
      </div>
    ))}
  </div>
);

export default SudokuSolverUI;
