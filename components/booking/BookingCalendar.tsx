import { useEffect, useState } from 'react';

import { DateRange } from 'react-day-picker';
import { defaultDateRangeSelected, generateBlockedPeriods, generateDateRange, generateDisabledDates } from '@/utils/calendar';
import { Calendar } from '@/components/ui/calendar';
import { useProperty } from '@/utils/store';
import { Booking } from '@/utils/types';
import { useToast } from '@/hooks/use-toast'; // 138. Booking Components

// 138. Booking Components
// 140. Booking Container / Calendar - Initial Setup
// 141. Calculate Totals
// 145. Blocked Periods
// 146. Disabled Dates

const BookingCalendar = () => {
  const currentDate = new Date();
  // <Calendar/> の onSelect の設定により、日付の範囲を選択した時 range の値が更新されます。
  const [range, setRange] = useState<DateRange | undefined>(defaultDateRangeSelected);
  // state にアクセスするために、コールバック関数を渡します。
  const bookings: Booking[] = useProperty((state) => state.bookings);

  const { toast } = useToast();

  // blockedPeriods 変数は generateDisabledDates() と <Calendar/> に渡されます。
  const blockedPeriods: DateRange[] = generateBlockedPeriods({ bookings, today: currentDate });
  const unavailableDates: { [p: string]: boolean } = generateDisabledDates(blockedPeriods);

  useEffect(() => {
    // 選択された日付範囲 (selectedRange) を生成します。
    const selectedRange: string[] = generateDateRange(range);

    // selectedRange 内の各日付について、その日が unavailableDates に含まれているかチェックします。
    const isDisabledDateIncluded = selectedRange.some((date) => {
      // もし選択範囲内に予約不可能な日付が含まれていた場合：
      if (unavailableDates[date]) {
        setRange(defaultDateRangeSelected); // setRange を使用して選択をリセットします（defaultDateRangeSelected に戻す）。
        toast({ description: 'Some dates are booked. Please select again.' }); // toast 関数を使用してユーザーにエラーメッセージを表示します。
        return true;
      }
      return false;
    });

    // 最後に、新しい range を useProperty.setState を使用してグローバルステートに保存します。
    useProperty.setState({ range });
  }, [range]);

  return <Calendar mode={'range'} defaultMonth={currentDate} selected={range} onSelect={setRange} className={'mb-4'} disabled={blockedPeriods} />;
};

export default BookingCalendar;
