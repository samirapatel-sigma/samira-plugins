import React from 'react';
import { css } from '@emotion/react';
import CalendarHeatmap from './components/CalendarHeatmap';

const dummyElementsStyle = css`
  background: #f5f7f9;
  border-radius: 8px;
  margin-bottom: 32px;
  padding: 16px 24px;
`;

export default function App() {
  return (
    <div
      css={css`
        max-width: 760px;
        margin: 40px auto;
        font-family: 'Segoe UI', Arial, sans-serif;
        padding: 0 12px;
      `}
    >
      {/* Example existing elements on the page */}
      <div css={dummyElementsStyle}>
        <h2>Welcome Sigma</h2>
        <p>This is a demo page. The elements above show some basic content.</p>
      </div>
      <div css={dummyElementsStyle}>
        <h3>Another Section</h3>
        <p>Below is the new Calendar Heatmap plugin element you requested:</p>
      </div>
      {/* CalendarHeatmap plugin is placed next available below existing elements */}
      <CalendarHeatmap />
    </div>
  );
}