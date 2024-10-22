'use server';

import { getAuthUser } from '@/actions/profileAction';
import { redirect } from 'next/navigation';
import db from '@/utils/db';
import { formatDate } from '@/utils/format';

// 163. Admin Page - Stats Container
const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USRE_ID) redirect('/');
  return user;
};

// 163. Admin Page - Stats Container
// 170. Stripe - Refactor Queries
export const fetchStats = async () => {
  await getAdminUser();

  const usersCount = await db.profile.count();
  const propertiesCount = await db.property.count();
  const bookingsCount = await db.booking.count({ where: { paymentStatus: true } });

  return { usersCount, propertiesCount, bookingsCount };
};

// 163. Admin Page - Stats Container
// 170. Stripe - Refactor Queries
export const fetchChartsData = async () => {
  await getAdminUser();
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const sixMonthsAgo = date;

  const bookings = await db.booking.findMany({
    where: { paymentStatus: true, createdAt: { gte: sixMonthsAgo } },
    orderBy: { createdAt: 'asc' },
  });

  // この reduce 操作の目的は、予約データを月ごとに集計することです。
  // [
  //   { createdAt: '2023-01-15T10:00:00Z' },
  //   { createdAt: '2023-01-20T14:30:00Z' },
  //   { createdAt: '2023-02-05T09:15:00Z' },
  //   { createdAt: '2023-02-10T16:45:00Z' },
  //   { createdAt: '2023-02-15T11:30:00Z' },
  // ]
  // [
  //   { date: 'January 2023', count: 2 },
  //   { date: 'February 2023', count: 3 },
  // ]

  const bookingsPerMonth: { date: string; count: number }[] = bookings.reduce(
    (total, current) => {
      // 各予約の createdAt 日時を月単位でフォーマットします。
      const date: string = formatDate(current.createdAt, true);

      // 現在の月のエントリーが既に結果配列 total に存在するか確認します。
      const existingEntry: { date: string; count: number } | undefined = total.find((entry) => entry.date === date);

      if (existingEntry) {
        // 既存のエントリーがある場合: カウントを1増やします。existingEntry.count += 1 を実行すると、total 配列も同時に更新されています。
        existingEntry.count += 1;
      } else {
        // 新しい月の場合: 新しいエントリーを配列に追加します。
        total.push({ date, count: 1 });
      }

      return total; // 更新された配列を次の反復のために返します。
    },

    [] as Array<{ date: string; count: number }>, // initial value
  );
  return bookingsPerMonth;
};
