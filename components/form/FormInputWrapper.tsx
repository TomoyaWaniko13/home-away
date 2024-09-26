import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// 63. FormInputWrapper Component

type Props = {
  // これは入力フィールドの識別子として使用されます。
  // HTMLの<input>要素のname属性として設定されます。
  // フォームデータの送信時やJavaScriptでフォームを操作する際に、このnameを使って特定の入力フィールドを参照します。
  name: string;
  type: string;
  // これはユーザーインターフェース上で表示されるラベルテキストです。
  // <Label>コンポーネント内に表示されます。
  // ユーザーにとって、その入力フィールドが何を意味するかを説明するものです。
  // オプショナルなプロパティで、指定されない場合はnameが代わりに使用されます。
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

// form を再利用するための component です。
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
