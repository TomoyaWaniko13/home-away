'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SignInButton } from '@clerk/nextjs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LuPenSquare, LuTrash2 } from 'react-icons/lu';

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

// 132. IconButton Component
type actionType = 'edit' | 'delete';

export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        return <LuPenSquare />;
      case 'delete':
        return <LuTrash2 />;
      default:
        // この代入は実際には行われないことを前提としています。この行のポイントは、型チェックを引き起こすことです。
        // switch文で全ての可能なactionTypeを処理した後、理論上この行に到達することはありません。
        // TypeScriptは、actionType（これは'edit' | 'delete'型）をnever型に代入しようとすることで、型の不一致を検出します。
        // この不一致が、コンパイラに「ここに到達してはいけない」というシグナルを送ります。
        // もし新しいactionTypeが追加され、switch文で処理されていない場合、この行でコンパイルエラーが発生します。
        // https://typescriptbook.jp/reference/statements/never#never%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F%E7%B6%B2%E7%BE%85%E6%80%A7%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF
        const never: never = actionType;
        throw new Error(`Invalid action type ${never}`);
    }
  };

  return (
    <Button type={'submit'} size={'icon'} variant={'link'} className={'p-2 cursor-pointer'}>
      {pending ? <ReloadIcon className={'animate-spin'} /> : renderIcon()}
    </Button>
  );
};
