"use client";

import { actionFunction } from "@/utils/types";
import { ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFormState } from "react-dom";

// 65. FormContainer Component

const initialState = {
  message: "",
};

type Props = {
  action: actionFunction;
  children: ReactNode;
};

// action（フォームの送信時に実行される関数）と
// children （コンポーネントの子要素）を Props として受け取ります。
const FormWrapper = ({ action, children }: Props) => {
  // ここで、formAction は FormData オブジェクトを自動的に作成し、それを action 関数に渡します。
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) toast({ description: state.message });
  }, [state.message, toast]);

  return <form action={formAction}>{children}</form>;
};

export default FormWrapper;
