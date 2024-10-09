import { Input } from '@/components/ui/input';

// 80. Image Input

const ImageInput = () => {
  const name = 'image';

  return <Input id={name} name={name} type={'file'} required={true} accept={'image/*'} />;
};

export default ImageInput;
