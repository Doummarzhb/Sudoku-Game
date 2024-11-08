export type Board = (number | "")[][];


const createEmptyBoard = (): Board => {
  return Array.from({ length: 9 }, () => Array(9).fill("") as (number | "")[]);
};

const isValidMove = (board: Board, row: number, col: number, num: number): boolean => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }


  
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
};

export const fillBoard = (board: Board): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === "") {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = ""; // Backtrack
          }
        }
        return false;
      }
    }
  }
  return true;
};

const removeCells = (board: Board, level: "easy" | "medium" | "hard"): Board => {
  const newBoard = board.map(row => [...row]);
  const attempts = level === "easy" ? 20 : level === "medium" ? 35 : 50;

  for (let i = 0; i < attempts; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (newBoard[row][col] !== "") {
      newBoard[row][col] = "";
    }
  }
  return newBoard;
};

export const generateSudoku = (level: "easy" | "medium" | "hard"): Board => {
  const board = createEmptyBoard();
  fillBoard(board);
  return removeCells(board, level);
};
 