import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// 80. Image Input

const ImageInput = () => {
  const name = 'image';

  return (
    <div className={'mb-2'}>
      <Label htmlFor={name} className={'capitalize'}>
        Image
      </Label>
      <Input id={name} name={name} type={'file'} required={true} accept={'image/*'} className={'max-w-xs'} />
    </div>
  );
};

export default ImageInput;
