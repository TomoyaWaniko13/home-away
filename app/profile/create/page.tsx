import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import CardContainer from '@/components/card/CardContainer';
import TextAreaInput from '@/components/form/TextAreaInput';
import { SubmitButton } from '@/components/form/Buttons';
import { createProfileAction } from '@/actions/profileAction';

// 62. Create Profile - Setup
// 66. Refactor Create Profile
// 75. Modify Create Profile Page

const CreateProfilePage = async () => {
  // https://clerk.com/docs/references/nextjs/current-user
  // The currentUser helper returns the Backend User object of the currently active user.
  // It can be used in Server Components, Route Handlers, and Server Actions.
  const user = await currentUser();
  if (user?.privateMetadata?.hasProfile) redirect('/');

  return (
    <CardContainer
      title={'new user'}
      content={
        <FormContainer action={createProfileAction}>
          {/* 縦並びにします。 */}
          <div className={'grid gap-5 pt-4'}>
            <FormInput inputType={'text'} name={'firstName'} label={'First Name'} />
            <FormInput inputType={'text'} name={'lastName'} label={'Last Name'} />
            <FormInput inputType={'text'} name={'username'} label={'Username'} />
          </div>
          <TextAreaInput name={'description'} />
          <SubmitButton text={'Create Profile'} className={'mt-4'} />
        </FormContainer>
      }
    />
  );
};

export default CreateProfilePage;
