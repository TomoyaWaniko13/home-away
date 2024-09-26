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

// action（フォームの送信時に実行される関数）と children （コンポーネントの子要素）をプロップとして受け取ります。
// useFormState フックを使用して、フォームの状態管理を行います。
// useToast フックを使用して、トースト通知の機能を提供します。
const FormWrapper = ({ action, children }: Props) => {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  // 状態（state）のメッセージが変更されるたびに実行されます。
  // メッセージがある場合、トースト通知を表示します。
  useEffect(() => {
    if (state.message) toast({ description: state.message });
  }, [state.message, toast]);

  return <form action={formAction}>{children}</form>;
};

export default FormWrapper;
