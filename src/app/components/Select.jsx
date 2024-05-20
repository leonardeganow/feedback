
import React, { useState } from 'react';

const MonthYearSelect = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Selected Month and Year: ${selectedMonthYear}`);
  };

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years = Array.from(new Array(10), (val, index) => 2024 - index);

  const generateMonthYearOptions = () => {
    const options = [];
    for (const year of years) {
      for (const month of months) {
        options.push({
          value: `${month.value}-${year}`,
          label: `${month.label} ${year}`,
        });
      }
    }
    return options;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4   mx-auto">
      <div className="flex flex-col ">
        <label htmlFor="month-year" className=" font-bold text-gray-400 text-sm ">FEEDBACK PERIOD</label>
        <div className="relative">
          <select
            id="month-year"
            value={selectedMonthYear}
            onChange={(e) => setSelectedMonthYear(e.target.value)}
            required
            className=" border p-2 px-5  mb-2 appearance-none w-full"
          >
            <option value="" disabled>Month  Year</option>
            {generateMonthYearOptions().map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
     
    </form>
  );
};

export default MonthYearSelect;