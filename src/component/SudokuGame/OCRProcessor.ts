import Tesseract from 'tesseract.js';
import { Board } from './SudokuGenerator'; // استيراد النوع الخاص بالمصفوفة

// دالة لمعالجة الصورة باستخدام Tesseract واستخراج الأرقام
export const processImage = async (imageFile: File): Promise<Board | null> => {
  try {
    // إنشاء العامل الخاص بـ Tesseract
    const worker = await Tesseract.createWorker();

    // تحميل العامل وإعادة تهيئته
    await worker.load();
    await worker.reinitialize('eng'); // اللغة المطلوبة (الإنجليزية)

    // تعيين whitelist للأرقام فقط
    await worker.setParameters({
      tessedit_char_whitelist: '123456789'
    });

    // معالجة الصورة باستخدام Tesseract
    const { data: { text } } = await worker.recognize(imageFile);

    // إنهاء العامل بعد الاستخدام
    await worker.terminate();

    // تحويل النص المستخرج إلى مصفوفة سودوكو
    return parseSudokuText(text);

  } catch (error) {
    console.error("Error processing image:", error);
    return null;
  }
};

// دالة لتحويل النص المستخرج إلى مصفوفة سودوكو
const parseSudokuText = (text: string): Board => {
  const board: Board = Array.from({ length: 9 }, () => Array(9).fill("") as (number | "")[]);

  // تقسيم النص إلى صفوف وتحويله إلى أرقام
  const rows = text.split("\n").filter(row => row.trim() !== "");
  rows.forEach((row, rowIndex) => {
    const numbers = row.trim().split("");
    numbers.forEach((num, colIndex) => {
      board[rowIndex][colIndex] = num === "" ? "" : parseInt(num);
    });
  });

  return board;
};
