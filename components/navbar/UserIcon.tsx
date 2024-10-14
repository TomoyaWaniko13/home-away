import { LuUser2 } from 'react-icons/lu';
import Image from 'next/image';
import { fetchProfileImage } from '@/actions/profileAction';

// 58. LinksDropdown Component

const UserIcon = async () => {
  const profileImage = await fetchProfileImage();

  if (profileImage) {
    return <Image src={profileImage} className={'w-6 h-6 rounded-full object-cover'} alt={'user image'} width={100} height={100} />;
  }

  return <LuUser2 className={'w-6 h-6 bg-primary rounded-full text-white dark:bg-muted'} />;
};

export default UserIcon;
