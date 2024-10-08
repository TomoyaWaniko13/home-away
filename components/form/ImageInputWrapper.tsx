'use client';

import { formSubmitAction } from '@/utils/types';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import FormWrapper from '@/components/form/FormWrapper';
import { LuUser2 } from 'react-icons/lu';
import SubmitButton from '@/components/form/SubmitButton';
import ImageInput from '@/components/form/ImageInput';

// 81. Image Input Container

type Props = {
  image: string;
  name: string;
  action: formSubmitAction;
  buttonText: string;
  children?: ReactNode;
};

const ImageInputWrapper = (props: Props) => {
  const { image, name, action, buttonText, children } = props;
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  return (
    <>
      {image ? (
        <Image src={image} alt={name} width={100} height={100} className={'rounded object-cover mb-3 w-24 h-24'} />
      ) : (
        <LuUser2 className={'w-24 h-24 bg-primary rounded text-white mb-4'} />
      )}
      <Button variant={'outline'} onClick={() => setUpdateFormVisible((prev) => !prev)}>
        {buttonText}
      </Button>
      {/* <Button/> を押すと以下の部分が出現/消失します。 */}
      {isUpdateFormVisible && (
        <FormWrapper formSubmitAction={action}>
          <div className={'max-w-md py-3 flex flex-col gap-3'}>
            {children}
            <ImageInput />
            <SubmitButton text={'submit photo'} />
          </div>
        </FormWrapper>
      )}
    </>
  );
};

export default ImageInputWrapper;
