import React from 'react';
import styled from '@emotion/styled';
import RadialChartPlugin from './plugins/RadialChartPlugin';

const Container = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.08);
  padding: 2rem;
`;

const Placeholder = styled.div`
  padding: 1.5rem;
  background: #e5e7eb;
  border-radius: 0.75rem;
  color: #555;
  text-align: center;
  margin-bottom: 2rem;
`;

const App: React.FC = () => {
  return (
    <Container>
      {/* Existing plugins placeholder */}
      <Placeholder>Existing Plugins Appear Here</Placeholder>
      {/* New Radial Chart Plugin below existing plugins */}
      <RadialChartPlugin />
    </Container>
  );
};

export default App;