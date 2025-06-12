import React from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DatePicker = ({ selectedDate, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
        placeholder="Pick a date"
        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
        readOnly
      />
      <div className="absolute z-10 mt-1">
        <Calendar
          date={selectedDate || new Date()}
          onChange={onChange}
          color="#6366F1" // indigo-500
        />
      </div>
    </div>
  );
};

export default DatePicker;