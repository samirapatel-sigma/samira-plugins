import React from 'react';
import styled from '@emotion/styled';
import { CalendarDayData } from '../types/CalendarDayData';
import { getColorForValue } from '../utils/colors';

export interface CalendarHeatmapProps {
  data: CalendarDayData[];
  year: number;
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getWeeksInYear(year: number) {
  const d = new Date(year, 11, 31);
  const week = getWeekNumber(d);
  return week;
}

function getWeekNumber(date: Date) {
  // ISO week: weeks start on Monday
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((+d - +yearStart) / 86400000 + 1) / 7);
}

const Grid = styled('div')<{
  columns: number;
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-auto-rows: 18px;
  grid-gap: 3px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  padding: 18px;
`;

const Cell = styled('div')<{
  color: string;
}>`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background: ${props => props.color};
  transition: background 0.18s;
  cursor: pointer;
  position: relative;
  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 120%;
    top: 50%;
    transform: translateY(-50%);
    min-width: 100px;
    background: #1a1a1a;
    color: #fff;
    padding: 7px 9px;
    border-radius: 5px;
    font-size: 0.9em;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    white-space: nowrap;
    z-index: 5;
    pointer-events: none;
  }
`;

const CalendarAxis = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 8px;
  height: calc(18px * 7 + 18px);
`;

const WeekLabel = styled('span')`
  display: block;
  height: 18px;
  font-size: 0.86em;
  color: #888;
  margin-bottom: 3px;
`;

const MonthLabels = styled('div')<{
  columns: number;
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  font-size: 0.93em;
  color: #666;
  margin-bottom: 2px;
`;

function getMonthLabels(year: number): { name: string; week: number }[] {
  // Return the month name and the week number where each month starts
  const labels = [];
  for (let m = 0; m < 12; m++) {
    const firstDay = new Date(year, m, 1);
    const week = getWeekNumber(firstDay);
    labels.push({
      name: firstDay.toLocaleString('default', { month: 'short' }),
      week: week,
    });
  }
  return labels;
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ data, year }) => {
  // Arrange data by week (columns) and weekday (rows starting from Mon)
  const weeks = getWeeksInYear(year);
  // ISO week starts Mon=1 .. Sun=7
  // Build a 2D array: [week][weekday 0-6]
  const grid: (CalendarDayData | null)[][] = Array.from({ length: weeks }, () => Array(7).fill(null));
  data.forEach((day) => {
    const dateObj = new Date(day.date);
    const week = getWeekNumber(dateObj) - 1; // for 0-based array
    let dayIdx = dateObj.getDay() - 1;
    if (dayIdx === -1) dayIdx = 6; // Sunday should be last
    if (grid[week] && dayIdx >= 0 && dayIdx < 7) {
      grid[week][dayIdx] = day;
    }
  });
  const monthLabels = getMonthLabels(year);
  
  // Build color scale
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <CalendarAxis>
        {weekDays.map((wd, idx) => (
          <WeekLabel key={wd} style={{ opacity: (idx % 2 === 0) ? 1 : 0 }}>{wd}</WeekLabel>
        ))}
      </CalendarAxis>
      <div>
        <MonthLabels columns={weeks}>
          {Array.from({ length: weeks }, (_, w) => {
            const monthLabel = monthLabels.find(ml => ml.week === w + 1);
            return (
              <span key={w} style={{ textAlign: 'center' }}>{monthLabel ? monthLabel.name : ''}</span>
            );
          })}
        </MonthLabels>
        <Grid columns={weeks}>
          {Array.from({ length: 7 }, (_, row) =>
            Array.from({ length: weeks }, (_, col) => {
              const day = grid[col][row];
              return day ? (
                <Cell
                  key={`${col}-${row}`}
                  color={getColorForValue(day.value, min, max)}
                  data-tooltip={`${day.date}: ${day.value}`}
                  title={`${day.date}: ${day.value}`}
                />
              ) : (
                <Cell key={`${col}-${row}`} color="#eaeaea" />
              );
            })
          )}
        </Grid>
      </div>
    </div>
  );
};

export default CalendarHeatmap;