import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// 63. FormInputWrapper Component

type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'date'
  | 'time'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'url'
  | 'search'
  | 'color'
  | 'range';

type Props = {
  // これは入力フィールドの識別子として使用されます。
  // HTMLの<input>要素のname属性として設定されます。
  name: string;
  inputType: InputType;
  // これはユーザーインターフェース上で表示されるラベルテキストです。
  // <Label>コンポーネント内に表示されます。
  // オプショナルなプロパティで、指定されない場合は name が代わりに使用されます。
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

// form の <Label/> と <Input/> のペアは何度も使われるので、
// FormInput を使って再利用できるようにします。
const FormInput = (props: Props) => {
  const { name, inputType, label, defaultValue, placeholder } = props;

  return (
    <div>
      <Label htmlFor={name} className={'capitalize'}>
        {label || name}
      </Label>
      <Input id={name} name={name} type={inputType} defaultValue={defaultValue} placeholder={placeholder} required={true} />
    </div>
  );
};

export default FormInput;
