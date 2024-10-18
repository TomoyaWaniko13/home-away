import { DateRange } from 'react-day-picker';
import { Booking } from '@/utils/types';

// 140. Booking Container / Calendar - Initial Setup
// 145. Blocked Periods
// 146. Disabled Dates

export const defaultDateRangeSelected: DateRange = {
  from: undefined,
  to: undefined,
};

// 予約された期間と、今日までの期間を、shadcn/ui の <Calendar/> が理解できるフォーマットで生成します。
export const generateBlockedPeriods = ({ bookings, today }: { bookings: Booking[]; today: Date }) => {
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

  // shadcn/ui の <Calendar/> が理解できるフォーマットに変更します。
  const disabledDays: DateRange[] = [
    // bookings.map()の結果（新しい配列）を展開し、その展開された要素をdisabledDays配列の要素として直接組み込んでいます。
    ...bookings.map((booking) => ({
      from: booking.checkIn,
      to: booking.checkOut,
    })),
    {
      from: new Date(0), // This is 01 January 1970 00:00:00 UTC.
      to: new Date(today.getTime() - 24 * 60 * 60 * 1000), // This is yesterday.
    },
  ];
  // console.log(disabledDays);
  return disabledDays;
};

// 与えられた日付範囲（開始日と終了日）の間にある全ての日付を文字列の配列として生成します。
export const generateDateRange = (range: DateRange | undefined): string[] => {
  // この行は入力チェックです。range が未定義（undefined）、または range.from か range.to が未定義の場合、空の配列を返して関数を終了します。
  if (!range || !range.from || !range.to) return [];

  // range.from（開始日）から新しい Date オブジェクトを作成し、currentDate 変数に代入します。これは日付範囲をイテレートするための開始点となります。
  let currentDate = new Date(range.from);
  // range.to（終了日）から新しい Date オブジェクトを作成し、endDate 変数に代入します。これはイテレーションの終了点を示します。
  const endDate = new Date(range.to);
  // 結果を格納するための空の文字列配列 dateRange を初期化します。
  const dateRange: string[] = [];

  // currentDate が endDate 以下である限り、ループを続けます。
  while (currentDate <= endDate) {
    // 現在の日付を ISO 文字列形式に変換し、2024-10-31T15:00:00.000Z
    // 'T'（時間部分の開始）で分割して日付部分のみを取得します。結果は 'YYYY-MM-DD' 形式の文字列になります。
    const dateString = currentDate.toISOString().split('T')[0];
    // 生成された日付文字列を dateRange 配列に追加します。
    dateRange.push(dateString);
    // currentDate を1日進めます。これにより、次のループで次の日が処理されます。
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // 生成された日付文字列の配列を返します。 ['2024-10-31', '2024-11-01', '2024-11-02']
  return dateRange;
};

// この関数は、与えられた無効な日付範囲のリストから、今日以降の全ての無効な日付を 'YYYY-MM-DD' 形式の文字列をキーとし、true を
// 値とするオブジェクトとして生成します。これは主にカレンダーUIコンポーネントで、特定の日付を選択不可（無効）にするために使用されます。
// オブジェクト形式で返すことで、特定の日付が無効かどうかを高速に確認できるようになっています。
export const generateDisabledDates = (disabledDays: DateRange[]): { [key: string]: boolean } => {
  // disabledDays 配列が空の場合、空のオブジェクトを返して関数を終了します。
  if (disabledDays.length === 0) return {};

  // 無効な日付を格納するための空のオブジェクト disabledDates を初期化します。
  const disabledDates: { [key: string]: boolean } = {};
  // 現在の日付を表す Date オブジェクトを作成します。
  const today = new Date();
  // today の時間、分、秒、ミリ秒をすべて0にセットします。これにより、日付の比較が容易になります。
  today.setHours(0, 0, 0, 0);

  // disabledDays 配列の各要素（日付範囲）に対してループを開始します。
  disabledDays.forEach((range: DateRange) => {
    // 現在の range オブジェクトの from または to が未定義の場合、このイテレーションをスキップします。
    if (!range.from || !range.to) return;

    // TODO なぜ const の代わりに let が使われている?
    // range.from（開始日）から新しい Date オブジェクトを作成し、currentDate 変数に代入します。
    let currentDate: Date = new Date(range.from);
    // range.to（終了日）から新しい Date オブジェクトを作成し、endDate 変数に代入します。
    const endDate: Date = new Date(range.to);

    // currentDate が endDate 以下である限り、ループを続けます。
    while (currentDate <= endDate) {
      // currentDate が today より前の日付である場合の条件チェックです。
      if (currentDate < today) {
        // console.log(currentDate);

        // currentDate を1日進めます。
        currentDate.setDate(currentDate.getDate() + 1);
        // ループの次のイテレーションに進みます（今日より前の日付はスキップされます）。
        continue;
      }
      // 現在の日付を ISO 文字列形式に変換し、2024-10-29T15:00:00.000Z
      // 'T'（時間部分の開始）で分割して日付部分のみを取得します。結果は 'YYYY-MM-DD' 形式の文字列になります。
      const dateString = currentDate.toISOString().split('T')[0];
      // disabledDates オブジェクトに、現在の日付文字列をキーとして true 値を設定します。
      disabledDates[dateString] = true;
      // currentDate を1日進めます。これにより、次のループで次の日が処理されます。
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  // console.log(disabledDays);
  return disabledDates;
};

export function calculateDaysBetween({ checkIn, checkOut }: { checkIn: Date; checkOut: Date }) {
  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(checkOut.getTime() - checkIn.getTime());

  // Convert the difference in milliseconds to days
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays;
}
