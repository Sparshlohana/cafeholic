import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const CustomDatePicker = ({ selectedDate, onDateChange, ...props }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={date => onDateChange(date)}
      className={cn('p-3', props.className)}
      calendarClassName={cn('w-auto')}
      showPopperArrow={false}
      customInput={
        <button className={cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')}>
          <ChevronLeft className="absolute left-1" />
          <ChevronRight className="absolute right-1" />
        </button>
      }
      {...props}
    />
  );
};

function Calendar({ className, selectedDate, onDateSelect, ...props }) {
  return (
    <CustomDatePicker
      selectedDate={selectedDate}
      onDateChange={date => onDateSelect(date)}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';
export { Calendar };
