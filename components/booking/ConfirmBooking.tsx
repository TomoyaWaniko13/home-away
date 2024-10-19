'use client';

import { SignInButton, useAuth } from '@clerk/nextjs';
import { useProperty } from '@/utils/store';
import { Button } from '@/components/ui/button';
import FormContainer from '@/components/form/FormContainer';
import { SubmitButton } from '@/components/form/Buttons';
import { createBookingAction } from '@/actions/bookingAction';

// 138. Booking Components

const ConfirmBooking = () => {
  const { userId } = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  // ログインしていなければ、ログインを促します。
  if (!userId)
    return (
      <SignInButton mode={'modal'}>
        <Button className={'w-full'} type={'button'}>
          Sign In to Complete Booking
        </Button>
      </SignInButton>
    );

  // バックエンドに property の 価格を取得するので、バックエンドに propertyId を渡します。
  const createBooking = createBookingAction.bind(null, { propertyId, checkIn, checkOut });

  return (
    <section>
      <FormContainer action={createBooking}>
        <SubmitButton text={'Reserve'} className={'w-full'} />
      </FormContainer>
    </section>
  );
};

export default ConfirmBooking;
