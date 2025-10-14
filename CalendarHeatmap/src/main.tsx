import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global, css } from '@emotion/react';
import App from './App';

const globalStyles = css`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: system-ui, sans-serif;
    background: #f9f9f9;
  }
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>
);