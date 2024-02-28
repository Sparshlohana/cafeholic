import React, { useState } from 'react';

function TimeRangePicker({ onSelect }) {
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');

    const handleStartTimeChange = (e) => {
        const newStartTime = e.target.value;
        setStartTime(newStartTime);
        onSelect(newStartTime, endTime);
    };

    const handleEndTimeChange = (e) => {
        const newEndTime = e.target.value;
        setEndTime(newEndTime);
        onSelect(startTime, newEndTime);
    };

    return (
        <div className='flex gap-3 py-3'>
            <div className='flex gap-1'>
                <label>Start Time:</label>
                <input type="time" value={startTime} onChange={handleStartTimeChange} />
            </div>
            <div className='flex gap-1'>
                <label>End Time:</label>
                <input type="time" value={endTime} onChange={handleEndTimeChange} />
            </div>
        </div>
    );
}

export default TimeRangePicker;
