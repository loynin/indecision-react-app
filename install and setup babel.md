## Insall and Run Babel for JSX Compiler

1. Install babel command line with the following: `npm install -g babel-cli`
2. Install babel preset by the following commands 
    ```
        npm install babel-preset-react -save 
        npm install babel-preset-env --save
    ```

3. Run babel for compiling the code:
    `babel src/app.js --out-file=public/scripts/app.js --presets=env,react -watch`  watch: is used for babel to watch for code change and compile it automatically.

---

