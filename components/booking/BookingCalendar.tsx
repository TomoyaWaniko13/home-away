import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { defaultSelected, generateBlockedPeriods } from '@/utils/calendar';
import { Calendar } from '@/components/ui/calendar';
import { useProperty } from '@/utils/store';
import { Booking } from '@/utils/types';

// 138. Booking Components
// 140. Booking Container / Calendar - Initial Setup
// 141. Calculate Totals
// 145. Blocked Periods

const BookingCalendar = () => {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const bookings: Booking[] = useProperty((state) => state.bookings);

  const blockedPeriods = generateBlockedPeriods({ bookings, today: currentDate });

  useEffect(() => {
    useProperty.setState({ range });
  }, [range]);

  return <Calendar mode={'range'} defaultMonth={currentDate} selected={range} onSelect={setRange} className={'mb-4'} disabled={blockedPeriods} />;
};

export default BookingCalendar;
