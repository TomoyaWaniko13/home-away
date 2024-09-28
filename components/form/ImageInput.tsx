import { Input } from '@/components/ui/input';

// 80. Image Input

const ImageInput = () => {
  const name = 'image';

  return (
    <div className={'mb-4'}>
      <Input id={name} name={name} type={'file'} required={true} accept={'image/*'} />
    </div>
  );
};

export default ImageInput;
