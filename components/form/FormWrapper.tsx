'use client';

import { formSubmitAction } from '@/utils/types';
import { ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFormState } from 'react-dom';

// 65. FormContainer Component

const initialState = {
  message: '',
};

type Props = {
  formSubmitAction: formSubmitAction;
  children: ReactNode;
};

// formSubmitAction（フォームの送信時に実行される関数）と
// children （コンポーネントの子要素）を Props として受け取ります。
const FormWrapper = ({ formSubmitAction, children }: Props) => {
  const [state, formAction] = useFormState(formSubmitAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) toast({ description: state.message });
  }, [state.message, toast]);

  return <form action={formAction}>{children}</form>;
};

export default FormWrapper;
