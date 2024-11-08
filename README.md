# React + TypeScript + Vite
Sudoku Game in React and TypeScript

 npm create vite@4 || create project with vite version 4 
 npm install -D tailwindcss postcss autoprefixer || tailwind css
 npx tailwindcss init -p
 npm install tesseract.js || OCR (Optical Character Recognition)

 

 

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
