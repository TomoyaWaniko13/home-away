import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { defaultSelected } from '@/utils/calendar';
import { Calendar } from '@/components/ui/calendar';
import { useProperty } from '@/utils/store';

// 138. Booking Components
// 140. Booking Container / Calendar - Initial Setup
// 141. Calculate Totals

const BookingCalendar = () => {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  useEffect(() => {
    useProperty.setState({ range });
  }, [range]);

  return <Calendar mode={'range'} defaultMonth={currentDate} selected={range} onSelect={setRange} className={'mb-4'} />;
};

export default BookingCalendar;
