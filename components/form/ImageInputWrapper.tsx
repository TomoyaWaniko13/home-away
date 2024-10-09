'use client';

import { formSubmitAction } from '@/utils/types';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import FormWrapper from '@/components/form/FormWrapper';
import ImageInput from '@/components/form/ImageInput';
import SubmitButton from '@/components/form/SubmitButton';
import { LuUser2 } from 'react-icons/lu';

// 81. Image Input Container

type Props = {
  image: string;
  name: string;
  action: formSubmitAction;
  text: string;
  children?: ReactNode;
};

const ImageInputWrapper = (props: Props) => {
  const { image, name, action, text, children } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  return (
    <div>
      {image ? (
        <Image src={image} alt={name} width={100} height={100} className={'rounded object-cover mb-4 w-24 h-24'} />
      ) : (
        <LuUser2 className={'w-24 h-24 bg-primary rounded text-white mb-4'} />
      )}
      <Button variant={'outline'} size={'sm'} onClick={() => setUpdateFormVisible((prev) => !prev)}>
        {text}
      </Button>
      {isUpdateFormVisible && (
        <div className={'max-w-lg mt-4'}>
          <FormWrapper formSubmitAction={action}>
            {children}
            <ImageInput />
            <SubmitButton size={'sm'} />
          </FormWrapper>
        </div>
      )}
    </div>
  );
};

export default ImageInputWrapper;
