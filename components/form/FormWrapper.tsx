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
  // useActionState is a Hook that allows you to
  // "update state based on the result of a form action".
  // つまり、form の状態管理を行います。

  // useFormState hook は、サーバーアクションの結果を受け取り、state を更新します。
  // この時点で state.message が変更されます。
  const [state, formAction] = useFormState(action, initialState);

  const { toast } = useToast();

  useEffect(() => {
    if (state.message) toast({ description: state.message });
    // toast関数も依存配列に含まれていますが、これはReactのルールに従うためです。
    // 通常、この関数は変更されません。
  }, [state.message, toast]);

  return <form action={formAction}>{children}</form>;
};

export default FormWrapper;
