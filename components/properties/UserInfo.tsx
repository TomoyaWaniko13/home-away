import Image from 'next/image';

// 118. UserInfo Component

type Props = {
  profile: { profileImage: string; firstName: string };
};

const UserInfo = ({ profile: { profileImage, firstName } }: Props) => {
  return (
    // １番目の列は auto で、２番目の列は利用可能な残りのスペースを全て占めます。
    <article className={'grid grid-cols-[auto,1fr] gap-4 mt-4'}>
      <Image src={profileImage} alt={firstName} width={50} height={50} className={'rounded w-12 h-12 object-cover'} />
      <div>
        <p>
          Hosted by <span className={'font-bold'}>{firstName}</span>
        </p>
        <p className={'text-muted-foreground font-light'}>Superhost &middot; 2 years hosting</p>
      </div>
    </article>
  );
};

export default UserInfo;
