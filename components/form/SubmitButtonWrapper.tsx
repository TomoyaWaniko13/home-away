import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

// 64. SubmitButton Component

type Props = {
  className?: string;
  text?: string;
};

const SubmitButtonWrapper = ({ className = "", text = "submit" }: Props) => {
  // The useFormStatus Hook provides status information of the last form submission.
  // must be rendered within a <form>.
  // pending が true の場合、フォームは現在送信中または処理中です。
  // pending が falseの場合、フォームは送信中ではありません。
  const { pending } = useFormStatus();

  return (
    <Button
      type={"submit"}
      disabled={pending}
      className={`capitalize ${className}`}
      size={"lg"}
    >
      {pending ? (
        <>
          <ReloadIcon className={"mr-2 h-4 w-4　animate-spin"} />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButtonWrapper;
