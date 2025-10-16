import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global, css } from '@emotion/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global
      styles={css`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: Inter, Arial, sans-serif;
          background: #f6f7fb;
        }
      `}
    />
    <App />
  </React.StrictMode>,
);