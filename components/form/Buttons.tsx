'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SignInButton } from '@clerk/nextjs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

// 64. Buttons Component
// 81. Image Input Container

type buttonSize = 'default' | 'lg' | 'sm';

type Props = {
  className?: string;
  text?: string;
  size?: buttonSize;
};

export const SubmitButton = (props: Props) => {
  const { className = '', text = 'submit', size = 'lg' } = props;

  // The useFormStatus Hook provides status information of the "last form submission".
  // It must be rendered within a <form>.
  // When pending === true、the form is being submitted。
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#pending-states
  const { pending } = useFormStatus();

  return (
    <Button type={'submit'} disabled={pending} className={`capitalize ${className}`} size={size}>
      {pending ? (
        <>
          <ReloadIcon className={'mr-2 h-4 w-4 animate-spin'} />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
};

// 107. Favorites SignIn Button
export const CardSignInButton = () => {
  return (
    <SignInButton mode={'modal'}>
      <Button type={'button'} size={'icon'} variant={'outline'} className={'p-2 cursor-pointer'} asChild>
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

// 109. Favorites Toggle Form
export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  // about useFormStatus():
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#pending-states
  const { pending } = useFormStatus();

  return (
    <Button type={'submit'} size={'icon'} variant={'outline'} className={'p-2 cursor-pointer'}>
      {pending ? <ReloadIcon className={'animate-spin'} /> : isFavorite ? <FaHeart /> : <FaRegHeart />}
    </Button>
  );
};
