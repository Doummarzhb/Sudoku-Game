import React, { useState } from 'react';
import { processImage as processOCRImage } from './OCRProcessor';
import { Board } from './SudokuGenerator';

const ImageUploader: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        processImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imageFile: File) => {
    setIsProcessing(true);
    const board = await processOCRImage(imageFile);
    setIsProcessing(false);
    if (board) {
      setExtractedText(board.map(row => row.join(' ')).join('\n'));
    } else {
      setExtractedText("No valid Sudoku board found.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Upload Sudoku Image</h1>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        className="w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2 bg-gray-50 cursor-pointer focus:ring-2 focus:ring-blue-400"
      />
     {imageSrc && (
        <div className="flex mt-4 space-x-4">
          {/* الصورة المحملة */}
          <img 
            src={imageSrc} 
            alt="Uploaded" 
            className="w-32 h-32 object-cover border-2 border-gray-300 rounded-lg"
          />
          
          {/* النص المستخرج */}
          <div className="p-2 bg-gray-50 border border-gray-300 rounded-md text-gray-800 text-xs whitespace-pre-wrap w-32 h-32 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Extracted Sudoku:</h3>
            <pre>{extractedText}</pre>
          </div>
        </div>
      )}

      {isProcessing && <p className="mt-4 text-blue-600 text-center">Processing...</p>}
    </div>
  );
};

export default ImageUploader;
