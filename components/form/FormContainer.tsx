'use client';

import { ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFormState } from 'react-dom';
import { formSubmitAction } from '@/actions/formSubmitAction';

// 65. FormContainer Component

const initialState = {
  message: '',
};

type Props = {
  formSubmitAction: formSubmitAction;
  children: ReactNode;
};

// formSubmitAction（フォームの送信時に実行される関数）と children （コンポーネントの子要素）を Props として受け取ります。
const FormContainer = ({ formSubmitAction, children }: Props) => {
  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
  const [state, formAction] = useFormState(formSubmitAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) toast({ description: state.message });
  }, [state.message, toast]);

  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
