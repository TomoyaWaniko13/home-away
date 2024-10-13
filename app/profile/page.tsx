import { fetchProfile, updateProfileAction, updateProfileImageAction } from '@/utils/actions';
import CardWrapper from '@/components/CardWrapper';
import FormWrapper from '@/components/form/FormWrapper';
import ImageInputWrapper from '@/components/form/ImageInputWrapper';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';

// 49. Create Pages
// 77. Update Profile Page
// 81. Image Input Container

const ProfilePage = async () => {
  const profile = await fetchProfile();

  return (
    <CardWrapper
      title={'user profile'}
      content={
        <>
          <ImageInputWrapper
            image={profile.profileImage}
            name={profile.username}
            action={updateProfileImageAction}
            buttonText={'Update profile Image'}
          />
          <FormWrapper formSubmitAction={updateProfileAction}>
            <div className={'grid grid-cols-2 gap-5 pt-4'}>
              <FormInput inputType={'text'} name={'firstName'} label={'First Name'} defaultValue={profile.firstName} />
              <FormInput inputType={'text'} name={'lastName'} label={'Last Name'} defaultValue={profile.lastName} />
              <FormInput inputType={'text'} name={'username'} label={'Username'} defaultValue={profile.username} />
            </div>
            <SubmitButton text={'update profile'} className={'mt-8'} />
          </FormWrapper>
        </>
      }
    />
  );
};

export default ProfilePage;
