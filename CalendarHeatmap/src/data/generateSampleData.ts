import { CalendarDayData } from '../types/CalendarDayData';

function pad(n: number) {
  return n < 10 ? '0'+n : n;
}

export default function generateSampleData(year = new Date().getFullYear()): CalendarDayData[] {
  const isLeap = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
  const daysInMonth = [31, isLeap?29:28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const res: CalendarDayData[] = [];
  for (let m = 0; m < 12; m++) {
    for (let d = 1; d <= daysInMonth[m]; d++) {
      const val = Math.floor(Math.random() * 100); // 0..99
      res.push({ date: `${year}-${pad(m + 1)}-${pad(d)}`, value: val });
    }
  }
  return res;
}