import { getAuthUser } from '@/actions/profileAction';
import { redirect } from 'next/navigation';
import db from '@/utils/db';

// 163. Admin Page - Stats Container
const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USRE_ID) redirect('/');
  return user;
};

// 163. Admin Page - Stats Container
export const fetchStats = async () => {
  await getAdminUser();

  const usersCount = await db.profile.count();
  const propertiesCount = await db.property.count();
  const bookingsCount = await db.booking.count();

  return { usersCount, propertiesCount, bookingsCount };
};
