import React from 'react';
import { css } from '@emotion/react';
import CalendarHeatmap from './components/CalendarHeatmap.tsx';

const appContainer = css`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #f7f7f7;
  padding: 40px 0;
`;

const cardCss = css`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.07);
  width: 95vw;
  max-width: 920px;
  padding: 36px 36px 24px 36px;
`;

export default function App() {
  return (
    <main css={appContainer}>
      <section css={cardCss}>
        <h1 style={{marginBottom: 36}}>Calendar Heatmap Demo</h1>
        {/* CalendarHeatmap is placed according to layout: x=1, y=112, width=24, height=15 */}
        <CalendarHeatmap />
      </section>
    </main>
  );
}