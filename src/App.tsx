
import './App.css'
import ImageUploader from './component/SudokuGame/ImageUploader'
import SudokuBoard from './component/SudokuGame/SudokuBoard'
import { Helmet } from 'react-helmet-async';
function App() {
  

  return (
    <>
    <Helmet> 
        <title>Sudoku OCR Solver Game</title>
        <meta name="description" content="A fun Sudoku game with OCR technology to solve puzzles from images." />
        <meta name="keywords" content="Sudoku, OCR, game, puzzle, solve Sudoku, upload Sudoku image" />
      </Helmet>

     <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Sudoku Game</h1>
       
      <div className="flex flex-col items-center gap-8">
        <ImageUploader />
        <SudokuBoard />
      </div>
    </div>
      
      
    </>
  )
}


export default App
