"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { validateString } from "@/helpers/common";
import { TextInput } from "@mantine/core";
import { WarrantyService } from "@/services/warrantyService";

const CheckWarranty = () => {
  const navigate = useRouter();

  const form = useForm({
    initialValues: {
      vehNo: "",
    },
    validate: {
      vehNo: (value) => validateString(value),
    },
  });

  const handleSubmit = async () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      // console.log(form.values);
      const res = await WarrantyService.checkWarranty(form.values.vehNo);
      // console.log(res);
      if (res?.data) {
        navigate.replace(`/e-warranty/warranty?Id=${res?.data}`);
      }
    }
  };

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
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Detailing Titans
                </h2>
                <div className="mb-4 relative">
                  <TextInput
                    w={"100%"}
                    withAsterisk
                    placeholder="Vehicle Number (MH 02 -----)"
                    label="Check Your E-Warrnty"
                    classNames={{
                      wrapper: "w-full",
                    }}
                    {...form.getInputProps("vehNo", { type: "input" })}
                  />
                </div>
                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                  >
                    Check Warranty
                  </button>
                </div>
                <div className="mt-5 mb-5.5 flex items-center justify-center">
                  <Link href="/dashboard" className="text-sm text-primary">
                    Back to Admin
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

export default CheckWarranty;
