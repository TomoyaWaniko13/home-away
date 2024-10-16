import CardContainer from '@/components/card/CardContainer';
import FormContainer from '@/components/form/FormContainer';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import { fetchProfile, updateProfileAction, updateProfileImageAction } from '@/actions/profileAction';

// 49. Create Pages
// 77. Update Profile Page
// 81. Image Input Container

const ProfilePage = async () => {
  const profile = await fetchProfile();

  return (
    <CardContainer
      title={'user profile'}
      content={
        <>
          <ImageInputContainer
            image={profile.profileImage}
            name={profile.username}
            action={updateProfileImageAction}
            buttonText={'Update profile Image'}
          />
          <FormContainer action={updateProfileAction}>
            <div className={'grid grid-cols-2 gap-5 pt-4'}>
              <FormInput inputType={'text'} name={'firstName'} label={'First Name'} defaultValue={profile.firstName} />
              <FormInput inputType={'text'} name={'lastName'} label={'Last Name'} defaultValue={profile.lastName} />
              <FormInput inputType={'text'} name={'username'} label={'Username'} defaultValue={profile.username} />
            </div>
            <SubmitButton text={'update profile'} className={'mt-8'} />
          </FormContainer>
        </>
      }
    />
  );
};

export default ProfilePage;
