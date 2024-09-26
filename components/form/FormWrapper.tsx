"use client";

import actionFunction from "@/utils/types";
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

const FormWrapper = ({ action, children }: Props) => {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state.message, toast]);

  return <div></div>;
};

export default FormWrapper;
