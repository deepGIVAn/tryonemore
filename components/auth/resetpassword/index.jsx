"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthService } from "@/services/authService";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { PasswordInput, TextInput } from "@mantine/core";
import { validateString } from "@/helpers/common";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useRouter();
  const params = useSearchParams();

  // console.log(params.get("resetToken"));

  useEffect(() => {
    const verifyUser = async () => {
      const res = await AuthService.verifyToken({
        token: params.get("resetToken"),
      });
      if (!res?.data?.message) {
        toast.error("Instructions are expired or falsy.");
        navigate.replace("/");
      }
    };
    verifyUser();
  }, [params, navigate]);

  const form = useForm({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validate: {
      password: (value) => validateString(value),
      confirmpassword: (value) =>
        value == form?.values?.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      const res = await AuthService.resetPassword({
        token: params.get("resetToken"),
        password: form.values.password,
      });
      console.log(res);
      if (res?.data?.message) {
        toast.success("Password Updated Successfully!!");
        navigate.replace("/");
      }
    }
  };

  const [visible, { toggle }] = useDisclosure(false);
  const [visible2, { toggle: toggle2 }] = useDisclosure(false);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2  w-80 text-center">
                Reset Password
              </h2>

              <div className="mb-4 relative">
                <PasswordInput
                  label="New Password"
                  placeholder="Enter New Password"
                  visible={visible}
                  onVisibilityChange={toggle}
                  {...form.getInputProps("password", { type: "input" })}
                />
              </div>

              <div className="mb-4 relative">
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  visible={visible2}
                  onVisibilityChange={toggle2}
                  {...form.getInputProps("confirmpassword", { type: "input" })}
                />
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
