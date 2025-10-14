import React from 'react';
import { css } from '@emotion/react';
import CalendarHeatmap from './components/CalendarHeatmap';
import generateSampleData from './data/generateSampleData';

const appStyles = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem 1rem;
`;

const sampleData = generateSampleData();

const App: React.FC = () => {
  return (
    <div css={appStyles}>
      <h1>Calendar Heatmap Demo</h1>
      <CalendarHeatmap data={sampleData} year={new Date().getFullYear()} />
    </div>
  );
};

export default App;