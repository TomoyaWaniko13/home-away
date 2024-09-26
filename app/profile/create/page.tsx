import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 62. Create Profile - Setup

const createProfileAction = async (formData: FormData) => {
  "use server";
  const firstName = formData.get("firstName") as string;
  console.log(firstName);
};

const ProfileCreatePage = () => {
  return (
    <section>
      <h1 className={"text-2xl font-semibold mb-8 capitalize"}>new user</h1>
      <div className={"border p-4 rounded-md max-w-lg"}>
        <form action={createProfileAction}>
          <div className={"mb-2 flex flex-col gap-2"}>
            <Label htmlFor={"firstName"}>First name</Label>
            <Input id={"firstName"} name={"firstName"} type={"text"} />
          </div>
          <Button type={"submit"} size={"lg"}>
            Create Profile
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ProfileCreatePage;
