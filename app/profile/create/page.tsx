import FormWrapper from "@/components/form/FormWrapper";
import FormInputWrapper from "@/components/form/FormInputWrapper";
import SubmitButtonWrapper from "@/components/form/SubmitButtonWrapper";
import { createProfileAction } from "@/utils/actions";

// 62. Create Profile - Setup
// 66. Refactor Create Profile

const CreateProfilePage = () => {
  return (
    <section>
      <h1 className={"text-2xl font-semibold mb-8 capitalize"}>new user</h1>
      <div className={"border p-4 rounded-md max-w-lg"}>
        <FormWrapper action={createProfileAction}>
          {/* 縦並びにします。 */}
          <div className={"grid gap-4 mt-4"}>
            <FormInputWrapper
              type={"text"}
              name={"firstName"}
              label={"First Name"}
            />
            <FormInputWrapper
              type={"text"}
              name={"lastName"}
              label={"Last Name"}
            />
            <FormInputWrapper
              type={"text"}
              name={"username"}
              label={"Username"}
            />
          </div>
          <SubmitButtonWrapper text={"Create Profile"} className={"mt-8"} />
        </FormWrapper>
      </div>
    </section>
  );
};

export default CreateProfilePage;
