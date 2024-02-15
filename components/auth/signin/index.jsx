"use client";
import Link from "next/link";
import { isEmail, useForm } from "@mantine/form";
import { validateString } from "@/helpers/common";
import { TextInput, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AuthService } from "@/services/authService";
import { useRouter } from "next/navigation";
import Tokenhelper from "@/helpers/Token.helper";

const SignIn = () => {
  const navigate = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      password: (value) => validateString(value),
    },
  });

  const { email, password } = form.values;

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      const res = await AuthService.login({ email, password });
      // console.log(res?.data);
      const data = await res?.data;
      if (data) {
        // console.log(data);
        Tokenhelper.createToken(data?.refreshToken);
        Tokenhelper.createUser(data?.user);
        Tokenhelper.createRole(data?.role);
        navigate.replace("/dashboard");
      }
    }
  };

  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
      <div className="">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 w-80 text-center">
                  Detailing Titans
                </h2>
                <div className="mb-4 relative">
                  <TextInput
                    w={"100%"}
                    // withAsterisk
                    placeholder="Enter Email"
                    label="Email"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("email", { type: "input" })}
                  />
                  <span className="absolute right-2 top-9">
                    <svg
                      className="fill-current"
                      width="16"
                      height="16"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
                <div className="mb-6 relative">
                  <PasswordInput
                    label="Password"
                    placeholder="Enter Password"
                    visible={visible}
                    onVisibilityChange={toggle}
                    {...form.getInputProps("password", { type: "input" })}
                  />
                </div>
                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                  >
                    Sign In
                  </button>
                </div>
                <div className="mt-5 mb-5.5 flex items-center justify-between">
                  <Link href="/create-studio" className="text-sm text-primary">
                    Create Studio
                  </Link>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
