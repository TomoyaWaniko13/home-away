// 49. Create Pages
// 77. Update Profile Page

import FormWrapper from "@/components/form/FormWrapper";
import { fetchProfile, updateProfileAction } from "@/utils/actions";
import FormInputWrapper from "@/components/form/FormInputWrapper";
import SubmitButtonWrapper from "@/components/form/SubmitButtonWrapper";

const ProfilePage = async () => {
  const profile = await fetchProfile();

  return (
    <section>
      <h1 className={"text-2xl font-semibold mb-8 capitalize"}>user profile</h1>
      <div className={"border p-4 rounded-md max-w-lg"}>
        {/* image input container */}
        <FormWrapper action={updateProfileAction}>
          {/* 縦並びにします。 */}
          <div className={"grid gap-4 mt-4"}>
            <FormInputWrapper
              type={"text"}
              name={"firstName"}
              label={"First Name"}
              defaultValue={profile.firstName}
            />
            <FormInputWrapper
              type={"text"}
              name={"lastName"}
              label={"Last Name"}
              defaultValue={profile.lastName}
            />
            <FormInputWrapper
              type={"text"}
              name={"username"}
              label={"Username"}
              defaultValue={profile.username}
            />
          </div>
          <SubmitButtonWrapper text={"update profile"} className={"mt-8"} />
        </FormWrapper>
      </div>
    </section>
  );
};

export default ProfilePage;
