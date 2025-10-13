import React from 'react';
import { css } from '@emotion/react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function getDummyData() {
  // Generate dummy data for the previous year up to today
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);
  const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  const data = [];
  for (let d = 0; d <= days; d++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + d);
    // Random value 0-4, with 70% chance to be 0-2, 30% chance to be 3-4
    let value = Math.random() < 0.3 ? Math.floor(Math.random() * 2) + 3 : Math.floor(Math.random() * 3);
    data.push({
      date: date.toISOString().slice(0, 10),
      count: value
    });
  }
  return data;
}

const colorScale = [
  '#ebedf0', // level 0
  '#c6e48b', // level 1
  '#7bc96f', // level 2
  '#239a3b', // level 3
  '#196127', // level 4
];

export default function CalendarHeatmapPlugin() {
  const data = React.useMemo(() => getDummyData(), []);
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  return (
    <div
      css={css`
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px #0d213514;
        padding: 16px 24px 32px;
        margin-bottom: 28px;
      `}
    >
      <h3
        css={css`
          margin-top: 0;
          font-weight: 600;
          font-size: 20px;
        `}
      >
        Calendar Activity Heatmap
      </h3>
      <p css={css`margin-bottom: 18px; color: #5d6b88;`}>View of activity over the last year.</p>
      <div
        css={css`
          display: flex;
          justify-content: center;
          background: #fafbfc;
          border-radius: 8px;
          padding: 16px 0 10px 2px;
        `}
      >
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={data}
          classForValue={value => {
            if (!value || !value.count) return 'color-empty';
            if (value.count >= 4) return 'color-scale-4';
            if (value.count >= 3) return 'color-scale-3';
            if (value.count >= 2) return 'color-scale-2';
            if (value.count >= 1) return 'color-scale-1';
            return 'color-empty';
          }}
          tooltipDataAttrs={value => {
            if (!value || !value.date) return null;
            return {
              'data-tip': `${value.date}: ${value.count || 0} activities`
            };
          }}
          showWeekdayLabels
        />
      </div>
      {/* Custom heatmap colors with CSS-in-JS theme */}
      <style>{`
        .color-empty { fill: ${colorScale[0]}; }
        .color-scale-1 { fill: ${colorScale[1]}; }
        .color-scale-2 { fill: ${colorScale[2]}; }
        .color-scale-3 { fill: ${colorScale[3]}; }
        .color-scale-4 { fill: ${colorScale[4]}; }
        .react-calendar-heatmap text { font-size: 10px; fill: #99a0b4; }
        .react-calendar-heatmap .react-calendar-heatmap-small-text { font-size: 8px; }
      `}</style>
    </div>
  );
}