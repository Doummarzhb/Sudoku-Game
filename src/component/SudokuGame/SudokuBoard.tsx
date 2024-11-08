import React, { useState } from 'react';
// import './SudokuBoard.css';
import { generateSudoku, Board, fillBoard } from './SudokuGenerator';

type Conflicts = boolean[][];
type Difficulty = "easy" | "medium" | "hard";

const SudokuBoard: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [board, setBoard] = useState<Board>(generateSudoku(difficulty));
  const [conflicts, setConflicts] = useState<Conflicts>(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );

  // دالة للتحقق من صحة الحركة
  const isValidMove = (row: number, col: number, value: number): boolean => {
    for (let i = 0; i < 9; i++) {
      if ((board[row][i] === value && i !== col) || (board[i][col] === value && i !== row)) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          board[startRow + i][startCol + j] === value &&
          (startRow + i !== row || startCol + j !== col)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const handleChange = (row: number, col: number, value: string) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const parsedValue = value === "" ? "" : parseInt(value);
      const newBoard = board.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? parsedValue : cell
        )
      ) as Board;
      setBoard(newBoard);
      updateConflicts(newBoard);
    }
  };

  const updateConflicts = (newBoard: Board) => {
    const newConflicts: Conflicts = newBoard.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (cell === "") return false;
        return !isValidMove(rowIndex, colIndex, cell as number);
      })
    );
    setConflicts(newConflicts);
  };

  const checkSolution = () => {
    const isComplete = board.every(row => row.every(cell => cell !== ""));
    const hasConflict = conflicts.some(row => row.includes(true));
    if (!isComplete) {
      alert("The board is not complete.");
    } else if (hasConflict) {
      alert("There are conflicts in the solution.");
    } else {
      alert("Congratulations! The solution is correct.");
    }
  };

  const generateNewPuzzle = () => {
    const newBoard = generateSudoku(difficulty);
    setBoard(newBoard);
    setConflicts(Array.from({ length: 9 }, () => Array(9).fill(false)));
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    generateNewPuzzle();
  };

  // دالة لحل اللوحة يدويًا
  const solveBoard = () => {
    const solvedBoard = board.map(row => [...row]);
    if (fillBoard(solvedBoard)) {
      setBoard(solvedBoard);
    } else {
      alert("The board cannot be solved.");
    }
  };

  // دالة لإعطاء تلميح
  const giveHint = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === "") {
          const solvedBoard = board.map(r => [...r]);
          fillBoard(solvedBoard);
          setBoard(prevBoard =>
            prevBoard.map((r, rowIndex) =>
              r.map((cell, colIndex) =>
                rowIndex === row && colIndex === col ? solvedBoard[row][col] : cell
              )
            ) as Board
          );
          return;
        }
      }
    }
    alert("No hints available!");
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full max-w-md">
    <div className="flex justify-center gap-2 mb-4">
      <button onClick={() => handleDifficultyChange("easy")} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Easy</button>
      <button onClick={() => handleDifficultyChange("medium")} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700">Medium</button>
      <button onClick={() => handleDifficultyChange("hard")} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Hard</button>
    </div>

    {board.map((row, rowIndex) => (
      <div className="grid grid-cols-9" key={rowIndex}>
        {row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="text"
            maxLength={1}
            value={cell === 0 ? "" : cell.toString()}
            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
            className={`w-10 h-10 text-center text-lg border ${
              conflicts[rowIndex][colIndex] ? "bg-gray-400 border-gray-400" : "border-gray-300"
            } ${
              (rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? "border-b-2" : ""
            } ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? "border-r-2" : ""}`}
            readOnly={cell !== ""}
          />
        ))}
      </div>
    ))}
    
    <div className="grid grid-cols-2 gap-2 mt-4 w-full max-w-xs mx-auto">
  <button className="bg-green-500 text-white py-1 px-1 rounded text-sm hover:bg-green-700" onClick={checkSolution}>
    Check Solution
  </button>
  <button className="bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-700" onClick={generateNewPuzzle}>
    New Puzzle
  </button>
  <button className="bg-yellow-500 text-white py-1 px-3 rounded text-sm hover:bg-yellow-700" onClick={solveBoard}>
    Solve
  </button>
  <button className="bg-purple-500 text-white py-1 px-3 rounded text-sm hover:bg-purple-700" onClick={giveHint}>
    Hint
  </button>
</div>

  </div>
  );
};

export default SudokuBoard;
