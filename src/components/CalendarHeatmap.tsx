import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface HeatmapProps {
  data: {
    date: string;
    value: number;
  }[];
  colorScale?: string[];
  maxValue?: number;
  minValue?: number;
}

export function CalendarHeatmap({
  data,
  colorScale = ['#374151', '#4C1D95', '#6D28D9', '#7C3AED', '#8B5CF6'],
  maxValue: customMaxValue,
  minValue: customMinValue,
}: HeatmapProps) {
  const { theme } = useTheme();

  const maxValue = customMaxValue ?? Math.max(...data.map(d => d.value));
  const minValue = customMinValue ?? Math.min(...data.map(d => d.value));
  const valueRange = maxValue - minValue;

  const getColor = (value: number) => {
    if (value === 0) return theme === 'dark' ? '#1F2937' : '#F3F4F6';
    const normalizedValue = (value - minValue) / valueRange;
    const colorIndex = Math.min(
      Math.floor(normalizedValue * (colorScale.length - 1)),
      colorScale.length - 1
    );
    return colorScale[colorIndex];
  };

  const getTooltipContent = (value: number) => {
    return `Value: ${value.toFixed(2)}`;
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {data.map((day, index) => (
        <div
          key={day.date}
          className="aspect-square rounded-sm relative group"
          style={{ backgroundColor: getColor(day.value) }}
        >
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            {getTooltipContent(day.value)}
          </div>
        </div>
      ))}
    </div>
  );
}