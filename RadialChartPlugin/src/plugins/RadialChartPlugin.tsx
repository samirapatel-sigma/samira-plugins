import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import styled from '@emotion/styled';

const ChartContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 1rem;
  box-shadow: 0 1px 5px 0 rgba(0,0,0,0.04);
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const dummyData = [
  {
    name: 'Group A',
    uv: 4000,
    fill: '#8884d8',
  },
  {
    name: 'Group B',
    uv: 3000,
    fill: '#82ca9d',
  },
  {
    name: 'Group C',
    uv: 2000,
    fill: '#ffc658',
  },
  {
    name: 'Group D',
    uv: 2780,
    fill: '#ff7f50',
  },
  {
    name: 'Group E',
    uv: 1890,
    fill: '#a4de6c',
  },
];

const RadialChartPlugin: React.FC = () => {
  return (
    <ChartContainer>
      <Title>Radial (Radii) Chart Example</Title>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart 
          cy="50%" 
          cx="50%" 
          innerRadius="20%" 
          outerRadius="95%" 
          barSize={20}
          data={dummyData}
        >
          <RadialBar 
            minAngle={15} 
            background 
            clockWise 
            dataKey="uv" 
            label={{ position: 'insideStart', fill: '#555', fontSize: 12 }} 
            cornerRadius={10}
          />
          <Legend 
            iconSize={14} 
            layout="vertical" 
            verticalAlign="bottom" 
            align="center"
          />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RadialChartPlugin;