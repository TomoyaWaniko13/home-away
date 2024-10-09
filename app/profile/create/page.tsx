import FormWrapper from '@/components/form/FormWrapper';
import FormInput from '@/components/form/FormInput';
import SubmitButton from '@/components/form/SubmitButton';
import { createProfileAction } from '@/utils/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

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
    <section>
      <h1 className={'text-2xl font-semibold pb-8 capitalize'}>new user</h1>
      <div className={'border p-3 rounded-md max-w-4xl'}>
        <FormWrapper formSubmitAction={createProfileAction}>
          {/* 縦並びにします。 */}
          <div className={'grid gap-5 pt-4'}>
            <FormInput inputType={'text'} name={'firstName'} label={'First Name'} />
            <FormInput inputType={'text'} name={'lastName'} label={'Last Name'} />
            <FormInput inputType={'text'} name={'username'} label={'Username'} />
          </div>
          <SubmitButton text={'Create Profile'} className={'mt-4'} />
        </FormWrapper>
      </div>
    </section>
  );
};

export default CreateProfilePage;
