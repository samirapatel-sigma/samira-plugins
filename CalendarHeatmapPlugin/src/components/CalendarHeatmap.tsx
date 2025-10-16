import React, { useMemo } from 'react';
import CalendarHeatmapLib from 'react-calendar-heatmap';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import 'react-calendar-heatmap/dist/styles.css';

// Layout meta: x=1, y=112, width=24, height=15

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateDummyData = () => {
  // Generate the past year's worth of daily data
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);
  const data = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    data.push({
      date: d.toISOString().split('T')[0],
      count: getRandomInt(0, 8)
    });
  }
  return data;
};

const heatmapContainer = css`
  margin: 0 auto;
  width: 100%;
  overflow-x: auto;
  padding: 22px 0 0 0;
`;

const Legend = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
`;
const Swatch = styled('span')`
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  background: ${props => props.color};
`;

// Custom color scale (compatible with CalendarHeatmapLib's 'classForValue')
const colorScale = [
  '#EBEDF0',   // level 0
  '#9BE9A8',  // level 1
  '#40C463',  // level 2
  '#30A14E',  // level 3
  '#216E39',  // level 4
  '#144620',  // level 5+
];

function computeLevel(count) {
  if (count === 0) return 0;
  if (count < 2) return 1;
  if (count < 4) return 2;
  if (count < 6) return 3;
  if (count < 8) return 4;
  return 5;
}

function getTooltipData(value) {
  if (!value || !value.date) return '';
  return `${value.date}: ${value.count ?? 0}`;
}

const CalendarHeatmap = () => {
  const values = useMemo(() => generateDummyData(), []);

  return (
    <section css={heatmapContainer} aria-label="Calendar heatmap">
      <CalendarHeatmapLib
        startDate={values[0].date}
        endDate={values[values.length-1].date}
        values={values}
        classForValue={value => {
          if (!value || !value.count) return 'color-calendar-level-0';
          return `color-calendar-level-${computeLevel(value.count)}`;
        }}
        tooltipDataAttrs={value => {
          if (!value || !value.date) return null;
          return {
            'data-tooltip': getTooltipData(value)
          };
        }}
        showWeekdayLabels
      />
      <Legend>
        <span style={{ fontSize: 13, color: '#57606a' }}>Less</span>
        {colorScale.map((color, idx) => (
          <Swatch key={color} color={color} />
        ))}
        <span style={{ fontSize: 13, color: '#57606a' }}>More</span>
      </Legend>
      {/* override CSS for calendar color levels */}
      <style>{`
        .color-calendar-level-0 { fill: #EBEDF0; }
        .color-calendar-level-1 { fill: #9BE9A8; }
        .color-calendar-level-2 { fill: #40C463; }
        .color-calendar-level-3 { fill: #30A14E; }
        .color-calendar-level-4 { fill: #216E39; }
        .color-calendar-level-5 { fill: #144620; }
        .react-calendar-heatmap .react-calendar-heatmap-weekday-label { font-weight: 400; font-size: 11px; fill: #777; }
        .react-calendar-heatmap text { font-size: 11px; }
        .react-calendar-heatmap .react-calendar-heatmap-month-label { fill: #263238; font-weight: 500; }
        .react-calendar-heatmap .react-calendar-heatmap-tooltip { font-size: 14px; pointer-events: none; position: absolute; z-index: 10; }
        .react-calendar-heatmap rect:hover { stroke: #263238; stroke-width: 1.5; }
      `}</style>
    </section>
  );
};

CalendarHeatmap.propTypes = {};

export default CalendarHeatmap;