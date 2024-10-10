import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// 80. Image Input

const ImageInput = () => {
  const name = 'image';

  return (
    <div>
      <Label htmlFor={name} className='capitalize'>
        Image
      </Label>
      <Input id={name} name={name} type={'file'} required={true} accept={'image/*'} />
    </div>
  );
};

export default ImageInput;
