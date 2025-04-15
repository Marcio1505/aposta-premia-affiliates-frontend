# Projeto Front-End com Vite, React, TypeScript e Chakra UI v2

Este é um projeto front-end configurado com Vite, React, TypeScript, Chakra UI v2, e Node.js v22. O objetivo é fornecer uma base rápida e moderna para desenvolver aplicações web com tipagem estática.

## Tecnologias Utilizadas

- **Vite**: Bundler rápido e leve para projetos em React.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript para adicionar tipagem estática e maior segurança no código.
- **Chakra UI v2**: Biblioteca de componentes de interface com foco em acessibilidade e facilidade de uso.
- **Node.js v22**: Ambiente de execução JavaScript no servidor (utilizado para rodar o projeto localmente).

## Requisitos

Antes de começar, você precisará ter o Node.js instalado em sua máquina. Para verificar se já está instalado, execute o seguinte comando no terminal:

```bash
node -v
install node v22
npm run dev - para rodar o projeto 


##Configure .env

insert VITE_ for the project to recognize the .env file

example:
VITE_API_URL=https://api.example.com
VITE_APP_NAME=app-name

to use the data from the .env file you need to import it this way

example:
import.meta.env.VITE_API_URL result -> https://api.example.com
import.meta.env.VITE_APP_NAME -> app-name

important!! do not install the dotenv library, otherwise an error will occur

_________________________________________________________________________________________________________

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
