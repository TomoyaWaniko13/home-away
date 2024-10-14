'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { LuShare2 } from 'react-icons/lu';
import { EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share'; // 114. Share Button Component

// 114. Share Button Component

type Props = {
  propertyId: string;
  name: string;
};

const ShareButton = ({ propertyId, name }: Props) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/properties/${propertyId}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} size={'icon'} className={'p-2'}>
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent side={'top'} align={'end'} sideOffset={10} className={'flex items-center gap-x-2 justify-center w-full'}>
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton url={shareLink} title={name}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
