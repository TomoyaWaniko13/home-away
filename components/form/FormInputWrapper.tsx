import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// 63. FormInputWrapper Component

type Props = {
  // これは入力フィールドの識別子として使用されます。
  // HTMLの<input>要素のname属性として設定されます。
  name: string;
  type: string;
  // これはユーザーインターフェース上で表示されるラベルテキストです。
  // <Label>コンポーネント内に表示されます。
  // オプショナルなプロパティで、指定されない場合は name が代わりに使用されます。
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

// form の <Label/> と <Input/> のペアは再利用されるので、
// FormInputWrapper を使います。
const FormInputWrapper = (props: Props) => {
  const { name, type, label, defaultValue, placeholder } = props;

  return (
    <div className={"mb-2"}>
      <Label htmlFor={name} className={"capitalize"}>
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={true}
      />
    </div>
  );
};

export default FormInputWrapper;
