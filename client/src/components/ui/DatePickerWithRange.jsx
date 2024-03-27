import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeRangePicker from './TimeRangePicker';

export default function DatePickerWithRange({ className, setDateRange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState({ start: '09:00', end: '17:00' });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setDateRange({ from: date, to: date, timeRange: selectedTimeRange });
  };

  const handleTimeRangeSelect = (startTime, endTime) => {
    setSelectedTimeRange({ start: startTime, end: endTime });
    setDateRange({ from: selectedDate, to: selectedDate, timeRange: { start: startTime, end: endTime } });
  };

  return (
    <div className='flex w-full justify-center items-center flex-col'>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateSelect}
        dateFormat="dd/MM/yyyy"
        className={"w-full" + className}
        minDate={new Date()}
      />
      <TimeRangePicker onSelect={handleTimeRangeSelect} />
    </div>
  );
}
